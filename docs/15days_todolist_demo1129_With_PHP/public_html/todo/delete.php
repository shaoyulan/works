<?php
header('Content-Type: application/json; charset=utf8'); //更改header資訊為json 



include('../../db.php');
try{
	$pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",$db['username'],$db['password']);
}catch(PDOException $e){
	echo "Database connection failed.";
	exit;
}


//prepare SQL and placeholder
$sql = 'delete from todos WHERE id=:id';
// prepare for security reason
$statement = $pdo->prepare($sql);
// bindvalue 
$statement->bindValue(':id',$_POST['id']);
// execute
$result = $statement->execute();

if ($result){
	echo json_encode(['id'=>99]);
}else{
	echo 'error';
}






