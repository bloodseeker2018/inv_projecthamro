<?php
/**
 * 
 */
class DBOperation
{
	private $con;
	function __construct()
	{
		include_once("../database/db.php");
		$db = new Database();
		$this->con = $db->connect();
	}
	public function addDepartment($parent,$dep){
		$pre_stmt = $this->con->prepare("INSERT INTO `department`(`parent_dep`, `department_name`, `status`) VALUES (?,?,?)");
		$status = 1;
		$pre_stmt->bind_param("isi",$parent,$dep,$status);
		$result = $pre_stmt->execute() or die($this->con->error);
		if ($result){
			return "DEPARTMENTADDED";
		} else{
			return 0;
		}
	}
	public function addBranch($branch_name){
		$pre_stmt = $this->con->prepare("INSERT INTO `branchs`(`branch_name`, `status`) VALUES (?,?)");
		$status = 1;
		$pre_stmt->bind_param("si",$branch_name,$status);
		$result = $pre_stmt->execute() or die($this->con->error);
		if ($result){
			return "BRANCHADDED";
		} else{
			return 0;
		}
	}
	public function addDevices($id,$did,$bid,$device_name,$device_brand,$device_model,$added_date,$remarks){
		$pre_stmt = $this->con->prepare("INSERT INTO `devices`(`id`, `did`, `bid`, `device_name`, `device_brand`, `device_model`, `added_date`, `remarks`, `d_status`) VALUES (?,?,?,?,?,?,?,?,?)");
		$status = 1;
		$pre_stmt->bind_param("iiisssssi",$id,$did,$bid,$device_name,$device_brand,$device_model,$added_date,$remarks,$status);
		$result = $pre_stmt->execute() or die($this->con->error);
		if ($result){
			return "DEVICEADDED";
		} else{
			return 0;
		}
	}
	public function getAllRecord($table){
		$pre_stmt = $this->con->prepare("SELECT * FROM ".$table);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
		return "NODATA";
	}
}
//$opr = new DBOperation();
//echo $opr->addDepartment(0,"Human Resource");
//echo "<pre>";
//print_r($opr->getAllRecord("department"));
?>