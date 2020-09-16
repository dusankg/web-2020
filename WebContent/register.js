$(document).ready(function(){
	
	$("#formRegister").submit(function(event){
		event.preventDefault();

		let username = $("#username").val();
		let password = $("#password").val();
		let firstName = $("#name").val();
		let lastName = $("#lastName").val();
		let male = $("#male:checked").val();
		let confirm_password = $("#confirm-password").val();
		let gender;
		if(male){
			gender = "True";
			//alert("Musko");
		}else {
			gender = "False";
			//alert("Zensko");
		}
		if (password === confirm_password){
					$.post({
						url : "rest/register",
						data : JSON.stringify({username, password, firstName, lastName, gender}),
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