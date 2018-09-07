<!-- Modal -->
<div class="modal fade" id="form_device" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Devices</h5>
        <button type="button" name="device_dismiss1" id="device_dismiss1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="device_form" name="device_form" onsubmit="return false">
          <div class="form-group">
            <label for="devices_names">Device Name</label>
            <input type="Text" class="form-control" name="device_name" id="device_name" placeholder="Device Name">
            <span id="error_devicename" class="text-danger" style="font-size: 12px;"></span>
                <script type="text/javascript">
                  document.getElementById("device_name").addEventListener("input", forceLower);
                      function forceLower(evt) {
                        var words = evt.target.value.toLowerCase().split(/\s+/g);
                        var newWords = words.map(function(element){
                          return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                        }); 
                       evt.target.value = newWords.join(" "); 
                      }
                </script>
          </div>
          <div class="form-group">
          <label for="devices_brands">Device Brand</label>
            <input type="Text" class="form-control" name="device_brand" id="device_brand" placeholder="Device Brand Name">
            <span id="error_devicebrand" class="text-danger" style="font-size: 12px;"></span>
                <script type="text/javascript">
                  document.getElementById("device_brand").addEventListener("input", forceLower);
                      function forceLower(evt) {
                        var words = evt.target.value.toLowerCase().split(/\s+/g);
                        var newWords = words.map(function(element){
                          return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                        }); 
                       evt.target.value = newWords.join(" "); 
                      }
                </script>
          </div>
          <div class="form-group">            
            <label for="device-model">Model No.</label>
            <input type="varchar" class="form-control" name="device_model" id="device_model" placeholder="Device Model">
            <span id="error_devicemodel" class="text-danger" style="font-size: 12px;"></span>
              <script type="text/javascript">
                document.getElementById("device_model").addEventListener("input", forceLower);
                    function forceLower(evt) {
                      var words = evt.target.value.toUpperCase().split(/\s+/g);
                      var newWords = words.map(function(element){
                        return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                      }); 
                     evt.target.value = newWords.join(" "); 
                    }
              </script>
          </div>
          <div class="form-group">
            <label>Branch</label>
            <select class="form-control" id="select_branch" name="select_branch">  
            </select>
            <span id="error_devicebranch" class="text-danger" style="font-size: 12px;"></span>
          </div>
          <div class="form-group">
            <label>Department</label>
            <select class="form-control" id="select_dep" name="select_dep">  
            </select>
            <span id="error_devicedepartment" class="text-danger" style="font-size: 12px;"></span>
          </div>          
          <div class="form-group">
            <label for="Device-installation-date">Date of Installation</label>
            <input type="date" class="form-control" name="device_installationdate" id="device_installationdate" placeholder="Device Installation date">
            <span id="error_devicedoi" class="text-danger" style="font-size: 12px;"></span>
          </div>
          <div class="form-group">
            <label for="Device-remarks">Remarks</label>
            <textarea type="Text" class="form-control" name="remarks" id="remarks" placeholder="Remarks"></textarea>
            <span id="error_deviceremarks" class="text-danger" style="font-size: 12px;"></span>
              <script type="text/javascript">
                document.getElementById("remarks").addEventListener("input", forceLower);
                    function forceLower(evt) {
                      var words = evt.target.value.toLowerCase().split(/\s+/g);
                      var newWords = words.map(function(element){
                        return element !== "" ?  element[0].toLowerCase() + element.substr(1, element.length) : "";
                      }); 
                     evt.target.value = newWords.join(" "); 
                    }
              </script>
          </div>
      </div>
        <div class="modal-footer">
          <button type="submit" value="submit" id="submitdev" class="btn btn-primary"><i class="fa fa-save" style="color:white;">&nbsp;</i><font style="color:white;">Save changes</font></button>         
          <button type="button" name="device_dismiss2" id="device_dismiss2" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times" style="color:white;">&nbsp;</i><font style="color:white;">Close</font></button>
        </div>
      </form>
    </div>
  </div>
</div>