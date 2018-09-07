<?php
class Users
{
	private $con;
	function __construct()
	{	
		include_once("../database/db.php");
		$db = new Database();
		$this->con = $db->connect();	
	}
	public function createProcessmsg($id,$processmsgdata,$userid_username){
		$timezone  = 5.75;
		date_default_timezone_set('Asia/Karachi');
		$date = gmdate("Y/m/j H:i:s", time() + 3600*($timezone+date("I"))); 
		#$date = date("Y-m-d h:m:s");		
		$pre_stmt = $this->con->prepare("INSERT INTO `promessage`(`id`,`processmsgdata`, `userid_username`,`editeddate`) VALUES (?,?,?,?)");
		$pre_stmt->bind_param("isss",$id,$processmsgdata,$userid_username,$date);
		$result = $pre_stmt->execute() or die($this->con->error);
		if ($result){				
			return  "recentmessageadded";				
		}else{
			return "SOMEERROR";
		}				
	}
	public function getPromsgdataadmin(){
		$pre_stmt = $this->con->prepare("SELECT * FROM promessage");
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if($result->num_rows > 0){	
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
		return "NODATAFOUND";
	}
	public function getPromsgdataclient($id){
		$pre_stmt = $this->con->prepare("SELECT * FROM promessage WHERE id = ?");
		$pre_stmt->bind_param("i",$_SESSION["id"]);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if($result->num_rows > 0){	
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
		return "NODATAFOUND";
	}
}
?>