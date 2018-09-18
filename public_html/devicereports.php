<?php	
	$con = mysqli_connect("localhost","root","","project_invhamro");
	$output = "";
	if(isset($_POST["export_excel"])){
		$sql = "SELECT * FROM devices ORDER BY pid ASC";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) > 0){
			$output .='
				<table class="table" bordered="1">
					<tr>
						<th>Device Id</th>
						<th>Device Name</th>
						<th>Device Brand Name</th>
						<th>Device Model No.</th>
						<th>Branch Id</th>
						<th>Department Id</th>
						<th>Date Of Installation</th>
						<th>Remarks</th>
						<th>Status</th>
					</tr>
			';
			while($row = mysqli_fetch_array($result)){
				$output .= '
					<tr>
						<td>'.$row["pid"].'</td>
						<td>'.$row["device_name"].'</td>
						<td>'.$row["device_brand"].'</td>
						<td>'.$row["device_model"].'</td>
						<td>'.$row["bid"].'</td>
						<td>'.$row["did"].'</td>
						<td>'.$row["added_date"].'</td>
						<td>'.$row["remarks"].'</td>
						<td>'.$row["d_status"].'</td>
					</tr>
				';
			}
			$output .= '</table>';
			header("Content-Type: application/xls");
			header("Content-Disposition:attachment; filename=Devices.xls");
			echo $output;
		} 

	}  
?>