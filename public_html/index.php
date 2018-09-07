<?php
include_once("./database/constants.php");
if (isset($_SESSION["id"]) AND isset($_SESSION["usertype"])){
	if (($_SESSION["usertype"]) === "Administrator"){
		header("location:".DOMAIN."/dashboard.php");
    }else if (($_SESSION["usertype"]) === "Normal_User"){
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
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79zv+lsFkW54bOGbiDQ" crossorigin="anonymous">
	</head>
	<body>
		<div class="overlay"><div class="loader"></div></div>
		<?php //Navbar
		include_once("./templates/homeheader.php");
		?>
	</br></br>
		<div class="container">
			<div class="card mx-auto shadow-lg p-3 mb-5 bg-white rounded " id="firstclass" style="width:20rem;">
			  	<br/>
			  	<img class="card-img-top mx-auto" style="width: 60%;" src="./images/adbl.png" id="LoginIcon">
			  	<div class="card-body">
			   			    <form id="login_form" onsubmit="return false">
					  			<div class="form-group">
					    			<label for="loginusername">User ID</label>
					    			 <div class="input-container">
					    			<input type="text" class="username form-control" name="log_username" id="log_username"  placeholder="Input your Username">	
					    			</div>
					    			<span id="errorlog_username" class="text-danger" style="font-size: 12px;"></span>
					    			<script type="text/javascript">
					                  document.getElementById("log_username").addEventListener("input", forceLower);
					                      function forceLower(evt) {
					                        var words = evt.target.value.toLowerCase().split(/\s+/g);
					                        var newWords = words.map(function(element){
					                          return element !== "" ?  element[0].toLowerCase() + element.substr(1, element.length) : "";
					                        }); 
					                       evt.target.value = newWords.join(" "); 
					                      }
					                </script>			    			
					    			<small id="textHelp" class="form-text text-muted"> We'll never share your User Id with anyone.</small>
					  			</div>		
					  			<div class="form-group">
					  				<label class="control-label" for="loginPassword"> Password </label>
					  				<input type="password" name="log_password" id="log_password" class="password form-control" placeholder="Password"> 	
					  				<input type="checkbox" id="showHide"> 
     						    	<label for="showHide" id="showHideLabel"><font class="form text text-muted"size="2" > Show Password </font></label><br/>
     						    	<span id="errorlog_password" class="text-danger" style="font-size: 12px;"></span>	
					    		</div>					    			
					    			<button type="submit" value="submit" class="btn btn-primary" id="submit"><i class="fa fa-unlock">&nbsp;</i>Login</button>
							</form>
			    </div>			   
			    <div class="card-footer"><a href="http://localhost/inv_projecthamro/public_html/register.php#">Register?</a></div>
			</div>			
		</div>
		</body>
</html>		