<?php
include_once("../database/constants.php");
include_once("user.php");
include_once("DBOperation.php");
include_once("manage.php");
if (isset($_POST["username"]) AND isset($_POST["usertype"])) {
	$user = new User();
	$result = $user->createUserAccount($_POST["username"],$_POST["firstname"],$_POST["lastname"],$_POST["password1"],$_POST["usertype"]);
	echo $result;
	exit();
}
if (isset($_POST["log_username"]) AND isset($_POST["log_password"])) {
	$user = new User();
	$result = $user->userLogin($_POST["log_username"],$_POST["log_password"]);
	echo $result;
	exit();
}
if (isset($_POST["getDepartment"])) {
	$obj = new DBOperation();
	$rows = $obj->getAllRecord("department");
	foreach ($rows as $row) {
		echo "<option value='".$row["did"]."'>".$row["department_name"]."</option>";
	}
	exit();
}
if (isset($_POST["getBranch"])) {
	$obj = new DBOperation();
	$rows = $obj->getAllRecord("branchs");
	foreach ($rows as $row) {
		echo "<option value='".$row["bid"]."'>".$row["branch_name"]."</option>";
	}
	exit();
}
if (isset($_POST["department_name"]) AND isset($_POST["parent_dep"])) {
	$obj = new DBOperation();
	$result = $obj->addDepartment($_POST["parent_dep"],$_POST["department_name"]);
	echo $result;
	exit();
}
if (isset($_POST["branch_name"])) {
	$obj = new DBOperation();
	$result = $obj->addBranch($_POST["branch_name"]);
	echo $result;
	exit();
}
if (isset($_POST["device_name"]) AND isset($_POST["device_brand"]) AND isset($_POST["device_installationdate"])) {
	$obj = new DBOperation();
//	$uid = $_SESSION["id"]
	$result = $obj->addDevices($_SESSION["id"],$_POST["select_dep"],$_POST["select_branch"],$_POST["device_name"],$_POST["device_brand"],$_POST["device_model"],$_POST["device_installationdate"],$_POST["remarks"]);
	echo $result;
	exit();
}
if (isset($_POST["manageDepartment"])){
	$m = new Manage();
	$result = $m->manageRecordwithpagination("department",$_POST["pageno"]);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if (count($rows) > 0) {
		$n = (($_POST["pageno"] - 1) * 5) + 1;
		foreach ($rows as $row){
			?>
				<tr>
		        	<td><?php echo $n; ?></td>
		        	<td><?php echo $row["departments"]; ?></td>
		        	<td><?php echo $row["parent"]; ?></td>
		        	<td>
		        		<a href="#" class="btn btn-success btn-sm">Active</a>
		        	</td>
		        	<td>

		        		<a href="#" tid="<?php echo $row['did']; ?>"  class="btn btn-danger btn-sm delete_dep ">Delete</a>
		        		<a href="#" eid="<?php echo  $row['did']; ?>" class="btn btn-info btn-sm edit_dep ">Edit</a>
		        	</td>
		      	</tr>
			<?php
			$n++;
		}
		?>
			<tr><td colspan="5"><?php echo $pagination; ?></td></tr>
		<?php
		exit();
	}	
}
if (isset($_POST["deleteDepartment"])) {
	$m = new Manage();
	$result = $m->deleteRecord("department","did",$_POST["id"]);
	echo $result;
	exit();
}
//$obj = new Manage();
//echo "<pre>";
//echo $obj->deleteRecord("department","did",17);
?>