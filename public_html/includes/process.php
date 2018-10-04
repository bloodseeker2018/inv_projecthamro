<?php
include_once("../database/constants.php");
include_once("user.php");
include_once("DBOperation.php");
include_once("manage.php");
if (isset($_POST["username"]) AND isset($_POST["usertype"])) {
	$user = new User();
	$result = $user->createUserAccount($_POST["username"],$_POST["firstname"],$_POST["lastname"],$_POST["password1"],$_POST["usertype"],$_POST["userbranch"]);
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
		        	<td><?php
		        			if(($row["parent"])== ''){
		        				echo "Root";
		        		 	} else { 
		        	 			echo $row["parent"]; 
		        	 		}
		        	 	?>
		        	</td>
		        	<td>
		        		<a href="#" class="btn btn-success btn-sm">Active</a>
		        	</td>
		        	<td>

		        		<a href="#" tid="<?php echo $row['did']; ?>"  class="btn btn-danger btn-sm delete_dep ">Delete</a>
		        		<a href="#" eid="<?php echo  $row['did']; ?>" data-toggle="modal" data-target="#form_udepartment" class="btn btn-info btn-sm edit_dep ">Edit</a>
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
if (isset($_POST["updateDepartment"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("department","did",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["currentDepartment"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("department","did",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["currentBranch"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("branchs","bid",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["currentDevice"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("devices","pid",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["currentUser"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("user","id",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["getdepartmentname"])){
	$m = new Manage();
	$result = $m->getSingleRecord("department","did",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["update_department"])) {
	$m = new Manage();
	$id = $_POST["did"];
	$name = $_POST["update_department"];
	$parent = $_POST["parent_dep"];
	$result = $m->update_record("department",["did"=>$id],["parent_dep"=>$parent,"department_name"=>$name,"status"=>1]);
	echo $result;
}
if (isset($_POST["manageBranch"])){
	$m = new Manage();
	$result = $m->manageRecordwithpagination("branchs",$_POST["pageno"]);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if (count($rows) > 0) {
		$n = (($_POST["pageno"] - 1) * 5) + 1;
		foreach ($rows as $row){
			?>
				<tr>
		        	<td><?php echo $n; ?></td>
		        	<td><?php echo $row["branch_name"]; ?></td>
		        	<td>
		        		<a href="#" class="btn btn-success btn-sm">Active</a>
		        	</td>
		        	<td>

		        		<a href="#" tid="<?php echo $row['bid']; ?>"  class="btn btn-danger btn-sm delete_branch ">Delete</a>
		        		<a href="#" eid="<?php echo  $row['bid']; ?>" data-toggle="modal" data-target="#form_ubranch" class="btn btn-info btn-sm edit_branch">Edit</a>
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
if (isset($_POST["deleteBranch"])) {
	$m = new Manage();
	$result = $m->deleteRecord("branchs","bid",$_POST["id"]);
	echo $result;
	exit();
}
if (isset($_POST["updateBranch"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("branchs","bid",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["editProfile"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("user","id",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["update_branch"])) {
	$m = new Manage();
	$id = $_POST["bid"];
	$name = $_POST["update_branch"];
	$result = $m->update_record("branchs",["bid"=>$id],["branch_name"=>$name,"status"=>1]);
	echo $result;
}
if (isset($_POST["manageDevice"])){
	$m = new Manage();
	$result = $m->manageRecordwithpagination("devices",$_POST["pageno"]);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if (count($rows) > 0) {
		$n = (($_POST["pageno"] - 1) * 5) + 1;
		foreach ($rows as $row){
			?>
				<tr>
		        	<td><?php echo $n; ?></td>
		        	<td><?php echo $row["device_name"]; ?></td>
		        	<td><?php echo $row["device_brand"]; ?></td>
		        	<td><?php echo $row["device_model"]; ?></td>
		        	<td><?php echo $row["branch_name"]; ?></td>
		        	<td><?php echo $row["department_name"]; ?></td>
		        	<td><?php echo $row["added_date"]; ?></td>
		        	<td><?php echo $row["remarks"]; ?></td>
		  			<td>
		        		<a href="#" class="btn btn-success btn-sm">Active</a>
		        	</td>
		        	<td>

		        		<a href="#" tid="<?php echo $row['pid']; ?>"  class="btn btn-danger btn-sm delete_device ">Delete</a>
		        		<a href="#" eid="<?php echo  $row['pid']; ?>" data-toggle="modal" data-target="#form_udevice" class="btn btn-info btn-sm edit_device">Edit</a>
		        	</td>
		      	</tr>
			<?php
			$n++;
		}
		?>
			<tr><td colspan="10"><?php echo $pagination; ?></td></tr>
		<?php
		exit();
	}	
}
if (isset($_POST["deleteDevice"])) {
	$m = new Manage();
	$result = $m->deleteRecord("devices","pid",$_POST["id"]);
	echo $result;
	exit();
}
if (isset($_POST["updateDevice"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("devices","pid",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["update_device"])) {
	$m = new Manage();
	$id = $_SESSION["id"];
	$pid = $_POST["pid"];
	$name = $_POST["update_device"];
	$dep = $_POST["uselect_dep"];
	$branch = $_POST["uselect_branch"];
	$brand = $_POST["udevice_brand"];
	$model = $_POST["udevice_model"];
	$date = $_POST["udevice_installationdate"];
	$remarks = $_POST["uremarks"];
	$result = $m->update_record("devices",["pid"=>$pid],["id"=>$id, "did"=>$dep, "bid"=>$branch, "device_name"=>$name, "device_brand"=>$brand, "device_model"=>$model, "added_date"=>$date, "remarks"=>$remarks]);
	echo $result;
}
if (isset($_POST["manageUsers"])){
	$m = new Manage();
	$result = $m->manageRecordwithpagination("user",$_POST["pageno"]);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if (count($rows) > 0) {
		$n = (($_POST["pageno"] - 1) * 5) + 1;
		foreach ($rows as $row){
			?>
				<tr>
		        	<td><?php echo $n; ?></td>		        	
		        	<td><?php echo $row["username"]; ?></td>
		        	<td><?php echo $row["firstname"]; ?></td>
		        	<td><?php echo $row["lastname"]; ?></td>
		        	<td><?php echo $row["usertype"]; ?></td>
		        	<td><?php echo $row["remarks"]; ?></td>
		        	<td><?php echo $row["register_date"]; ?></td>
		        	<td><?php echo $row["last_login"]; ?></td>
		        	<td>
		        		<a href="#" tid="<?php echo $row['id']; ?>"  class="btn btn-danger btn-sm delete_user ">Delete</a>
		        		<a href="#" eid="<?php echo  $row['id']; ?>" data-toggle="modal" data-target="#form_uuser" class="btn btn-info btn-sm edit_user ">Edit</a>
		        	</td>
		      	</tr>
			<?php
			$n++;
		}
		?>
			<tr><td colspan="9"><?php echo $pagination; ?></td></tr>
		<?php
		exit();
	}	
}
if (isset($_POST["deleteUser"])) {
	$m = new Manage();
	$result = $m->deleteRecord("user","id",$_POST["id"]);
	echo $result;
	exit();
}
if (isset($_POST["updateUser"])) {
	$m = new Manage();
	$result = $m->getSingleRecord("user","id",$_POST["id"]);
	echo json_encode($result);
	exit();
}
if (isset($_POST["upassword1"]) AND isset($_POST["ufirstname"])){
	$m = new Manage();
	$id = $_POST["uuserid"];
	$fname = $_POST["ufirstname"];
	$lname = $_POST["ulastname"];
	$uname = $_POST["uusername"];
	$utype = $_POST["uusertype"];
	$upass = $_POST["upassword1"];
	$ubra = $_POST["uuserbranch"];
	if (!($id == $_SESSION["id"])){
		if (!(empty($upass))){
			$uhpass = password_hash($upass,PASSWORD_BCRYPT,["cost"=>8]);
			$result = $m->update_record("user",["id"=>$id],["firstname"=>$fname , "lastname"=>$lname, "username"=>$uname, "usertype"=>$utype, "password"=>$uhpass, "remarks"=>$ubra]);
		} else {
			$result = $m->update_record("user",["id"=>$id],["firstname"=>$fname , "lastname"=>$lname, "username"=>$uname, "usertype"=>$utype, "remarks"=>$ubra]);
		}
		echo $result;
	} else {
		$result = "Currenactiveuseraccount";
		echo $result;
	}
}
if (isset($_POST["epassword1"]) AND isset($_POST["efirstname"])){
	$m = new Manage();
	$id = $_SESSION["id"];
	$efname = $_POST["efirstname"];
	$elname = $_POST["elastname"];
	$euname = $_POST["eusername"];
	$eupass = $_POST["epassword1"];
	$eubra = $_POST["euserbranch"];
	if (!(empty($eupass))){
		$euhpass = password_hash($eupass,PASSWORD_BCRYPT,["cost"=>8]);
		$result = $m->update_record("user",["id"=>$id],["firstname"=>$efname , "lastname"=>$elname, "username"=>$euname, "password"=>$euhpass, "remarks"=>$eubra]);
	} else {
		$result = $m->update_record("user",["id"=>$id],["firstname"=>$efname , "lastname"=>$elname, "username"=>$euname, "remarks"=>$eubra]);
	}
	echo $result;
}
//$obj = new Manage();
//echo "<pre>";
//echo $obj->deleteRecord("department","did",17);
?>