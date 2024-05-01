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
    $userId = $_GET['iduserss'];

    // Check if the request method is POST and form data is set
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['city'], $_POST['street'], $_POST['building'], $_POST['floor'])) {
        $city = $_POST['city'];
        $street = $_POST['street'];
        $building = $_POST['building'];
        $floor = $_POST['floor'];

        // Check if the user has a saved address
        $query = "SELECT * FROM addresses WHERE user_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $userId); // Bind user ID as integer
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0) {
            // User has a saved address, update it
            $query = "UPDATE addresses SET city = ?, street = ?, building = ?, floor = ? WHERE user_id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssssi", $city, $street, $building, $floor, $userId); // Bind parameters
            $stmt->execute();
        } else {
            // User does not have a saved address, insert a new one
            $query = "INSERT INTO addresses (city, street, building, floor, user_id) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssssi", $city, $street, $building, $floor, $userId); // Bind parameters
            $stmt->execute();
        }

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
