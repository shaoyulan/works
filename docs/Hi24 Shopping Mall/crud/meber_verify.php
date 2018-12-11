<?php 
//CHANGE CONTENT TYPE otherwise the "echo json_encode" will return plain text
header('Content-Type: application/json;charset=utf8'); 

include('../DB.php');


// DB object
try{
	$pdo = new PDO('mysql:host=localhost;dbname=hi24;port=8889;charset=utf8','root','root');
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

// command SQL 
$sql ='SELECT password FROM `member` where name=:name';
$statement = $pdo->prepare($sql);
$statement->bindValue(':name',$_POST['username']);
$statement->execute();
$password = $statement->fetchAll(PDO::FETCH_ASSOC); 
$password = $password[0]['password'];

$verify_result = '';
if ($password == ""){
	$verify = '錯誤的帳號或密碼';
}elseif ($password == $_POST['password']) {
	$verify = $_POST['username'];
}


echo json_encode(['verify' => $verify]);

?>
