<?php
include('../db.php');

try {
	$pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",$db['username'],$db['password']);
} catch (PDOException $e) {
	echo "Database connection failed.";
	exit;
}

$year = date('Y');
$month = date('m');
// load events
$sql ='SELECT * FROM event WHERE year=:year AND month=:month ORDER BY `date`, start_time ASC';
$statement = $pdo->prepare($sql);
$statement->bindValue(':year',$year,PDO::PARAM_INT);
$statement->bindValue(':month',$month,PDO::PARAM_INT);

$events = $statement->fetchAll(PDO::FETCH_ASSOC);
// 10:00:00 > 10:00
foreach ($events as $key => $event) {
	 $events[$key]['start_time'] = substr($event['start_time'],0,5);
}
// 28 / 29 / 30 /31
$days = cal_days_in_month(CAL_GREGORIAN, $month, $year);

// calculate paddding
$firstDateOfTheMonth = new DateTime("$year-$month-1");
// 最後一天是星期幾
$lastDateOfTheMonth = new DateTime("$year-$month-$days");

$frontPadding = $firstDateOfThemonth->format('w');
$backtPadding = 6 - $lasttDateOfThemonth->format('w');

// 填最前面的padding
for ($i=0; $i <$frontPadding ; $i++) { 
	$date[] =null;
}
// 填中間的日期
for ($i=0;$i<$days;$i++){
	$dates[] = $i+1;
}

// 填最後的空格 
for ($i=0; $i <$backPadding ; $i++) { 
	$date[] =null;
}
<script>
	var events = <?= json_encode($events, JSON_NUMERIC_CHECK) ?>;
	// JSON_NUMERIC_CHECK : 遇到數字不要轉成字串
</script>