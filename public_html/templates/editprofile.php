<!-- Modal -->
<div class="modal fade" id="form_edituserprofile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Your Profile</h5>
        <button type="button" name="euser_edismiss1" id="euser_edismiss1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="edit_profile_form" name="edit_profile_form" onsubmit="return false">              
          <div class="form-group mx-auto">        
              <label for="fullname">Full Name*</label>&nbsp;&nbsp;<i class="fas fa-info-circle" ><span class="infotext">Your First Name and Last Name should be minimum of 3 character</span></i>
              <div class="row">
                <div class="col-md-6">                      
                  <input type="text" class="form-control" name="efirstname" id="efirstname" placeholder="First Name" maxlength="20" data-validation="required" />
                          <script type="text/javascript">
                            document.getElementById("efirstname").addEventListener("input", forceLower);
                                function forceLower(evt) {
                                  var words = evt.target.value.toLowerCase().split(/\s+/g);
                                  var newWords = words.map(function(element){
                                    return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                                  });
                                 evt.target.value = newWords.join(" "); 
                                }
                          </script>
                  <span id="error_efirstname" class="text-danger" style="font-size: 12px;"></span>           
                </div>                
                <div class="col-md-6">  
                  <input type="text" class="form-control" name="elastname" id="elastname" placeholder="Last Name" maxlength="20" data-validation="required"/>
                          <script type="text/javascript">
                            document.getElementById("elastname").addEventListener("input", forceLower);
                                function forceLower(evt) {
                                  var words = evt.target.value.toLowerCase().split(/\s+/g);
                                  var newWords = words.map(function(element){
                                    return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                                  });
                                 evt.target.value = newWords.join(" "); 
                                }
                          </script>                                 
                  <span id="error_elastname" class="text-danger" style="font-size: 12px;"></span>
                </div>
              </div>                
            </div>  
            <div class="form-group mx-auto">
              <label for="username">User Id*</label>
              <input type="text" class="username form-control" id="eusername" name="eusername" placeholder="This will be your login User Id" maxlength="50" autocomplete="off"/>                    
              <span id="error_eusername" class="text-danger" style="font-size: 12px;"></span>              
            </div>
            <div class="form-group mx-auto">
              <label for="password1">New Password</label>
              <input type="password" class="password1 form-control" id="epassword1" name="epassword1" placeholder="Password">   
              <input type="checkbox" id="showHide"/>
              <label for="showHide" id="showHideLabel"><font class="form-text text-muted" size="2">Show Password</font></label><br/>
              <span id="error_epassword1" class="text-danger" style="font-size: 12px;"></span>           
            </div>
            <div class="form-group mx-auto">
              <label for="Password2">Re-Enter New Password</label>
              <input type="password" class="form-control" id="epassword2" name="epassword2" placeholder="Re-type your Password">
              <span id="error_epassword2" class="text-danger" style="font-size: 12px;" ></span>              
            </div>
            <div class="form-group mx-auto">
              <label for="uuserbranchs">Your Branch*</label> 
              <input type="text" class="form-control" name="euserbranch" id="euserbranch" placeholder="Your Branch Name" maxlength="20" data-validation="required"/>
                      <script type="text/javascript">
                        document.getElementById("euserbranch").addEventListener("input", forceLower);
                            function forceLower(evt) {
                              var words = evt.target.value.toLowerCase().split(/\s+/g);
                              var newWords = words.map(function(element){
                                return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                              });
                             evt.target.value = newWords.join(" "); 
                            }
                      </script>                                 
              <span id="error_euserbranch" class="text-danger" style="font-size: 12px;"></span>
            </div>                    
      </div>
        <div class="modal-footer">
          <button type="submit" value="submit" id="esubmituser" class="btn btn-primary dashboardbtn"><i class="fa fa-save" style="color:white;">&nbsp;</i><font style="color:white;">Update changes</font></button>         
          <button type="button" name="euser_edismiss2" id="euser_edismiss2" class="btn btn-secondary dashboardbtn" data-dismiss="modal"><i class="fa fa-times" style="color:white;">&nbsp;</i><font style="color:white;">Close</font></button>
        </div>
        <div class="card-footer text-muted">Please fill in all the compulsory(*) fields above
        </div>
      </form>      
    </div>
  </div>
</div>