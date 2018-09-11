$(document).ready(function(){
    var DOMAIN = "http://localhost/inv_projecthamro/public_html";
    
    manageDepartment(1);
    function manageDepartment(pn){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {manageDepartment:1,pageno:pn},
            success : function(data){
                $("#get_department").html(data);
                
            }
        })
    }
    
    $("body").delegate(".page-link","click",function(){
    	var pn = $(this).attr("pn");
    	manageDepartment(pn);
    })
    $("body").delegate(".delete_dep","click",function(){
    	var tid = $(this).attr("tid");
    	if (confirm("Do You Surely Want To Delete This Department?")) {
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                dataType : "json",
                data : {currentDepartment:1,id:tid},
                success : function(data){
                    console.log(data);                    
                    var currentdepartmentname = data["department_name"];
                    $.ajax({
                        url : DOMAIN+"/includes/process.php",
                        method : "POST",
                        data : { deleteDepartment: 1 ,id: tid },
                        success : function(data){
                            if ($.trim(data) == "DEPENDENTDEPARTMENT") {
                                alert("Sorry But This Department Is Root Of Another Department");
                                //window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=Sorry but this Department is Root of another Department");
                            }else if($.trim(data) == "DEPARTMENTDELETED"){
                                //alert("Department Deleted Successfully");
                                manageDepartment(1);
                                var beforepromsg = "The old <b>Department</b> ( ";                        
                                var afterpromsg = " ) was deleted successfully";
                                var promsg = beforepromsg+currentdepartmentname+afterpromsg;
                                $.ajax({
                                    url : DOMAIN+"/includes/processmessage.php",
                                    type: "post",
                                    data: { promsg: promsg },
                                    success: function(data){
                                        //alert(data);/*do some thing in second function*/
                                        $.ajax({
                                        url : DOMAIN+"/includes/messagesession.php",
                                        method : "GET",
                                        data : data,
                                            success: function(data){
                                                if ($.trim(data) === "Administrator"){
                                                    //alert("New Department added successfully");
                                                    window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=A Old Department Was Deleted Successfully");                                            
                                                }
                                            }
                                        });
                                    }
                                });                     
                            }else if($.trim(data) == "DELETED"){
                              //  alert("Department Deleted Successfully");
                                var beforepromsg = "A <b>Department</b> ( ";                        
                                var afterpromsg = " ) was deleted successfully";
                                var promsg = beforepromsg+currentdepartmentname+afterpromsg;
                                $.ajax({
                                    url : DOMAIN+"/includes/processmessage.php",
                                    type: "post",
                                    data: { promsg: promsg },
                                    success: function(data){
                                        //alert(data);/*do some thing in second function*/
                                        $.ajax({
                                        url : DOMAIN+"/includes/messagesession.php",
                                        method : "GET",
                                        data : data,
                                            success: function(data){
                                                if ($.trim(data) === "Administrator"){
                                                    //alert("New Department added successfully");
                                                    window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=A Department Was Deleted Successfully");                                            
                                                }
                                            }
                                        });
                                    }
                                });                        
                            }else{
                                alert(data);
                            }
                                
                        }
                    });                
                }
            });          
        }else{
            window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=Nothing Was Changed");
        }        
    });
    fetch_department();
    function fetch_department(){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {getDepartment:1},
            success : function(data){
                var rooted = "<option value='0'>Root</option>";
                $("#parent_dep").html(rooted+data);
            }
        });
    }
    $("body").delegate(".edit_dep","click",function(){
        var eid = $(this).attr("eid");
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            dataType : "json",
            data : {updateDepartment:1,id:eid},
            success : function(data){
                console.log(data);
                $("#did").val(data["did"]);
                $("#update_department").val(data["department_name"]);
                $("#parent_dep").val(data["parent_dep"]);
            }
        })
    })
    $("#update_department").focusout(function () {
        var suDepartment = $('#update_department').val();
        var suPardep = $('#parent_dep').val();
        if ($.trim(suDepartment).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdep').attr('disabled', true);
            $("#error_udepartment").text("Enter a Department Name");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $("#error_udepartment").text("");                            
            $('#submitdep').attr('disabled', false);               
        }
    });
    $("#parent_dep").focusout(function () {
        var suPardep = $('#parent_dep').val();
        if ($.trim(suPardep).length == 0){
                $("#parent_dep").css("border-color", "#cd2d00");
                $('#submitdep').attr('disabled', true);
                $("#error_uparentdep").text("Select a Parent Department");               
        } else {
            $("#error_uparentdep").text("");
            $("#parent_dep").css("border-color", "#2eb82e");                                    
            $('#submitdep').attr('disabled', false);                   
        }
    });
    function dismissDepartmentaction(){
       $("#update_department").css("border-color", "");  
        $("#update_department").val('');
        $("#error_udepartment").text("");        
        $("#parent_dep").css("border-color", "");  
        $("#parent_dep").val('');
        $("#error_uparentdep").text("");
        $('#submitdep').attr('disabled', false); 
    }
    $("#udepartment_dismiss2").click(function() {
        dismissDepartmentaction();
    });
    $("#udepartment_dismiss1").click(function() {
        dismissDepartmentaction();
    });
    $("#update_department_form").on("submit",function(){
        var suPardep = $('#parent_dep').val();
        if ($("#update_department").val() == '') {
            $("#update_department").css("border-color", "#cd2d00");
            $('#submitdep').attr('disabled', true);
            $("#error_udepartment").text("Enter a Department Name");
        } if ($.trim(suPardep).length == ""){
                $("#parent_dep").css("border-color", "#cd2d00");
                $('#submitdep').attr('disabled', true);
                $("#error_uparentdep").text("Select a Parent Department");               
            } else {
                $("#parent_dep").css("border-color", "#2eb82e");
                $('#submitdep').attr('disabled', false);
                $("#error_uparentdep").text("");
        } if (!($('#submitdep').is('disabled', true))){
            if (($("#update_department").val() !== '' && ($("#parent_dep").val() !== ""))) {
                $.ajax({
                    url : DOMAIN+"/includes/process.php",
                    method : "POST",
                    data : $("#update_department_form").serialize(),
                    success : function(data){
                        if ($.trim(data) === "UPDATED"){                        
                            $("#update_department").css("border-color", "");
                            $("#error_udepartment").text("");
                            fetch_department();
                            var beforepromsg = "A new <b>Department</b> ( ";
                            var middlepromsg = $("#update_department").val();                            
                            var afterpromsg = " ) updated successfully";
                            var promsg = beforepromsg+middlepromsg+afterpromsg;
                            $.ajax({
                                url : DOMAIN+"/includes/processmessage.php",
                                type: "post",
                                data: { promsg: promsg },
                                success: function(data){
                                    //alert(data);/*do some thing in second function*/
                                    $.ajax({
                                    url : DOMAIN+"/includes/messagesession.php",
                                    method : "GET",
                                    data : data,
                                        success: function(data){
                                            if ($.trim(data) === "Administrator"){
                                                //alert("New Department added successfully");
                                                window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=A Old Department Was Updated Successfully");
                                                $("#update_department").val('');
                                            }
                                        }
                                    });
                                }
                            });                            
                        } else {
                            $("#update_department").val('');
                            $("#update_department").css("border-color", "#cd2d00");
                            $('#submitdep').attr('disabled', true);                    
                            $("#error_udepartment").text(data);
                            alert(data);
                        }
                    }
                });
            }
        }
    });
});    