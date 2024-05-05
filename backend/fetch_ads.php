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

// Fetch data from the ads table
$sql = "SELECT * FROM ads";
$result = $conn->query($sql);

// Encode fetched data into JSON
$ads_data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ads_data[] = $row;
    }
}
$ads_json = json_encode($ads_data);

$conn->close();

echo $ads_json;
?>
