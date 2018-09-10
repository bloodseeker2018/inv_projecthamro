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
		<script type="text/javascript" src="./js/manage.js"></script>
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
			<table class="table table-hover table-bordered">
			    <thead>
			    	<tr>
			        	<th>S.No.</th>
			        	<th>Department</th>
			        	<th>Parent</th>
			        	<th>Status</th>
			      		<th>Action</th>
			      	</tr>
			    </thead>
			    <tbody id="get_department">
			      <!--	<tr>
			        	<td>1</td>
			        	<td>It Department</td>
			        	<td>Root</td>
			        	<td>
			        		<a href="#" class="btn btn-success btn-sm">Active</a>
			        	</td>
			        	<td>
			        		<a href="#" class="btn btn-danger btn-sm">Delete</a>
			        		<a href="#" class="btn btn-info btn-sm">Edit</a>
			        	</td>
			      	</tr>	-->			      
			    </tbody>
			</table>			
		</div>
		<?php include_once("./templates/updatedepartment.php"); ?>		
	</body>
</html>	