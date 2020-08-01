$(document).ready(function(){
	
	$("#formRegister").submit(function(event){
		event.preventDefault();

		let username = $("#username").val();
		let password = $("#password").val();
		let name = $("#name").val();
		let lastName = $("#lastName").val();
		let male = $("#male:checked").val();
		let confirm_password = $("#confirm-password").val();
		let pol;
		if(male){
			pol = "True";
			alert("Musko");
		}else {
			pol = "False";
			alert("Zensko");
		}
		if (password === confirm_password){
					$.post({
						url : "rest/register",
						data : JSON.stringify({username,name,lastName,pol,password}),
						contentType: "application/json",
						success : function(){
							alert("You are registred");
							window.location = "./index.html";
						},
						error : function(){
							alert("Username already exists.");
						}
					});
		} else {
			alert("Passwords do not match" + pol);
		}
	



	});
	
});