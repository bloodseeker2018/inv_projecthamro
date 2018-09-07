<!-- Modal -->
<div class="modal fade" id="form_branch" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Branch</h5>
        <button type="button" name="branch_dismiss1" id="branch_dismiss1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="branch_form" onsubmit="return false">
          <div class="form-group">
            <label>Branch Name</label>
              <input type="text" class="form-control" name="branch_name" id="branch_name" placeholder="Input Your Branch">
              <span id="error_branch" class="text-danger" style="font-size: 12px;"></span>
                <script type="text/javascript">
                  document.getElementById("branch_name").addEventListener("input", forceLower);
                      function forceLower(evt) {
                        var words = evt.target.value.toLowerCase().split(/\s+/g);
                        var newWords = words.map(function(element){
                          return element !== "" ?  element[0].toUpperCase() + element.substr(1, element.length) : "";
                        }); 
                       evt.target.value = newWords.join(" "); 
                      }
                </script>
          </div>        
      </div>
        <div class="modal-footer">
          <button type="submit" value="submit" id="submitbra" class="btn btn-primary"><i class="fa fa-save" style="color:white;">&nbsp;</i><font style="color:white;">Save changes</font></button>         
          <button type="button" name="branch_dismiss2" id="branch_dismiss2" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times" style="color:white;">&nbsp;</i><font style="color:white;">Close</font></button>
        </div>
        </form>
    </div>
  </div>
</div>