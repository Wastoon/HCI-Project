#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$userID = $_POST['userID'];
$query = "SELECT groupID from users where id='$userID'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$groupID = $row[0];



$query = "SELECT * from goals where id='$groupID'";
$result = mysql_query($query);

$arr = array();
while($row = mysql_fetch_array($result)) {
    $arr[] = $row; 
}

echo(json_encode($arr));

mysql_close();?>
