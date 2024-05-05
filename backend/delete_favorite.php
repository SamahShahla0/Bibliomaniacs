<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

$conn = connectDB(); 

// Check if connection is successful
if (!$conn) {
    return json_encode(array("error" => "Database connection failed"));
}

// Delete a favorite book for a given user ID and book ID
function deleteFavorite($userId, $bookId, $conn) {
    $userId = mysqli_real_escape_string($conn, $userId);
    $bookId = mysqli_real_escape_string($conn, $bookId);
    $query = "DELETE FROM favorites WHERE users_idusers = $userId AND books_idbooks = $bookId";
    if (mysqli_query($conn, $query)) {
        return true; // Deletion successful
    } else {
        return false; // Deletion failed
    }
}


if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Get the raw input from the request body
    $input = file_get_contents("php://input");
    
    // Parse the raw input to get parameters
    $params = json_decode($input, true);

    echo "Received Parameters: " . json_encode($params) . "\n";
    
    // Check if 'idbooks' parameter exists in the DELETE request
    $hasBookId = isset($params['idbooks']);
    
    // Check if 'idusers' parameter exists in the DELETE request
    $hasUserId = isset($params['idusers']);

    if ($hasBookId && $hasUserId) {
        // Both 'idbooks' and 'idusers' parameters exist in the DELETE request
        $bookId = $params['idbooks'];
        $userId = $params['idusers'];

        // Delete the favorite book using $bookId and $userId
        $success = deleteFavorite($userId, $bookId, $conn);
        if ($success) {
            echo json_encode(array("message" => "Favorite book deleted successfully"));
        } else {
            echo json_encode(array("error" => "Failed to delete favorite book"));
        }
    } elseif (!$hasBookId && !$hasUserId) {
        // Handle error if both 'idbooks' and 'idusers' parameters are missing
        echo json_encode(array("error" => "Book ID and User ID not provided"));
    } elseif (!$hasBookId) {
        // Handle error if 'idbooks' parameter is missing
        echo json_encode(array("error" => "Book ID not provided"));
    } else {
        // Handle error if 'idusers' parameter is missing
        echo json_encode(array("error" => "User ID not provided"));
    }
}



$conn->close();
?>
