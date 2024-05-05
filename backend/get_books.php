<?php
// Allow requests from all origins (replace * with specific origins if needed)
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");

// Include the function to establish database connection
include 'connection.php'; 

// Function to fetch books from the database
function fetchBooks() {
    // Establish database connection
    $conn = connectDB(); // Call your database connection function here

    // Check if connection is successful
    if (!$conn) {
        return json_encode(array("error" => "Database connection failed"));
    }

    // SQL query to select data from the books table
    $sql = "SELECT idbooks, tittle, author, price, image_base64 FROM books";

    // Execute the query
    $result = $conn->query($sql);

    // Check if query execution was successful
    if (!$result) {
        return json_encode(array("error" => $conn->error));
    }
    // Check if any rows were returned
    if ($result->num_rows > 0) {
        // Fetch data from each row
        $books = array();
        while ($row = $result->fetch_assoc()) {

            $row['image_base64'] = base64_encode($row['image_base64']); // Re-encode image data
            $row['image_base64'] = base64_decode($row['image_base64']);
            // Ensure UTF-8 encoding for strings
            $row['tittle'] = utf8_encode($row['tittle']);
            $row['author'] = utf8_encode($row['author']);
            $row['price'] = utf8_encode($row['price']);

            $books[] = $row;
        }
        $json = json_encode($books, JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            die("JSON encoding error: " . json_last_error_msg());
        }
        header('Content-Type: application/json');
        // Return the books data as JSON
        return json_encode($books);
    } else {
        return json_encode(array("message" => "No books found"));
    }

    // Close the database connection
    $conn->close();
}

// Call the function to fetch books and echo the result
echo fetchBooks();
?>
