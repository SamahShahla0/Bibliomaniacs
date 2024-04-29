<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow GET, POST, PUT, DELETE requests
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");
// Include database connection file
include 'connection.php';

// Function to fetch blogs from the database
function getBlogs() {
    $conn = connectDB(); // Connect to the database
    if (!$conn) {
        return json_encode(array("error" => "Database connection failed"));
    }

    $sql = "SELECT * FROM blogs"; // SQL query to fetch all blogs
    $result = $conn->query($sql); // Execute the query

    // Initialize an empty array to store blogs
    $blogs = array();

    if ($result->num_rows > 0) {
        // Fetch blog data row by row
        while ($row = $result->fetch_assoc()) {

            $row['blog_img_64'] = base64_encode($row['blog_img_64']); // Re-encode image data
            $row['blog_img_64'] = base64_decode($row['blog_img_64']);
            // Ensure UTF-8 encoding for strings
            $row['blog_title'] = mb_convert_encoding($row['blog_title'], 'UTF-8', 'auto');
            $row['blog_text'] = mb_convert_encoding($row['blog_text'], 'UTF-8', 'auto');

            $blogs[] = $row; // Push blog data to the blogs array
        }
        $json = json_encode($blogs, JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            die("JSON encoding error: " . json_last_error_msg());
        }
        header('Content-Type: application/json');
        // Return the blogs data as JSON
        return json_encode($blogs);
    } else {
        return json_encode(array("message" => "No blogs found"));
    }

    // Close the database connection
    $conn->close();
}

// Call the function to fetch books and echo the result
echo getBlogs();
?>

