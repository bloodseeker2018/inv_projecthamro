<!-- Modal -->
<div class="modal fade" id="form_udepartment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit current Department</h5>
        <button type="button" name="udepartment_dismiss1" id="udepartment_dismiss1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>      
        <div class="modal-body">
          <form id="update_department_form" onsubmit="return false">        
            <div class="form-group">
              <label>Department Name</label>
              <input type="hidden" name="did" id="did" value=""/>
              <input type="text" class="form-control" name="update_department" id="update_department" placeholder="Input Your Department">
              <span id="error_udepartment" class="text-danger" style="font-size: 12px;"></span>
                <script type="text/javascript">
                  document.getElementById("update_department").addEventListener("input", forceLower);
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
              <label>Parent Department</label>
              <select class="form-control" id="parent_dep" name="parent_dep">

              </select>
              <span id="error_uparentdep" class="text-danger" style="font-size: 12px;"></span>              
            </div>               
        </div>
        <div class="modal-footer">
          <button type="submit" value="submit" id="submitdep" class="btn btn-primary dashboardbtn"><i class="fa fa-save" style="color:white;">&nbsp;</i><font style="color:white;">Update changes</font></button>         
          <button type="button" id="udepartment_dismiss2" name="udepartment_dismiss2" class="btn btn-secondary dashboardbtn" data-dismiss="modal"><i class="fa fa-times" style="color:white;">&nbsp;</i><font style="color:white;">Close</font></button>
        </div>
      </form>    
    </div>
  </div>
</div>
