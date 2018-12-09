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
$sql = 'update todos set content=:content where id=:id';
// prepare for security reason
$statement = $pdo->prepare($sql);
// bindvalue 
$statement->bindValue(':content',$_POST['content'],PDO::PARAM_STR);
$statement->bindValue(':id',$_POST['id'],PDO::PARAM_INT);
// execute
$result = $statement->execute();

if (!$result){
	echo 'error';
}






