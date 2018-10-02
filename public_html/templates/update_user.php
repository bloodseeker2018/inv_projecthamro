<!-- Modal -->
<div class="modal fade" id="form_uuser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Users</h5>
        <button type="button" name="uuser_udismiss1" id="uuser_udismiss1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="update_user_form" name="update_user_form" onsubmit="return false">        
            <input type="text" class="username form-control" id="uuserid" name="uuserid" readonly="readonly" hidden="hidden"/>              
          <div class="form-group mx-auto">        
              <label for="fullname">Full Name*</label>&nbsp;&nbsp;<i class="fas fa-info-circle" ><span class="infotext">Your First Name and Last Name should be minimum of 3 character</span></i>
              <div class="row">
                <div class="col-md-6">                      
                  <input type="text" class="form-control" name="ufirstname" id="ufirstname" placeholder="First Name" maxlength="20" data-validation="required" />
                          <script type="text/javascript">
                            document.getElementById("ufirstname").addEventListener("input", forceLower);
                                function forceLower(evt) {
                                  var words = evt.target.value.toLowerCase().split(/\s+/g);
                                  var newWords = words.map(function(element){
                                    return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                                  });
                                 evt.target.value = newWords.join(" "); 
                                }
                          </script>
                  <span id="error_ufirstname" class="text-danger" style="font-size: 12px;"></span>           
                </div>                
                <div class="col-md-6">  
                  <input type="text" class="form-control" name="ulastname" id="ulastname" placeholder="Last Name" maxlength="20" data-validation="required"/>
                          <script type="text/javascript">
                            document.getElementById("ulastname").addEventListener("input", forceLower);
                                function forceLower(evt) {
                                  var words = evt.target.value.toLowerCase().split(/\s+/g);
                                  var newWords = words.map(function(element){
                                    return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                                  });
                                 evt.target.value = newWords.join(" "); 
                                }
                          </script>                                 
                  <span id="error_ulastname" class="text-danger" style="font-size: 12px;"></span>
                </div>
              </div>                
            </div>  
            <div class="form-group mx-auto">
              <label for="username">User Id*</label>
              <input type="text" class="username form-control" id="uusername" name="uusername" placeholder="This will be your login User Id" maxlength="50" autocomplete="off"/>                    
              <span id="error_uusername" class="text-danger" style="font-size: 12px;"></span>              
            </div>
            <div class="form-group mx-auto">
              <label for="password1">New Password</label>
              <input type="password" class="password1 form-control" id="upassword1" name="upassword1" placeholder="Password">   
              <input type="checkbox" id="showHide"/>
              <label for="showHide" id="showHideLabel"><font class="form-text text-muted" size="2">Show Password</font></label><br/>
              <span id="error_upassword1" class="text-danger" style="font-size: 12px;"></span>           
            </div>
            <div class="form-group mx-auto">
              <label for="Password2">Re-Enter New Password</label>
              <input type="password" class="form-control" id="upassword2" name="upassword2" placeholder="Re-type your Password">
              <span id="error_upassword2" class="text-danger" style="font-size: 12px;" ></span>              
            </div>
            <div class="form-group mx-auto">
              <label for="usertype">User Type*</label>
              <select name="uusertype" class="form-control" id="uusertype">
                <option value="" selected="selected" hidden disabled="disabled">Select a User Type</option>               
                <option value="Administrator">Administrator</option>                  
                <option value="Normal_User">Normal User</option>                
              </select>
              <span id="error_uusertype" class="text-danger" style="font-size: 12px;"></span>
            </div>
            <div class="form-group mx-auto">
              <label for="uuserbranchs">Your Branch*</label> 
              <input type="text" class="form-control" name="uuserbranch" id="uuserbranch" placeholder="Your Branch Name" maxlength="20" data-validation="required"/>
                      <script type="text/javascript">
                        document.getElementById("uuserbranch").addEventListener("input", forceLower);
                            function forceLower(evt) {
                              var words = evt.target.value.toLowerCase().split(/\s+/g);
                              var newWords = words.map(function(element){
                                return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                              });
                             evt.target.value = newWords.join(" "); 
                            }
                      </script>                                 
              <span id="error_uuserbranch" class="text-danger" style="font-size: 12px;"></span>
            </div>                    
      </div>
        <div class="modal-footer">
          <button type="submit" value="submit" id="usubmituser" class="btn btn-primary dashboardbtn"><i class="fa fa-save" style="color:white;">&nbsp;</i><font style="color:white;">Update changes</font></button>         
          <button type="button" name="uuser_udismiss2" id="uuser_udismiss2" class="btn btn-secondary dashboardbtn" data-dismiss="modal"><i class="fa fa-times" style="color:white;">&nbsp;</i><font style="color:white;">Close</font></button>
        </div>
        <div class="card-footer text-muted">Please fill in all the compulsory(*) fields above
        </div>
      </form>      
    </div>
  </div>
</div>