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
// Check if the blog ID is provided in the request
if(isset($_GET['idblogs'])) {
    $idblogs = $_GET['idblogs'];


    // Query to fetch the blog data from the database based on the ID
    $query = "SELECT * FROM blogs WHERE idblogs = $idblogs";

    // Execute the query
    $result = $conn->query($query);

    // Check if the query was successful
    if ($result) {
        // Fetch the blog data as an associative array
        $blog = $result->fetch_assoc();

        // Send the blog data as JSON response
        header('Content-Type: application/json');
        echo json_encode($blog);
    } else {
        // Handle errors
        echo json_encode(array('error' => 'Failed to fetch blog data'));
    }
} else {
    // Handle missing blog ID parameter
    echo json_encode(array('error' => 'Blog ID is required'));
}
?>
