<?php

$DEMO     = true;
$LAT      = 46.4138;
$LON      = 11.8398;

/* Please here modify account datas for mysql-database : */
$HOST     = array('127.0.0.3:3004','localhost'); 
$DBUSER   = 'db199062_345';
$PW       = 'xwb0MRGQGc12Yai0hpJFfu9kwj9i96Y';
$link = mysql_connect ($HOST[0],$DBUSER,$PW);  // try to connect to live server
if (!$link) {
	$link = mysql_connect ($HOST[1],$DBUSER,$PW); //try to connect to dev server
	if (!$link) {
    	die('Verbindung nicht möglich');
	}
}
mysql_selectdb($DBUSER);
header('Content-type: application/json');
/*
 INSERT INTO `db199062_345`.`positions` (`position_id`, `lat`, `lng`, `user_id`, `timestamp`) VALUES (NULL, '53.2', '9.9', '2', TIMESTAMP(NOW()));
*/
if ($DEMO) {
  $positions = array();
  for ($i=1;$i<111;$i++) {
  	$age = rand(40,50);
  	if ($age<52) array_push($positions,(object) array('age'=>$age,'ll'=> sprintf('%f,%f',$LAT + rand(-12777,12777)/77777 ,  $LON + rand(-1888,1888)/7777) ,'nr'=>$i));
  }	

} else {
	$positions = array();
	$query = 'select u.username,TIME_TO_SEC(TIMEDIFF(NOW(),p.timestamp))) AS age, CONCAT_WS(",",p.lat,p.lng) AS ll from users u, positions p where timestamp IN (SELECT max(timestamp) FROM positions p WHERE p.user_id = u.user_id ORDER BY p.user_id, p.timestamp)';
	$res = mysql_query($query);
	while ($row = mysql_fetch_object($res)) {
		array_push($positions,$row);
	}
}
mysql_close($link);
echo '{"simulation":true,"positions":' . json_encode($positions) .'}';
