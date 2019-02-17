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

// validation
// title
if (empty($_POST['title'])){
	//error
	new HttpStatusCode(400, 'Title cannot be blank');
}
// time range
$startTime = explode(':',$_POST['start_time']);
$endTime = explode(':',$_POST['end_time']);
if($startTime[0]>$endTime[0] || ($startTime[0]==$endTime[0] && $startTime[1]>$endTime[1])){
	new HttpStatusCode(400, 'Time range error');
}



$sql ='UPDATE event SET title=:title, start_time=:start_time, end_time=:end_time, description:description WHERE id=:id';
$statement = $pdo->prepare($sql);
// $statement->bindValue(':目標',值,傳入格式);
$statement->bindValue(':title',$_POST['title'],PDO::PARAM_STR);
$statement->bindValue(':start_time',$_POST['start_time'],PDO::PARAM_STR);
$statement->bindValue(':end_time',$_POST['end_time'],PDO::PARAM_STR);
$statement->bindValue(':description',$_POST['description'],PDO::PARAM_STR);
$statement->bindValue(':id',$_POST['id'],PDO::PARAM_INT);

if($statement->excute()){

	$sql = 'SELECT id, title, start_time FROM event WHERE id=:id';
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':id',$_POST['id'],PDO::PARAM_INT);
	$statement->execute();
	$event = $statement->fetch(PDO::FETCH_ASSOC);

	// 10:10:00
	$event['start_time'] = substr($event['start_time'],0,5);

	echo json_encode($event);

}