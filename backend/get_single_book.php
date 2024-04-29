<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow GET, POST, PUT, DELETE requests
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");
// Include database connection file
include 'connection.php';

$conn = connectDB(); // Connect to the database
    if (!$conn) {
        return json_encode(array("error" => "Database connection failed"));
    }

// Fetch book information based on the provided book id
$idbooks = $_GET['idbooks']; // Assuming book id is passed as a parameter

$sql = "SELECT * FROM books WHERE idbooks = $idbooks";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    $row = $result->fetch_assoc();
    header('Content-Type: application/json');
    echo json_encode($row); // Send book data as JSON
} else {
    echo "0 results";
}
$conn->close();
?>