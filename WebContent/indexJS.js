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

		$("#formPrijava").append("<br><h1 id = 'h1Login'>Login</h1><hr>");
		$("#formPrijava").append("<label id = 'labelUsername'>Username : </label>");
		$("#formPrijava").append("<input type='text' placeholder='e.g. username1' id = 'inputUsername'><br>");
		$("#formPrijava").append("<label id = 'labelPassword'>Password : </label>");
		$("#formPrijava").append("<input type='password' placeholder='e.g. password1' id = 'inputPassword'><br><br>");
		
		$("#h1Login").css("font-family","Indie Flower");
		$("#labelUsername").css("font-family","Indie Flower");
		$("#labelPassword").css("font-family","Indie Flower");
		
		$("#formPrijava").append("<button type='submit' class='btn btn-outline-secondary'>Sign in</button>");
		

		
	});

	$("#formPrijava").submit(function(event){
		event.preventDefault();
		
		let usernamePrijava = $("#inputUsername").val();
		let passwordPrijava = $("#inputPassword").val();

		let data = {
			username: usernamePrijava,
			password: passwordPrijava,
			firstName: "",
			lastName: "",
			male: undefined,
			role: "",
			myApartments: [],
			rentedApartments: [],
			reservationList: []
		}
		
		$.post({
			url : 'rest/login',
			data: JSON.stringify(data),
			contentType : "application/json",
			success : function(message){
				console.log(message);
				if(message === "Admin"){
					window.location = "./adminPage.html";
					alert("You are logged!");
				}
				else if(message === "Guest"){
					window.location = "./guestPage.html";
					alert("You are logged!");
				}else if (message === "Host"){
					window.location = "./hostPage.html";
					alert("You are logged!");
				} else {
					alert(message);
				}
			},
			error : function(message){
				alert("There was mistake on server!");
			}
		});

	});

});

