function initHide(){
	$("#divRezervacije").hide();
	$("#divMyAccount").hide();
	$("#divSviGosti").hide();
	
	$("#divPrihvacene").hide();
	$("#divOdbijene").hide();
	$("#divSearchInfo").hide();
}

function initShowButtons(){
	initHide();
	// glavni
	{
		$("#showOffer").click( function(){
			$("#divOffer").show();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divSviGosti").hide();
			$("#divSearchInfo").hide();
			$("#divInfoForReservation").hide();
			getApartments();
		});	
		$("#showRezervacije").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").show();
			$("#divMyAccount").hide();
			$("#divSviGosti").hide();
			$("#divSearchInfo").hide();
		});	
		$("#aHrefRezervacije").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").show();
			$("#divMyAccount").hide();
			$("#divSviGosti").hide();
			$("#divSearchInfo").hide();
		});	
		$("#showMyAccount").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").show();
			$("#divSviGosti").hide();
			$("#divSearchInfo").hide();
			getLoggedUserData();
		});	
		$("#showSviGosti").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divSviGosti").show();
			$("#divSearchInfo").hide();
		});	
		$("#opetSearchBox").click( function(){
			$("#divOffer").show();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divSviGosti").hide();
			$("#divSearchInfo").show();
			getApartments();
			$("#searchStartDate").val('');
			$("#searchEndDate").val('');
			$("#searchCity").val('');
			$("#searchGuests").val('');
			$("#searchMinPrice").val('');
			$("#searchMaxPrice").val('');
			$("#searchMinRooms").val('');
			$("#searchMaxRooms").val('');
			$("#divInfoForReservation").show();
			
		});	
	}	
	// rezervacije
	{
		$("#showKreirane").click( function(){
			$("#divKreirane").show();
			$("#divPrihvacene").hide();
			$("#divOdbijene").hide();
		});	
		$("#showPrihvacene").click( function(){
			$("#divKreirane").hide();
			$("#divPrihvacene").show();
			$("#divOdbijene").hide();
		});	
		$("#showOdbijene").click( function(){
			$("#divKreirane").hide();
			$("#divPrihvacene").hide();
			$("#divOdbijene").show();
		});	

	}
	

}

function editAccount(){
	$("#submitEdit").click(function(){
		let username = $('input#username').val();
		let password = $('input#password').val();
		let firstName = $('input#name').val();
		let lastName = $('input#lastName').val();
		let confirmPassword = $('input#confirm-password').val();
		
		if(password == '' || firstName== '' || lastName == ''){
			alert('Please fill all mandatory fields');
			return;
		}
		
		if(password != confirmPassword){
			alert('Passwords do not match');
			return;
		}
		
		
		let gender;
		if ($('input#male:checked').val()){
			gender = true;
		} else {
			gender = false;
		}
		let data = {
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName,
			gender: gender
		};
		$.ajax({
			type: "PUT",
			url: 'rest/user',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: function() {
				initHide();
			}
		})
	});
}

function dodajApartmanTr(apartman){
	let c = "<tr align='center'> " +
			" <td>" + apartman.id + "</td> " +
			" <td>" + apartman.type + "</td> " +
			" <td>" + apartman.pricePerNight + "</td> " +
			" <td>" + apartman.numberOfRooms + "</td> " +
			" <td>" + apartman.numberOfGuests + "</td> " +
 			" <td>" + apartman.location.address.city + "</td> " +
			" <td> <button id='detaljiApartmana" + apartman.id + "' class='btn-edit'> Details </button></td>" +
			" <td> <button id='bookApartment" + apartman.id + "' class= 'btn-add' >  Book </button></td> </tr>; ";
	$("#tablePrikazApartmana").append(c);
}

function dodajKomentarTr(komentar){
	let c = "<tr align='center'> " +
	" <td>" + komentar.guest + "</td> " +
	" <td>" + komentar.text + "</td> " +
	" <td>" + komentar.grade + "</td> ";
	$("#tableKomentari").append(c);
}



function getCommentsForApartment(id){
	$('#tableKomentari tbody').empty();
	$.ajax({
		
		type: "GET",
		url: 'rest/comment/' + id,
		contentType: 'application/json',
		success: function(komentari) {
	    	for(let komentar of komentari) {
	    		dodajKomentarTr(komentar);
				}
		}
	});	
}

function dodajKreiraneTr(rezervacija){
	let c = "<tr align='center'> " +
			" <td> "+ rezervacija.id +" </td> " +
			" <td> "+ rezervacija.apartment +"</td> " +
			" <td> "+ rezervacija.startDate +" </td> " +
			" <td> "+ rezervacija.numberOfNights +" </td> " +
			" <td> "+ rezervacija.price +" </td> " +
			" <td> "+ rezervacija.reservationMessage +" </td> " +
 			" <td> "+ rezervacija.status +" </td> " +
			" <td> <button id='cancelReservation"+ rezervacija.id +"' class='btn-delete'> Cancel </button></td> </tr>; ";
	$("#tablePrikazKreirane").append(c);
}

function dodajPrihvaceneTr(rezervacija){
	
	let c = "<tr align='center'> " +
	" <td> "+ rezervacija.id +" </td> " +
	" <td> "+ rezervacija.apartment +"</td> " +
	" <td> "+ rezervacija.startDate +" </td> " +
	" <td> "+ rezervacija.numberOfNights +" </td> " +
	" <td> "+ rezervacija.price +" </td> " +
	" <td> "+ rezervacija.reservationMessage +" </td> " +
	" <td> "+ rezervacija.status +" </td> " +
	" <td> <button id='openCommentBox"+ rezervacija.id +"' class='btn-edit'> Comment </button></td> </tr>; " ;
	
	if(rezervacija.status === "Accepted"){
		$("#tablePrikazPrihvacene").append(c + " <td> <button id='cancelReservation"+ rezervacija.id +"' class='btn-delete'> Cancel </button></td> </tr>;");
	} else {
		$("#tablePrikazPrihvacene").append(c);
	}
}

function dodajOdbijeneTr(rezervacija){
	let c = "<tr align='center'> " +
			" <td> "+ rezervacija.id +" </td> " +
			" <td> "+ rezervacija.apartment +"</td> " +
			" <td> "+ rezervacija.startDate +" </td> " +
			" <td> "+ rezervacija.numberOfNights +" </td> " +
			" <td> "+ rezervacija.price +" </td> " +
			" <td> "+ rezervacija.reservationMessage +" </td> " +
 			" <td> "+ rezervacija.status +" </td> " +
			" <td> <button id='openCommentBox"+ rezervacija.id +"' class='btn-edit'> Comment </button></td> </tr>; ";
 			$("#tablePrikazOdbijene").append(c);
}



function getLoggedUserData(){
	$.get({
		type: "GET",
		url: 'rest/loggedIn',
		success: function(user) {
			console.log(user);
			$('input#username').val(user.username);
			$('input#password').val(user.password);
			$('input#name').val(user.firstName);
			$('input#lastName').val(user.lastName);
			if(user.gender == true){
				$('input#male').prop("checked", true);
			} else {
				$('input#female').prop("checked", true);
			}
		}
	})
}

function getApartments(){
	$("#tablePrikazApartmana tbody").empty();
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/active',
		contentType: 'application/json',
		success: function(oglasi) {
	    	for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
				 	$( "#detaljiApartmana" +apartman.id).click(function() {
						getApartmentById(apartman.id);
						getCommentsForApartment(apartman.id);
						
					});
				 	$( "#bookApartment" +apartman.id).click(function() {
				 		makeNewReservation(apartman);						
					});
				}
		}
	});	
}

function getApartmentById(id){
	$('#tableSadrzaj tbody').empty();
	$.ajax({
		
		type: "GET",
		url: 'rest/amenity/' + id,
		contentType: 'application/json',
		success: function(amenities) {
	    	for(let amenity of amenities) {
				dodajSadrzajTr(amenity);
				}
		}
	});	
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/' + id,
		contentType: 'application/json',
		success: function(apartman) {
			$('input#txtIdApartmana').val(apartman.id);
			$('input#txtDomacin').val(apartman.host);
			$('input#editApartmentStatus').val(apartman.status);
			$('input#editApartmentType').val(apartman.type);
			$('input#editApartmentRooms').val(apartman.numberOfRooms);
			$('input#editApartmentGuests').val(apartman.numberOfGuests);
			$('input#editApartmentPrice').val(apartman.pricePerNight);
			$('input#txtVremePrijave').val(apartman.checkInTime);
			$('input#txtVremeOdjave').val(apartman.checkOutTime);
			
			$('input#txtCityApartmana').val(apartman.location.address.city);
			$('input#txtStreetApartmana').val(apartman.location.address.streetAndNumber);
			if(apartman.images[0] != ''){
				$("#base64image").attr("src",apartman.images[0]);
			} else {
				$("#base64image").attr("src",null);
			}
			

		}
	});	

}

function dodajSadrzajTr(amenity){
	let c = "<tr align='center'> " +
	" <td>" + amenity.name + "</td> "
	$("#tableSadrzaj").append(c);
}

function makeNewReservation(apartman){
		
		console.log("Pokretanje funcije za pravljenje nove rezervacije");
		event.preventDefault();
		
		var apartment = apartman.id;
		var startingDate = $("#reservationStartDate");
		var numberOfNights = $("#reservationBrojNocenja");
		var reservationMessage = $("#reservationMessage");

		if(startingDate.val() == '' || numberOfNights.val() == ''){
			alert('You need to enter starting date and number of nights');
			return;
		}
		//console.log(checkInTime.val());
		var reservation = new Object();
		
		reservation.apartment = apartment;
		reservation.startDate = startingDate.val();
		reservation.numberOfNights = numberOfNights.val();
		reservation.reservationMessage = reservationMessage.val();
		reservation.price = numberOfNights.val() * apartman.pricePerNight;

		console.log(reservation);
		$.post({
			url : 'rest/reservation',
			data : JSON.stringify(reservation),
			contentType : 'application/json',
			success : function(data) {
				alert("Apartments booked successfully");
				$("#tablePrikazKreirane").empty();
				location.reload();
			},
			error : function(data) {
				alert("Apartments not booked successfully, something went wrong");
			}
		});
		

}

function cancelReservation(reservation){
		//alert("Canceling");
 		$.ajax({
 			
 			type: "PUT",
 			url: 'rest/reservation/withdraw',
 			data : JSON.stringify(reservation),
 			contentType: 'application/json',
 			success: function() {
 				alert("Reservation canceled successfully");
		 		$("#tablePrikazPrihvacene tbody").empty();
		 		$("#tablePrikazKreirane tbody").empty();
 				getReservations();
 			}, 
 			error: function(){
 				alert("Reservation not canceled, something went wrong");
 			}
 		});	
}

function openCommentBox(reservation){
	console.log("Otvaranje boxa za komentar");
	$("#idApartmanaZaKomentar").val(reservation.id);
}

function sendComment(){
 	$( "#btnPosaljiKomentar").click(function() {
 		
		console.log("Pokretanje funcije za slanje komentara");
		event.preventDefault();
		
		var apartment = $("#idApartmanaZaKomentar");
		var grade = $("#idOcenaZaKomentar");
		var text = $("#textKomentara");
		
		if(grade.val() == ''){
			alert('You need to enter grade before sumbitng comment');
			return;
		}
		if(apartment.val() == ''){
			alert('You need to select reservation firts');
			return;
		}
		//console.log(checkInTime.val());
		var comment = new Object();
		
		comment.apartment = apartment.val();
		comment.grade = grade.val();
		comment.text = text.val();

		console.log(comment);
		$.post({
			url : 'rest/comment',
			data : JSON.stringify(comment),
			contentType : 'application/json',
			success : function() {
				alert("Comment sent successfully");
				$("#idApartmanaZaKomentar").val('');
				$("#idOcenaZaKomentar").val('');
				 $("#textKomentara").val('');

			},
			error : function() {
				alert("Comment not sent, something went wrong");
			}
		});
	});
}

function getReservations(){ 
	
	$.ajax({
		
		type: "GET",
		url: 'rest/reservation/my',
		contentType: 'application/json',
		success: function(reservations) {
	    	for(let reservation of reservations) {
	    		if(reservation.status === "Created"){
	    			dodajKreiraneTr(reservation);
	    			
				 	$( "#cancelReservation" +reservation.id).click(function() {
				 		cancelReservation(reservation);
					});
				 	
	    		} else if(reservation.status === "Accepted" || reservation.status === "Finished"){
	    			dodajPrihvaceneTr(reservation);
				 	$( "#cancelReservation" +reservation.id).click(function() {
				 		cancelReservation(reservation);
					});
				 	$( "#openCommentBox" +reservation.id).click(function() {
				 		openCommentBox(reservation);
					});
	    		} else if (reservation.status === "Rejected" ){ 
	    			dodajOdbijeneTr(reservation);
	    		}
	    		
				}
		}
	});
}

function logout(){
 	$( "#logout").click(function() {
 		$.ajax({
 			type: "GET",
 			url: 'rest/logout',
 			contentType: 'application/json',
 			success: function() {
 				window.location.href = "http://localhost:8080/Airbnb/";
 			}
 		});
 		
	});
}

function SortByPrice(a, b){
	  var aName = a.pricePerNight;
	  var bName = b.pricePerNight; 
	  return ((bName < bName) ? -1 : ((bName > aName) ? 1 : 0));
}

function sortApartmentsByPrice(){
 	$( "#sortApartmentsByPrice").click(function() {
 		
 		if($( "#sortApartmentsByPrice").val() != 1){
 			$( "#sortApartmentsByPrice").val(1);
 		} else {
 			$( "#sortApartmentsByPrice").val(2);
 		}
 		
 		
 		//alert("Sortiranje po ceni");
 		$("#tablePrikazApartmana tbody").empty();
 		$.ajax({
 			
 			type: "GET",
 			url: 'rest/apartment/active',
 			contentType: 'application/json',
 			success: function(oglasi) { // treba da sortiram listu oglasi 	
 				
 				for(let i = 0; i < oglasi.length - 1; i++){
 					for(let j = i+1; j < oglasi.length; j++){
 	 					if(oglasi[i].pricePerNight > oglasi[j].pricePerNight){
 	 						temp = oglasi[i];
 	 						oglasi[i] = oglasi[j];
 	 						oglasi[j] = temp;
 	 					}
 					}
 				}
 				
 				if($( "#sortApartmentsByPrice").val() != 1){
 					oglasi.reverse();
 				}

 		    	for(let apartman of oglasi) {
 					dodajApartmanTr(apartman);
 					 	$( "#detaljiApartmana" +apartman.id).click(function() {
 							getApartmentById(apartman.id);
 							getCommentsForApartment(apartman.id);
 							
 						});
 					 	$( "#bookApartment" +apartman.id).click(function() {
 					 		makeNewReservation(apartman);						
 						});
 					}
 			}
 		});	
	});
}

function sortApartmentsByRooms(){
 	$( "#sortApartmentsByRooms").click(function() {
 		
 		if($( "#sortApartmentsByRooms").val() != 1){
 			$( "#sortApartmentsByRooms").val(1);
 		} else {
 			$( "#sortApartmentsByRooms").val(2);
 		}
 		
 		$("#tablePrikazApartmana tbody").empty();
 		$.ajax({
 			
 			type: "GET",
 			url: 'rest/apartment/active',
 			contentType: 'application/json',
 			success: function(oglasi) { // treba da sortiram listu oglasi 	
 				for(let i=0; i<oglasi.length - 1;i++){
 					for(let j = i+1; j < oglasi.length; j++ ){
 	 					if(oglasi[i].numberOfRooms > oglasi[j].numberOfRooms){
 	 						temp = oglasi[i];
 	 						oglasi[i] = oglasi[j];
 	 						oglasi[j] = temp;
 	 					}
 					}

 				}
 				
 				if($( "#sortApartmentsByRooms").val() != 2){
 					oglasi.reverse();
 				}
 				
 		    	for(let apartman of oglasi) {
 					dodajApartmanTr(apartman);
 					 	$( "#detaljiApartmana" +apartman.id).click(function() {
 							getApartmentById(apartman.id);
 							getCommentsForApartment(apartman.id);
 							
 						});
 					 	$( "#bookApartment" +apartman.id).click(function() {
 					 		makeNewReservation(apartman);						
 						});
 					}
 			}
 		});	
	});
}

function sortReservationByPrice(){

 	$( "#sortReservationsByPrice").click(function() {
 		
 		if($( "#sortReservationsByPrice").val() != 1){
 			$( "#sortReservationsByPrice").val(1);
 		} else {
 			$( "#sortReservationsByPrice").val(2);
 		}
 		
 		$("#tablePrikazKreirane tbody").empty();
 		$("#tablePrikazPrihvacene tbody").empty();
 		$("#tablePrikazOdbijene tbody").empty();
 		$.ajax({
 			
 			type: "GET",
 			url: 'rest/reservation/my',
 			contentType: 'application/json',
 			success: function(reservations) {
 				
 				console.log($( "#sortReservationsByPrice").val());
 				for(let i=0; i<reservations.length;i++){
 					for(let j = i+1; j < reservations.length; j++){
 	 					if(reservations[i].price > reservations[j].price){
 	 						temp = reservations[i];
 	 						reservations[i] = reservations[j];
 	 						reservations[j] = temp;
 	 					}
 					}
 				}
 				
 				if($( "#sortReservationsByPrice").val() != 2){
 					reservations.reverse();
 				}
 				
 				
 				
 		    	for(let reservation of reservations) {
 		    		if(reservation.status === "Created"){
 		    			dodajKreiraneTr(reservation);
 		    			
 					 	$( "#cancelReservation" +reservation.id).click(function() {
 					 		cancelReservation(reservation);
 						});
 					 	
 		    		} else if(reservation.status === "Accepted" || reservation.status === "Finished"){
 		    			dodajPrihvaceneTr(reservation);
 					 	$( "#cancelReservation" +reservation.id).click(function() {
 					 		cancelReservation(reservation);
 						});
 					 	$( "#openCommentBox" +reservation.id).click(function() {
 					 		openCommentBox(reservation);
 						});
 		    		} else if (reservation.status === "Rejected" ){ 
 		    			dodajOdbijeneTr(reservation);
 		    		}
 		    		
 					}
 			}
 		});
	});
}

function filterByType(){
 	$("#typeZaFiltraciju").change(function() {
 		$("#tablePrikazApartmana tbody").empty();
 		$.ajax({
 			
 			type: "GET",
 			url: 'rest/apartment/active',
 			contentType: 'application/json',
 			success: function(oglasi) {
 		    	for(let apartman of oglasi) {
 		    		
 		    		if($("#typeZaFiltraciju").val() == '' || apartman.type.toLowerCase().includes($("#typeZaFiltraciju").val().toLowerCase())){
 	 					dodajApartmanTr(apartman);
 					 	$( "#detaljiApartmana" +apartman.id).click(function() {
 							getApartmentById(apartman.id);
 							getCommentsForApartment(apartman.id);
 							
 						});
 					 	$( "#bookApartment" +apartman.id).click(function() {
 					 		makeNewReservation(apartman);						
 						});
 		    		}

 					}
 			}
 		});	
 		
	});
}
function search(){	
 	$( "#search").click(function() {
 		
 		event.preventDefault();
 		$("#tablePrikazApartmana tbody").empty();

 		var startDate = $("#searchStartDate");
 		var endDate = $("#searchEndDate");
 		var city = $("#searchCity");
 		var guests = $("#searchGuests");
 		
 		var minPrice = $("#searchMinPrice");
 		var maxPrice = $("#searchMaxPrice");
 		var minRooms = $("#searchMinRooms");
 		var maxRooms = $("#searchMaxRooms");

 		//console.log(checkInTime.val());
 		var filter = new Object();
 		
 		if(startDate.val() == ""){
 			filter.startDate = null;
 		} else filter.startDate = startDate.val();
 		
 		if(endDate.val() == ""){
 			filter.endDate = null;
 		} else filter.endDate = endDate.val();
 		
 		if(city.val() == ""){
 			filter.city = null;
 		} else filter.city = city.val();
 		
 		if(minPrice.val() == ""){
 			filter.minPrice = null;
 		} else filter.minPrice = minPrice.val();
 		
 		if(maxPrice.val() == ""){
 			filter.maxPrice = null;
 		} else filter.maxPrice = maxPrice.val();
 		
 		if(minRooms.val() == ""){
 			filter.minRoomNumber = null;
 		} else filter.minRoomNumber = minRooms.val();
 		
 		if(maxRooms.val() == ""){
 			filter.maxRoomNumber = null;
 		} else filter.maxRoomNumber = maxRooms.val();
 		
 		if(guests.val() == ""){
 			filter.guestNumber = null;
 		} else filter.guestNumber = guests.val();
 		
 		
 		
 		console.log(filter);
 		$.ajax({
 			type: "POST",
 			url: 'rest/apartment/search',
			data : JSON.stringify(filter),
 			contentType: 'application/json',
 			success: function(oglasi) {
 				console.log(oglasi);
 		    	for(let apartman of oglasi) {
 					dodajApartmanTr(apartman);
 					 	$( "#detaljiApartmana" +apartman.id).click(function() {
 							getApartmentById(apartman.id);
 							getCommentsForApartment(apartman.id);
 							
 						});
 					 	$( "#bookApartment" +apartman.id).click(function() {
 					 		makeNewReservation(apartman);						
 						});
 					}
 			}
 		});
 		
	});
}
// dobavljanje svih aktivnih oglasa za prikaz

$(document).ready(function (){
		initShowButtons();

		getApartments();
		getReservations();
		
		sendComment();
		
		editAccount();
		logout();
		
		sortApartmentsByPrice();
		sortApartmentsByRooms();
		sortReservationByPrice();
		
		filterByType();
	/*	var src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAEFCAIAAAAKRTnrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADeVSURBVHhe7Z13eBTV/vDned/3j9/9XRRJIckm2c3ObjYECC0oRcq1X1QUC+q9ol6UCwJJ6BcUFQsoioooKipcsYAKCIqKYouFpoaWsiW9kEJ6b5td3u/sHOLs2Umym+zMzibfz/N9eAJnNmdmmc+cMqcwFxCvwrwVz7wyzcexeSo5G2Rgg3p7Geal4cyr030cqDfiAPX2Mqg3ohxQby+DeiPKAfX2Mqg3ohxQby/jqvfo3Q/deegJSeN/Xr/OKVPUG3GAensZV71fObOXpElG6PbbnDJFvREHqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXQb0R5YB6exnUG1EOqLeXcdU74O2bNe/eJWn839eucsoU9UYcoN5exlVvHwTqjThAvb0M6o0oB9Tby6DeiHJAvb0M6o0oB9TbyzCbRjFbpvg4UG/EAeqNIP0W1BtB+i2oN4L0W1BvBOm3oN4I0m9BvRGk34J6I0i/BfX2AoWKh5woMsBAvftKR0eHTfGQc0UGGKh3XwG9yU8IojD8Ve89DJMCETbIGBFijAoza0NNujCTTmVmw41sOPzA/2lmVUadysSqMthQS1T4b6pLjjHMBQjvMQD1ZpjZEOyQ1eyQ+VGXLTAMWaQPWKgPXKgLXBw9ZFF0wELdkMXskIcj/rIggLmXP5h8sl/AMNPhuuDqtJctZIckcNcetNgQmBDN/QwXnhA9eJFm8IK4wQtDmDnxzHzyMV/gN3qDz6lqtUkXDBqbdeFmfQT8adGFZ0ZHuh/cRxwfNOnDLawqTRMKzwiSQW8ZCHrDDa0awgkcHZRgCEo0OP6MCUocNnRJ9+E4GCIJPgKfBQ3CA+bBbyO/1x+YzeyJuPQhFh5bcNWBiYZg/nKSqCt1DceR3LcUA5+Cj8Cz77KEsEHz5RRe6XqfCGDS2XAohMFkiy6C0rWPAc8IsN0C5Tyr+l01pHelen/VGySEIkjPyxkM0bPM7gR30wcnRgclRgcs1nOqK7RgD2Qe1HGPs8X844m6il4H2M59mdzzMQHKf6mfdArVOzMgwAxVbq6w9ax87nVARhY9V41PDw72yHNK7yZr66PH3vFtHMj5lZyN58ANF3XJw9EBUOy4VUb1JbgsghOigxeH/wU8JyfgWwKZW/RcYQv6SXvtEFzBDrYHJmkvmTdbmsecwvRmGKMamtAe17q9GOC5SR9hUqtS4uPJWXULpXdVSx09+1r2mP/ji+RsPEHDPBAdkAC+QfFC3YhSB1+Hh9x9WJhrBs3nqipeqqR4FHx1Rh+4iB2ympyNl1CK3scYxqQN5xvVlG89h0GdNZzNHh2THT8y54rRORPH5kwalzNpbM6EMTnj47LHxGaN0MEx9Ke6Da7SDk30KNWhnoqVfqB31GWLuPKqD3d2bMjS4aHLRoQtGx62DH6mUt2MmOCkmODEmOAlcjbOoSWsv2yhoyDt5UONu/Ywx7WHLu31tfPheMwtjvzLg+Tk+ozv9U4BsVmV2e1KOJicO3FM4R0zy1Yvr3rztfqDB5p/P9FmMbWfK+qoqrQ1NthbW+3t7fa2NntzU0dtjbWkuC3L0vzHb3Bk1etbSlckFsy8Pmf8yMwYDfWbXcPROA83a0K7qa77td7qwdC8BKPcvbPHalZNH73u3ltefSRp12svfP3xe0e//fLsiSOZZ0/mp50uzDhblHam8PQfecd+tnz9+end//311ecPPZK4658zt0wb9cQYzSrqt3UVUDFmh0heks9m9kDrmuv9cu/y48KXTx6+9o7rXlyx4L3Nz365a8evcI0nfs08A9d+pjD9TGHq6QK49uO/Zn53KHXfruNvbflu/aOfLrrvnZnTN04a9ih8nPqFXQU8aKIDE0IHzSUn2gd8qfceqIqz0MBWUVK5RlYsm3fNlLI1y+v2ftxqzACHya/oHXZ7R2Vl8+/Hwfaie2dnjxtBZUcFlORQXc/QBIlK7qd6w90THZQApSV1b7nG5fo1/7jplZc3fJl8OL0gr6KtzUp+hSe0tVoLcit+/CbtpWe+uHvGy+N1q6lcqIATA/HYSxaQz3sb7WWc2D1WWMDJGyauX7tk96cfnTClFzc2tJLPe0hdbbM5o/iLT1M2rP30zutejGd7uHwIrkczCJ5xfarI+EhvhsnQqHqsimeN0BfefnP1G6+2pqdCaUw+622spSV1+/cWP3QfVOOpExAGnKpJp85hWfKxi/So96A3/x78zq2Sxv9xXue8e70Z5u9QA+xe7NiQJVcOf2zVwve/OXj6fGkt+aT3KC2ugXs9ce6OK6LXUFkLwxCcFB2w2LvFeBjXxu6h1zAuYvnt12568+VvjalF7e1O/799x263FxdVH9ybsvShdyfFrh0WQufeGVxrJSgJnkTkk57jA71PDx5s1qu6e8tlUOdddWXFixtbTcYLMg6obC8sqHrj1bxrp3bTUIdGhDHKqa7eo97PpnxY3VovaQx9Z5Ywx2705kqtbuuio9Ur5975+hf7UmqqGslnpKSspPb9t3++ZfpGaLhSZ8IH3OKGwMTwgHnkA30AHhO6wIe7L7Gnxj0OBWza6YKODjluvKrKhs/3/P7AbVtHRa6gzqQz4BvQ9/YZJ6/eUGhrw7oRO2tYVOHsW+sPfmZrlOPeEsXW1Fj/2f6CWTd21TgHw026cGhZ8Mf3qLf8mxCJ6g3VPENgd+97Lo9es27lJ1AFtdvs5DNy0dpq/e6r1HtmbI7tQnKoSOv7UIgBqkvuc9TGxS8faiszJm34YPvP1bI81ChsNnvqqYL/LP5gnPY/1InxwTdVhv71IfIBt5FP72RHFxq0YylbSAyLKvrnnU0//2i39qZp53Xsra31X3yWP+Nq+jwvhkUXnqYaAkf6hd6T41ZBS5u6aToDWtfPPra/qKCSHO0j2ts6Dh04NWPyBur0+IAHk+PNGTnYI3RDFnfzXLthwvpP3j/a63a1t7DbL1iMJSsffr+rkhwMZ4csJke7h0x6nw0PMOtUXbW0C2be0PD9YYWILcTW0FC9bWvO5XHUCfPB9R2wYX6h9/Aw8VIR7qQ1CR/m51aQ4xRAQ33Llo1fjY0S6WbnxnsFetajDnUWfWCXfeOThj361pbv6mqbydEKAKpOvx/LvhsqMmLv2KBloQ9KJIe6gRx6GzVdFto5l4+q3vGWramJHKpI2vNySxbOE62rQ0OjZu9H5DgHytR7pErkrczsG17643i2HUoN5XH2VMGsq16gThjC0RR31/BgZnZ0FxXyEWHLlv17Z0Gegp5rQlqa29/e8p3o+wWunRLgruES6829+uJ6yCkruIjRFM//F5hDjlQ2ULOo+2R3zniRYrxi4zPkIAd+oXc8+x+4e1qapXoZ4RXq65rXLt3t2uUGDdHowARyUNdo/veBmKAk0XL7qjHroBUgT+dZXziTkj9z2kbq5CHggcW68Q0AEurNvdbWhouOV8mOH1m76317ezs51E9oyzQX3n4zdS1+p/cd172YkVpEEpQNGPjum8mjIui2qKOrqbv7m71kQUygSA95bOjSxQ9sLzlXTY5TPBXl9QvnvO1aUee6EoKSyEFdI5XeKfHx3IQQsU7ygltntBrTyXH+hq2+vuw/y4RvzvxIb6iRPr1mr8/7kDwFSlrXpjg3HaULw6MHL4oRm6w6VrNq+9Yfejcsx4dAJWvdyk9cazFgODukh7mlkugNbnMTql3b2wZ16Yqkjtoacpx/AhX16m1bs4az/EX5i97QkPt87x/yv/TyCsnfpkODQuT+vpTuSY4OWCQ6YudvY9YdSTYrs6OhR6ztHc+v+0zM8ESm29nj3tebd9u1kxx8qNr6it9VyMWx2+s//zRrlAGuyy/0vn7CM2dP5pO/+Cc/fJ3mOmo9JthpbDa4LTpq5Y5rX8zLPk8O8k+s1o4Nj34qWkvv5mWht/VmGDMr4nb26Ji6/XvlHIImA40/fp89JtYv9Paj1mZXQLl74JPfXV8BgM/8wGzd4MWiHWnz7n6zqqJvkxSUATQrls9/j7o6rpttSJfdEF7Vm2EsWpF3YNnjRjR+/y33/9PvaPr1Z6iSkL84UKbe/QOoWm/d9DV1f3OvyoYkargBeSLl9rJ/72yobyGf93/q65rvnvEydY0xQYkq5j5yhDPe1NvETf+i+8lzxseBA+SI/oitro785AD1lpT2to6kB/9L3d9QgLvWyWNDljySuKtZ2S//ekFu1vkrh6+lLhaq6CTZGa/pbVIHu74Dy44f0b/ddgX1lhqoad8wcT11f7vGo0m7W1v6RUePCwf3pYwIWya8WG4tijARw72jNzfm1NXt0TGNP3xLjhgwoN4y8NvRLNeX4cJYseC9ln7qNmCz2aHRQV2yoxedHsznBb0zGcZ1SYas4Wzd/j39sr3dPai3DEAjfNNTn1P3d2c8fO/bTY1+9m7fU0rO1UyOdaqixwQn6gPoSXVe0JvbLYDqTjOoq17fMgDdBlBveaivaxGdW3bPjZtraxQ9hcFb7NyWTL0nMwTSBXhf9U7VDDW7DE0rXZHUT95vew7qLRs/fpNGjfS4YcL6fvAK0E2am9qoB1xMcJL+MqfZJn3SOzmYcW1yF8y8webn49L6AuotGx0dtkX3vdN5c08wPJJ2uoCkDQwOfPwbVYDHOHeh90lvM+vyinvs8Ja0syR5QIJ6y4nFWMIPZYsLX/7156fJvw4Y2lqtf5/k9BLBEJQUddmf6yj3Xu+MyBC6Wm5Q17z7DklWBva2traszMbvv63ZuaPyxefOP7a6bEVS6dJFZSuXwM/wLzU7tzd8+3Wr2WRv9U5nTP/QG5qvpvRzR5JNX+4/uffD47vfPbJv1/GvDpw8+pPZnH4O2r3kOF9jt1/YsHY/lGCvv/iNd8eTNzW2ZppKjvxo+mJfyt4Pjn288+j+j3777qvUk7/lQv1fOUP3P9j+i1BvznDBXNFe6r2OYVy3Bzr3wD+kW8/UA+z2NrOp+u03z829N2f8yKxYLXWergHHZI8bcW7OXVWvbW45e9ruvACLR/ip3uBGdmbZrv/+uuzfO6+f8MwY9coRqmWxLot4wr+MVC0bq1l189TnHlv20VcHTvm8H6uirO7Ztfut1t7/l3VSX9cMAj+zZt+sq14YG7VqpGq56zcArf1RESuuHP7Yw3Pe/uCdnwt9vSBEdVXj5Xqn1Wajg/9sfvdS73RNBDXZE6rlbZlmkuwjOqoqa3a8VXDz9VnDooTn5lkMi8q7ZkrlKy+2F/amIed3ep8vrX371e9vmb7RdTh3jwF3/3jd6keSdpkzismv8wV9LLdtNvvxXy0rFrwH1+I6Z6P7gEbB3Dtf/+GbNJvv5lOscB6IHhOcGP4XsrBsb/R+l3vRTbe6qaHXMmMtKy1f/2T22O4WKvc0skbqS5cubjUbSR7u4Ud6Q3ENZrq/eUg3ERexfE3irorzTuNzlU9Hh+2bg2fuuO5F17mWHgU8FO76+8tQbye/V16+/uwUVcuIDiAdbL3ROyuGXgY8//rptvp6kiwv9pbmqjdehboDdUreCqi3l61eYT1fSvLrCb/Qu7K8/rFlH490e1scN2PaqCeOJvu4Buc+YOPdM172tLjuJqD6s+mpz9ta5V4uoqqiARpTwjMxXFxu0WO9uaKb6jA3qOsPHiDJ8tJy+mT+jdc4nUzXwa9PbnFs328mf9LdB11FzuVxdXs/dmdCq8L1hmrsp7tPTIx5VHg3eDFGR67Yt+s4yUyp1Ne1PLV6by8aI+7E/bNeq6qUe/4p1B2E52C42Pz2WG+zLoy69QvvvMUHg1hstup33uxcMkU0uN3/dCqzlttXJHXo0AsMQ8dsxqgOMmlCMtgwE8vtT0r9BipKFs/vqOlh1ISS9a6tblp0/3bhfeAaBm6Ro8TooITogIToyxZpBs2P/MuD2r8+BM05zaCF+ssW6gMWRwcmcFtqdrG6MGiz/6PfSJbKI/1M4Y1XPkudszC4GaaOb2BYUJJu8MKoSx7W/O8D8A2wQ+ZHD16kD+Q2KubmqHW9cPqtf3te5nbKxscPCE8Amt9xg7kBqp7pnRLPQAHodNPHaLi53PJib26GVrHTaQiCW+ONDc/QhHZuJOIuDJPu2NKwq/XYIfKundp9D6Ji9c40lVw7/mnhTSAMuKENQQn6IA82u4Hb3fEpkVnWo9Urj/+SSY5TEl98mtLVTiAQnLSBiZrBbu1bGM/Mjw5YzE3Vcvk9EFCcyjnP/KsDp6gT0AVyy1R5JkCaLpi69QvvmClz0d1RU1N0z+3Cc+gMrvqtD89huc1D+sJpzWBuzRmxdSAhcuJHNB0/Sg51QZl6/3E8u6vN+nhFwwb1sChfV6guuS+G2yeAlvzqcU9VlitojRS73f7um8miFXKuuA5O0gUmzPZkgwQeeBrqA8RL8uUL3rPJ9Xo8y1xKXRpUMeDfPdGbYSys88wwaHV/8RlJlYWO6uqCW2c4nYMj4KEDVXFTVCA5zhv8proESnKLWI09e5Sh8cfvyXHOKFNv6tUoH3BTQh277/tIQyUJyjHXBRUeX/Gxd4ea9B77BXCbmiPNB/906+M+u+rBC12L8eGhS/d8cIwcITFtbVZqU+FoR++aB3qnqIOo1inUVOXcYMTWUF9450zhCfBh0UWYWRV3l0mASa0SLcaz4wxNv/5EDhKgTL1dSy2wMfqy7pYK9xS4v6nWeFzEitRTihgE/vneP1x3z4ezBQci//LnEM6+wG9RSGUxefja8jKZGuHUpi5wMvCPHihhYulyrPqN10ia9EAToHje/dQJQEDpmq1Tk4OkoUCtBsNdG+TZ44a3pqeSgy7iF3rDbR2n7tOGm65ANdX1/l58/3bZKqhdcfZkvutuPlwPIreZUZ8KbQrN/4qsr/7SM1+QZIlZ8uC7wnzhTOAf3dU7xWUoS/bY2PaiQpIsNXZ7xfPrhbnzAad0NjyAHCMlKfHxFrEut9xpV1jPl5GDHChcb0eR1fPuFr1D/b/zqQ29RkWsyDK5O2RACmqqm26a8pzwlCDgMcQ3Tb2OYQjX6y7Ma8rIx+rr5Nii8IUnPxPmC/8R8PByV+8zEfQEkpKFHu823Gsavv0a2vnC3CHM+vAzISHkCBngHnAiazxXbt5EDnCgcL2lc5snOpDeZnjT0wdJmuxAy/+p1Xup83G47dk2uu4DDUSD8+ZHsSFLvjpwkiRLyYfbfxbmCwHtDnf1NlK3tUHd8M1XJE1iOsrLcyaOdcrdUSc/GenNjjS34Ib00Ib70SZEcGd7tzrqStggKMCd7u8bJq731V6Fvx/LppZkiwmWqtzuRBOwkKrCLJ33LkmTkm+/OivMlIugJPf0dpkfljtpnK2ulqRKi710eYIwawiLLiJNE0rS5WUdw5icF5bzF70NQQn8UAep4QaECG6y2JClxjQf7FjY1ma9d+YW4ZlAQJPb/Rf7vWM21wfhpPeUkY83N0n+gDv1ey41cj56SIJbeqdHBFPvh8pWSFvH66T5+FGqWg5nYmTDSLIv4NaoEXwbfqH3iLClHm373hd0gQup1+Afbv+FpMnI4S/PUOPJuZfb/yPLA8758keolsmwA1Ru1vmRKqc3f/qAxW7pbdbSC6E2HD5E0iTFZnN9E2bWqUiq7zgbFdhpuH+U3hHLyU/SE6deQ3Ugr074kKTJRXub9Z4bNwvPgauWd71Zj3eB+r8wa4hdO34laZJRVdFAtUSiA93R29Gl1GkXRM74uI6qSpIqJVyPmiBfCGj3FsRJ+xrMTeCRxzfC/ULvqyeuJz/JAjQEhPfZ7Bteknmv/OO/ZNJzPLmeZGmr5Z0EMrdQze9Hl+wmaZIBjRF63ligG21vU+CfJRUf5+beS9IkxW4vnH2LMF/QyagLJ6m+JiWe4Re08Au9ZYZ6OTQ17gk5B2Db7ReoVf6h6I4JXkKSpcfR/Hb6Bu64To7/kYmGR4SZRrvTtWbUDBU6BlGz4y2SJiXNf/xGvwzTRXBvHhRDmoYbl456u2IIWiy8z0aELTtfKk9HLEdZae3lzgPsQbb4bvfB9jpU83vy8LUyvD64Jv4pYabcixKS0jVm1mkGaFastuXsGZImJaWrlgrz5Ypun/aoiWLRh6Perrg2PuUcnbpv13Eqd71gdUF5iHZ++z1Ws0qGVdlmTtsozJR7TUBSusKl4Z07Od7WLPkoHFtdbfYYp5WVzPpwjyd4So+ZDS977mnyFweoNxAdsIjqPP/+ED16VyKgZr7o/j8XP4eAu1x/qaxFNxAdsFB4DsNDl8qwVBO9qENg"+
		"T6V3CvfG22kUR/FD4jsJe5e6A/uEmUKYFNBhLkrV9m3kJweoN8BesoDqPP945xGSJjE11U1TRjwmzJoffS0zusFOzROIrz8/RdIk475ZrwlzjO6xcp6qVlODtKpe20zSpKTk4QeFmcIjJqXPs7gloi3f6amMegPavz5EdR2//uI3JE1ifj+aLcwXApqgJE1G4Bug6i/vvSUyv9C7zLv7TWGO8FzrQW+jyyyxxp9+IGmSYWtqpJZGtCimw9yVDudF0VFvIISZQ+m9Ye1+kiYx2175VpivIThRP/hhkiYjgcyDlN4vrZd86tjD974lzLHntje19FL2qJj2QsnH3zT98hPVZw5NXJKmPFBvUag3Q2sSd5EEiRHuOgYBegfL9bpbCMPMphZ4WLv0I5ImGYsfcFpID669B72pjbtzp02wWyVf57Vy03PCTCFOhQeRNOWBeotCtb0THthOEqSkpbn9+gnOe24JtuyQk3hmPv0N/GsHSZOMxLk7hDnC86U7vR0jN5z0Pvevf5I0KSm661ZhptDwVtTrbgrUWxSqavrAbVtJgpSUldSMjqRGbvlGb4CaOSfDN0Dp3cN77+TgYGol8PINT5I0ybA3N2ePHibM1MIqtM+cB/UWhRrXcc+Nm2VYtuWP43S/mpyD1Sioid+3X+u0LoAUJM39rzBHQ1C3M8bSI4KFmkHU7nqfpElGS+qZzBiNMFOzFvXuAUW2vZ1Gttx2zSav7PLXPZ+8f0yYKZSf2svkmCImCqX33ydtIAmS4Znexih6x4KmI5LP7Kv7dA+VabpWxiVZPAf1FoXqWrtpynMy7M6z6emDwkwNQUlD/yrfmkIU0YFOXWvTx6wjCZLhmd7U2olZI3RtmRaSJhkVzz0jzNSsj9gTrNyGN4B6i0Lpfd0Vz8gw6HrJQ07LCcL9Hc/IMT9CFJdFHR6Tuv7imd6Z1FuxcSM6qqtImmQUz58rzNSsC1dyvxqAeotCVU2vGvtkU2MrSZMGu91OzfH2Yb8aoHd+wMkwq8QzvenR5leOd2cPvT6SP8NpS0CzXrlvvHlQb1Hg3hLealPjnmhskFbvlpb2v09yeivmk+GoneidV5WcNOxRqWfFeqY3tb5a4awbSYJ0dHRQe3QrebwaD+otisH55oayS+qbu7amCXIRZhodJPdEMSHUA25CzCN1NdLu+eGB3usYhnorVjzvfpImGdaKcmjhCzM1K28SKAXqLUp0oNOcigmGR6Re7ru8tJZajUgfJNWCx+5ALSkJ30BNVSNJkwYP9D7kMhW0bPUykiYZrSZj1rAoYabGKN+siOo+qLco1M19uX51Xa20eudklglzhND7tO0d7bymxRXRa6oqpN1T0QO9U+JpvSucJzZLQfOJ49Roc2MUlt49o3y949n/QOWZpElDyokcYY4QuiGLSJovcHnArakorydp0uCB3kcCab2r3niVpElG43ffCHOESI3E0rtnlKh3gFO/8bioVVLr/ePhdGGOENpLfdn2FtH7vGL0PhoSQplW+8FOkiYZrmNaUtWKWBe1G1BvUaiutTGalbXV0up9cO8fwhwNwYn6ALc24pcIReudEkmPSK0/sI+kSUbth+9RmZ4KHUTSlArqLQr13nt05Iqaamk7lj7aeUSYoyEoUS3LrixdoWi9z7L0AqkN30i+dUH19m1UpinKHtMCoN6iGJyHZI6KWCF1v/GO138Q5gilt7f27u4ditY7XUtXzpt+TiZpklH1+hZhjmZlTwXlQb1FkV/vN146LMwxJigx5K9zSJovULbezusfQzQfP0rSJKNyy0vCHFFvN0G9gc0bvhTmCJVzebZM7AqF6+3UbZ5pUDf/8RtJk4zKl18QZmrWKXHxYwrUWxT59d74xAFhjjHBST5ZhqkTRetNzwY1qFtO/kHSJKNy8yZhpqA3lt7ugHoDT/1njzBHbq0S5u8kzRcoWu8MNlRomjx6V736sjBThS/DxIN6iyK/3o8t+0iYI7cMMDOdpPkCRett1rjonfI7SZOMqjdedco0OhL1dgfUG3g0abcwR9B7NlbOSYoLZpbe07v59xMkTTJqdrxNZZqu7LUcANRbFPn1Xr34Q2GOMUFJJMFHKLzt7Vx6g94njpM0yajd9T6V6ZkQRa/EBKDeosiv98qF7wtzhLY3SfARitbb5LwEMkTz0V9JmmTU7d9LZZoSGUzSlArqLYr8ei+f77SntyEYS++u9bZoaL0bv/+WpElG4/eHqUxxSok7oN7AigXvCXOM8dEGBp0oWu+M8CDKtPqDB0iaZDSfOEZPCNXihNCeQb0B1NsDvU9GBgo1g6j9+EOSJhmtpgxqOQezFkvvnkG9AdTbA71zWJba+rf67TdImmRYz5dRizEpdlvvTlBvUVBvRet9OIRea61y03MkTTLsVmuW8w5EZl0ESVMqqLcoqLei9U5mGGql1POPriJpUpJ/3TRhpnAOJEGpoN6ioN6K1nudi97F8+eSNCk5N/deYaac3soeuIZ6i4J6K1pvgNK7YNYMkiAl559cK8wU9XYH1BtAvT3Um96lJB7uZZImGTUf7hRmCpHBKnfvfgD1FgX1VrreRtap5zx77PCOygqSJhnNx49Qr77Nyu48R71FQb2Vr7fTwLWsWG2rMZ2kSUZHZSW9UYmy9yFCvUVBvZWud4bLrJKGb78haVKSd+1UYaYK30UQ9RYF9Va63icjAy3OI1uq3pJ8ZAtQtmqpMFOLLjxZwdNCUW9RUG+l6+26D1HpyiUkTUrq9uwWZgphZJVbgKPeoqDeStd7D8NQnecFM68naVLSlpuTOUwrzFfJ2wCj3qKg3krXG6BmfefEj+yoqSZp0mG3518/XZgvVCLWKfXtd3uj012LevOg3v6gN9V5Piyq5XQKSZOSiueeFuZr0UekaRS6bEut8zxZ1JsH9fYDvdO0dOd5zQfvkjQpaTmVkhmjEeYLDxqSpiRS1ery59eTvzhAvXlQbz/QOzMggJo3VrpMlk1VbR35zq/HoABPHTqUpCoGM6uq2PgM+YsD1JsH9fYDvffMpjvPc6+abG9vJ8lSUvXGa8J8IUxaZXWwmTQhFl0E6i0K6u0HegN083uErs1iImlSYi0tyYqLFmYNLv2muoQkKwA4Hzgr1FsU1Ns/9E6n9jOIjqzd/QFJk5iy1cuprC2KGX9u1Iah3t2AevuH3sciLqVWZSpeINO2yVBNyBrOCrOGM0lX+371tYI4ded4PtRbFNTbP/S+wNDN75wJo201NSRVYkpXLhFmDQEn4+NtQxnG5Ci3+UC9RUG9/URvqIhSWxoY1A3Sr3nO015UmD0mVpg7FOAmnw5iM7EqYXUG9RYF9fYbvU1RTjc0RNmqpSRNeqrfpLvQLbrwrBjfGG5iI6i6DOotCurtN3pfiI+n3n7nThpnq5Wpfm5vay2cdaMwdwhwTP5xbCZtODWFDqLi+Q0k2QHqzYN6+4/erhuGQv380BckTXraLObssU5VdAiLLiKNlW8PE7M2lKrCQGTFGVpOnyRHOEC9eVBvf9I7XU3f3MX//hdJk4X6gwcyY5w2MIEAw41Rkhu+jmGMbDhVJ+diWFTdvk/IQRdBvXlQb3/SOyU+npocmj16WHteLkmWAbu9ausrwhPgAwzPYFXSraZ6KnQQiO1abkP9pfqdbXBW5LiLoN48qLc/6Q2YdE4rHEJUbt5E0uSho6P86cepc4AA9+DRkxI2iBzmPTLYULPgHdifYVBXvb7lgs1GjhOAevOg3n6mN5Rj/DitzsibPtFWX0eSZcFubT//+CPCc+gMrozVqbw1LfxsVCD8QqrCwkdWrLZm+zZRtwHUmwf19jO9AfDH+V5X136ym6TJhd1qrdi4nlosmQ+Loxg3alXQlCBHewo0s9Vh8EuoB1lnZI+Oqf/sU9c6eSeoNw/q7X96Z+iDqAKt4KZr7S0tJFk2bLba9/9LrZfcGSA5V5Kz4RmRIe62yRkmTRNqYsMsevESm4+8q65sOdXDahaoNw/q7X96X5jN0MWaQc2VZj7A3nz8aO70iU4n4xwgqlkPnquMOpUpSpURFQIOnwoPgoq3iR2azoZl6dXcAbpwUxf18D/DoC5dstCdXRxQbx7U2w/1vnDBGBVGdSPn33SdvbmZJMsL+Fa6Ikm0ou4afA8c36J2mC9e/XaNvOkTGw59ecF5ycSuQL15UG+/1JtbPtV5BBvYVSd7C/xPbLamn5OhjeB0Sl6K7PiRla+8aKvzoPsQ9eZBvf1Sb8CopYeg5/1tsk2GFVS7xt7WVvfpnoKbrhOeVV8i98rxIHZHRTnJwG1Qbx7U21/1hgLctWZb+dLzJNl32K3WpiO/lC5PzB43gjo9NyN7zLCSxf9u+OZQr5sbqDcP6u2vegPGqFCqLyp7TGybxUySfY2tqanppx8rnt9Q9M87c+JHCs+TDoM6Z9LYc/fdU/HCs43JP9gaGrp56eUOqDcP6u3HejsKcLqr+dzcOXarHKssegC42tFhLT/fcuZU44/f139+oG7fx3X79zZ8dbDp159bjekdtbUXbB19VFoI6s2Devux3oBRFWSmXib5to9NGaDePKi3f+sN0LNEoyNzLh8l6zwT5YF686Defq93cjDjMkw1sui+u+2treSIgQfqzYN6+73eQEZUqGsjXO6ZZEoC9eZBvfuD3o5lQ+kCPGuErvG7w+SAAQbqzYN69wu9L1w4HBLiOik6Z8KYtkwLOWIggXrzoN79RG+AW6rJxfCCG6/pxagvv6Oj/Dz5yQHqzYN69x+9gXRuUx6XN+H33c0NFOm/NCb/QA3XQ715UO9+pTc0ws2syDSsksQF9hbfzCeTmpaTf2SPjcV1zkVBvfuX3vxQNrFZ02WrlvpgyQeJaU1LzbliNFwd6i0K6t3f9AZOhYq8J4MoXbnEV3PCpQDczp00jr801FsU1Lsf6g2kRQaLluElCQts9dJenjy0pPyeM3FM53Wh3qKg3v1Tb8CsHSpqeNGcuzrKyshB/ojd3vjdNznOs01Rb1FQ736rN5CuDRE1PP+Gv7Wmp5KD/IuOjpp333FdvxH1FgX17s96Aw7D6Y50iJz4EfX797q5dJlCsDXUn390VWaMhroWsz6i4tWXyUEOUG8e1Luf6w1wtXSxnrbMmKiyR1Z2VFeR45RNm8lYcPvN9CXwazPqw9qdOxRQbx7Uu//rDZxRi9fSIfKvm9aU/ENX230oAXtbW83OHVDdoM4cwqKLMOnCLjBMh3M1BPXmQb0HhN5AesSlZp3KdWdsiKxYbdmqJe3nCsmhysFub01PPTfnbtFVlsFtoy6c3yMB9RYF9R4oegOHuDFtYLh4MZ5z+aiqra90VCmlrm4tKy1f/2T2qBjqPPmA5oYJ3L4I6i0K6j2A9OZgmAyWXoBRGLlTL6968zXfzkKxVpRXvb4l5+KQFSocje3wHHYIOdoB6i0K6j3A9HZgiQiwiA1N74ycCWPKn3mi1Zgua9e63d6em1PxwobOsWiu4Whsq5JdNi1DvUVBvQei3sA6hjGyItPLhJE1nC2657baD3a2FxZI2vfWUV3VcOjL4gUPZo8Wr4rzYdZFZESFkM84g3qLgnoPUL15zoT8lZth1sU+u50BDeCiu2dVvba5+Y/fuMa5N1Ystre3txfk1e/fW5L4cM6ksVSOVPCF9uGQLr8o1FsU1HtA682TEcm9NhN/N06FQZ0zcUzR3beVP/143Se7W1J+h4LdVltrt1rJ7+oCe4e1o6amPT+v6eivNTt3lK1amj/j6qw4A/37XQIePSY2/LRGvNDuBPUWBfVGvR0wTLZODZLTWwv3FFlx0bmT4/OvnVp458ziefeXLllUtmbF+bX/Of/Y6rJHVpYuSyieP7fwrln5103LmTQua6Se+ng3AWcCYdYO5V99dU+Peqt23DF694OSxv/berUwRwXqPVK1/JP3jn7xaYp0cc9NrwhzVJreYzSrdr97hDpn78bsG14W5qgMvXkYxqQKNHqyL68UAbl7tu+/G3rLHwrUW/5Qmt7yh5L0vkjy4MFmnQqq627V2L0UXANBF57BqlKHDiXn4TaotyioN+rdNQyTog4ysmEO8SJER7z1PXirTWC1Jmyd28U1BeotCuqNervFkcDAtKhwM6vibez+jVr3wY1LcfwSIxtuilKdjAzc01urO0G9RUG9UW/PgVI9bNCZiJAMXRg0kk1Qh3foCiW8Izj5eYd5jbkf4DCdygR/alVntEGnBw92v13tDpTeDe1Ns75c69t4I/Uzcja+A/VGvb0HGMswhxgmmWGOOf7kimWvatwVlN4ITwTzUNQlD/sw1IPnkVPxERGX+v4b6C96+w7UG1EsqHdfQb0RxeKu3ukRl5pYVYZOZdQMNatDuhmkOdBAvRHF4q6lZ9mhf3Y+6yPMem6QGdd3xapAe6MuPE0TYooKzGFZeVq8ygH0tjmwt7cLQ+pVaKjsbBBdQz6DDDDcVdGkpnf5pcKhvaOzGuTne7NZruPaFBVmYoeawwaRX9RPKZj/YHb8SGHUHzxA0iTAer4sd/oEpxynTiRpFy4EBgYOuUhQUNCYMWNIAjLAcFfvtKgwymc3gxvmyb2g4uR3vKxScS+0uLliYamRoScjA3s9nkRRZLDOjz+DuunXn0iaBLQaM7JitcIcMwQLyCAIj7tqGdlQ4c3kleCq97zzjmLfxBX4YdC8h5qCSRNyyK+0N+mcHn9Zw6LasiTc3rzhu8PC7CAytGEkDUEu4q5CZq339e4qBAV+BOc8p73KCI18XYhRFZQcrETtoVYivISskdE2KfdUq96+TZgdfFGWiACShiAXcbv01tKl07n77ym87abcyfGui/tLFPxwNEdRz/mfog4iJ6cA4MSEp5o/42qSIA3nH1kpzA4aPkcC/amyg8iD26W3c9sye3QMv0wS12dbX9+WaW5M/qF21/uVLzxbunRx4d235U2fmBXLCj/i3YDyyhgVSk7O15wICKAWgS1dmUTSpKFw9q3C7OBhN9BeWCDu4H7p7az3KIfeXWG32a1We0tze0F+07Ejdfs+rtzyUtnq5efuuzvv2qlQcRX+ql6HWa+U1ibYRZ1b7UcfkjQJsDU2Umu5WlgVSUMQAW6X3lTlPM7Qnp9H0tzHbucLfGtpScvJP+q/OFC9bev5xx8pnnd//o3XZo+JFWbRY5h0yrinGcbkrDe0XNqLJNyYoc1ipnYyVMpXgSgMd/U2sc56D2fhJiNpXsFhfkd1VWtaasPhQzXvvlO+/smSRfMKZs3IuWKUMOvO4GqkCiDDZV3nontnkzRpqD94QJgdhBG7zRExelk5zzSoW06fJGlSY7fbGxvbMi1QyAvPwaKL4GZ3+pQ9DAOnITyrzGh1w6EvSLI0lK9fJ8wRHnO9WGQGGQi4q/dZDRmU2hmN3x8maXJRu/sD4Qlw78/0apLmIyzOr7sh8q+f3uPirX3DXjDrRmGO8Hzp+6IUSL/E3dsiTTXE4lwFrf1gJ0mTi/bCQmpDP7NP25xG1mXzU4O64cuDJFkarCXF2WOdOingMUfSEMQZd/XOYVlqbUNoG5M02bDbC++YKTwHKLhSNb4x3KQJod51Q5ybc5dXNlroBqj5U5lmaHE4KiKOu3pD9Y/qQDp3/z9ImoxQ9XMIcEzu2anwVWgjzC6rsmePHtaWm02OkYyylUuEmUL1IYVlSRqCOOOBGNS4y9wp4+1SjrsUxdbYyI2TE5wGBNziJwJkGZLJMBe3VaHdhmp53f595DDJsNXX5V45Xpgvp3e8vE83xH/w4M6g3+4OZ9tMGSRNRqDNLzwNPiz6cKgtS9fDlBIfb4kKsei51VqprLkwqCte3EgOlZKGH76lex9YbHgjXeKBD2kud7b8vWuA3dp+bs5s6kwguHnm+nBzVBg3+tpLnh9mmHQt18Y2cZPbXEpsPgzq8g1PSt3k5ildukiYtUUXkRaFDW+kSzzQ4FjEpVTvWvG/HyBp8mItPpc3faLwTITBvTDTqTLYMKNmaHrEpW4tmepYWRXa8Clhg4zqMCMbZtLxy6p3ofTFyBquq35nmzxuW8vKcsbHCXOH/w58JYZ0g2c3B6V3zviR1vNlJE1e2izmvKuvFJ6MaICiUPZCKcdPMuMXk4CfuW0M9NwS6PCPYDIcw5X8jrlo1G/oJvKvn9584hg5Iemp2bmdOgGsmSPd45ne6S6jOOr2fETSZMdaVsqNY5NrOqowcq4YXbV1i62hgZyK9NhbW/JvulZ4DlBJMYX0sDkxMsDxsPRWh1AzH4vuuf2C75YKtXdY6w7sy7t2KtXhJFXEaPKunlK1bWtHRQU5A7lo/O4w9SCDigZJQ5Au8Exvx9tvJ72zhrMtKb+TZB9ha2qESkTh7TdT86i8FVnDtLlTryhbs6Lp52R7ayvJVUbsVmvRvXcKT4mb7o7TSJCe8LhjJsP57TdEScICefqWesBmazWmV2/bWjTnLqg8UysNehYxmuyxsVBQlyTMr96+reXMKagbk1x8QeNPP2QOixKeoUUX7l9r0SE+weNb5EggQ737zRqpbzl9iiQrA1t9XWt6av0Xn1W9trlszcrih+4ruO2mvOum5U67IvfK8bmT43OvjM+dcnne3ybl33BV4W03nXvgH6VLFpY//U"+
		"T12280fHUQfIaGvdQLlbuJva2t6K5Zwi+ca3Vj0Y24QW9KAJNLAQ7+XJB2mpSXsNu5ZWTa2uxWybcZ8BZ1+/e6tLplH4eL+Ce9uUtSwgZRs8eg6lj/5eckGfEeHZUVeVdNFn7V3Ft9rVIWmUMUTi8LASPrVD+HyP3bJF+9A++32GzlTz5Gfc9mnN2NuE0vbxRogZtcRoCUrkiSeCWDgUVj8g/UuwCLDjvMEQ/ofTlgYUPpMV7Domp3vUeSkb5hLSmmquUQFr0Ki27EfXp/r3DvwF0mmWSPjZVznGZ/xd7cdO7BOdR3C992mmoIOQJB3KBPRUGqdqjrPKrcaRPasjLJEUgvsFrLn3qcGodnwZdhiOf0taaX7pihIbwRIfJnXGM9V0SOQDzCZqt6fUuW8yAWCCi6+8dWqoic9PmO4VYCVrmW4QW3zoDWIzkGcRObrfrtN1zH25n14ekRl5JjEMRtvFAgpMQz1A5kfBTMvL43O5kMVOztbZWbN4m4rQvPiMSZYUhv8E59Lz2YoVZi4yPvmiktqWfIQUjX2GprSpcnuk5u5Qax4P5hSG/xWnPuN9Ul9FA2R+RcMarh668UMedEqbSajIW3Oe1MwIdFF2HCRY6RPuDN3pozIX91fVUGkTVCV/nS8/amJnIcchF7e3vthzupJZb4MHNLyoR5a9E4ZGDi5bsnJWyQqOGZBnXhXbdiRV1Im8V0bu4c1wo5hKPcVqHbSB/x/g3E7WciuhK4Y9P/io3rO6oqyaEDFfgGKjY9R+0l1Bnw7Rk1uCUg4gUkKR8OMYyJVUERRN24fOROvaJm53ZbQz05eiBhq6ur3vFW7pTLqe+ED4s+wqIPT2FxaBriHSSr/jGMkVW5jnjpjLyrJldv3yb/omW+Aq60+u03crtevxncNrM4pBzxJtLeTGmaUPGm+MXIuWL0+cfXtJxK8eF6jNJit7dmpJU/uTbnilHUtQsDvqV07EhDvI3k9xM380QbTq2vSkVWrLbg5uur3ny1zWLyl0VUesR6vqx29wdFd83qfoFHs55biT05GMVGvI9Md9UZdQi0xrsvySHAhPwZ11RsXN905Bc/bZy3FxXWfryr+KH7s8eI95x1Bnwb8J2kRQaTTyKIt5Gx0GCYDG4XPq6wom50kYjRZMePOHffPZVbXmr6OZlb2FCx2O3W4nMN335dvuGpgpnXZ8VF09fiEvymKOnaEKyNI5Ii9+0FdfW0CK5B3n113SkManAm7+orSxbPB9sbDn3Rmp7aUVNNfqPs2Nva2nJzGpO/r35ra+mShXnXTMka2bPSfDj2OQqHbwC70BAZ8NFNxjBQXYdCrKuXZ91H1rCorFGG3CmXF919W+nyhIoXNtS899/6rw42Hz/aasqwlhTb6uv61Ia3221NjVBlaLOYmk8cq//y85odb5evf7Jk4UMFN12bPW541nCdp/uicFVxnaMqjmIjcuHjWy2ZYdJ1oe40y90KKOdjtdCAh9I+e8yw3Mnx+ddNgwpz4Z23nJtzV/G8+4sXzC1ZOK8kYX5p0sKSpIdLEhZAjaB4wYPFD95XdO/swjtmQss/d9qE7HEjsuIMWSP03Pytvm1vxBfX6dpQXLoYkR+l3HPJwcFGbYhZF+FWy1zxwVttYkN/02BxjfgMxd15KfFMmibUqFVxG/SKjWxVbHCTN7k9hsONbESBWo1WIz5H0bfgOoZJUw0xaUPNXO2dWxNGdCi7D4MroonSoScjA7HDDFEU/nQ7gjwFcepUzVBjlAqksjhq8nyBSVknRUB2DpkjLCzUusONUWGnIwK4IhqVRpSK/9+aYNfs2WdCQtKiwo3aMCMbZtSp+L46zkbHuHeTTuVYEI48CyC4RwP3Bp5Up+ExAcdABQG8hQcH/GzShZnYsHQ2LINVZUSGHIu4FE1G/IwLF/4/rJurayVSwDwAAAAASUVORK5CYII=";
		$("#base64image").attr("src",src);*/
		//getAllGuests();
		search();
});
	
