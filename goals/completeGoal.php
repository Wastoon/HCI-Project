#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$goalID = $_POST['goalID'];
$query = "UPDATE goals SET completed=1 where goalID='$goalID'";
$result = mysql_query($query);


mysql_close();?>
