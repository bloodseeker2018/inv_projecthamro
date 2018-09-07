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
		<script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
	    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
	    <link rel="stylesheet" type="text/css" href="./css/style.css">
	    <link rel="stylesheet" type="text/css" href="./includes/style.css">
	    <script type="text/javascript" src="./js/main.js"></script>
	    <script type="text/javascript" src="./js/validation.js"></script>
	    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">    
	</head>
<body>
<div class="overlay"><div class="loader"></div></div>
<?php //Navbar
include_once("./templates/header.php");
?>
<br/><br/>
<div class="container">
	<div class="card mx-auto shadow p-3 mb-5 bg-white rounded" style="width: 25rem;">
		<div class="card-header">Add Users</div>
		  	<div class="card-body">
		   		<form id="register_form" name="register_form"  onsubmit="return false" method="post">
				  	<div class="form-group mx-auto">				
				    	<label for="fullname">Full Name*</label>&nbsp;&nbsp;<i class="fas fa-info-circle" ><span class="infotext">Your First Name and Last Name should be minimum of 3 character</span></i>
				    	<div class="row">
				    		<div class="col-md-6">				    					
				    			<input type="text" class="form-control" name="firstname" id="firstname" placeholder="First Name" maxlength="20" data-validation="required" />
						              <script type="text/javascript">
						                document.getElementById("firstname").addEventListener("input", forceLower);
						                    function forceLower(evt) {
						                      var words = evt.target.value.toLowerCase().split(/\s+/g);
						                      var newWords = words.map(function(element){
						                        return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
						                      });
						                     evt.target.value = newWords.join(" "); 
						                    }
						              </script>
				    			<span id="error_firstname" class="text-danger" style="font-size: 12px;"></span>		    		
				    		</div>				    		
				    		<div class="col-md-6">	
				    			<input type="text" class="form-control" name="lastname" id="lastname" placeholder="Last Name" maxlength="20" data-validation="required"/>
						              <script type="text/javascript">
						                document.getElementById("lastname").addEventListener("input", forceLower);
						                    function forceLower(evt) {
						                      var words = evt.target.value.toLowerCase().split(/\s+/g);
						                      var newWords = words.map(function(element){
						                        return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
						                      });
						                     evt.target.value = newWords.join(" "); 
						                    }
						              </script>				    							    		
				    			<span id="error_lastname" class="text-danger" style="font-size: 12px;"></span>
				    		</div>
				    	</div>				    		
				  	</div>  
				  	<div class="form-group mx-auto">
				  		<label for="username">User Id*</label>
				  		<input type="text" class="username form-control" id="username" name="username" placeholder="This will be your login User Id" maxlength="50" autocomplete="off"/>		  				  		
				  		<span id="error_username" class="text-danger" style="font-size: 12px;"></span>				  		
				  	</div>
				  	<div class="form-group mx-auto">
				    	<label for="password1">Password*</label>
				    	<input type="password" class="password1 form-control" id="password1" name="password1" placeholder="Password"> 	
				    	<input type="checkbox" id="showHide"/>
						<label for="showHide" id="showHideLabel"><font class="form-text text-muted" size="2">Show Password</font></label><br/>
						<span id="error_password1" class="text-danger" style="font-size: 12px;"></span>						
				  	</div>
				  	<div class="form-group">
				    	<label for="Password2">Re-Enter Password*</label>
				    	<input type="password" class="form-control" id="password2" name="password2" placeholder="Re-type your Password">
				    	<span id="error_password2" class="text-danger" style="font-size: 12px;" ></span>				    	
				  	</div>
				  	<div class="form-group">
				    	<label for="usertype">User Type*</label>
				    	<select name="usertype" class="form-control" id="usertype">
				    		<option value="" selected="selected" hidden disabled="disabled">Select a User Type</option>				    		
				    		<option value="Administrator">Administrator</option>				    			
				    		<option value="Normal_User">Normal User</option>				    		
				    	</select>
				    	<span id="error_usertype" class="text-danger" style="font-size: 12px;"></span>
				  	</div>	
				  	<div class="form-group">
				 		<button type="submit" value="submit" id="submit" class="btn btn-primary"><i class="fa fa-plus">&nbsp;</i>Add</button>
				 	</div>

		<!--		    <button type="submit" value="submit" id="submit" class="btn btn-primary" style="background-color: #008000"><i class="fa fa-unlock">&nbsp;</i><span><a href="index.php" style="color: white; text-decoration: none; font-weight: 100; font-family: sans-serif;"> Login</span></button>  -->
				</form>
		    </div>	    
	<div class="card-footer text-muted">Please fill in all the compulsory(*) fields above
	</div>
	</div>
</div>
</body>
</html>