<?php
// Allow requests from all origins (replace * with specific origins if needed)
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: POST");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");
// Check if the promoCode parameter is set
if(isset($_GET['promoCode'])) {
    // Retrieve promoCode from the request
    $promoCode = $_GET['promoCode'];

    // Connect to your database (assuming you have a connection)
    include 'connection.php';
    $conn = connectDB();

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute SQL query to retrieve discount percentage for the promo code
    $sql = "SELECT percentage FROM discounts WHERE code = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $promoCode);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the promo code exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $discountPercentage = $row['percentage'];

        // Return success response with the discount percentage
        $response = array(
            'success' => true,
            'discountPercentage' => $discountPercentage
        );
        echo json_encode($response);
    } else {
        // Promo code does not exist or is invalid
        $response = array(
            'success' => false
        );
        echo json_encode($response);
    }

    // Close the database connection
    $conn->close();
} else {
    // promoCode parameter is not set
    echo "Error: Promo code not provided.";
}
?>
