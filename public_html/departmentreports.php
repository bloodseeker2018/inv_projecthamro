<?php	
	$con = mysqli_connect("localhost","root","","project_invhamro");
	$output = "";
	if(isset($_POST["export_excel"])){
		$sql = "SELECT * FROM department ORDER BY did ASC";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) > 0){
			$output .='
				<table class="table" bordered="1">
					<tr>
						<th>Department Id</th>
						<th>Department Name</th>
						<th>Parent Department Id</th>
						<th>Status</th>
					</tr>
			';
			while($row = mysqli_fetch_array($result)){
				$output .= '
					<tr>
						<td>'.$row["did"].'</td>
						<td>'.$row["department_name"].'</td>
						<td>'.$row["parent_dep"].'</td>
						<td>'.$row["status"].'</td>
					</tr>
				';
			}
			$output .= '</table>';
			header("Content-Type: application/xls");
			header("Content-Disposition:attachment; filename=Departments.xls");
			echo $output;
		} 

	}  
?>