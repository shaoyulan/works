<?php
header('Content-Type: application/json; charset=utf8'); //更改header資訊為json 



include('../../db.php');
try{
	$pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",$db['username'],$db['password']);
}catch(PDOException $e){
	echo "Database connection failed.";
	exit;
}

// ******READ********
//prepare SQL and placeholder
$sql = 'select is_complete from todos WHERE id=:id';
// prepare for security reason
$statement = $pdo->prepare($sql);
// bindvalue 
$statement->bindValue(':id',$_POST['id']);
// execute
$result = $statement->execute();
$todo = $statement->fetch(PDO::FETCH_ASSOC);

// ******SAVE********
//prepare SQL and placeholder
$sql = 'update todos set is_complete=:is_complete WHERE id=:id';
// prepare for security reason
$statement = $pdo->prepare($sql);
// bindvalue 
$statement->bindValue(':id',$_POST['id']);
// ******TOGGLE******
$statement->bindValue(':is_complete',!$todo['is_complete']);
// execute
$result = $statement->execute();


if ($result){
	echo json_encode(['id'=>99,'is_complete'=>!$todo['is_complete']]);
}else{
	echo 'error';
}






