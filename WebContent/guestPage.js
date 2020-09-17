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

function initHide(){
	$("#divRezervacije").hide();
	$("#divMyAccount").hide();
	$("#divSviGosti").hide();
	
	$("#divPrihvacene").hide();
	$("#divOdbijene").hide();
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
		});	
		$("#showRezervacije").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").show();
			$("#divMyAccount").hide();
			$("#divSviGosti").hide();
		});	
		$("#aHrefRezervacije").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").show();
			$("#divMyAccount").hide();
			$("#divSviGosti").hide();
		});	
		$("#showMyAccount").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").show();
			$("#divSviGosti").hide();
			getLoggedUserData();
		});	
		$("#showSviGosti").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divSviGosti").show();
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
	
	// izmena podataka o korisniku
	{
		$("#submitEdit").click(function(){
			let username = $('input#username').val();
			let password = $('input#password').val();
			let firstName = $('input#name').val();
			let lastName = $('input#lastName').val();
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
			
	    	/*for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						alert(oglas.uuid);
				 
					});
				}*/
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
				alert("Apartments not booked successfully, something went wrong");
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

// dobavljanje svih aktivnih oglasa za prikaz
	$(document).ready(function (){
		initShowButtons();

		getApartments();
		getReservations();
		
		sendComment();
		//getReservations();
		
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
			
	});
	
