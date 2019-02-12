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
$sql = 'insert into todos (content,is_complete,`order`)
		values (:content,:is_complete,:order)';
// prepare for security reason
$statement = $pdo->prepare($sql);
// bindvalue 
$statement->bindValue(':content',$_POST['content'],PDO::PARAM_STR);
$statement->bindValue(':is_complete',0,PDO::PARAM_INT);
$statement->bindValue(':order',$_POST['order'],PDO::PARAM_INT);
// execute
$result = $statement->execute();

if ($result){
	echo json_encode(['id'=>$pdo->lastInsertId()]); //回傳最後插入一筆的id
}






