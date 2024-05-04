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

// Fetch the newest 5 books from the database
$sql = "SELECT * FROM books ORDER BY year_issued DESC LIMIT 5";
$result = $conn->query($sql);

// Initialize an array to store the book data
$books = array();

// Check if there are results
if ($result->num_rows > 0) {
    // Loop through each row
    while ($row = $result->fetch_assoc()) {
        $row['image_base64'] = base64_encode($row['image_base64']); // Re-encode image data
        $row['image_base64'] = base64_decode($row['image_base64']);
        $books[] = $row;
    }
}

// Close the connection
$conn->close();

// Convert the array to JSON and output it
header('Content-Type: application/json');
echo json_encode($books);
?>
