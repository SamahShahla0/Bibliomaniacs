<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php'; 


function getBooksByCategory($categoryId) {

    $conn = connectDB(); 
    if (!$conn) {
        return json_encode(array("error" => "Database connection failed"));
    }

    $sql = "SELECT idbooks, tittle, author, price, image_base64 FROM books WHERE categories_idcategories = ?";

    $stmt = $conn->prepare($sql);

    // Bind the category ID parameter to the SQL statement
    $stmt->bind_param("i", $categoryId);

    // Execute the prepared statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Initialize an empty array to store books
    $books = array();

    // Check if any books were found
    if ($result->num_rows > 0) {
        // Fetch book data row by row
        while($row = $result->fetch_assoc()) {
            // Push book data to the books array
            $books[] = $row;
        }
    }

    // Close the prepared statement
    $stmt->close();

    // Close database connection
    $conn->close();

    // Return books array
    return $books;
}

// Check if the category ID is provided in the request
if (isset($_GET['category_id'])) {
    // Get the category ID from the request
    $categoryId = $_GET['category_id'];

    // Fetch books by category
    $books = getBooksByCategory($categoryId);

    // Return books as JSON
    header('Content-Type: application/json');
    echo json_encode($books);
} else {
    // If category ID is not provided, return an error message
    echo "Error: Category ID is required.";
}
?>