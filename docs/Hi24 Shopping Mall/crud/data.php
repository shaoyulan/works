<?php 

// DB object
try{
	$pdo = new PDO('mysql:host=localhost;dbname=hi24;port=8889;charset=utf8','root','root');
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

// command SQL 
$sql ='SELECT * FROM `header_ad` ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
$statement->execute();
$headerAds = $statement->fetchAll(PDO::FETCH_ASSOC); 

// command SQL 
$sql ='SELECT * FROM `product_list` ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
$statement->execute();
$product_list = $statement->fetchAll(PDO::FETCH_ASSOC); 


?>

 <!-- jason format data -->
<script>
	var products = <?= json_encode($product_list,JSON_NUMERIC_CHECK) ?>;
	var headerAds = <?= json_encode($headerAds,JSON_NUMERIC_CHECK) ?>;
</script>
