<?php
// Include the function to establish database connection
include 'connection.php'; // Update with the actual filename if needed

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
            // Add each book to the array
            $books[] = $row;
        }
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
