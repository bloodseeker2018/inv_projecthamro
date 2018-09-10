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
                //alert(data);
            }
        })
    }
    
    $("body").delegate(".page-link","click",function(){
    	var pn = $(this).attr("pn");
    	manageDepartment(pn);
    })
    $("body").delegate(".delete_dep","click",function(){
    	var tid = $(this).attr("tid");
    	if (confirm("Do you surely want to delete this Department?")) {
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                data : { deleteDepartment: 1 ,id: tid },
                success : function(data){
                    if ($.trim(data) == "DEPENDENTDEPARTMENT") {
                        alert("Sorry but this Department is Root of another Department");
                        //window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=Sorry but this Department is Root of another Department");
                    }else if($.trim(data) == "DEPARTMENTDELETED"){
                        //alert("Department Deleted Successfully");
                        manageDepartment(1);
                        window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=A Department Deleted Successfully");
                    }else if($.trim(data) == "DELETED"){
                      //  alert("Department Deleted Successfully");
                        window.location.href = encodeURI(DOMAIN+"/manage_department.php?msg=Deleted Successfully");
                    }else{
                        alert(data);
                    }
                        
                }
            });
        }else{

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
                $("#department_name").val(data["department_name"]);
                $("#parent_dep").val(data["parent_dep"]);
            }
        })
    })
});    