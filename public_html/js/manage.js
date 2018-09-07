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
                    }else if($.trim(data) == "DEPARTMENTDELETED"){
                        alert("Department Deleted Successfully");
                        manageDepartment(1);
                    }else if($.trim(data) == "DELETED"){
                        alert("Department Deleted Successfully");
                    }else{
                        alert(data);
                    }
                        
                }
            });
        }else{

        }        
    });
});    