function initHide(){
	$("#divRezervacije").hide();
	$("#divMyAccount").hide();
	$("#divGosti").hide();
	$("#divKomentari").hide();
	$("#divDodavanjeApartmana").hide();
	
	$("#divPrihvacene").hide();
	$("#divOdbijene").hide();
}

function initShowButtons(){
	initHide();
	// glavni
	{
		$("#showApartmani").click( function(){
			$("#divApartmani").show();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divGosti").hide();
			$("#divKomentari").hide();
			$("#divDodavanjeApartmana").hide();
		});	
		$("#showRezervacije").click( function(){
			$("#divApartmani").hide();
			$("#divRezervacije").show();
			$("#divMyAccount").hide();
			$("#divGosti").hide();
			$("#divKomentari").hide();
			$("#divDodavanjeApartmana").hide();
		});	
		$("#showMyAccount").click( function(){
			$("#divApartmani").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").show();
			$("#divGosti").hide();
			$("#divKomentari").hide();
			$("#divDodavanjeApartmana").hide();
		});	
		$("#showGosti").click( function(){
			$("#divApartmani").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divGosti").show();
			$("#divKomentari").hide();
			$("#divDodavanjeApartmana").hide();
		});	
		$("#showKomentari").click( function(){
			$("#divApartmani").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divGosti").hide();
			$("#divKomentari").show();
			$("#divDodavanjeApartmana").hide();
		});	
		$("#showDodajApartman").click( function(){
			$("#divApartmani").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").hide();
			$("#divGosti").hide();
			$("#divKomentari").hide();
			$("#divDodavanjeApartmana").show();
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

function getInactiveApartments(){
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/my-inactive',
		contentType: 'application/json',
		success: function(oglasi) {
	    	for(let apartman of oglasi) {
				dodajApartmanInactiveTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						//alert(oglas.id);
				 
					});
				 	$( "#editApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		getApartmentById(apartman.id);
					});
				 	$( "#deleteApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		deleteApartmentById(apartman.id);
					});
				 	$( "#activateApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		activateApartment(apartman);
					});
				}
		}
	});	
}

function dodajKomentarTR(komentar){

	let c = "<tr align='center'> " +
	" <td>" + komentar.id + "</td> " +
	" <td>" + komentar.guest + "</td> " +
	" <td>" + komentar.apartment + "</td> " +
	" <td>" + komentar.text + "</td> " +
	" <td>" + komentar.grade + "</td> " +
	" <td>" + komentar.visible + "</td> " +
	" <td> <button id='promeniVidljivostKomentara" + komentar.id + "' class= 'btn-edit' >  Change visibility </button></td> </tr>; ";
	$("#tablePrikazKomentara").append(c);
}

function getAllComments(){
	$.ajax({
		
		type: "GET",
		url: 'rest/comment/my-apartments',
		contentType: 'application/json',
		success: function(komentari) {
	    	for(let komentar of komentari) {
	    		dodajKomentarTR(komentar);
				$( "#promeniVidljivostKomentara" +komentar.id).click(function() {
					promeniVidljivostKomentara(komentar.id);
				 });
				}
		}
	});	
}

function promeniVidljivostKomentara(id){
	$.ajax({
		
		type: "PUT",
		url: 'rest/comment/' + id,
		contentType: 'application/json',
		success: function() {
			//alert("Visibility is changed");
			$('#tablePrikazKomentara tbody').empty();
			getAllComments();
		}, 
		error: function(){
			alert("Visibility is not changed, something went wrong");
		}
	});
}

function getActiveApartments(){
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/my-active',
		contentType: 'application/json',
		success: function(oglasi) {
	    	for(let apartman of oglasi) {
	    		dodajApartmanActiveTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						alert(oglas.uuid);
				 
					});
				 	$( "#editApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		getApartmentById(apartman.id);
					});
				 	$( "#deleteApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		deleteApartmentById(apartman.id);
					});
				 	$( "#deactivateApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		deactivateApartment(apartman);
					});
				}
		}
	});	
}

function activateApartment(apartman){
	apartman.status = "aktivan";
	$.ajax({
		
		type: "PUT",
		url: 'rest/apartment/',
		contentType: 'application/json',
		data : JSON.stringify(apartman),
		success: function(data) {
			location.reload();
		}
	});	
}

function deactivateApartment(apartman){
	apartman.status = "neaktivan";
	$.ajax({
		
		type: "PUT",
		url: 'rest/apartment/',
		contentType: 'application/json',
		data : JSON.stringify(apartman),
		success: function(data) {
			location.reload();
		}
	});	
}

function deleteApartmentById(id){
	$.ajax({
		
		type: "DELETE",
		url: 'rest/apartment/' + id,
		contentType: 'application/json',
		success: function() {
			alert("Apartment is deleted");
			location.reload();
		}, 
		error: function(){
			alert("Apartment is not deleted, something went wrong");
		}
	});
}

function dodajApartmanInactiveTr(apartman){
	let c = "<tr align='center'> " +
			" <td>" + apartman.id + "</td> " +
			" <td>" + apartman.type + "</td> " +
			" <td>" + apartman.location.address.city + "|"+ apartman.location.address.streetAndNumber + "</td> " +
			" <td>" + apartman.pricePerNight + "</td> " +
			" <td>" + apartman.numberOfRooms + "</td> " +
			" <td> <button id='activateApartment" + apartman.id + "' class='btn-add'> Activate </button></td>" +
			" <td> <button id='editApartment" + apartman.id + "' class='btn-blue'> Edit </button></td>" +
			" <td> <button id='deleteApartment" + apartman.id + "' class= 'btn-delete' >  Delete </button></td> </tr>; ";
	$("#tablePrikazApartmanaInactive").append(c);
}

function dodajApartmanActiveTr(apartman){
	let c = "<tr align='center'> " +
			" <td>" + apartman.id + "</td> " +
			" <td>" + apartman.type + "</td> " +
 			" <td>" + apartman.location.address.city + "|"+ apartman.location.address.streetAndNumber + "</td> " +
			" <td>" + apartman.pricePerNight + "</td> " +
			" <td>" + apartman.numberOfRooms + "</td> " +
			" <td> <button id='deactivateApartment" + apartman.id + "' class='btn-edit'> Deactivate </button></td>" +
			" <td> <button id='editApartment" + apartman.id + "' class='btn-blue'> Edit </button></td>" +
			" <td> <button id='deleteApartment" + apartman.id + "' class= 'btn-delete' >  Delete </button></td> </tr>; ";
	$("#tablePrikazApartmanaActive").append(c);
}

function dodavanjeApartmana(){
	$("#confirmNewApartment").click(function(event) {
		
		console.log("Pokretanje funcije za dodavanje apartmana");
		event.preventDefault();
		
		var type = $("#newApartmentType");
		var city = $("#newApartmentCity");
		var street = $("#newApartmentStreetAndNumber");
		var rooms = $("#newApartmentRooms");
		var guests = $("#newApartmentGuests");
		var price = $("#newApartmentPrice");
		var checkInTime= $("#newApartmentEnterTime");
		var checkOutTime = $("#newApartmentLeaveTime");
		
		var amenities = $('#newApartmentAmenities').val();


		//console.log(checkInTime.val());
		var oglas = new Object();
		oglas.id = 1;
		oglas.type = type.val();
		oglas.numberOfRooms = rooms.val();
		oglas.numberOfGuests = guests.val();
		oglas.host = "biloKojiSvakakoSeMenja";
		
		oglas.location = new Object();
		oglas.location.address = new Object();
		oglas.location.address.city = city.val();
		oglas.location.address.streetAndNumber = street.val();
		
		oglas.pricePerNight = price.val();
		oglas.checkInTime = checkInTime.val();
		oglas.checkOutTime = checkOutTime.val();
		oglas.amenities = amenities;
		// Ovako treba za type i slike
		//oglas.imeKategorije=$("#cat").find(":selected").text();
		//oglas.image = $("#img-upload").attr('src');
		$.post({
			url : 'rest/apartment',
			data : JSON.stringify(oglas),
			contentType : 'application/json',
			success : function(data) {
				alert("Uspesno dodat apartman");
				location.reload();
			},
			error : function(data) {
				alert("Apartman nije uspesno dodat");
			}
		});
		
	});
}

function izmenaApartmana(){
	$("#confirmEditApartment").click(function(event) {
		
		console.log("Pokretanje funcije za dodavanje apartmana");
		event.preventDefault();
		
		var id = $("#editApartmentID");
		var host = $("#editApartmentHost");
		var status = $("#editApartmentStatus");
		
		var city = $("#editApartmentCity");
		var street = $("#editApartmentStreetAndNumber");
		
		var type = $("#editApartmentType");
		var rooms = $("#editApartmentRooms");
		var guests = $("#editApartmentGuests");
		var price = $("#editApartmentPrice");
		var checkInTime= $("#editApartmentEnterTime");
		var checkOutTime = $("#editApartmentLeaveTime");

		var amenities = $('#editApartmentAmenities').val();
		
		//console.log(checkInTime.val());
		var oglas = new Object();
		
		oglas.location = new Object();
		oglas.location.address = new Object();
		oglas.location.address.city = city.val();
		oglas.location.address.streetAndNumber = street.val();
		
		oglas.id = id.val();
		oglas.status = status.val();
		oglas.type = type.val();
		oglas.numberOfRooms = rooms.val();
		oglas.numberOfGuests = guests.val();
		oglas.host = host.val();
		
		oglas.pricePerNight = price.val();
		oglas.checkInTime = checkInTime.val();
		oglas.checkOutTime = checkOutTime.val();
		oglas.amenities = amenities;
		// Ovako treba za type i slike
		//oglas.imeKategorije=$("#cat").find(":selected").text();
		//oglas.image = $("#img-upload").attr('src');
		$.ajax({
			
			type: "PUT",
			url: 'rest/apartment/',
			contentType: 'application/json',
			data : JSON.stringify(oglas),
			success: function(data) {
				alert('Edit successfull');
				location.reload();
			}
		});	
		
	});
}

function getApartmentById(id){
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/' + id,
		contentType: 'application/json',
		success: function(apartman) {
			$('#newApartmentAmenities').val('');
			$('#editApartmentAmenities').val('');
			
			$('input#editApartmentID').val(apartman.id);
			$('input#editApartmentHost').val(apartman.host);
			$('input#editApartmentStatus').val(apartman.status);
			$('input#editApartmentType').val(apartman.type);
			$('input#editApartmentRooms').val(apartman.numberOfRooms);
			$('input#editApartmentGuests').val(apartman.numberOfGuests);
			$('input#editApartmentPrice').val(apartman.pricePerNight);
			$('input#editApartmentEnterTime').val(apartman.checkInTime);
			$('input#editApartmentLeaveTime').val(apartman.checkOutTime);
			
			$('input#editApartmentCity').val(apartman.location.address.city);
			$('input#editApartmentStreetAndNumber').val(apartman.location.address.streetAndNumber);
			
			$('#editApartmentAmenities').val(apartman.amenities);
	    	/*for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						alert(oglas.uuid);
				 
					});
				}*/
		}
	});	
}

function getAllAmenities(){
	$.ajax({
		
		type: "GET",
		url: 'rest/amenity/all',
		contentType: 'application/json',
		success: function(amenities) {
			var selectSize = 1;
	    	for(let amenity of amenities) {
				//dodajAmenityTr(amenity);
	    	    $('#amenitiesDiv').height(selectSize*20);
	    	    $('#newApartmentAmenities').height(selectSize*20);
	    	    $('#editApartmentAmenities').height(selectSize*20);
	    		selectSize ++;
	    	    $('#newApartmentAmenities').append($('<option/>', { 
	    	        value: amenity.id,
	    	        text : amenity.name 
	    	    }));
	    	    $('#editApartmentAmenities').append($('<option/>', { 
	    	        value: amenity.id,
	    	        text : amenity.name 
	    	    }));
			}
		}
	});	
}

function dodajKreiraneTr(rezervacija){
	let c = "<tr align='center'> " +
			" <td> "+ rezervacija.id +" </td> " +
			" <td> "+ rezervacija.apartment +"</td> " +
			" <td> "+ new Date(rezervacija.startDate).getDate() +"."+
				new Date(rezervacija.startDate).getMonth() + ".2020"+" </td> " +
			" <td> "+ rezervacija.numberOfNights +" </td> " +
			" <td> "+ rezervacija.price +" </td> " +
			" <td> <textarea disabled>"+ rezervacija.reservationMessage +"</textarea> </td> " +
 			" <td> "+ rezervacija.status +" </td> " +
 			"<td> <table>"+
 			" <tr> <button id='acceptReservation"+ rezervacija.id +"' class='btn-add'> Accept </button></tr> </tr>"+
			" <tr> <button id='rejectReservation"+ rezervacija.id +"' class='btn-delete'> Reject </button></tr>  "
 			+"</table></td></tr>";
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
	" <td> "+ rezervacija.status +" </td> " ;
	
	if(rezervacija.status === "Accepted"){
		$("#tablePrikazPrihvacene").append(c + " <td> <button id='finishReservation"+ rezervacija.id +"' class='btn-delete'> Finish </button></td> </tr>;");
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
 			" <td> "+ rezervacija.status +" </td> ";
 			$("#tablePrikazOdbijene").append(c);
}

function acceptReservation(reservation){
 		$.ajax({
 			
 			type: "PUT",
 			url: 'rest/reservation/accept',
 			data : JSON.stringify(reservation),
 			contentType: 'application/json',
 			success: function() {
 				alert("Reservation accepted successfully");
		 		$("#tablePrikazPrihvacene tbody").empty();
		 		$("#tablePrikazKreirane tbody").empty();
		 		$("#tablePrikazOdbijene tbody").empty();

 				getReservations();
 			}, 
 			error: function(){
 				alert("Reservation not accepted, something went wrong");
 			}
 		});	
}


function rejectReservation(reservation){
		$.ajax({
			
			type: "PUT",
			url: 'rest/reservation/reject',
			data : JSON.stringify(reservation),
			contentType: 'application/json',
			success: function() {
				alert("Reservation rejected successfully");
	 		$("#tablePrikazPrihvacene tbody").empty();
	 		$("#tablePrikazKreirane tbody").empty();
	 		$("#tablePrikazOdbijene tbody").empty();

			getReservations();
			}, 
			error: function(){
				alert("Reservation not rejected, something went wrong");
			}
		});	
}

function finishReservation(reservation){
	$.ajax({
		
		type: "PUT",
		url: 'rest/reservation/finish',
		data : JSON.stringify(reservation),
		contentType: 'application/json',
		success: function() {
			alert("Reservation finished successfully");
 		$("#tablePrikazPrihvacene tbody").empty();
 		$("#tablePrikazKreirane tbody").empty();
 		$("#tablePrikazOdbijene tbody").empty();
			getReservations();
		}, 
		error: function(){
			alert("Reservation not finished, something went wrong");
		}
	});	
}

function getReservations(){ 
	
	$.ajax({
		
		type: "GET",
		url: 'rest/reservation/received',
		contentType: 'application/json',
		success: function(reservations) {
	    	for(let reservation of reservations) {
	    		if(reservation.status === "Created"){
	    			dodajKreiraneTr(reservation);
				 	$( "#acceptReservation" +reservation.id).click(function() {
				 		acceptReservation(reservation);
					});
				 	$( "#rejectReservation" +reservation.id).click(function() {
				 		rejectReservation(reservation);
					});
				 	
	    		} else if(reservation.status === "Accepted" || reservation.status === "Finished"){
	    			dodajPrihvaceneTr(reservation);
				 	$( "#finishReservation" +reservation.id).click(function() {
				 		finishReservation(reservation);
					});
	    		} else if (reservation.status === "Rejected" ){ 
	    			dodajOdbijeneTr(reservation);
	    		}
	    		
				}
		}
	});
}

function sortReservationsByPrice(){
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
 			url: 'rest/reservation/received',
 			contentType: 'application/json',
 			success: function(reservations) {
 				
 				//console.log($( "#sortReservationsByPrice").val());
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
 					 	$( "#acceptReservation" +reservation.id).click(function() {
 					 		acceptReservation(reservation);
 						});
 					 	$( "#rejectReservation" +reservation.id).click(function() {
 					 		rejectReservation(reservation);
 						});
 					 	
 		    		} else if(reservation.status === "Accepted" || reservation.status === "Finished"){
 		    			dodajPrihvaceneTr(reservation);
 					 	$( "#finishReservation" +reservation.id).click(function() {
 					 		finishReservation(reservation);
 						});
 		    		} else if (reservation.status === "Rejected" ){ 
 		    			dodajOdbijeneTr(reservation);
 		    		}
 		    		
 					}
 			}
 		});
 		

	});
}

function sortActiveByPrice(){
	$( "#sortActiveByPrice").click(function() {
		if($( "#sortActiveByPrice").val() != 1){
			$( "#sortActiveByPrice").val(1);
		} else {
			$( "#sortActiveByPrice").val(2);
		}
		
		$("#tablePrikazApartmanaActive tbody").empty();
	
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/my-active',
		contentType: 'application/json',
		success: function(oglasi) {
			
				for(let i=0; i<oglasi.length;i++){
 					for(let j = i+1; j < oglasi.length; j++){
 	 					if(oglasi[i].pricePerNight > oglasi[j].pricePerNight){
 	 						temp = oglasi[i];
 	 						oglasi[i] = oglasi[j];
 	 						oglasi[j] = temp;
 	 					}
 					}
 				}
 				
 				if($( "#sortActiveByPrice").val() != 2){
 					oglasi.reverse();
 				}
 				
	    	for(let apartman of oglasi) {
	    		dodajApartmanActiveTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						alert(oglas.uuid);
				 
					});
				 	$( "#editApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		getApartmentById(apartman.id);
					});
				 	$( "#deleteApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		deleteApartmentById(apartman.id);
					});
				 	$( "#deactivateApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		deactivateApartment(apartman);
					});
				}
		}
	});	 		
	});
	
	
}

function sortInactiveByPrice(){
	$( "#sortInactiveByPrice").click(function() {
		if($( "#sortInactiveByPrice").val() != 1){
			$( "#sortInactiveByPrice").val(1);
		} else {
			$( "#sortInactiveByPrice").val(2);
		}
		
		$("#tablePrikazApartmanaInactive tbody").empty();
	
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/my-inactive',
		contentType: 'application/json',
		success: function(oglasi) {
			
				for(let i=0; i<oglasi.length;i++){
 					for(let j = i+1; j < oglasi.length; j++){
 	 					if(oglasi[i].pricePerNight > oglasi[j].pricePerNight){
 	 						temp = oglasi[i];
 	 						oglasi[i] = oglasi[j];
 	 						oglasi[j] = temp;
 	 					}
 					}
 				}
 				
 				if($( "#sortInactiveByPrice").val() != 2){
 					oglasi.reverse();
 				}
 				
 		    	for(let apartman of oglasi) {
 					dodajApartmanInactiveTr(apartman);
 					 	$( "#detalji" +apartman.id).click(function() {
 							//alert(oglas.id);
 					 
 						});
 					 	$( "#editApartment" +apartman.id).click(function() {
 							//alert(apartman.id);
 					 		getApartmentById(apartman.id);
 						});
 					 	$( "#deleteApartment" +apartman.id).click(function() {
 							//alert(apartman.id);
 					 		deleteApartmentById(apartman.id);
 						});
 					 	$( "#activateApartment" +apartman.id).click(function() {
 							//alert(apartman.id);
 					 		activateApartment(apartman);
 						});
 					}
		}
	});	 		
	});
}

$(document).ready(function (){
	initShowButtons();
	
	//dodajVrstuKreirane();
	console.log("Blaaaaa");
	
	getActiveApartments();	
	getInactiveApartments();
	getAllComments();
	// potrebne funkcije za dodavanje apartmana
	dodavanjeApartmana();
	
	//izmena apartmana
	izmenaApartmana();
	
	getAllAmenities();
	
	getReservations();
	
	sortReservationsByPrice();
	sortActiveByPrice();
	sortInactiveByPrice();
	
	
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