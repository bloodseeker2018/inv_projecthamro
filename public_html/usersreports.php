<?php	
	$con = mysqli_connect("localhost","root","","project_invhamro");
	$output = "";
	if(isset($_POST["export_excel"])){
		$sql = "SELECT * FROM user ORDER BY id ASC";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) > 0){
			$output .='
				<table class="table" bordered="1">
					<tr>
						<th>User No</th>
						<th>User Id</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>User Type</th>
						<th>Branch</th>
						<th>Registered Date</th>
						<th>Last Login</th>
					</tr>
			';
			while($row = mysqli_fetch_array($result)){
				$output .= '
					<tr>
						<td>'.$row["id"].'</td>
						<td>'.$row["username"].'</td>
						<td>'.$row["firstname"].'</td>
						<td>'.$row["lastname"].'</td>
						<td>'.$row["usertype"].'</td>
						<td>'.$row["remarks"].'</td>
						<td>'.$row["register_date"].'</td>
						<td>'.$row["last_login"].'</td>
					</tr>
				';
			}
			$output .= '</table>';
			header("Content-Type: application/xls");
			header("Content-Disposition:attachment; filename=Users.xls");
			echo $output;
		} 

	}  
?>s