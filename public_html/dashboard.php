<?php
include_once("./database/constants.php");
if (!isset($_SESSION["id"])){
        header("location:".DOMAIN."/index.php");                    
}else if (isset($_SESSION["id"]) AND isset($_SESSION["usertype"])){
	if (($_SESSION["usertype"]) === "Normal_User"){
		header("location:".DOMAIN."/client.php");
	}
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
		<title> Inventory Management System </title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
	    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="./css/style.css">
		<script type="text/javascript" src="./js/main.js"></script>
		<script type="text/javascript" src="./js/validation.js"></script>
		<link rel="stylesheet" type="text/css" href="./includes/style.css">
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">	    	    
	</head>
	<body>		
		<?php
		include_once("./templates/header.php");
		?>
		<br/><br/>
		<div class="container">
			<?php
				if (isset($_GET["msg"]) AND !empty($_GET["msg"])) {
					?>	<div class="alert alert-success alert-dismissible fade show"role="alert" id="smessage">							
							<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<strong><?php echo $_GET["msg"]; ?></strong>
						</div>
					<?php
				}
			?>
			<div class="row">
				<div class="col-md-4">
					<div class="card mx-auto, shadow p-3 mb-5 bg-white rounded">
						<br/>
					  <img class="card-img-top mx-auto" style="width: 60%;" src="./images/suer.png" alt="Card image cap">
					  <div class="card-body">
					  	<br/>
					  	<h4 class="card-title">Profile Info</h4>
					  	<br/>
					  	<p class="card-text"><i class="fa fa-id-badge">&nbsp;</i><?php echo $_SESSION["firstname"]?>&nbsp;<?php echo $_SESSION["lastname"]?></p>
					  	<p class="card-text"><i class="fa fa-building">&nbsp;</i><?php echo $_SESSION["remarks"] ?></p>
					  	<p class="card-text"><i class="fa fa-user-cog">&nbsp;</i><?php echo $_SESSION["usertype"] ?></p>
					  	<p class="card-text"><i class="fa fa-clock">&nbsp;</i>Last login : <?php echo $_SESSION["last_login"] ?> </p>
					  	<br/>
					    <a href="#" class="btn btn-primary dashboardbtn"><i class="fa fa-edit">&nbsp;</i>Edit Profile</a>
					  </div>
					</div>
				</div>
				<div class="col-md-8">
					<div class="jumbotron mx-auto" style="width:100%; height:62%;">
						<h4>Welcome Admin,</h4>
						<h6>Recent Actions:</h6>
						<div style="height:13rem; overflow-y: auto">						
							<ul style="list-style-type:decimal;">
								<span id="recentactionsmsg" name="recentactionsmsg" class="text" style="font-size: 14px;"></span>
							</ul>
						</div>						
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card mx-auto, shadow p-1 mb-5 bg-white rounded" style="width:100%; height:78%;">
								<div class="card-body">
									<h5 class="card-title">Users</h5>
										<p class="card-text">Here you can add or manage Office Users</p>
										<a href="register.php" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-plus">&nbsp;</i>Add</a>
										<a href="manage_users.php" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-edit">&nbsp;</i>Manage</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">			
			<div class="row">
				<div class="col-md-4">
						<div class="card mx-auto, shadow p-3 mb-5 bg-white rounded">
				      		<div class="card-body">
				        		<h5 class="card-title">Branch Offices</h5>
				        		<p class="card-text">Here you can add or manage Branch Office Services</p>
				        		<a href="#" data-toggle="modal" data-target="#form_branch" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-plus">&nbsp;</i>Add</a>
				        		<a href="manage_branch.php" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-edit">&nbsp;</i>Manage</a>
				      		</div>
						</div>
				</div>
				<div class="col-md-4">
						<div class="card mx-auto, shadow p-3 mb-5 bg-white rounded">
				      		<div class="card-body">
				        		<h5 class="card-title">Departments</h5>
				        		<p class="card-text">Here you can add or manage Office Department</p>
				        		<a href="#" data-toggle="modal" data-target="#form_department" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-plus">&nbsp;</i>Add</a>
				        		<a href="manage_department.php" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-edit">&nbsp;</i>Manage</a>
				      		</div>
						</div>
				</div>
				<div class="col-md-4">
						<div class="card mx-auto, shadow p-3 mb-5 bg-white rounded">
				      		<div class="card-body">
				        		<h5 class="card-title">Device</h5>
				        		<p class="card-text">Here you can add or manage all Office Devices</p>
				        		<a href="#" data-toggle="modal" data-target="#form_device" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-plus">&nbsp;</i>Add</a>
				        		<a href="manage_device.php" class="btn btn-primary mx-auto dashboardbtn"><i class="fa fa-edit">&nbsp;</i>Manage</a>
				      		</div>
						</div>					
				</div>				
			</div>
		</div>
							<?php //Branch
							include_once("./templates/branch.php");
							?>
							<?php //Department
							include_once("./templates/department.php");
							?>
							<?php //Device
							include_once("./templates/device.php");
							?>
	</body>
</html>	