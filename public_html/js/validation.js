$(document).ready(function(){
    var DOMAIN = "http://localhost/inv_projecthamro/public_html";
    $flag = 1;
    function validateFirstname(sFirstname) {
        var filter = /^[a-zA-Z]*$/;
        if (filter.test(sFirstname)) {
            return true;
        } else {
            return false;
        }
    }
    $("#firstname").focusout(function () {
        var sFirstname = $('#firstname').val();
        if ($.trim(sFirstname).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_firstname").text("Enter your First Name");            
        } else if ($(this).val().length < 3 ) {
                 $(this).css("border-color", "#cd2d00");
                 $('#submit').attr('disabled', true);
                 $("#error_firstname").text("Too short First Name");
        } else if (validateFirstname(sFirstname)) {
            $(this).css("border-color", "#2eb82e");
            $("#error_firstname").text("");
            $('#submit').attr('disabled', false);
        } else {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_firstname").text("Invalid First Name");    
        }
    });
    function validateLastname(sLastname) {
        var filter1 = /^[a-zA-Z]*$/;
        if (filter1.test(sLastname)) {
            return true;
        } else {
            return false;
        }
    }
    $("#lastname").focusout(function () {
        var sLastname = $('#lastname').val();
        if ($.trim(sLastname).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_lastname").text("Enter your Last Name");           
        } else if ($(this).val().length < 3 ) {
                 $(this).css("border-color", "#cd2d00");
                 $('#submit').attr('disabled', true);
                 $("#error_lastname").text("Too short Last Name");                
        } else if (validateLastname(sLastname)) {
            $(this).css("border-color", "#2eb82e");
            $("#error_lastname").text("");
            $('#submit').attr('disabled', false);
        } else {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_lastname").text("Invalid Last Name");            
        }
    });
    function validateUsername(sUsername) {
        var filter2 = /^(?=.*[a-z])[a-z0-9]+(([\.-]?)[a-z0-9]+)*(([\._]?)[a-z0-9]+)*(([\_-]?)[a-z0-9]+)*$/;
        if (filter2.test(sUsername)) {
            return true;
        } else {
            return false;
        }
    }
    $("#username").focusout(function () {
        var sUsername = $('#username').val();
        if ($.trim(sUsername).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_username").text("Enter your User Id");           
        } else if ($(this).val().length < 7 ) {
                 $(this).css("border-color", "#cd2d00");
                 $('#submit').attr('disabled', true);
                 $("#error_username").text("Too short User Id");              
        } else if (validateUsername(sUsername)) {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_username").text("");
        } else {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_username").text("Invalid User Id");            
        }
    });
    function validateUsertype(){
        if (document.register_form.usertype.value == ""){
            return false;
        } else {
            return true;
        }
    }
    $("#usertype").focusout(function () {
        if (!validateUsertype()){
                $(this).css("border-color", "#cd2d00");
                $('#submit').attr('disabled', true);
                $("#error_usertype").text("Select a User Type");               
            } else {
                $(this).css("border-color", "#2eb82e");
                $('#submit').attr('disabled', false);
                $("#error_usertype").text("");
        }
    });
    function validatePassword(sPassword) {
        var filter3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (filter3.test(sPassword)) {
            return true;
        } else {
            return false;
        }
    }
    $("#password1").focusout(function () {
        var sPassword = $('#password1').val();
        if ($.trim(sPassword).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_password1").text("Enter a Password");           
        } else if ($(this).val().length < 9 ) {
                 $(this).css("border-color", "#cd2d00");
                 $('#submit').attr('disabled', true);
                 $("#error_password1").text("Too short Password");                
        } else if (validatePassword(sPassword)) {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_password1").text("");
        } else {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_password1").text("Invalid Password");           
        }
    });
    $("#password2").focusout(function () {
        var sPassword = $('#password1').val();
        var sPassword2 = $("#password2").val();
        if ($.trim(sPassword2).length == 0) {
            if (!($.trim(sPassword).length == 0)) {
                if (!($.trim(sPassword).length < 9 )) {
                    if (validatePassword(sPassword)){
                        if ($("#password2").val() !== $("#password1").val()) {
                            $("#password2").css("border-color", "#cd2d00");
                            $('#submit').attr('disabled', true);
                            $("#error_password2").text("Please Re-Enter your Password");                
                        }
                    } else {
                            $("#password1").css("border-color", "#cd2d00");
                            $('#submit').attr('disabled', true);
                            $("#error_password1").text("Firt enter the valid Password");
                            $("#password2").val('');                    
                    }
                } else {
                    $("#password1").css("border-color", "#cd2d00");
                    $('#submit').attr('disabled', true);
                    $("#error_password1").text("This is too short Password");
                    $("#password2").val('');                
                }
            } else {
                $("#password1").css("border-color", "#cd2d00");
                $('#submit').attr('disabled', true);
                $("#error_password1").text("First Enter a Password");
                $("#password2").val('');           
            }
        } else if (!($.trim(sPassword2).length == 0)) { 
            if ($("#password2").val() == $("#password1").val()) {
                if (!($.trim(sPassword).length == 0)) {
                    if (!($.trim(sPassword).length < 9 )) {
                        if (validatePassword(sPassword)){
                                $("#password2").css("border-color", "#2eb82e");
                                $('#submit').attr('disabled', false);
                                $("#error_password2").text("");
                        } else {
                            $("#password1").css("border-color", "#cd2d00");
                            $('#submit').attr('disabled', true);
                            $("#error_password1").text("Firt enter the valid Password");
                            $("#password2").val('');                    
                        }
                    } else {
                        $("#password1").css("border-color", "#cd2d00");
                        $('#submit').attr('disabled', true);
                        $("#error_password1").text("This is too short Password");
                        $("#password2").val('');                
                    }
                } else {
                    $("#password1").css("border-color", "#cd2d00");
                    $('#submit').attr('disabled', true);
                    $("#error_password1").text("First Enter a Password");
                    $("#password2").val('');           
                }
            } else if ($("#password2").val() !== $("#password1").val()) {
                if (!($.trim(sPassword).length == 0)) {
                    if (!($.trim(sPassword).length < 9 )) {
                        if (validatePassword(sPassword)){
                            $("#password2").css("border-color", "#cd2d00");
                            $('#submit').attr('disabled', true);
                            $("#error_password2").text("Passwords Do not match");    
                        } else {
                            $("#password1").css("border-color", "#cd2d00");
                            $('#submit').attr('disabled', true);
                            $("#error_password1").text("Firt enter the valid Password");
                            $("#password2").val('');                    
                        }
                    } else {
                        $("#password1").css("border-color", "#cd2d00");
                        $('#submit').attr('disabled', true);
                        $("#error_password1").text("This is too short Password");
                        $("#password2").val('');                
                    }
                } else {
                    $("#password1").css("border-color", "#cd2d00");
                    $('#submit').attr('disabled', true);
                    $("#error_password1").text("First Enter a Password");
                    $("#password2").val('');           
                }    
            }
        }    
    });
    $("#userbranch").focusout(function () {
        var sUserbranch = $('#userbranch').val();
        if ($.trim(sUserbranch).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_userbranch").text("Enter your Branch Name");            
        } else if ($(this).val().length < 3 ) {
                 $(this).css("border-color", "#cd2d00");
                 $('#submit').attr('disabled', true);
                 $("#error_userbranch").text("Too short Branch Name");
        } else {            
            $(this).css("border-color", "#2eb82e");
            $("#error_userbranch").text("");
            $('#submit').attr('disabled', false);    
        }
    }); 
    $("#register_form").on("submit",function () {
        var sFirstname = $('#firstname').val();
        var sLastname = $('#lastname').val();
        var sUsername = $('#username').val();
        var sPassword = $('#password1').val();
        var sPassword2 = $("#password2").val();
        var sUserbranch = $('#userbranch').val();
        if ($("#firstname").val() == '') {
            $("#firstname").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true); 
            $("#error_firstname").text("Enter your First Name");            
        }
        if ($("#lastname").val() == '') {
            $("#lastname").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_lastname").text("Enter your Last Name");           
        }
        if ($("#username").val() == '') {
            $("#username").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_username").text("Enter your User Id");           
        }
        if ($("#password1").val() == '') {
            $("#password1").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_password1").text("Enter a Password");            
        }
        if ($("#userbranch").val() == '') {
            $("#userbranch").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_userbranch").text("Enter a Branch");            
        }
        if (!validateUsertype()){
                $("#usertype").css("border-color", "#cd2d00");
                $('#submit').attr('disabled', true);
                $("#error_usertype").text("Select a User Type");               
        }
        if ($("#password2").val() == '' && $("#password1").val() !== '') {
            $("#password2").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#error_password2").text("Confirm your Password");            
        } else if (validatePassword($("#password1").val())){
            if (($("#password2").val() == $("#password1").val()) && $("#password1").val() !== '') {
                if (validateFirstname(sFirstname)) {
                    $('#submit').attr('disabled', false);
                    if (!($.trim(sFirstname).length == 0)) {
                        $('#submit').attr('disabled', false);
                        if (!($.trim(sFirstname).length < 3 )) {
                            $('#submit').attr('disabled', false);
                            if (!($.trim(sLastname).length == 0)) {
                                $('#submit').attr('disabled', false);
                                if (!($.trim(sLastname).length < 3 )) {
                                    $('#submit').attr('disabled', false); 
                                    if (validateLastname(sLastname)) {
                                        $('#submit').attr('disabled', false);
                                        if (!($.trim(sUserbranch).length == 0)){
                                            $('#submit').attr('disabled', false);
                                            if (!($.trim(sUserbranch).length < 3)){
                                                $('#submit').attr('disabled', false);
                                                if (!($.trim(sUsername).length == 0)) {
                                                    $('#submit').attr('disabled', false);
                                                    if (!($.trim(sUsername).length < 7)) {
                                                        $('#submit').attr('disabled', false);
                                                        if (validateUsername(sUsername)) {
                                                            $('#submit').attr('disabled', false);
                                                            if (validateUsertype()) {
                                                                $('#submit').attr('disabled', false);
                                                                if (!($.trim(sPassword).length == 0)) {
                                                                    $('#submit').attr('disabled', false);
                                                                    if (!($.trim(sPassword).length < 9)) {
                                                                        $('#submit').attr('disabled', false);
                                                                        if (validatePassword(sPassword)) {
                                                                            $('#submit').attr('disabled', false);
                                                                            if (!($.trim(sPassword2).length == 0)) {
                                                                                $('#submit').attr('disabled', false);
                                                                                if (!($("#password2").val() !== $("#password1").val())) {
                                                                                    $('#submit').attr('disabled', false);                                                                                
                                                                                    if (!($('#submit').is('disabled', true))){ 
                                                                                        $(".overlay").show();
                                                                                        $.ajax({
                                                                                            url : DOMAIN+"/includes/process.php",
                                                                                            method : "POST",
                                                                                            data : $("#register_form").serialize(),
                                                                                            success : function(data){
                                                                                                if ($.trim(data) === "USEREXISTS"){
                                                                                                    $(".overlay").hide();
                                                                                                    $('#submit').attr('disabled', true);
                                                                                                    $("#username").val('');
                                                                                                    $("#username").css("border-color", "#cd2d00");
                                                                                                    $("#error_username").text("Enter your New User Id");
                                                                                                    alert("Sorry the User Id is already taken");                                
                                                                                                }else if($.trim(data) === "SOMEERROR"){
                                                                                                    $(".overlay").hide();                                
                                                                                                    alert("Something went wrong");                               
                                                                                                }else{
                                                                                                    $(".overlay").hide();
                                                                                                    var beforepromsg = "A new <b>User</b> ( ";
                                                                                                    var middlepromsg1 = $("#firstname").val();
                                                                                                    var middlepromsg1_2 = " ";
                                                                                                    var middlepromsg2 = $("#lastname").val();
                                                                                                    var afterpromsg = " ) added successfully";
                                                                                                    var promsg = beforepromsg+middlepromsg1+middlepromsg1_2+middlepromsg2+afterpromsg;
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
                                                                                                                            //alert("You have successfully Signup");                                
                                                                                                                            window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=A New User Is Registered Now That User Can Login");                                                                                                                
                                                                                                                        } else {
                                                                                                                            //alert("You have successfully Signup");                                
                                                                                                                            window.location.href = encodeURI(DOMAIN+"/client.php?msg=A New User Is Registered Now That User Can Login"); 
                                                                                                                        }
                                                                                                                    }
                                                                                                            })
                                                                                                        }
                                                                                                    });                                                                                            
                                                                                                }
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                } else {
                                                                                    $('#submit').attr('disabled', true);
                                                                                }
                                                                            } else {
                                                                                $('#submit').attr('disabled', true);
                                                                            }
                                                                        }else {
                                                                            $('#submit').attr('disabled', true);
                                                                        }
                                                                    }else {
                                                                        $('#submit').attr('disabled', true);
                                                                    }
                                                                }else {
                                                                    $('#submit').attr('disabled', true);
                                                                }
                                                            }else {
                                                                $('#submit').attr('disabled', true);
                                                            }
                                                        }else {
                                                            $('#submit').attr('disabled', true);
                                                        }
                                                    }else {
                                                        $('#submit').attr('disabled', true);
                                                    }
                                                }else {
                                                    $('#submit').attr('disabled', true);
                                                }
                                            } else {
                                                $('#submit').attr('disabled', true); 
                                            }
                                        } else {
                                                $('#submit').attr('disabled', true); 
                                        }
                                    }else {
                                        $('#submit').attr('disabled', true);
                                    }
                                }else {
                                    $('#submit').attr('disabled', true);
                                }
                            }else {
                                $('#submit').attr('disabled', true);
                            }
                        }else {
                            $('#submit').attr('disabled', true);
                        }
                    }else {
                        $('#submit').attr('disabled', true);
                    }
                }else {
                    $('#submit').attr('disabled', true);
                }
            }
        }
    });
    $("#log_password").focusout(function () {
        var sPasswordlog = $('#log_password').val();
        var sUsernamelog = $('#log_username').val();
        if ($.trim(sPasswordlog).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#errorlog_password").text("Enter your Password to login");            
        } else {
            $(this).css("border-color", "#2eb82e");
            $("#errorlog_password").text("");
            if (!($.trim(sUsernamelog).length == 0)) {
                $('#submit').attr('disabled', false);
            }
        }
    });
    $("#log_username").focusout(function () {
        var sUsernamelog = $('#log_username').val();
        var sPasswordlog = $('#log_password').val();
        if ($.trim(sUsernamelog).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#errorlog_username").text("Enter your User Id to login");           
        } else {
            $(this).css("border-color", "#2eb82e");
            $("#errorlog_username").text("");
            if (!($.trim(sPasswordlog).length == 0)) {
                $('#submit').attr('disabled', false);
            }
        }
    });
    $("#login_form").on("submit",function () {        
        if ($("#log_username").val() == '') {
            $("#log_username").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#errorlog_username").text("Enter your User Id to login");            
        } else {
            $("#log_username").css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#errorlog_username").text("");
        }
        if ($("#log_password").val() == '') {
            $("#log_password").css("border-color", "#cd2d00");
            $('#submit').attr('disabled', true);
            $("#errorlog_password").text("Enter your Password to login");           
        } else {
            $("#log_password").css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#errorlog_password").text("");            
        }
        if (!($('#submit').is('disabled', true))){ 
            if (($("#log_password").val() !== '' && $("#log_username").val() !== '')) {
                $(".overlay").show();             
                $.ajax({
                    url : DOMAIN+"/includes/process.php",
                    method : "POST",
                    data : $("#login_form").serialize(),
                    success : function(data){
                        if ($.trim(data) === "NOTREGISTERED"){
                            $(".overlay").hide();
                            $('#submit').attr('disabled', true);
                            $("#log_username").val('');
                            $("#log_password").val('');
                            $("#log_username").css("border-color", "#cd2d00");
                            $("#log_password").css("border-color", "#cd2d00");
                            $("#errorlog_username").text("This User Id is not registered");
                            $("#errorlog_password").text("Enter your Password");
                            alert("Sorry this User Id is not registered");                                                     
                        } else if($.trim(data) === "PASSWORDNOTMATCHED"){
                            $(".overlay").hide();
                            $('#submit').attr('disabled', true);                            
                            $("#log_password").css("border-color", "#cd2d00");
                            $("#errorlog_password").text("Enter your correct Password");
                            alert("The Password was incorrect");
                            $("#log_password").val('');                                                    
                        } else if ($.trim(data) === "ADMINISTRATOR"){
                            $(".overlay").hide();                         
                            //alert("You have successfully Login as Administrator");                                
                            window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=Welcome To ADBL Inventory Management System Administrator");
                        } else if ($.trim(data) === "NORMALUSER"){
                            $(".overlay").hide();
                            //alert("You have successfully Logged in as Normal User");
                            window.location.href = encodeURI(DOMAIN+"/client.php?msg=Welcome To ADBL Inventory Management System User");
                        }                        
                    }
                });
            } 
        }        
    });
    fetch_department();
    function fetch_department(){
        $.ajax({
            url : DOMAIN+"/includes/process.php",
            method : "POST",
            data : {getDepartment:1},
            success : function(data){
                var rootes = "<option value='' selected hidden disabled>Select a Parent Department</option>";
                var rooted = "<option value='0'>Root</option>";
                var choose = "<option value='' selected hidden disabled>Select a Department</option>";
                $("#parent_dep").html(rootes+rooted+data);
                $("#select_dep").html(choose+data);
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
                $("#select_branch").html(choose+data);
            }
        });
    }
    fetch_promsgdataa();
    function fetch_promsgdataa(){
        $.ajax({
            url : DOMAIN+"/includes/processmessage.php",
            method : "POST",
            data : {getPromsgdataa:1},
            success : function(data){
                $("#recentactionsmsg").html(data);                
            }
        });
    }
    $("#department_name").focusout(function () {
        var sDepartment = $('#department_name').val();
        var sPardep = $('#parent_dep').val();
        if ($.trim(sDepartment).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdep').attr('disabled', true);
            $("#error_department").text("Enter a Department Name");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $("#error_department").text("");
            if (!($.trim(sPardep).length == 0)){                
                $('#submitdep').attr('disabled', false);                
            }
        }
    });
    $("#parent_dep").focusout(function () {
        var sPardep = $('#parent_dep').val();
        if ($.trim(sPardep).length == 0){
                $("#parent_dep").css("border-color", "#cd2d00");
                $('#submitdep').attr('disabled', true);
                $("#error_parentdep").text("Select a Parent Department");               
            } else {
                $("#error_parentdep").text("");
                $("#parent_dep").css("border-color", "#2eb82e");
                if (!($("#department_name").val() == "")) {                    
                    $('#submitdep').attr('disabled', false);                    
                }
        }
    });
    function dismissDepartmentaction(){
       $("#department_name").css("border-color", "");  
        $("#department_name").val('');
        $("#error_department").text("");        
        $("#parent_dep").css("border-color", "");  
        $("#parent_dep").val('');
        $("#error_parentdep").text("");
        $('#submitdep').attr('disabled', false); 
    }
    $("#department_dismiss2").click(function() {
        dismissDepartmentaction();
    });
    $("#department_dismiss1").click(function() {
        dismissDepartmentaction();
    });     
    $("#department_form").on("submit",function(){
        var sPardep = $('#parent_dep').val();
        var sDepname = $('#department_name').val();
        if ($("#department_name").val() == '') {
            $("#department_name").css("border-color", "#cd2d00");
            $('#submitdep').attr('disabled', true);
            $("#error_department").text("Enter a Department Name");
        } else {
            $("#department_name").css("border-color", "#2eb82e");
            $("#error_department").text("");
            if (!($.trim(sPardep).length == 0)){                
                $('#submitdep').attr('disabled', false);                
            }
        }
        if ($.trim(sPardep).length == ""){
            $("#parent_dep").css("border-color", "#cd2d00");
            $('#submitdep').attr('disabled', true);
            $("#error_parentdep").text("Select a Parent Department");               
        } else {
            $("#parent_dep").css("border-color", "#2eb82e");
            $("#error_parentdep").text("");
            if (!($.trim(sDepname).length == 0)){
                $('#submitdep').attr('disabled', false);    
            }            
        } 
        if (!($.trim(sPardep).length == 0)){
            if (!($.trim(sDepname).length == 0)){
                if (!($('#submitdep').is('disabled', true))){
                    $.ajax({
                        url : DOMAIN+"/includes/process.php",
                        method : "POST",
                        data : $("#department_form").serialize(),
                        success : function(data){
                            if ($.trim(data) === "DEPARTMENTADDED"){                        
                                $("#department_name").css("border-color", "");
                                $("#error_department").text("");
                                fetch_department();
                                var beforepromsg = "A new <b>Department</b> ( ";
                                var middlepromsg = $("#department_name").val();
                                var afterpromsg = " ) added successfully";
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
                                                    window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=A New Department Is Added Successfully");
                                                    $("#department_name").val('');
                                                } else {
                                                    //alert("New Department added successfully");
                                                    window.location.href = encodeURI(DOMAIN+"/client.php?msg=A New Department Is Added Successfully");
                                                    $("#department_name").val(''); 
                                                }
                                            }
                                        });
                                    }
                                });                            
                            } else {                            
                                $("#department_name").css("border-color", "#cd2d00");
                                $('#submitdep').attr('disabled', true);                    
                                $("#error_department").text("Invalid Department Name");
                                $("#department_name").val('');
                            }
                        }
                    });
                }
            } else {
                $('#submitdep').attr('disabled', true);
            }
        } else {
            $('#submitdep').attr('disabled', true);
        }
    });
    $("#branch_name").focusout(function () {
        var sBranch = $('#branch_name').val();
        if ($.trim(sBranch).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitbra').attr('disabled', true);
            $("#error_branch").text("Enter a Branch Name");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitbra').attr('disabled', false);
            $("#error_branch").text("");
        }
    });
    function branchDismissAction(){
        $("#branch_name").css("border-color", "");  
        $("#branch_name").val('');
        $("#error_branch").text("");
        $('#submitbra').attr('disabled', false);
    }
    $("#branch_dismiss2").click(function() {
        branchDismissAction();   
    });
    $("#branch_dismiss1").click(function() {
        branchDismissAction();
    });
    $("#branch_form").on("submit",function(){
        if ($("#branch_name").val() == '') {
            $("#branch_name").css("border-color", "#cd2d00");
            $('#submitbra').attr('disabled', true);
            $("#error_branch").text("Enter a Branch Name");
        } else {                        
            $.ajax({
                url : DOMAIN+"/includes/process.php",
                method : "POST",
                data : $("#branch_form").serialize(),
                success : function(data){
                    if ($.trim(data) === "BRANCHADDED"){
                        $("#branch_name").css("border-color", "");
                        $("#error_branch").text("");
                        var beforepromsg = "A new <b>Branch</b> ( ";
                        var middlepromsg = $("#branch_name").val();
                        var afterpromsg = " ) added successfully";
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
                                            //alert("New Branch added successfully");
                                            window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=A New Branch Is Aadded successfully");
                                            $("#branch_name").val('');
                                        } else {
                                           //alert("New Branch added successfully");
                                            window.location.href = encodeURI(DOMAIN+"/client.php?msg=A New Branch Is Aadded successfully");
                                            $("#branch_name").val(''); 
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        $("#branch_name").css("border-color", "#cd2d00");
                        $('#submitbra').attr('disabled', true);                       
                        $("#error_branch").text("Invalid Branch Name");
                        $("#branch_name").val('');
                    }
                },       
            });
        }
    });
    $("#device_name").focusout(function () {
        var sDevicename = $('#device_name').val();
        if ($.trim(sDevicename).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicename").text("Enter a Device Name");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_devicename").text("");
        }   
    });
    $("#device_brand").focusout(function () {
        var sDevicebrand = $('#device_brand').val();
        if ($.trim(sDevicebrand).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicebrand").text("Enter the Device Brand");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_devicebrand").text("");
        }   
    });
    $("#device_model").focusout(function () {
        var sDevicemodel = $('#device_model').val();
        if ($.trim(sDevicemodel).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicemodel").text("Enter the Device Model No.");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_devicemodel").text("");
        }   
    });
    function validateSelectbranch(){
        if (document.device_form.select_branch.value == ""){
            return false;
        } else {
            return true;
        }
    }
    $("#select_branch").focusout(function () {
        if (!validateSelectbranch()){
            $("#select_branch").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicebranch").text("Select a Branch");               
        } else {
            $("#select_branch").css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_devicebranch").text("");
        }
    });
    function validateSelectdepartment(){
        if (document.device_form.select_dep.value == ""){
            return false;
        } else {
            return true;
        }
    }
    $("#select_dep").focusout(function () {
        if (!validateSelectdepartment()){
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicedepartment").text("Select a Department");               
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_devicedepartment").text("");
        }
    });
    $("#device_installationdate").focusout(function () {
        var sDeviceinstallationdate = $('#device_installationdate').val();
        if ($.trim(sDeviceinstallationdate).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicedoi").text("Enter the Installation Date");          
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_devicedoi").text("");
        }   
    });
    $("#remarks").focusout(function () {
        var sDeviceremarks = $('#remarks').val();
        if ($.trim(sDeviceremarks).length == 0) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_deviceremarks").text("Enter the Remarks");          
        } else if ($.trim(sDeviceremarks).length < 3) {
            $(this).css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_deviceremarks").text("Too short Remarks");          
        }else {
            $(this).css("border-color", "#2eb82e");
            $('#submitdev').attr('disabled', false);
            $("#error_deviceremarks").text("");
        }   
    });
    function clearDevicefield(){
        $("#device_name").val('');
        $("#device_name").css("border-color", "");                                                        
        $("#error_devicename").text("");
        $("#device_brand").val('');
        $("#device_brand").css("border-color", "");                                                        
        $("#error_devicebrand").text("");
        $("#device_model").val('');
        $("#device_model").css("border-color", "");                                                        
        $("#error_devicemodel").text("");
        $("#select_branch").val('');
        $("#select_branch").css("border-color", "");                                                        
        $("#error_devicebranch").text("");
        $("#select_dep").val('');
        $("#select_dep").css("border-color", "");                                                        
        $("#error_devicedepartment").text("");
        $("#remarks").val('');
        $("#remarks").css("border-color", "");                                                        
        $("#error_deviceremarks").text("");
        $("#device_installationdate").val('');
        $("#device_installationdate").css("border-color", "");                                                        
        $("#error_devicedoi").text("");
    }
    function deviceDismissAction(){
        clearDevicefield();
        $('#submitdev').attr('disabled', false);
    }
    $("#device_dismiss1").click(function() {
      deviceDismissAction();  
    });
    $("#device_dismiss2").click(function() {
        deviceDismissAction();
    });
    $("#device_form").on("submit",function(){
        var sDevicename = $('#device_name').val();
        var sDevicebrand = $('#device_brand').val();
        var sDevicemodel = $('#device_model').val();
        var sDeviceinstallationdate = $('#device_installationdate').val();
        var sDeviceremarks = $('#remarks').val();
        if ($.trim(sDevicename).length == 0) {
            $("#device_name").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicename").text("Enter a Device Name");          
        }
        if ($.trim(sDevicebrand).length == 0) {
            $("#device_brand").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicebrand").text("Enter the Device Brand");          
        }
        if ($.trim(sDevicemodel).length == 0) {
            $("#device_model").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicemodel").text("Enter the Device Model No.");          
        }
        if (!validateSelectbranch()){
            $("#select_branch").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicebranch").text("Select a Branch");               
        }
        if (!validateSelectdepartment()){
            $("#select_dep").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicedepartment").text("Select a Department");               
        }
        if ($.trim(sDeviceinstallationdate).length == 0) {
            $("#device_installationdate").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_devicedoi").text("Enter the Installation Date");          
        }
        if ($.trim(sDeviceremarks).length == 0) {
            $("#remarks").css("border-color", "#cd2d00");
            $('#submitdev').attr('disabled', true);
            $("#error_deviceremarks").text("Enter the Remarks");          
        }
        if (!($.trim(sDevicename).length == 0)) {
        $('#submitdev').attr('disabled', false);
            if (!($.trim(sDevicebrand).length == 0)) {
            $('#submitdev').attr('disabled', false);
                if (!($.trim(sDevicemodel).length == 0)) {
                $('#submitdev').attr('disabled', false);
                    if (validateSelectbranch()){
                    $('#submitdev').attr('disabled', false);
                        if (validateSelectdepartment()){
                        $('#submitdev').attr('disabled', false);
                            if (!($.trim(sDeviceinstallationdate).length == 0)) {
                            $('#submitdev').attr('disabled', false);
                                if (!($.trim(sDeviceremarks).length == 0)) {
                                $('#submitdev').attr('disabled', false);
                                    if (!($.trim(sDeviceremarks).length < 3)) {
                                    $('#submitdev').attr('disabled', false);
                                        if (!($('#submit').is('disabled', true))){
                                            $.ajax({
                                                url : DOMAIN+"/includes/process.php",
                                                method : "POST",
                                                data : $("#device_form").serialize(),
                                                success : function(data){
                                                    if ($.trim(data) === "DEVICEADDED"){
                                                        var beforepromsg = "A new <b>Device</b> ( ";
                                                        var middlepromsg = $("#device_name").val();
                                                        var afterpromsg = " ) added successfully";
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
                                                                            //alert("New Device added successfully");
                                                                            window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=A New Device Is Added Successfully");
                                                                            clearDevicefield();
                                                                        } else {
                                                                            //alert("New Device added successfully");
                                                                            window.location.href = encodeURI(DOMAIN+"/client.php?msg=A New Device Is Added Successfully");
                                                                            clearDevicefield(); 
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        });                                                        
                                                    } else {
                                                        $("#device_model").val('')
                                                        $("#device_model").css("border-color", "#cd2d00");
                                                        $("#error_devicemodel").text("Invalid Device Model");
                                                        $('#submitdev').attr('disabled', true);                   
                                                    }
                                                }
                                            });
                                        }
                                    } else {
                                        $('#submitdev').attr('disabled', true);
                                    }
                                } else {
                                    $('#submitdev').attr('disabled', true);
                                }
                            } else {
                                $('#submitdev').attr('disabled', true);
                            }
                        } else {
                            $('#submitdev').attr('disabled', true);
                        }
                    } else {
                        $('#submitdev').attr('disabled', true);
                    }
                } else {
                    $('#submitdev').attr('disabled', true);
                }
            } else {
                $('#submitdev').attr('disabled', true);
            }
        } else {
            $('#submitdev').attr('disabled', true);
        }        
    });
    $("#edituserprofiles").click(function() {
        $.ajax({
            url : DOMAIN+"/includes/profilesession.php",
            method : "GET",
            success: function(data){                
                var efid = (data);
                $.ajax({
                    url : DOMAIN+"/includes/process.php",
                    method : "POST",
                    dataType : "json",
                    data : {editProfile:1,id:efid},
                    success : function(data){
                    //    console.log(data);
                        $("#euserid").val(data["id"])
                        $("#efirstname").val(data["firstname"]);
                        $("#elastname").val(data["lastname"]);
                        $("#eusername").val(data["username"]);
                        $("#euserbranch").val(data["remarks"]);                                
                    }
                });
            }
        });
    });
    function validateeFirstname(seFirstname) {
        var filter = /^[a-zA-Z]*$/;
        if (filter.test(seFirstname)) {
            return true;
        } else {
            return false;
        }
    }
    function jqueryactionseFirstname(){
        var seFirstname = $('#efirstname').val();
        if ($.trim(seFirstname).length == 0) {
            $('#efirstname').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_efirstname").text("Enter your First Name");            
        } else if ($('#efirstname').val().length < 3 ) {
                 $('#efirstname').css("border-color", "#cd2d00");
                 $('#esubmituser').attr('disabled', true);
                 $("#error_efirstname").text("Too short First Name");
        } else if (validateeFirstname(seFirstname)) {
            $('#efirstname').css("border-color", "#2eb82e");
            $("#error_efirstname").text("");
            $('#esubmituser').attr('disabled', false);
        } else {
            $('#efirstname').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_efirstname").text("Invalid First Name");    
        }
    }
    $("#efirstname").focusout(function () {
        jqueryactionseFirstname();
    });
    $("#efirstname").keyup(function () {
        jqueryactionseFirstname();
    });
    function validateeLastname(seLastname) {
        var filter1 = /^[a-zA-Z]*$/;
        if (filter1.test(seLastname)) {
            return true;
        } else {
            return false;
        }
    }
    function jqueryactioneLastname(){
        var seLastname = $('#elastname').val();
        if ($.trim(seLastname).length == 0) {
            $('#elastname').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_elastname").text("Enter your Last Name");           
        } else if ($('#elastname').val().length < 3 ) {
                 $('#elastname').css("border-color", "#cd2d00");
                 $('#esubmituser').attr('disabled', true);
                 $("#error_elastname").text("Too short Last Name");                
        } else if (validateeLastname(seLastname)) {
            $('#elastname').css("border-color", "#2eb82e");
            $("#error_elastname").text("");
            $('#esubmituser').attr('disabled', false);
        } else {
            $('#elastname').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_elastname").text("Invalid Last Name");            
        }
    }
    $("#elastname").focusout(function () {
        jqueryactioneLastname();
    });
    $("#elastname").keyup(function (){
        jqueryactioneLastname();
    });
    function validateeUsername(seUsername) {
        var filter2 = /^(?=.*[a-z])[a-z0-9]+(([\.-]?)[a-z0-9]+)*(([\._]?)[a-z0-9]+)*(([\_-]?)[a-z0-9]+)*$/;
        if (filter2.test(seUsername)) {
            return true;
        } else {
            return false;
        }
    }
    function jqueryactionseUsername(){
        var seUsername = $('#eusername').val();
        if ($.trim(seUsername).length == 0) {
            $('#eusername').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_eusername").text("Enter your User Id");           
        } else if ($('#eusername').val().length < 7 ) {
                 $('#eusername').css("border-color", "#cd2d00");
                 $('#esubmituser').attr('disabled', true);
                 $("#error_eusername").text("Too short User Id");              
        } else if (validateeUsername(seUsername)) {
            $('#eusername').css("border-color", "#2eb82e");
            $('#esubmituser').attr('disabled', false);
            $("#error_eusername").text("");
        } else {
            $('#eusername').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_eusername").text("Invalid User Id");            
        }
    }
    $("#eusername").focusout(function () {
        jqueryactionseUsername  ();
    });
    $("#eusername").keyup(function () {
        jqueryactionseUsername();
    });

function validateePassword(sePassword) {
        var filter3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (filter3.test(sePassword)) {
            return true;
        } else {
            return false;
        }
    }    
    function jqueryactionsePassword1(){
        var sePassword = $('#epassword1').val();
        if ($.trim(sePassword).length !== 0) {                   
            if ($('#epassword1').val().length < 9 ) {
                $('#epassword1').css("border-color", "#cd2d00");
                $('#esubmituser').attr('disabled', true);
                $("#error_epassword1").text("Too short Password");                
            } else if (validateePassword(sePassword)) {
                $('#epassword1').css("border-color", "#2eb82e");
                $('#esubmituser').attr('disabled', false);
                $("#error_epassword1").text("");
            } else {
                $('#epassword1').css("border-color", "#cd2d00");
                $('#esubmituser').attr('disabled', true);
                $("#error_epassword1").text("Invalid Password");           
            }
        } else {
            $('#epassword1').css("border-color", "");
            $("#error_epassword1").text("");
            $('#epassword2').css("border-color", "");            
            $("#error_epassword2").text("");
            $('#esubmituser').attr('disabled', false);
            $("#epassword2").val('');
        }
    }
    $("#epassword1").focusout(function () {
        jqueryactionsePassword1();
    });
    $("#epassword1").keyup(function () {
        jqueryactionsePassword1();
    });
    function jqueryactionsePassword2(){
        var sePassword = $('#epassword1').val();
        var sePassword2 = $("#epassword2").val();
        if ($.trim(sePassword2).length == 0) {
            if (!($.trim(sePassword).length == 0)) {
                if (!($.trim(sePassword).length < 9 )) {
                    if (validateePassword(sePassword)){
                        if ($("#epassword2").val() !== $("#epassword1").val()) {
                            $("#epassword2").css("border-color", "#cd2d00");
                            $('#esubmituser').attr('disabled', true);
                            $("#error_epassword2").text("Please Re-Enter your Password");                
                        }
                    } else {
                            $("#epassword1").css("border-color", "#cd2d00");
                            $('#esubmituser').attr('disabled', true);
                            $("#error_epassword1").text("Firt enter the valid Password");
                            $("#epassword2").val('');                    
                    }
                } else {
                    $("#epassword1").css("border-color", "#cd2d00");
                    $('#esubmituser').attr('disabled', true);
                    $("#error_epassword1").text("This is too short Password");
                    $("#epassword2").val('');                
                }
            } else {
                $("#epassword1").css("border-color", "#cd2d00");
                $('#esubmituser').attr('disabled', true);
                $("#error_epassword1").text("First Enter a Password");
                $("#epassword2").val('');           
            }
        } else if (!($.trim(sePassword2).length == 0)) { 
            if ($("#epassword2").val() == $("#epassword1").val()) {
                if (!($.trim(sePassword).length == 0)) {
                    if (!($.trim(sePassword).length < 9 )) {
                        if (validateePassword(sePassword)){
                                $("#epassword2").css("border-color", "#2eb82e");
                                $('#esubmituser').attr('disabled', false);
                                $("#error_epassword2").text("");
                        } else {
                            $("#epassword1").css("border-color", "#cd2d00");
                            $('#esubmituser').attr('disabled', true);
                            $("#error_epassword1").text("Firt enter the valid Password");
                            $("#epassword2").val('');                    
                        }
                    } else {
                        $("#epassword1").css("border-color", "#cd2d00");
                        $('#esubmituser').attr('disabled', true);
                        $("#error_epassword1").text("This is too short Password");
                        $("#epassword2").val('');                
                    }
                } else {
                    $("#epassword1").css("border-color", "#cd2d00");
                    $('#esubmituser').attr('disabled', true);
                    $("#error_epassword1").text("First Enter a Password");
                    $("#epassword2").val('');           
                }
            } else if ($("#epassword2").val() !== $("#epassword1").val()) {
                if (!($.trim(sePassword).length == 0)) {
                    if (!($.trim(sePassword).length < 9 )) {
                        if (validateePassword(sePassword)){
                            $("#epassword2").css("border-color", "#cd2d00");
                            $('#esubmituser').attr('disabled', true);
                            $("#error_epassword2").text("Passwords Do not match");    
                        } else {
                            $("#epassword1").css("border-color", "#cd2d00");
                            $('#esubmituser').attr('disabled', true);
                            $("#error_epassword1").text("Firt enter the valid Password");
                            $("#epassword2").val('');                    
                        }
                    } else {
                        $("#epassword1").css("border-color", "#cd2d00");
                        $('#esubmituser').attr('disabled', true);
                        $("#error_epassword1").text("This is too short Password");
                        $("#epassword2").val('');                
                    }
                } else {
                    $("#epassword1").css("border-color", "#cd2d00");
                    $('#esubmituser').attr('disabled', true);
                    $("#error_epassword1").text("First Enter a Password");
                    $("#epassword2").val('');           
                }    
            }
        }
    }
    $("#epassword2").focusout(function () {
        jqueryactionsePassword2();
    });
    $("#epassword2").keyup(function () {
        jqueryactionsePassword2();
    });
    function jqueryactionseUserbranch(){
        var seUserbranch = $('#euserbranch').val();
        if ($.trim(seUserbranch).length == 0) {
            $('#euserbranch').css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_euserbranch").text("Enter your Branch Name");            
        } else if ($('#euserbranch').val().length < 3 ) {
                 $('#euserbranch').css("border-color", "#cd2d00");
                 $('#esubmituser').attr('disabled', true);
                 $("#error_euserbranch").text("Too short Branch Name");
        } else {            
            $('#euserbranch').css("border-color", "#2eb82e");
            $("#error_euserbranch").text("");
            $('#esubmituser').attr('disabled', false);    
        }
    }
    $("#euserbranch").focusout(function () {
        jqueryactionseUserbranch();
    });
    $("#euserbranch").keyup(function () {
        jqueryactionseUserbranch();
    });
    function ucleareUserfield(){
        $("#efirstname").val('');
        $("#efirstname").css("border-color", "");                                                        
        $("#error_efirstname").text("");
        $("#elastname").val('');
        $("#elastname").css("border-color", "");                                                        
        $("#error_elastname").text("");
        $("#eusername").val('');
        $("#eusername").css("border-color", "");                                                        
        $("#error_eusername").text("");
        $("#epassword1").val('');
        $("#epassword1").css("border-color", "");                                                        
        $("#error_epassword1").text("");
        $("#epassword2").val('');
        $("#epassword2").css("border-color", "");                                                        
        $("#error_epassword2").text("");
        $("#euserbranch").val('');
        $("#euserbranch").css("border-color", "");                                                        
        $("#error_euserbranch").text("");
    }
    function userepDismissAction(){
        ucleareUserfield();
        $('#esubmituser').attr('disabled', false);
    }
    $("#euser_edismiss1").click(function() {
        userepDismissAction();  
    });
    $("#euser_edismiss2").click(function() {
        userepDismissAction();
    });
    $("#edit_profile_form").on("submit",function(){
        var seFirstname = $('#efirstname').val();
        var seLastname = $('#elastname').val();
        var seUsername = $('#eusername').val();
        var sePassword = $('#epassword1').val();
        var sePassword2 = $("#epassword2").val();
        var seUserbranch = $('#euserbranch').val();
        if ($("#efirstname").val() == '') {
            $("#efirstname").css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true); 
            $("#error_efirstname").text("Enter your First Name");            
        }
        if ($("#elastname").val() == '') {
            $("#elastname").css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_elastname").text("Enter your Last Name");           
        }
        if ($("#eusername").val() == '') {
            $("#eusername").css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_eusername").text("Enter your User Id");           
        }
        if ($("#euserbranch").val() == '') {
            $("#euserbranch").css("border-color", "#cd2d00");
            $('#esubmituser').attr('disabled', true);
            $("#error_euserbranch").text("Enter a Branch");            
        }        
        if ($("#epassword1").val() !== ''){
            if(validateePassword(sePassword)){
                if ($("#epassword2").val() == '') {
                    $("#epassword2").css("border-color", "#cd2d00");
                    $('#esubmituser').attr('disabled', true);
                    $("#error_upassword2").text("Confirm your Password");
                }
            } else {
                $("#epassword1").css("border-color", "#cd2d00");
                $("#error_epassword1").text("First Enter Valid Password");
                $("#epassword2").val('');
                $("#epassword2").css("border-color", "");
                $("#error_epassword2").text("");
                $("#esubmituser").attr('disabled', true);
            }            
        } 
        if (($("#epassword2").val()) == ($("#epassword1").val())) {
            if (validateeFirstname(seFirstname)) {
                $('#esubmituser').attr('disabled', false);
                if (!($.trim(seFirstname).length == 0)) {
                    $('#esubmituser').attr('disabled', false);
                    if (!($.trim(seFirstname).length < 3 )) {
                        $('#esubmituser').attr('disabled', false);
                        if (!($.trim(seLastname).length == 0)) {
                            $('#esubmituser').attr('disabled', false);
                            if (!($.trim(seLastname).length < 3 )) {
                                $('#esubmituser').attr('disabled', false);
                                if (validateeLastname(seLastname)) {
                                    $('#esubmituser').attr('disabled', false);
                                    if (!($.trim(seUserbranch).length == 0)){
                                        $('#esubmituser').attr('disabled', false);
                                        if (!($.trim(seUserbranch).length < 3)){
                                            $('#esubmituser').attr('disabled', false);
                                            if (!($.trim(seUsername).length == 0)) {
                                                $('#esubmituser').attr('disabled', false);
                                                if (!($.trim(seUsername).length < 7)) {
                                                    $('#esubmituser').attr('disabled', false);
                                                    if (validateeUsername(seUsername)) {
                                                        $('#esubmituser').attr('disabled', false);                                                        
                                                        if (!($("#epassword2").val() !== $("#epassword1").val())) {
                                                            $('#esubmituser').attr('disabled', false);
                                                            if (!($('#submit').is('disabled', true))){  
                                                                $(".overlay").show();
                                                                $.ajax({
                                                                    url : DOMAIN+"/includes/process.php",
                                                                    method : "POST",
                                                                    data : $("#edit_profile_form").serialize(),
                                                                    success: function(data){
                                                                        if ($.trim(data) === "UPDATED"){
                                                                            $(".overlay").hide();
                                                                            var beforepromsg = "The <b>User</b> ( ";
                                                                            var middlepromsg = $("#efirstname").val();
                                                                            var middlepromsg1_2 = (" ");
                                                                            var middlepromsg2 = $("#elastname").val();                            
                                                                            var afterpromsg = " ) updated his profile successfully";
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
                                                                                                window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=Your Profile Was Updated Successfully");
                                                                                                ucleareUserfield();   
                                                                                            } else if ($.trim(data) == "Normal_User"){
                                                                                                window.location.href = encodeURI(DOMAIN+"/client.php?msg=Your Profile Was Updated Successfully");
                                                                                                ucleareUserfield();
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        } else {
                                                                            $('#esubmituser').attr('disabled', true);
                                                                            $("#eusername").val('');
                                                                            $("#eusername").css("border-color", "#cd2d00");
                                                                            $("#error_eusername").text("Invalid User Id");
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                $('#esubmituser').attr('disabled', true);
                                                            }
                                                        } else {
                                                            $('#esubmituser').attr('disabled', true);
                                                        }                                                        
                                                    } else {
                                                        $('#esubmituser').attr('disabled', true);
                                                    }
                                                } else {
                                                    $('#esubmituser').attr('disabled', true);
                                                }
                                            } else {
                                                $('#esubmituser').attr('disabled', true);
                                            }
                                        } else {
                                            $('#esubmituser').attr('disabled', true);
                                        }
                                    } else {
                                        $('#esubmituser').attr('disabled', true);
                                    }
                                } else {
                                    $('#esubmituser').attr('disabled', true);
                                }
                            } else {
                                $('#esubmituser').attr('disabled', true);
                            }
                        } else {
                            $('#esubmituser').attr('disabled', true);
                        }
                    } else {
                        $('#esubmituser').attr('disabled', true);
                    }
                } else {
                    $('#esubmituser').attr('disabled', true);
                }
            } else {
                $('#esubmituser').attr('disabled', true);
            }
        }        
    });       
});
