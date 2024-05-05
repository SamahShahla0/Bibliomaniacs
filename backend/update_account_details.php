<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

$conn = connectDB();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user ID exists in the URL query parameters
if(isset($_GET['idusers'])) {
    $userId = $_GET['idusers'];

    // Check if the request method is POST and form data is set
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['first_name'], $_POST['last_name'], $_POST['display_name'])) {
        $firstName = $_POST['first_name'];
        $lastName = $_POST['last_name'];
        $displayName = $_POST['display_name'];

        // Update user details
        $query = "UPDATE users SET First_name = ?, Last_name = ?, username = ? WHERE idusers = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssi", $firstName, $lastName, $displayName, $userId); // Bind parameters
        $stmt->execute();

        // You can return a success message or any other relevant response
        echo json_encode(["success" => true]);
    } else {
        // Form data is not complete or method is not POST, handle accordingly
        echo json_encode(["error" => "Invalid request"]);
    }
} else {
    // User ID not found in the URL query parameters, handle accordingly
    echo json_encode(["error" => "User ID not found"]);
}
?>
