<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php'; 

$conn = connectDB();

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch latest blog posts
$sql = "SELECT * FROM blogs ORDER BY idblogs DESC LIMIT 3"; // Fetching latest 3 blog posts
$result = $conn->query($sql);

$blogs = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $blogs[] = $row;
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($blogs);

$conn->close();
?>
