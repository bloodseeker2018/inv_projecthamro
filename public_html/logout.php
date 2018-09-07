<?php
include_once("./database/constants.php");
if (isset($_SESSION["id"])) {
	session_destroy();
}
header("location:".DOMAIN."/index.php");
?>