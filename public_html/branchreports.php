<?php	
	$con = mysqli_connect("localhost","root","","project_invhamro");
	$output = "";
	if(isset($_POST["export_excel"])){
		$sql = "SELECT * FROM branchs ORDER BY bid ASC";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) > 0){
			$output .='
				<table class="table" bordered="1">
					<tr>
						<th>Branch Id</th>
						<th>Branch Name</th>
						<th>Status<th>
					</tr>
			';
			while($row = mysqli_fetch_array($result)){
				$output .= '
					<tr>
						<td>'.$row["bid"].'</td>
						<td>'.$row["branch_name"].'</td>
						<td>'.$row["status"].'</td>
					</tr>
				';
			}
			$output .= '</table>';
			header("Content-Type: application/xls");
			header("Content-Disposition:attachment; filename=Branchs.xls");
			echo $output;
		} 

	}  
?>