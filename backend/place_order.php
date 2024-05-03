<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

$conn = connectDB(); 

// Check if connection is successful
if (!$conn) {
    return json_encode(array("error" => "Database connection failed"));
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data sent from the client-side
    $data = json_decode(file_get_contents("php://input"));

    // Extract total and cartId from the decoded data
    $total = $data->total;
    $cartId = $data->cartId;

    // Prepare and execute the SQL query to insert into the orders table
    $sql = "INSERT INTO orders (date_created, status, total, carts_idcarts) VALUES (CURRENT_TIMESTAMP(), 'completed', ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("di", $total, $cartId); 

    if ($stmt->execute()) {
        // Order successfully placed
        $orderId = $stmt->insert_id;
        $response = array("success" => true, "orderId" => $orderId);
    } else {
        // Failed to place order
        $response = array("success" => false, "message" => "Failed to place order");
    }

    // Return JSON response
    header("Content-Type: application/json");
    echo json_encode($response);
} else {

    echo "Method Not Allowed";
}

?>
