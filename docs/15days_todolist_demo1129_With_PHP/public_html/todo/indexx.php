<?php
echo "sucessufel";
try{

	$pdo = new PDO("mysql:host=localhost;dbname=todolist_demo1208;port=8889;charset=utf8",'taker','root');
}catch(PDOExeption $e){
	echo "Database connection failed.";
	exit;
}