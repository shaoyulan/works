<?php
header('Content-Type:application/json; charset=utf8');
include('../../db.php');
include('../HttpStatusCode.php');

try {
	$pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",$db['username'],$db['password']);
} catch (PDOException $e) {
	echo "Database connection failed.".$e->getMessage();
	exit;
}



$sql ='DELETE FROM event WHERE id=:id';
$statement = $pdo->prepare($sql);
// $statement->bindValue(':目標',值,傳入格式);
$statement->bindValue(':id',$_POST['id'],PDO::PARAM_INT);

if($statement->excute()){
	echo json_encode(['id'=>$_POST['id']]);
}else{
	new HttpStatusCode(400, 'Wrong event.');
}