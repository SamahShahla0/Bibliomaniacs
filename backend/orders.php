<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

$conn = connectDB();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user ID from the request parameters
$userId = $_GET['userId'];

// Prepare and execute SQL query to fetch orders for the user
$stmt = $conn->prepare("SELECT * FROM orders WHERE carts_users_idusers = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$orders = array();
while ($row = $result->fetch_assoc()) {
    // Add each order to the orders array
    $orders[] = $row;
}

// Close prepared statement and database connection
$stmt->close();
$conn->close();

// Return the orders data as JSON
header('Content-Type: application/json');
echo json_encode($orders);
?>
