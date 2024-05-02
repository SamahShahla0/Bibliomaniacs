<?php
// Allow requests from all origins (replace * with specific origins if needed)
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");


// Include the function to establish database connection
include 'connection.php';

$conn = connectDB(); // Call your database connection function here

// Check if connection is successful
if (!$conn) {
    return json_encode(array("error" => "Database connection failed"));
}

// Fetch favorites for a given user ID
function getFavorites($userId, $conn) {
    $userId = mysqli_real_escape_string($conn, $userId);
    $query = "SELECT * FROM favorites WHERE users_idusers = $userId";
    $result = mysqli_query($conn, $query);
    $favorites = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $favorites[] = $row['books_idbooks'];
    }
    return $favorites;
}

// Example usage:
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['idusers'])) {
        $userId = $_GET['idusers'];
        $favorites = getFavorites($userId, $conn);
        header('Content-Type: application/json');
        echo json_encode($favorites);
    } else {
        // Handle error
        echo "User ID not provided.";
    }
}

$conn->close();
?>
