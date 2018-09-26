<!-- Modal -->
<div class="modal fade" id="form_udevice" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Old Devices</h5>
        <button type="button" name="device_udismiss1" id="device_udismiss1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="update_device_form" name="update_device_form" onsubmit="return false">
          <div class="form-group">
            <input type="hidden" name="pid" id="pid" value=""/>
            <label for="devices_names">Device Name</label>
            <input type="Text" class="form-control" name="update_device" id="update_device" placeholder="Device Name">
            <span id="uerror_devicename" class="text-danger" style="font-size: 12px;"></span>
                <script type="text/javascript">
                  document.getElementById("update_device").addEventListener("input", forceLower);
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
            <input type="Text" class="form-control" name="udevice_brand" id="udevice_brand" placeholder="Device Brand Name">
            <span id="uerror_devicebrand" class="text-danger" style="font-size: 12px;"></span>
                <script type="text/javascript">
                  document.getElementById("udevice_brand").addEventListener("input", forceLower);
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
            <input type="varchar" class="form-control" name="udevice_model" id="udevice_model" placeholder="Device Model">
            <span id="uerror_devicemodel" class="text-danger" style="font-size: 12px;"></span>
              <script type="text/javascript">
                document.getElementById("udevice_model").addEventListener("input", forceLower);
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
            <select class="form-control" id="uselect_branch" name="uselect_branch">  
            </select>
            <span id="uerror_devicebranch" class="text-danger" style="font-size: 12px;"></span>
          </div>
          <div class="form-group">
            <label>Department</label>
            <select class="form-control" id="uselect_dep" name="uselect_dep">  
            </select>
            <span id="uerror_devicedepartment" class="text-danger" style="font-size: 12px;"></span>
          </div>          
          <div class="form-group">
            <label for="Device-installation-date">Date of Installation</label>
            <input type="date" class="form-control" name="udevice_installationdate" id="udevice_installationdate" placeholder="Device Installation date">
            <span id="uerror_devicedoi" class="text-danger" style="font-size: 12px;"></span>
          </div>
          <div class="form-group">
            <label for="Device-remarks">Remarks</label>
            <textarea type="Text" class="form-control" name="uremarks" id="uremarks" placeholder="Remarks"></textarea>
            <span id="uerror_deviceremarks" class="text-danger" style="font-size: 12px;"></span>
              <script type="text/javascript">
                document.getElementById("uremarks").addEventListener("input", forceLower);
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
          <button type="submit" value="submit" id="usubmitdev" class="btn btn-primary dashboardbtn"><i class="fa fa-save" style="color:white;">&nbsp;</i><font style="color:white;">Update changes</font></button>         
          <button type="button" name="device_udismiss2" id="device_udismiss2" class="btn btn-secondary dashboardbtn" data-dismiss="modal"><i class="fa fa-times" style="color:white;">&nbsp;</i><font style="color:white;">Close</font></button>
        </div>
      </form>
    </div>
  </div>
</div>