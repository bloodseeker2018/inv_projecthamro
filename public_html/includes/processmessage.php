<?php
include_once("../database/constants.php");
include_once("recentactions.php");
if (isset($_POST["promsg"])) {
	$user = new Users();
		$result = $user->createProcessmsg($_SESSION["id"],$_POST["promsg"],$_SESSION["userid_username"]);
		echo $result;
	exit();
}
if (isset($_POST["getPromsgdataa"])) {
	$obj = new Users();
	if (trim($_SESSION["usertype"]) === "Administrator"){
		$rows = $obj->getPromsgdataadmin();
	} else {
		$rows = $obj->getPromsgdataclient($_SESSION["id"]);
	}
	if (is_array($rows) || is_object($rows)){
		foreach ($rows as $row) {
			echo "<li>&nbsp;&nbsp;".$row["processmsgdata"]."</u> at : <b>".$row["editeddate"]."</b> by <b>".$row["userid_username"]."</b>";
		}
	}
	exit();
}
//$user = new User();
//echo $user->createProcessmsg("1","A branch is added successfully");
?>
