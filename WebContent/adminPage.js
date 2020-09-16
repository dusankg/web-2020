
function getAllApartments(){
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
			" <td> <button id='editApartment" + apartman.id + "' class='btn-blue'> Edit </button></td>" +
			" <td> <button id='deleteApartment" + apartman.id + "' class= 'btn-delete' >  Delete </button></td> </tr>; ";
	$("#tablePrikazApartmana").append(c);
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
function dodajVrstuUser(){
	let c = "<tr align='center'> " +
			" <td>1</td> " +
			" <td>ddd</td> " +
			" <td>Dusan</td> " +
			" <td>Blanusa</td> " +
			" <td>male</td></tr>; ";
	$("#tablePrikazKorisnika").append(c);
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
				 	$( "#editApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		getAmenityById(apartman.id);
					});
				 	$( "#deleteApartment" +apartman.id).click(function() {
						//alert(apartman.id);
				 		deleteAmenityById(apartman.id);
					});
				}
		}
	});	
}

function dodajAmenityTr(amenity){
	let c = "<tr align='center'> " +
	" <td>" + amenity.id + "</td> " +
	" <td>" + apartman.name + "</td> " +
	" <td> <button id='editAmenity" + apartman.id + "' class='btn-blue'> Edit </button></td>" +
	" <td> <button id='deleteAmenity" + apartman.id + "' class= 'btn-delete' >  Delete </button></td> </tr>; ";
$("#tablePrikazSadrzaja").append(c);
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

$(document).ready(function (){
	initShowButtons();
	
	getAllApartments();
	dodajVrstuUser();
	
	getAllAmenities();
	izmenaApartmana();
	newAmenity();
	
	
});