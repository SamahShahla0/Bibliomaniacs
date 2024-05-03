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

// Handle the search request
if(isset($_GET['search_query'])) {
    $search_query = $_GET['search_query'];
    
    // Query the database to find the book with the provided title
    $sql = "SELECT idbooks FROM books WHERE tittle = ?";
    $stmt = $conn->prepare($sql);
    
    // Error handling for prepare
    if($stmt === false) {
        die("Error preparing query: " . $conn->error);
    }
    
    // Bind parameters
    $stmt->bind_param("s", $search_query);
    
    // Execute statement
    $stmt->execute();
    
    // Error handling for execute
    if($stmt === false) {
        die("Error executing query: " . $stmt->error);
    }
    
    // Get result
    $result = $stmt->get_result();
    
    // Fetch the result
    $book = $result->fetch_assoc();
    
    if($book) {
        // Return only the idbooks parameter in the response
        echo urlencode($book['idbooks']);
        exit();
    } else {
        // Handle case where book is not found
        echo json_encode(["error" => "Book not found"]);
    }
}
