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
                var choose = "<option value='' selected hidden disabled>Select a Branch</option>";
                var rooted = "<option value='0'>Root</option>";
                var rootes = "<option value='' selected hidden disabled>Select a Parent Department</option>";
                $("#parent_dep").html(rootes+rooted+data);
                $("#uselect_dep").html(choose+data);
            }
        });
    }
    fetch_branch();
    function fetch_branch(){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {getBranch:1},
            success : function(data){
                var choose = "<option value='' selected hidden disabled>Select a Branch</option>";
                $("#uselect_branch").html(choose+data);
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
                            $("#error_udepartment").text("Invalid Department Name");                            
                        }
                    }
                });
            }
        }
    });

    manageBranch(1);
    function manageBranch(pn){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {manageBranch:1,pageno:pn},
            success : function(data){
                $("#get_branch").html(data);
                
            }
        })
    }
    $("body").delegate(".page-link","click",function(){
        var pn = $(this).attr("pn");
        manageBranch(pn);
    })
    $("body").delegate(".delete_branch","click",function(){
        var tid = $(this).attr("tid");
        //alert(tid);
        if (confirm("Do You Surely Want To Delete This Branch?")) {
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                dataType : "json",
                data : {currentBranch:1,id:tid},
                success : function(data){
                    console.log(data);                    
                    var currentbranchname = data["branch_name"];
                    $.ajax({
                        url : DOMAIN+"/includes/process.php",
                        method : "POST",
                        data : { deleteBranch: 1 ,id: tid },
                        success : function(data){
                            if($.trim(data) == "DELETED"){
                                manageBranch(1);
                              //  alert("Department Deleted Successfully");
                                var beforepromsg = "A old <b>Branch</b> ( ";                        
                                var afterpromsg = " ) was deleted successfully";
                                var promsg = beforepromsg+currentbranchname+afterpromsg;
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
                                                    window.location.href = encodeURI(DOMAIN+"/manage_branch.php?msg=A Branch Was Deleted Successfully");                                            
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
            window.location.href = encodeURI(DOMAIN+"/manage_branch.php?msg=Nothing Was Changed");
        }        
    });
    $("body").delegate(".edit_branch","click",function(){
        var eid = $(this).attr("eid");
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            dataType : "json",
            data : {updateBranch:1,id:eid},
            success : function(data){
                console.log(data);
                $("#bid").val(data["bid"]);
                $("#update_branch").val(data["branch_name"]);                
            }
        })
    })
    $("#update_branch").focusout(function () {
        var sBranchs = $('#update_branch').val();
        if ($.trim(sBranchs).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitbranch').attr('disabled', true);
            $("#error_ubranch").text("Enter a Branch Name");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitbranch').attr('disabled', false);
            $("#error_ubranch").text("");
        }
    });
    function dismissBranchaction(){
       $("#update_branch").css("border-color", "");  
        $("#update_branch").val('');
        $("#error_ubranch").text("");
        $('#submitbranch').attr('disabled', false); 
    }
    $("#ubranch_dismiss2").click(function() {
        dismissBranchaction();
    });
    $("#ubranch_dismiss1").click(function() {
        dismissBranchaction();
    });
    $("#update_branch_form").on("submit",function(){
        if ($("#update_branch").val() == '') {
            $("#update_branch").css("border-color", "#cd2d00");
            $('#submitbranch').attr('disabled', true);
            $("#error_ubranch").text("Enter a Branch Name");
        } else {
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                data : $("#update_branch_form").serialize(),
                success : function(data){
                    if ($.trim(data) === "UPDATED"){                        
                        $("#update_branch").css("border-color", "");
                        $("#error_udepartment").text("");
                        fetch_department();
                        var beforepromsg = "A new <b>Branch</b> ( ";
                        var middlepromsg = $("#update_branch").val();                            
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
                                            window.location.href = encodeURI(DOMAIN+"/manage_branch.php?msg=A old Branch Was Updated Successfully");
                                            $("#update_branch").val('');
                                        }
                                    }
                                });
                            }
                        });                            
                    } else {
                        $("#update_branch").val('');
                        $("#update_branch").css("border-color", "#cd2d00");
                        $('#submitbranch').attr('disabled', true);                    
                        $("#error_ubranch").text("Invalid Branch Name");                        
                    }
                }
            });            
        }
    });
    manageDevice(1);
    function manageDevice(pn){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {manageDevice:1,pageno:pn},
            success : function(data){
                $("#get_device").html(data);
                
            }
        });
    }
    $("body").delegate(".page-link","click",function(){
        var pn = $(this).attr("pn");
        manageDevice(pn);
    });
    $("body").delegate(".delete_device","click",function(){
        var tid = $(this).attr("tid");
        //alert(tid);
        if (confirm("Do You Surely Want To Delete This Device?")) {
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                dataType : "json",
                data : {currentDevice:1,id:tid},
                success : function(data){
                    console.log(data);                    
                    var currentdevicename = data["device_name"];
                    $.ajax({
                        url : DOMAIN+"/includes/process.php",
                        method : "POST",
                        data : { deleteDevice: 1 ,id: tid },
                        success : function(data){
                            if($.trim(data) == "DELETED"){
                                manageDevice(1);
                              //  alert("Department Deleted Successfully");
                                var beforepromsg = "A old <b>Device</b> ( ";                        
                                var afterpromsg = " ) was deleted successfully";
                                var promsg = beforepromsg+currentdevicename+afterpromsg;
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
                                                    window.location.href = encodeURI(DOMAIN+"/manage_device.php?msg=A Device Was Deleted Successfully");                                            
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
            window.location.href = encodeURI(DOMAIN+"/manage_device.php?msg=Nothing Was Changed");
        }        
    });
    $("body").delegate(".edit_device","click",function(){
        var eid = $(this).attr("eid");
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            dataType : "json",
            data : {updateDevice:1,id:eid},
            success : function(data){
                console.log(data);
                $("#pid").val(data["pid"]);
                $("#update_device").val(data["device_name"]);
                $("#udevice_brand").val(data["device_brand"]);
                $("#udevice_model").val(data["device_model"]);
                $("#uselect_branch").val(data["bid"]);
                $("#uselect_dep").val(data["did"]);
                $("#udevice_installationdate").val(data["added_date"]);
                $("#uremarks").val(data["remarks"]);               
            }
        })
    });
    $("#update_device").focusout(function () {
        var usDevicename = $('#update_device').val();
        if ($.trim(usDevicename).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicename").text("Enter a Device Name");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_devicename").text("");
        }   
    });
    $("#udevice_brand").focusout(function () {
        var usDevicebrand = $('#udevice_brand').val();
        if ($.trim(usDevicebrand).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicebrand").text("Enter the Device Brand");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_devicebrand").text("");
        }   
    });
    $("#udevice_model").focusout(function () {
        var usDevicemodel = $('#udevice_model').val();
        if ($.trim(usDevicemodel).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicemodel").text("Enter the Device Model No.");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_devicemodel").text("");
        }   
    });
    function uvalidateSelectbranch(){
        if (document.update_device_form.uselect_branch.value == ""){
            return false;
        } else {
            return true;
        }
    }
    $("#uselect_branch").focusout(function () {
        if (!uvalidateSelectbranch()){
            $("#uselect_branch").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicebranch").text("Select a Branch");               
        } else {
            $("#uselect_branch").css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_devicebranch").text("");
        }
    });
    function uvalidateSelectdepartment(){
        if (document.update_device_form.uselect_dep.value == ""){
            return false;
        } else {
            return true;
        }
    }
    $("#select_dep").focusout(function () {
        if (!uvalidateSelectdepartment()){
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicedepartment").text("Select a Department");               
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_devicedepartment").text("");
        }
    });
    $("#udevice_installationdate").focusout(function () {
        var usDeviceinstallationdate = $('#udevice_installationdate').val();
        if ($.trim(usDeviceinstallationdate).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicedoi").text("Enter the Installation Date");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_devicedoi").text("");
        }   
    });
    $("#uremarks").focusout(function () {
        var usDeviceremarks = $('#uremarks').val();
        if ($.trim(usDeviceremarks).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_deviceremarks").text("Enter the Remarks");          
        } else if ($.trim(usDeviceremarks).length < 3) {
            $(this).css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_deviceremarks").text("Too short Remarks");          
        }else {
            $(this).css("border-color", "#2eb82e");
            $('#usubmitdev').attr('disabled', false);
            $("#uerror_deviceremarks").text("");
        }   
    });
    function uclearDevicefield(){
        $("#update_device").val('');
        $("#update_device").css("border-color", "");                                                        
        $("#uerror_devicename").text("");
        $("#udevice_brand").val('');
        $("#udevice_brand").css("border-color", "");                                                        
        $("#uerror_devicebrand").text("");
        $("#udevice_model").val('');
        $("#udevice_model").css("border-color", "");                                                        
        $("#uerror_devicemodel").text("");
        $("#uselect_branch").val('');
        $("#uselect_branch").css("border-color", "");                                                        
        $("#uerror_devicebranch").text("");
        $("#uselect_dep").val('');
        $("#uselect_dep").css("border-color", "");                                                        
        $("#uerror_devicedepartment").text("");
        $("#uremarks").val('');
        $("#uremarks").css("border-color", "");                                                        
        $("#uerror_deviceremarks").text("");
        $("#udevice_installationdate").val('');
        $("#udevice_installationdate").css("border-color", "");                                                        
        $("#uerror_devicedoi").text("");
    }
    function udeviceDismissAction(){
        uclearDevicefield();
        $('#usubmitdev').attr('disabled', false);
    }
    $("#device_udismiss1").click(function() {
      udeviceDismissAction();  
    });
    $("#device_udismiss2").click(function() {
        udeviceDismissAction();
    });
    $("#update_device_form").on("submit",function(){
        var usDevicename = $('#update_device').val();
        var usDevicebrand = $('#udevice_brand').val();
        var usDevicemodel = $('#udevice_model').val();
        var usDeviceinstallationdate = $('#udevice_installationdate').val();
        var usDeviceremarks = $('#uremarks').val();
        if ($.trim(usDevicename).length == 0) {
            $("#update_device").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicename").text("Enter a Device Name");          
        }
        if ($.trim(usDevicebrand).length == 0) {
            $("#udevice_brand").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicebrand").text("Enter the Device Brand");          
        }
        if ($.trim(usDevicemodel).length == 0) {
            $("#udevice_model").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicemodel").text("Enter the Device Model No.");          
        }
        if (!uvalidateSelectbranch()){
            $("#uselect_branch").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicebranch").text("Select a Branch");               
        }
        if (!uvalidateSelectdepartment()){
            $("#uselect_dep").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicedepartment").text("Select a Department");               
        }
        if ($.trim(usDeviceinstallationdate).length == 0) {
            $("#udevice_installationdate").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_devicedoi").text("Enter the Installation Date");          
        }
        if ($.trim(usDeviceremarks).length == 0) {
            $("#uremarks").css("border-color", "#cd2d00");
            $('#usubmitdev').attr('disabled', true);
            $("#uerror_deviceremarks").text("Enter the Remarks");          
        }
        if (!($.trim(usDevicename).length == 0)) {
        $('#usubmitdev').attr('disabled', false);
            if (!($.trim(usDevicebrand).length == 0)) {
            $('#usubmitdev').attr('disabled', false);
                if (!($.trim(usDevicemodel).length == 0)) {
                $('#usubmitdev').attr('disabled', false);
                    if (uvalidateSelectbranch()){
                    $('#usubmitdev').attr('disabled', false);
                        if (uvalidateSelectdepartment()){
                        $('#usubmitdev').attr('disabled', false);
                            if (!($.trim(usDeviceinstallationdate).length == 0)) {
                            $('#usubmitdev').attr('disabled', false);
                                if (!($.trim(usDeviceremarks).length == 0)) {
                                $('#usubmitdev').attr('disabled', false);
                                    if (!($.trim(usDeviceremarks).length < 3)) {
                                    $('#usubmitdev').attr('disabled', false);
                                        if (!($('#submit').is('disabled', true))){        
                                            $.ajax({
                                                url : DOMAIN+"/includes/process.php",
                                                method : "POST",
                                                data : $("#update_device_form").serialize(),
                                                success : function(data){
                                                    if ($.trim(data) === "UPDATED"){                       
                                                        var beforepromsg = "A new <b>Device</b> ( ";
                                                        var middlepromsg = $("#update_device").val();                            
                                                        var afterpromsg = " ) updated successfully";
                                                        var promsg = beforepromsg+middlepromsg+afterpromsg;
                                                        $.ajax({
                                                            url : DOMAIN+"/includes/processmessage.php",
                                                            type: "post",
                                                            data: { promsg: promsg },
                                                            success: function(data){                                                                
                                                                $.ajax({
                                                                url : DOMAIN+"/includes/messagesession.php",
                                                                method : "GET",
                                                                data : data,
                                                                    success: function(data){
                                                                        if ($.trim(data) === "Administrator"){                                                                            
                                                                            window.location.href = encodeURI(DOMAIN+"/manage_device.php?msg=A old Device Was Updated Successfully");
                                                                            uclearDevicefield();   
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        });                            
                                                    } else {
                                                        $("#update_device").val('');
                                                        $("#update_device").css("border-color", "#cd2d00");
                                                        $('#usubmitdev').attr('disabled', true);                    
                                                        $("#uerror_devicename").text("Invalid Device Name");                      
                                                    }
                                                }
                                            });
                                        }

                                    } else {
                                        $('#usubmitdev').attr('disabled', true);
                                    }
                                } else {
                                    $('#usubmitdev').attr('disabled', true);
                                }
                            } else {
                                $('#usubmitdev').attr('disabled', true);
                            }
                        } else {
                            $('#usubmitdev').attr('disabled', true);
                        }
                    } else {
                        $('#usubmitdev').attr('disabled', true);
                    }
                } else {
                    $('#usubmitdev').attr('disabled', true);
                }
            } else {
                $('#usubmitdev').attr('disabled', true);
            }
        } else {
            $('#usubmitdev').attr('disabled', true);
        }         
    });
    manageUsers(1);
    function manageUsers(pn){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {manageUsers:1,pageno:pn},
            success : function(data){
                $("#get_users").html(data);
                
            }
        })
    }
    $("body").delegate(".page-link","click",function(){
        var pn = $(this).attr("pn");
        manageUsers(pn);
    })
    $("body").delegate(".delete_user","click",function(){
        var tid = $(this).attr("tid");        
        if (confirm("Do You Surely Want To Delete This User?")) {
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                dataType : "json",
                data : {currentUser:1,id:tid},
                success : function(data){
                    console.log(data);                    
                    var currentusername = data["username"];
                    $.ajax({
                        url : DOMAIN+"/includes/process.php",
                        method : "POST",
                        data : { deleteUser: 1 ,id: tid },
                        success : function(data){
                            if($.trim(data) == "DELETED"){
                                manageUsers(1);
                              //  alert("Department Deleted Successfully");
                                var beforepromsg = "A old <b>User</b> ( ";                        
                                var afterpromsg = " ) was deleted successfully";
                                var promsg = beforepromsg+currentusername+afterpromsg;
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
                                                    window.location.href = encodeURI(DOMAIN+"/manage_users.php?msg=A User Was Deleted Successfully");                                            
                                                }
                                            }
                                        });
                                    }
                                });                        
                            }else if($.trim(data) == "YOUARECURRENTYUSINGTHISACCOUNT"){
                                window.location.href = encodeURI(DOMAIN+"/manage_users.php?msg=Sorry Cannot Delete Current Active User");
                            } else {
                                alert(data);
                            }                              
                        }
                    });                
                }
            });          
        }else{
            window.location.href = encodeURI(DOMAIN+"/manage_users.php?msg=Nothing Was Changed");
        }        
    });
    $("body").delegate(".edit_user","click",function(){
        var eid = $(this).attr("eid");
        window.ceid = eid;    
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            dataType : "json",
            data : {updateUser:1,id:eid},
            success : function(data){
                console.log(data);
                $("#uuserid").val(data["id"])
                $("#ufirstname").val(data["firstname"]);
                $("#ulastname").val(data["lastname"]);
                $("#uusername").val(data["username"]);
                $("#uusertype").val(data["usertype"]);
                $("#uuserbranch").val(data["remarks"])                                
            }
        });           
    });
    $("#update_user_form").on("submit",function(){       
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : $("#update_user_form").serialize(),
            success : function(data){
                if ($.trim(data) === "UPDATED"){
                    console.log(data);
                    alert(data);
                }
            }
        });
    });
});         