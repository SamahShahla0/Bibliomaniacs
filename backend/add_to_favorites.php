<?php
// Allow requests from all origins (replace * with specific origins if needed)
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");

// Include the function to establish database connection
include 'connection.php'; 

// Get book id from GET parameter
$bookId = $_GET['idbooks'];

// Check if the user is logged in and retrieve their user ID
// You need to implement user authentication and retrieve the user ID accordingly

// For demonstration purposes, let's assume the user ID is 1
$userId = 1;

// Connect to the database
$conn = connectDB();

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL statement to insert the book into favorites
$sql = "INSERT INTO favorites (users_idusers, books_idbooks) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $bookId);

if ($stmt->execute() === TRUE) {
    echo "Book added to favorites successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>
