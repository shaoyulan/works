<?php 
header('Content-Type: application/json;charset=utf8'); 
// DB object
try{
	$pdo = new PDO('mysql:host=localhost;dbname=hi24;port=8889;charset=utf8','root','root');
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

// 單一條件，或多重條件
if ($_POST['mode']=='2'){
	// command SQL 
	$sql ='SELECT * FROM `product_list` WHERE `category_main`=:category_main AND `category_sub`=:category_sub ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':category_main',$_POST['category_main']); //should use " cause :category_main in $sql only accept "abc"
}else{
	// command SQL 
	$sql ='SELECT * FROM `product_list` WHERE `category_main`=:category_main ORDER BY `id` ASC';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':category_main',$_POST['category_main']); //should use " cause :category_main in $sql only accept "abc"
}
$statement->execute();
$product_filtered = $statement->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($product_filtered,JSON_NUMERIC_CHECK);
?>

