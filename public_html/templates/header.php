<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
  <a class="navbar-brand" href="#">
    <img src="./images/adbl1.png">
  </a>
  <a class="navbar-brand">Agricultural Development Bank Inventory Management System</a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar navbar-nav navbar-right">
      <li class="nav-item active">
        <a class="nav-link fa fa-home" href="http://localhost/inv_projecthamro/public_html/dashboard.php">&nbsp;<font style="color: white; text-decoration: none; font-weight: 100; font-family: sans-serif;letter-spacing: 0.35px;">Home</font><span class="sr-only">(current)</span></a>
      </li>      
        <?php
          if (isset($_SESSION["id"])) {
            ?>
              <li class="nav-item active">
                <a class="nav-link fa fa-user" href="logout.php"><font style="color: white; text-decoration: none; font-weight: 100; font-family: sans-serif;letter-spacing: 0.35px;">&nbsp;Logout</font></a> 
              </li>
            <?php
          }
        ?>    
      
    </ul>
  </div>
</nav>
</br></br>


