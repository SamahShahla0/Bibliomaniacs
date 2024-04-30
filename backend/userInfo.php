<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

// Function to fetch user information based on user ID
function getUserInfo($userId) {
    $conn = connectDB();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute SQL query to fetch user information
    $stmt = $conn->prepare("SELECT * FROM users WHERE idusers = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, return user information as an associative array
        $user = $result->fetch_assoc();
        return $user;
    } else {
        // User not found
        return null;
    }

    // Close prepared statement and database connection
    $stmt->close();
    $conn->close();
}

// Check if the 'id' parameter is provided in the URL
if(isset($_GET['idusers'])) {
    // Retrieve the user ID from the URL parameter
    $userId = $_GET['idusers'];

    // Fetch user information based on user ID
    $userInfo = getUserInfo($userId);

    if($userInfo !== null) {
        // User information found, return as JSON response
        header('Content-Type: application/json');
        echo json_encode($userInfo);
    } else {
        // User not found, return error response
        http_response_code(404);
        echo json_encode(array("error" => "User not found"));
    }
} else {
    // 'id' parameter not provided in the URL
    http_response_code(400);
    echo json_encode(array("error" => "User ID not provided"));
}
?>
