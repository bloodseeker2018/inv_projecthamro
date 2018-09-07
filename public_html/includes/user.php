<?php
class User
{
	private $con;
	function __construct()
	{	
		include_once("../database/db.php");
		$db = new Database();
		$this->con = $db->connect();	
	}
	private function usernameExists($username){
		$pre_stmt = $this->con->prepare("SELECT id FROM user where username = ? ");
		$pre_stmt->bind_param("s",$username);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();		
		if ($result->num_rows > 0){
			return 1;		
		}else {
			return 0;
		}
	}
	public function createUserAccount($username,$firstname,$lastname,$password1,$usertype){
		if($this->usernameExists($username)){
			return "USEREXISTS";
		}else{
			$pass_hash = password_hash($password1,PASSWORD_BCRYPT,["cost"=>8]);
			$date = gmdate("Y/m/j");
			$timezone  = 5.75;
			date_default_timezone_set('Asia/Karachi');
			$sudate = gmdate("Y/m/j H:i:s", time() + 3600*($timezone+date("I")));
			$remarks ="";
			$pre_stmt = $this->con->prepare("INSERT INTO `user`(`username`,`firstname`, `lastname`, `password`, `usertype`, `register_date`, `last_login`, `remarks`) VALUES (?,?,?,?,?,?,?,?)");
			$pre_stmt->bind_param("ssssssss",$username,$firstname,$lastname,$pass_hash,$usertype,$sudate,$date,$remarks);
			$result = $pre_stmt->execute() or die($this->con->error);
			if ($result){				
				return  $this->con->insert_id;				
			}else{
				return "SOMEERROR";
			}
		}		
	}
	public function userLogin($username,$password1){
		$pre_stmt = $this->con->prepare("SELECT id,username,firstname,lastname,password,usertype,last_login FROM user WHERE username = ?");
		$pre_stmt->bind_param("s",$username);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if($result->num_rows < 1){
			return "NOTREGISTERED";
		}else{
			$row = $result->fetch_assoc();
			if (password_verify($password1,$row["password"])){
				$timezone  = 5.75;
				date_default_timezone_set('Asia/Karachi');
				$lldate = gmdate("Y/m/j H:i:s", time() + 3600*($timezone+date("I")));
				$last_login = $lldate;
				$_SESSION["id"] = $row["id"];
				$_SESSION["firstname"] = $row["firstname"];
				$_SESSION["lastname"] = $row["lastname"];
				$_SESSION["usertype"] = $row["usertype"];
				$_SESSION["last_login"] = $row["last_login"];
				$_SESSION["userid_username"] = $row["username"];
				$pre_stmt = $this->con->prepare("UPDATE user  SET last_login = ? WHERE username = ?");
				$pre_stmt->bind_param("ss",$last_login,$username);
				$result = $pre_stmt->execute() or die($this->con->error);
				if ($row["usertype"] == "Administrator"){
					return "ADMINISTRATOR";
				}else{
					return "NORMALUSER";
				}
			}else{
				return "PASSWORDNOTMATCHED";
			}
		}
	}
}
//$user = new User();
//echo $user->createUserAccount("anzil.subedi","Anzil","Subedi","Amtgbis123!","Administrator");
//echo $user->userLogin("anzil.subedii","Amtgbis.123!");
//echo " asdasdasda ";
//echo $_SESSION["id"];
//echo $_SESSION["last_login"];
//echo $_SESSION["usertype"];
//echo $_SESSION["firstname"];
//echo $_SESSION["lastname"];
?>