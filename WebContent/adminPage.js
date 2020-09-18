
function getAllApartments(){
	$("#tablePrikazApartmana tbody").empty();
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/all',
		contentType: 'application/json',
		success: function(oglasi) {
	    	for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
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
				 	/*$( "#activateApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		activateApartmentById(apartman.id);
					});*/
				}
		}
	});	
}

function dodajApartmanTr(apartman){
	let c = "<tr align='center'> " +
			" <td>" + apartman.id + "</td> " +
			" <td>" + apartman.type + "</td> " +
			" <td>" + apartman.location.address.city + "|"+ apartman.location.address.streetAndNumber + "</td> " +
			" <td>" + apartman.pricePerNight + "</td> " +
			" <td>" + apartman.numberOfRooms + "</td> " +
			" <td>" + apartman.status + "</td> " +
			" <td> <button id='editApartment" + apartman.id + "' class='btn-blue'> Edit </button></td> </tr>; ";
	$("#tablePrikazApartmana").append(c);
}

function filterGuests(){
 	$( "#filterKorisnika").click(function() {
 		$("#tablePrikazKorisnika tbody").empty();
 		event.preventDefault();
 		console.log("Pokrenuto filtriranje korisnika");
 		var role = $("#filterKorisnikaRole");
 		var gender = $("#filterKorisnikaGender");
 		var username = $("#filterKorisnikaUsername");

 		//console.log(checkInTime.val());
 		var filter = new Object();
 		
 		if(role.val() == ""){
 			filter.role = null;
 		} else filter.role = role.val();
 		
 		if(gender.val() == "null"){
 			filter.gender = null;
 		} else if(gender.val() == "true"){
 			filter.gender = true;
 		} else {
 			filter.gender = false;
 		}


 		if(username.val() == ""){
 			filter.username = null;
 		} else filter.username = username.val();

 		console.log(filter);
 		
 		$.ajax({
 			type: "POST",
 			url: 'rest/user/search',
			data : JSON.stringify(filter),
 			contentType: 'application/json',
 			success: function(users) {
 				//console.log(dobijeniOglasi);
 		    	for(let user of users) {
 		    		dodajUserTr(user);
 					 	/*$( "#deleteAmenity" +amenity.id).click(function() {
 							//alert(apartman.id);
 					 		deleteAmenityById(amenity.id);
 						});*/
 					}
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
			
	    	/*for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						alert(oglas.uuid);
				 
					});
				}*/
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

function newAmenity(){
	$("#createSadrzaj").click(function(event) {
		
		console.log("Pokretanje funcije za dodavanje sadrzaja");
		event.preventDefault();
		
		var name = $("#newSadrzajName");

		var amenity = new Object();
		//amenity.id = 1;
		amenity.name = name.val();
		
		$.ajax({
			
			type: "POST",
			url: 'rest/amenity',
			contentType: 'application/json',
			data : JSON.stringify(amenity),
			success: function(data) {
				alert('Amenity added successfull');
				$('#tablePrikazSadrzaja tbody').empty();
				$("#newSadrzajName").val('');
				getAllAmenities();
				//location.reload();
			}
		});	
		
	});
}

function getAllAmenities(){
	$.ajax({
		
		type: "GET",
		url: 'rest/amenity/all',
		contentType: 'application/json',
		success: function(amenities) {
	    	for(let amenity of amenities) {
				dodajAmenityTr(amenity);
				 	$( "#editAmenity" +amenity.id).click(function() {
						//alert(apartman.id);
				 		//getAmenityById(amenity.id, amenity.name);
				 		$('input#editSadrzajaID').val(amenity.id);
				 		$('input#editSadrzajaName').val(amenity.name);
					});
				 	$( "#deleteAmenity" +amenity.id).click(function() {
						//alert(apartman.id);
				 		deleteAmenityById(amenity.id);
					});
				}
		}
	});	
}

function editAmenity(){
	$("#editSadrzaja").click(function(event) {
		
		console.log("Pokretanje funcije za edit amenitija");
		event.preventDefault();
		
		var id = $("#editSadrzajaID");
		var name = $("#editSadrzajaName");
		var amenity = new Object();
		
		amenity.id = id.val();
		amenity.name = name.val();
		
		$.ajax({
			
			type: "PUT",
			url: 'rest/amenity/',
			contentType: 'application/json',
			data : JSON.stringify(amenity),
			success: function(data) {
				$('#tablePrikazSadrzaja tbody').empty();
				getAllAmenities();
				$("#editSadrzajaID").val('');
				$("#editSadrzajaName").val('');
				
				alert('Edit successfull');
				//location.reload();
			}
		});	
		
	});
}

function deleteAmenityById(id){
	$.ajax({
		
		type: "DELETE",
		url: 'rest/amenity/' + id,
		contentType: 'application/json',
		success: function() {
			alert("Amenity is deleted");
			$('#tablePrikazSadrzaja tbody').empty();
			$("#newSadrzajName").val('');
			getAllAmenities();
			//location.reload();
		}, 
		error: function(){
			alert("Amenity is not deleted, something went wrong");
		}
	});
}

function dodajAmenityTr(amenity){
	let c = "<tr align='center'> " +
	" <td>" + amenity.id + "</td> " +
	" <td>" + amenity.name + "</td> " +
	" <td> <button id='editAmenity" + amenity.id + "' class='btn-blue'> Edit </button></td>" +
	" <td> <button id='deleteAmenity" + amenity.id + "' class= 'btn-delete' >  Delete </button></td> </tr>; ";
$("#tablePrikazSadrzaja").append(c);
}

function getAllUsers(){
	$("#tablePrikazKorisnika tbody").empty();
	$.ajax({
		
		type: "GET",
		url: 'rest/user/all',
		contentType: 'application/json',
		success: function(users) {
	    	for(let user of users) {
	    		dodajUserTr(user);
				 	/*$( "#deleteAmenity" +amenity.id).click(function() {
						//alert(apartman.id);
				 		deleteAmenityById(amenity.id);
					});*/
				}
		}
	});	
}

function dodajUserTr(user){
	var gender;
	if(user.gender == true){
		gender = "male";
	} else {
		gender = "female";
	}
	
	
	let c = "<tr align='center'> " +
		" <td>" + user.username + "</td> " +
		" <td>" + user.firstName + "</td> " +
		" <td>" + user.lastName + "</td> " +
		" <td>" + gender + "</td> "+
		" <td>" + user.role + "</td> ";
	
	$("#tablePrikazKorisnika").append(c);
}

function addHost(){
	$("#submitRegisterDomacin").click(function(event) {
		
		console.log("Pokretanje funcije za dodavanje domacina");
		event.preventDefault();
		
		var username = $("#usernameDomacin");
		var password = $("#passwordDomacin");
		var confirmPassword = $("#confirm-passwordDomacin");
		var name = $("#nameDomacin");
		var lastName = $("#lastNameDomacin");
		var male = $("#maleDomacin:checked").val();

		var gender;
		if(male){
			gender = "True";
		}else {
			gender = "False";
		}
		
		var domacin = new Object();
		
		domacin.username = username.val();
		domacin.password = password.val();
		domacin.firstName = name.val();
		domacin.lastName = lastName.val();
		domacin.gender = gender;

		$.ajax({
			
			type: "POST",
			url: 'rest/user/add',
			contentType: 'application/json',
			data : JSON.stringify(domacin),
			success: function(data) {
				alert('Host added successfull');
				$('#tablePrikazKorisnika tbody').empty();
				$("#usernameDomacin").val('');
				$("#passwordDomacin").val('');
				$("#confirm-passwordDomacin").val('');
				$("#nameDomacin").val('');
				$("#lastNameDomacin").val('');
				getAllUsers();
				//location.reload();
			},
			error: function(data){
				alert('Host id not added successfull, something went wrong');
			}
		});	
		
	});
}

function dodajKomentarTR(komentar){

	let c = "<tr align='center'> " +
	" <td>" + komentar.id + "</td> " +
	" <td>" + komentar.guest + "</td> " +
	" <td>" + komentar.apartment + "</td> " +
	" <td>" + komentar.text + "</td> " +
	" <td>" + komentar.grade + "</td> " +
	" <td>" + komentar.visible + "</td> " ;
	$("#tablePrikazKomentara").append(c);
}

function getAllComments(){
	$.ajax({
		
		type: "GET",
		url: 'rest/comment/all',
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

function initShowButtons(){
	{
	$("#divUsers").hide();
	$("#divSadrzaji").hide();
	$("#divRezervacije").hide();
	$("#divKomentari").hide();
	
	$("#showUsers").click( function(){
		$("#divUsers").show();
		$("#divApartmani").hide();
		$("#divSadrzaji").hide();
		$("#divRezervacije").hide();
		$("#divKomentari").hide();
		getAllUsers();
	});
	$("#showApartments").click( function(){
		$("#divUsers").hide();
		$("#divApartmani").show();
		$("#divSadrzaji").hide();
		$("#divRezervacije").hide();
		$("#divKomentari").hide();
	});	
	$("#showSadrzaji").click( function(){
		$("#divUsers").hide();
		$("#divApartmani").hide();
		$("#divSadrzaji").show();
		$("#divRezervacije").hide();
		$("#divKomentari").hide();
	});	
	$("#showRezervacije").click( function(){
		$("#divUsers").hide();
		$("#divApartmani").hide();
		$("#divSadrzaji").hide();
		$("#divRezervacije").show();
		$("#divKomentari").hide();	
	});	
	$("#showKomentari").click( function(){
		$("#divUsers").hide();
		$("#divApartmani").hide();
		$("#divSadrzaji").hide();
		$("#divRezervacije").hide();
		$("#divKomentari").show();	
	});	
	}
}


function dodajRezervacijeTr(rezervacija){
	let c = "<tr align='center'> " +
	" <td> "+ rezervacija.id +" </td> " +
	" <td> "+ rezervacija.apartment +"</td> " +
	" <td> "+ new Date(rezervacija.startDate).getDate() +"."+
		new Date(rezervacija.startDate).getMonth() + ".2020"+" </td> " +
	" <td> "+ rezervacija.numberOfNights +" </td> " +
	" <td> "+ rezervacija.price +" </td> " +
	" <td> <textarea disabled>"+ rezervacija.reservationMessage +"</textarea> </td> " +
	" <td> "+ rezervacija.guest +" </td> " +	
	" <td> "+ rezervacija.status +" </td></tr>";
$("#tablePrikazRezervacije").append(c);
}
function getReservations(){ 
	$("#tablePrikazRezervacije tbody").empty();
	$.ajax({
		
		type: "GET",
		url: 'rest/reservation/all',
		contentType: 'application/json',
		success: function(reservations) {
	    	for(let rezervacija of reservations) {
	    			dodajRezervacijeTr(rezervacija);
				}
		}
	});
}

function searchReservationByGuest(){
	 $("#guestNameForReservations").change(function(){
	 		$("#tablePrikazRezervacije tbody").empty();
	 		var name = $("#guestNameForReservations").val();

	 		$.ajax({
	 			
	 			type: "GET",
	 			url: 'rest/reservation/all',
	 			contentType: 'application/json',
	 			success: function(reservations) {
	 		    	for(let rezervacija of reservations) {
	 		    		
	 		    		if(name === ''){
	 		    			dodajRezervacijeTr(rezervacija);
	 		    		} else if(rezervacija.guest.includes(name)){
	 		    			dodajRezervacijeTr(rezervacija);
	 		    		}
	 		    			
	 					}
	 			}
	 		}); 
	 });
}

function searchApartments(){
	 $("#filtritajApartmane").click(function(){
		 $("#tablePrikazApartmana tbody").empty();
	 		var type = $("#typeZaFiltriranjeApartmana").val();
	 		var status = $("#statusZaFiltriranjeApartmana").val();

	 		$.ajax({
	 			
	 			type: "GET",
	 			url: 'rest/apartment/all',
	 			contentType: 'application/json',
	 			success: function(oglasi) {
	 		    	for(let apartman of oglasi) {
	 		    		
	 		    		
	 		    		if(type == '' || apartman.type.toLowerCase().includes( type.toLowerCase() )){
	 		    			
	 		    			if(status == '' || apartman.status.toLowerCase().includes( status.toLowerCase() )){
	 		 					dodajApartmanTr(apartman);
		 					 	$( "#detalji" +apartman.id).click(function() {
		 					 
		 						});
		 					 	$( "#editApartment" +apartman.id).click(function() {
		 					 		getApartmentById(apartman.id);
		 						});
		 					 	$( "#deleteApartment" +apartman.id).click(function() {
		 					 		deleteApartmentById(apartman.id);
		 						});
	 		    			}
	 		    		}
	 		    		
	 					}
	 			}
	 		});
	 });
}


$(document).ready(function (){
	initShowButtons();
	
	getAllApartments();
	
	getAllAmenities();
	izmenaApartmana();
	newAmenity();
	editAmenity();
	
	getAllUsers();
	
	addHost();
	
	getAllComments();
	
	filterGuests();
	
	getReservations();
	searchReservationByGuest();
	
	searchApartments();
	
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