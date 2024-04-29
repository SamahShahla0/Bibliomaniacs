<?php
// Allow requests from all origins (replace * with specific origins if needed)
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");

// Include the function to establish database connection
include 'connection.php';

// Function to fetch categories from the database
function getCategories() {

    $conn = connectDB(); // Call your database connection function here

    // Check if connection is successful
    if (!$conn) {
        return json_encode(array("error" => "Database connection failed"));
    }
    // Perform database query to retrieve categories
    $sql = "SELECT idcategories, category_desc FROM categories";
    $result = $conn->query($sql);

    // Check if any categories were found
    if ($result->num_rows > 0) {
        // Initialize an empty array to store categories
        $categories = array();

        // Fetch category data row by row
        while($row = $result->fetch_assoc()) {
            // Push category data to the categories array
            $categories[] = $row;
        }

        // Close database connection
        $conn->close();

        // Return categories array
        return $categories;
    } else {
        // If no categories were found, return an empty array
        return array();
    }
}

// Fetch categories
$categories = getCategories();

// Return categories as JSON
header('Content-Type: application/json');
echo json_encode($categories);
?>