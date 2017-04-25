<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include '../conectionData.php';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
	SELECT
	    p.*,
	    a.name as animeName,
	    a.imageName as animeImage
  	FROM
	    papertoy p,
	    anime a
  	WHERE
    	a.id = p.anime
	ORDER BY
		p.timesDownload DESC 
	LIMIT 10
";

$result = $conn->query($sql);
$rows = array();

$realResult = "";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		$rows['papertoys'][] = $row;
		//$realResult = $realResult.$row["name"]." (".$row["status"].") - ".$row["timesDownload"]." veces"."\n";
    }
}

//echo $realResult;
echo json_encode($rows);

$conn->close();