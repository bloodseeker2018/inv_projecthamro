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
	<body class="managefield">		
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
			<br/>
			<form id="searchdevice_form" onsubmit="return false">
				<div class="input-group mb-2">
				  <input type="text" id="searchdevice" name="searchdevice" class="form-control" placeholder="Device Name To Search">
				    <script type="text/javascript">
	                    document.getElementById("searchdevice").addEventListener("input", forceLower);
			            function forceLower(evt) {
			                var words = evt.target.value.toLowerCase().split(/\s+/g);
			                var newWords = words.map(function(element){
			                  return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
			                });
			                evt.target.value = newWords.join(" "); 
			            }
	                </script>
				  <div class="input-group-append">
				    <button class="btn btn-primary dashboardbtn" type="submit" value="submit" id="submitdevsearch"><i class="fa fa-search">&nbsp;</i>Search</button>
				  </div>				  			  
				</div>
				<span id="error_searchdevice" class="text-danger" style="font-size: 12px;"></span>
			</form>
			<div id="checksearch" class="btn-group btn-group-toggle" data-toggle="buttons">
			  <label class="btn btn-secondary dashboardbtn active">
			    <input type="radio" name="options" autocomplete="off" value="device" checked>Device
			  </label>
			  <label class="btn btn-secondary dashboardbtn">
			    <input type="radio" name="options" autocomplete="off" value="brand" >Brand
			  </label>
			  <label class="btn btn-secondary dashboardbtn">
			    <input type="radio" name="options" autocomplete="off" value="model" >Model
			  </label>
			  <label class="btn btn-secondary dashboardbtn">
			    <input type="radio" name="options" autocomplete="off" value="branch" >Branch
			  </label>
			</div>
			</br>
			</br>			
			<table class="table table-hover table-bordered">
			    <thead>
			    	<tr>
			        	<th>S.No.</th>
			        	<th>Device</th>
			        	<th>Brand</th>
			        	<th>Model No.</th>
			        	<th>Branch</th>
			      		<th>Department</th>
			      		<th>Added Date</th>
			      		<th>Remarks</th>
			      		<th>Status</th>
			      		<th>Action</th>
			      	</tr>
			    </thead>
			    <tbody id="get_device">			      			      
			    </tbody>
			</table>
			<form action="devicereports.php" method="post">			
				<button type="submit" value="Export to Excel" id="export_excel" name="export_excel" class="btn btn-primary dashboardbtn"><i class="fa fa-file-export">&nbsp;</i>Export to Excel</button>
			</form>			
		</div>
		<?php include_once("./templates/update_device.php"); ?>		
	</body>
</html>	