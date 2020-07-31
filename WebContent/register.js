$(document).ready(function(){
	
	$("#formRegister").submit(function(event){
		event.preventDefault();

		let username = $("#username").val();
		let password = $("#password").val();
		let name = $("#name").val();
		let lastName = $("#lastName").val();
		let role = "customer";
		let tel = $("#tel").val();
		let city = $("#city").val();
		let email = $("#email").val();
		let date = $("#date").val();

		$.post({
			url : "rest/register",
			data : JSON.stringify({username,password,name,lastName,role,tel,city,email,date}),
			contentType: "application/json",
			success : function(){
				alert("You are registred.");
				window.location = "./index.html";
			},
			error : function(){
				alert("Username already exists.");
			}
		});


	});
	
});