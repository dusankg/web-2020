$(document).ready(function (){

	$("#aHrefPrijava").click(function(){
		//da pobjeli samo dugme login ostala da budu normalna
		$("#aHrefPrijava").css("color","white");
		$("#aHrefHome").css("color","gray");
		$("#aHrefRegister").css("color","gray");
		$("#aHrefAbout").css("color","gray");
		$("#aHrefHelp").css("color","gray");
		$("#aHrefContact").css("color","gray");


		$("#formPrijava").html("");
		let username = $("<input type='text' id = 'usernameLogin'>");
		let password = $("<input type='password' id = 'passwordLogin'>");

		$("#formPrijava").append("<h1 id = 'h1Login'>Login</h1><hr>");
		$("#formPrijava").append("<label id = 'labelUsername'>Username : </label>");
		$("#formPrijava").append("<input type='text' placeholder='e.g. username1' id = 'inputUsername'><br>");
		$("#formPrijava").append("<label id = 'labelPassword'>Password : </label>");
		$("#formPrijava").append("<input type='password' placeholder='e.g. password1' id = 'inputPassword'><br><br>");
		$("#formPrijava").append("<label id = 'labelRole'>Role : </label>");
		$("#formPrijava").append("<select class = 'mdb-select md-form' id = 'roleLogin'><option>Administrator</option><option>Customer</option><option>Seller</option></select><br> <br>");

		$("#h1Login").css("font-family","Indie Flower");
		$("#labelUsername").css("font-family","Indie Flower");
		$("#labelPassword").css("font-family","Indie Flower");
		$("#labelRole").css("font-family","Indie Flower");
		
		$("#formPrijava").append("<button type='submit' class='btn btn-outline-secondary'>Sign in</button>");
		

		
	});

	$("#formPrijava").submit(function(event){
		event.preventDefault();
		
		let usernamePrijava = $("#inputUsername").val();
		let passwordPrijava = $("#inputPassword").val();
		let rolePrijava = $("#roleLogin option:selected").text();

		let urlLogin = "rest/login/";
		urlLogin+=usernamePrijava+","+passwordPrijava+","+rolePrijava;
		console.log(urlLogin);


		$.get({
			url : urlLogin,
			contentType : "application/json",
			success : function(message){
				console.log(message[0]);
				if(message[0] === "Administrator"){
					window.location = "./indexAdmin.html";
				}
				else if(message[0]==="Customer"){
					window.location = "./indexCustomer.html";
				}else {
					window.location = "./indexSeller.html";
				}
				alert("You are logged!");
			},
			error : function(message){
				alert("Username and password not match!");
			}
		});

	});

});

