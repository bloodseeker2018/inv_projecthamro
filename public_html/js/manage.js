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
    $("#uselect_dep").focusout(function () {
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
                                                        $("#udevice_model").val('');
                                                        $("#udevice_model").css("border-color", "#cd2d00");
                                                        $('#usubmitdev').attr('disabled', true);                    
                                                        $("#uerror_devicemodel").text("Invalid Model Name");                      
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
    function validateuFirstname(suFirstname) {
        var filter = /^[a-zA-Z]*$/;
        if (filter.test(suFirstname)) {
            return true;
        } else {
            return false;
        }
    }
    function jqueryactionsuFirstname(){
        var suFirstname = $('#ufirstname').val();
        if ($.trim(suFirstname).length == 0) {
            $('#ufirstname').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_ufirstname").text("Enter your First Name");            
        } else if ($('#ufirstname').val().length < 3 ) {
                 $('#ufirstname').css("border-color", "#cd2d00");
                 $('#usubmituser').attr('disabled', true);
                 $("#error_ufirstname").text("Too short First Name");
        } else if (validateuFirstname(suFirstname)) {
            $('#ufirstname').css("border-color", "#2eb82e");
            $("#error_ufirstname").text("");
            $('#usubmituser').attr('disabled', false);
        } else {
            $('#ufirstname').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_ufirstname").text("Invalid First Name");    
        }
    }
    $("#ufirstname").focusout(function () {
        jqueryactionsuFirstname();
    });
    $("#ufirstname").keyup(function () {
        jqueryactionsuFirstname();
    });
    function validateuLastname(suLastname) {
        var filter1 = /^[a-zA-Z]*$/;
        if (filter1.test(suLastname)) {
            return true;
        } else {
            return false;
        }
    }
    function jqueryactionuLastname(){
        var suLastname = $('#ulastname').val();
        if ($.trim(suLastname).length == 0) {
            $('#ulastname').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_ulastname").text("Enter your Last Name");           
        } else if ($('#ulastname').val().length < 3 ) {
                 $('#ulastname').css("border-color", "#cd2d00");
                 $('#usubmituser').attr('disabled', true);
                 $("#error_ulastname").text("Too short Last Name");                
        } else if (validateuLastname(suLastname)) {
            $('#ulastname').css("border-color", "#2eb82e");
            $("#error_ulastname").text("");
            $('#usubmituser').attr('disabled', false);
        } else {
            $('#ulastname').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_ulastname").text("Invalid Last Name");            
        }
    }
    $("#ulastname").focusout(function () {
        jqueryactionuLastname();
    });
    $("#ulastname").keyup(function (){
        jqueryactionuLastname();
    });
    function validateuUsername(suUsername) {
        var filter2 = /^(?=.*[a-z])[a-z0-9]+(([\.-]?)[a-z0-9]+)*(([\._]?)[a-z0-9]+)*(([\_-]?)[a-z0-9]+)*$/;
        if (filter2.test(suUsername)) {
            return true;
        } else {
            return false;
        }
    }
    function jqueryactionsuUsername(){
        var suUsername = $('#uusername').val();
        if ($.trim(suUsername).length == 0) {
            $('#uusername').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_uusername").text("Enter your User Id");           
        } else if ($('#uusername').val().length < 7 ) {
                 $('#uusername').css("border-color", "#cd2d00");
                 $('#usubmituser').attr('disabled', true);
                 $("#error_uusername").text("Too short User Id");              
        } else if (validateuUsername(suUsername)) {
            $('#uusername').css("border-color", "#2eb82e");
            $('#usubmituser').attr('disabled', false);
            $("#error_uusername").text("");
        } else {
            $('#uusername').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_uusername").text("Invalid User Id");            
        }
    }
    $("#uusername").focusout(function () {
        jqueryactionsuUsername  ();
    });
    $("#uusername").keyup(function () {
        jqueryactionsuUsername();
    });
    function validateuUsertype(){
        if (document.update_user_form.uusertype.value == ""){
            return false;
        } else {
            return true;
        }
    }
    function jqueryactionsuUsertype(){
        if (!validateuUsertype()){
                $("#uusertype").css("border-color", "#cd2d00");
                $('#usubmituser').attr('disabled', true);
                $("#error_uusertype").text("Select a User Type");               
            } else {
                $("#uusertype").css("border-color", "#2eb82e");
                $('#usubmituser').attr('disabled', false);
                $("#error_uusertype").text("");
        }
    }
    $("#uusertype").focusout(function(){
        jqueryactionsuUsertype();
    })
    function validateuPassword(suPassword) {
        var filter3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (filter3.test(suPassword)) {
            return true;
        } else {
            return false;
        }
    }    
    function jqueryactionsuPassword1(){
        var suPassword = $('#upassword1').val();
        if ($.trim(suPassword).length !== 0) {                   
            if ($('#upassword1').val().length < 9 ) {
                $('#upassword1').css("border-color", "#cd2d00");
                $('#usubmituser').attr('disabled', true);
                $("#error_upassword1").text("Too short Password");                
            } else if (validateuPassword(suPassword)) {
                $('#upassword1').css("border-color", "#2eb82e");
                $('#usubmituser').attr('disabled', false);
                $("#error_upassword1").text("");
            } else {
                $('#upassword1').css("border-color", "#cd2d00");
                $('#usubmituser').attr('disabled', true);
                $("#error_upassword1").text("Invalid Password");           
            }
        } else {
            $('#upassword1').css("border-color", "");
            $("#error_upassword1").text("");
            $('#upassword2').css("border-color", "");            
            $("#error_upassword2").text("");
            $('#usubmituser').attr('disabled', false);
            $("#upassword2").val('');
        }
    }
    $("#upassword1").focusout(function () {
        jqueryactionsuPassword1();
    });
    $("#upassword1").keyup(function () {
        jqueryactionsuPassword1();
    });
    function jqueryactionsuPassword2(){
        var suPassword = $('#upassword1').val();
        var suPassword2 = $("#upassword2").val();
        if ($.trim(suPassword2).length == 0) {
            if (!($.trim(suPassword).length == 0)) {
                if (!($.trim(suPassword).length < 9 )) {
                    if (validateuPassword(suPassword)){
                        if ($("#upassword2").val() !== $("#upassword1").val()) {
                            $("#upassword2").css("border-color", "#cd2d00");
                            $('#usubmituser').attr('disabled', true);
                            $("#error_upassword2").text("Please Re-Enter your Password");                
                        }
                    } else {
                            $("#upassword1").css("border-color", "#cd2d00");
                            $('#usubmituser').attr('disabled', true);
                            $("#error_upassword1").text("Firt enter the valid Password");
                            $("#upassword2").val('');                    
                    }
                } else {
                    $("#upassword1").css("border-color", "#cd2d00");
                    $('#usubmituser').attr('disabled', true);
                    $("#error_upassword1").text("This is too short Password");
                    $("#upassword2").val('');                
                }
            } else {
                $("#upassword1").css("border-color", "#cd2d00");
                $('#usubmituser').attr('disabled', true);
                $("#error_upassword1").text("First Enter a Password");
                $("#upassword2").val('');           
            }
        } else if (!($.trim(suPassword2).length == 0)) { 
            if ($("#upassword2").val() == $("#upassword1").val()) {
                if (!($.trim(suPassword).length == 0)) {
                    if (!($.trim(suPassword).length < 9 )) {
                        if (validateuPassword(suPassword)){
                                $("#upassword2").css("border-color", "#2eb82e");
                                $('#usubmituser').attr('disabled', false);
                                $("#error_upassword2").text("");
                        } else {
                            $("#upassword1").css("border-color", "#cd2d00");
                            $('#usubmituser').attr('disabled', true);
                            $("#error_upassword1").text("Firt enter the valid Password");
                            $("#upassword2").val('');                    
                        }
                    } else {
                        $("#upassword1").css("border-color", "#cd2d00");
                        $('#usubmituser').attr('disabled', true);
                        $("#error_upassword1").text("This is too short Password");
                        $("#upassword2").val('');                
                    }
                } else {
                    $("#upassword1").css("border-color", "#cd2d00");
                    $('#usubmituser').attr('disabled', true);
                    $("#error_upassword1").text("First Enter a Password");
                    $("#upassword2").val('');           
                }
            } else if ($("#upassword2").val() !== $("#upassword1").val()) {
                if (!($.trim(suPassword).length == 0)) {
                    if (!($.trim(suPassword).length < 9 )) {
                        if (validateuPassword(suPassword)){
                            $("#upassword2").css("border-color", "#cd2d00");
                            $('#usubmituser').attr('disabled', true);
                            $("#error_upassword2").text("Passwords Do not match");    
                        } else {
                            $("#upassword1").css("border-color", "#cd2d00");
                            $('#usubmituser').attr('disabled', true);
                            $("#error_upassword1").text("Firt enter the valid Password");
                            $("#upassword2").val('');                    
                        }
                    } else {
                        $("#upassword1").css("border-color", "#cd2d00");
                        $('#usubmituser').attr('disabled', true);
                        $("#error_upassword1").text("This is too short Password");
                        $("#upassword2").val('');                
                    }
                } else {
                    $("#upassword1").css("border-color", "#cd2d00");
                    $('#usubmituser').attr('disabled', true);
                    $("#error_upassword1").text("First Enter a Password");
                    $("#upassword2").val('');           
                }    
            }
        }
    }
    $("#upassword2").focusout(function () {
        jqueryactionsuPassword2();
    });
    $("#upassword2").keyup(function () {
        jqueryactionsuPassword2();
    });
    function jqueryactionsuUserbranch(){
        var suUserbranch = $('#uuserbranch').val();
        if ($.trim(suUserbranch).length == 0) {
            $('#uuserbranch').css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_uuserbranch").text("Enter your Branch Name");            
        } else if ($('#uuserbranch').val().length < 3 ) {
                 $('#uuserbranch').css("border-color", "#cd2d00");
                 $('#usubmituser').attr('disabled', true);
                 $("#error_uuserbranch").text("Too short Branch Name");
        } else {            
            $('#uuserbranch').css("border-color", "#2eb82e");
            $("#error_uuserbranch").text("");
            $('#usubmituser').attr('disabled', false);    
        }
    }
    $("#uuserbranch").focusout(function () {
        jqueryactionsuUserbranch();
    });
    $("#uuserbranch").keyup(function () {
        jqueryactionsuUserbranch();
    });
    function uclearuUserfield(){
        $("#ufirstname").val('');
        $("#ufirstname").css("border-color", "");                                                        
        $("#error_ufirstname").text("");
        $("#ulastname").val('');
        $("#ulastname").css("border-color", "");                                                        
        $("#error_ulastname").text("");
        $("#uusername").val('');
        $("#uusername").css("border-color", "");                                                        
        $("#error_uusername").text("");
        $("#upassword1").val('');
        $("#upassword1").css("border-color", "");                                                        
        $("#error_upassword1").text("");
        $("#uusertype").val('');
        $("#uusertype").css("border-color", "");                                                        
        $("#error_uusertype").text("");
        $("#upassword2").val('');
        $("#upassword2").css("border-color", "");                                                        
        $("#error_upassword2").text("");
        $("#uuserbranch").val('');
        $("#uuserbranch").css("border-color", "");                                                        
        $("#error_uuserbranch").text("");
    }
    function userDismissAction(){
        uclearuUserfield();
        $('#usubmituser').attr('disabled', false);
    }
    $("#uuser_udismiss1").click(function() {
        userDismissAction();  
    });
    $("#uuser_udismiss2").click(function() {
        userDismissAction();
    });
    $("#update_user_form").on("submit",function(){
        var suFirstname = $('#ufirstname').val();
        var suLastname = $('#ulastname').val();
        var suUsername = $('#uusername').val();
        var suPassword = $('#upassword1').val();
        var suPassword2 = $("#password2").val();
        var suUserbranch = $('#uuserbranch').val();
        if ($("#ufirstname").val() == '') {
            $("#ufirstname").css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true); 
            $("#error_ufirstname").text("Enter your First Name");            
        }
        if ($("#ulastname").val() == '') {
            $("#ulastname").css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_ulastname").text("Enter your Last Name");           
        }
        if ($("#uusername").val() == '') {
            $("#uusername").css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_uusername").text("Enter your User Id");           
        }
        if ($("#uuserbranch").val() == '') {
            $("#uuserbranch").css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_uuserbranch").text("Enter a Branch");            
        }
        if (!validateuUsertype()){
            $("#uusertype").css("border-color", "#cd2d00");
            $('#usubmituser').attr('disabled', true);
            $("#error_uusertype").text("Select a User Type");               
        }
        if ($("#upassword1").val() !== ''){
            if(validateuPassword(suPassword)){
                if ($("#upassword2").val() == '') {
                    $("#upassword2").css("border-color", "#cd2d00");
                    $('#usubmituser').attr('disabled', true);
                    $("#error_upassword2").text("Confirm your Password");
                }
            }            
        } 
        if (($("#upassword2").val()) == ($("#upassword1").val())) {
            if (validateuFirstname(suFirstname)) {
                $('#usubmituser').attr('disabled', false);
                if (!($.trim(suFirstname).length == 0)) {
                    $('#usubmituser').attr('disabled', false);
                    if (!($.trim(suFirstname).length < 3 )) {
                        $('#usubmituser').attr('disabled', false);
                        if (!($.trim(suLastname).length == 0)) {
                            $('#usubmituser').attr('disabled', false);
                            if (!($.trim(suLastname).length < 3 )) {
                                $('#usubmituser').attr('disabled', false);
                                if (validateuLastname(suLastname)) {
                                    $('#usubmituser').attr('disabled', false);
                                    if (!($.trim(suUserbranch).length == 0)){
                                        $('#usubmituser').attr('disabled', false);
                                        if (!($.trim(suUserbranch).length < 3)){
                                            $('#usubmituser').attr('disabled', false);
                                            if (!($.trim(suUsername).length == 0)) {
                                                $('#usubmituser').attr('disabled', false);
                                                if (!($.trim(suUsername).length < 7)) {
                                                    $('#usubmituser').attr('disabled', false);
                                                    if (validateuUsername(suUsername)) {
                                                        $('#usubmituser').attr('disabled', false);
                                                        if (validateuUsertype()) {
                                                            $('#usubmituser').attr('disabled', false);
                                                            if (!($("#upassword2").val() !== $("#upassword1").val())) {
                                                                $('#usubmituser').attr('disabled', false);
                                                                if (!($('#submit').is('disabled', true))){  
                                                                    $(".overlay").show();
                                                                    $.ajax({
                                                                        url : DOMAIN+"/includes/process.php",
                                                                        method : "POST",
                                                                        data : $("#update_user_form").serialize(),
                                                                        success: function(data){
                                                                            if ($.trim(data) === "UPDATED"){
                                                                                $(".overlay").hide();
                                                                                var beforepromsg = "A <b>User</b> ( ";
                                                                                var middlepromsg = $("#ufirstname").val();
                                                                                var middlepromsg1_2 = (" ");
                                                                                var middlepromsg2 = $("#ulastname").val();                            
                                                                                var afterpromsg = " ) updated successfully";
                                                                                var promsg = beforepromsg+middlepromsg+middlepromsg1_2+middlepromsg2+afterpromsg;
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
                                                                                                    window.location.href = encodeURI(DOMAIN+"/manage_users.php?msg=A User Was Updated Successfully");
                                                                                                    uclearuUserfield();   
                                                                                                }
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            } else if ($.trim(data) == "Currenactiveuseraccount"){
                                                                                window.location.href = encodeURI(DOMAIN+"/manage_users.php?msg=Sorry Cannot Edit Current Active User");
                                                                                uclearuUserfield();
                                                                            } else {
                                                                                $('#usubmituser').attr('disabled', true);
                                                                                $("#uusername").val('');
                                                                                $("#uusername").css("border-color", "#cd2d00");
                                                                                $("#error_uusername").text("Invalid User Id");
                                                                            }
                                                                        }
                                                                    });
                                                                } else {
                                                                    $('#usubmituser').attr('disabled', true);
                                                                }
                                                            } else {
                                                                $('#usubmituser').attr('disabled', true);
                                                            }
                                                        } else {
                                                            $('#usubmituser').attr('disabled', true);
                                                        }
                                                    } else {
                                                        $('#usubmituser').attr('disabled', true);
                                                    }
                                                } else {
                                                    $('#usubmituser').attr('disabled', true);
                                                }
                                            } else {
                                                $('#usubmituser').attr('disabled', true);
                                            }
                                        } else {
                                            $('#usubmituser').attr('disabled', true);
                                        }
                                    } else {
                                        $('#usubmituser').attr('disabled', true);
                                    }
                                } else {
                                    $('#usubmituser').attr('disabled', true);
                                }
                            } else {
                                $('#usubmituser').attr('disabled', true);
                            }
                        } else {
                            $('#usubmituser').attr('disabled', true);
                        }
                    } else {
                        $('#usubmituser').attr('disabled', true);
                    }
                } else {
                    $('#usubmituser').attr('disabled', true);
                }
            } else {
                $('#usubmituser').attr('disabled', true);
            }
        }        
    });
    $("#searchbranch").focusout(function () {
        var searchsBranch = $('#searchbranch').val();
        if (!($.trim(searchsBranch).length == 0)) {
            $("#searchbranch").css("border-color", "#2eb82e");
            $('#submitbrasearch').attr('disabled', false);
            $("#error_searchbranch").text("");
        } else {
            $("#searchbranch").css("border-color", "");
            $('#submitbrasearch').attr('disabled', false);
            $("#error_searchbranch").text("");
        }
    });
    $("#searchbranch").keyup(function () {
        var searchsBranch = $('#searchbranch').val();
        if ($.trim(searchsBranch).length == 0) {
            $("#searchbranch").css("border-color", "#cd2d00");
            $('#submitbrasearch').attr('disabled', true);
            $("#error_searchbranch").text("Enter a Branch Name");          
        } else {
            $("#searchbranch").css("border-color", "#2eb82e");
            $('#submitbrasearch').attr('disabled', false);
            $("#error_searchbranch").text("");
        }
    });
    $("#search_form").on("submit",function(){
        var searchsBranch = $('#searchbranch').val();
        if (!($.trim(searchsBranch).length == 0)) {
            searchBranch(1);
            function searchBranch(pn){  
                $.ajax({
                    url : DOMAIN+"/includes/process.php",
                    method : "POST",
                    data : {searchBranch:1,pageno:pn,searchbranchs:searchsBranch},
                    success : function(data){
                        $("#get_branch").html(data);                    
                    }
                })
            }
        } else {
            $("#searchbranch").css("border-color", "#cd2d00");
            $('#submitbrasearch').attr('disabled', true);
            $("#error_searchbranch").text("Enter a Branch Name");
        }
    });
    $("#searchdevice").focusout(function () {
        var searchsDevice = $('#searchdevice').val();
        if (!($.trim(searchsDevice).length == 0)) {
            $("#searchdevice").css("border-color", "#2eb82e");
            $('#submitdevsearch').attr('disabled', false);
            $("#error_searchdevice").text("");
        } else {
            $("#searchdevice").css("border-color", "");
            $('#submitdevsearch').attr('disabled', false);
            $("#error_searchdevice").text("");
        }
    });
    $("#searchdevice").keyup(function () {
        var searchsDevice = $('#searchdevice').val();
        if ($.trim(searchsDevice).length == 0) {
            $("#searchdevice").css("border-color", "#cd2d00");
            $('#submitdevsearch').attr('disabled', true);
            $("#error_searchdevice").text("Enter a Device Name");          
        } else {
            $("#searchdevice").css("border-color", "#2eb82e");
            $('#submitdevsearch').attr('disabled', false);
            $("#error_searchdevice").text("");
        }
    });
    $("#searchdevice_form").on("submit",function(){
        var searchsDevice = $('#searchdevice').val();
        if (!($.trim(searchsDevice).length == 0)) {
            searchDevice(1);
            function searchDevice(pn){  
                $.ajax({
                    url : DOMAIN+"/includes/process.php",
                    method : "POST",
                    data : {searchDevice:1,pageno:pn,searchdevices:searchsDevice},
                    success : function(data){
                        $("#get_device").html(data);                    
                    }
                })
            }
        } else {
            $("#searchdevice").css("border-color", "#cd2d00");
            $('#submitdevsearch').attr('disabled', true);
            $("#error_searchdevice").text("Enter a Device Name");
        }
    });
});         