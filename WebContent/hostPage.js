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
				 		activateApartmentById(apartman.id);
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
				 		deactivateApartmentById(apartman.id);
					});
				}
		}
	});	
}

function activateApartmentById(id){
	$.ajax({
		
		type: "PUT",
		url: 'rest/apartment/activate/' + id,
		contentType: 'application/json',
		success: function() {
			alert("Apartment is activated");
			location.reload();
		}, 
		error: function(){
			alert("Apartment is not activated, something went wrong");
		}
	});
}

function deactivateApartmentById(id){
	$.ajax({
		
		type: "PUT",
		url: 'rest/apartment/deactivate/' + id,
		contentType: 'application/json',
		success: function() {
			alert("Apartment is deactivated");
			location.reload();
		}, 
		error: function(){
			alert("Apartment is not deactivated, something went wrong");
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
	$("#tablePrikazApartmana").append(c);
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
	$("#tablePrikazApartmana").append(c);
}

function dodajVrstuKreirane(){
	let c = "<tr align='center'> " +
			" <td>2</td> " +
			" <td> App1 </td> " +
			" <td> 12.12.2012. </td> " +
			" <td> 5 </td> " +
			" <td> 2000e </td> " +
			" <td> Zelim da mi za te pare peru noge </td> " +
 			" <td> Kreirana </td> " +
			" <td> <button id='obrisiAp1' class='btn-delete'> Odustani </button></td> </tr>; ";
	$("#tablePrikazKreirane").append(c);
}

function dodajVrstuPrihvacene(){
	let c = "<tr align='center'> " +
			" <td>2</td> " +
			" <td> App1 </td> " +
			" <td> 12.12.2012. </td> " +
			" <td> 5 </td> " +
			" <td> 2000e </td> " +
			" <td> Zelim da mi za te pare peru patofne </td> " +
 			" <td> Prihvacena </td> " +
			" <td> <button id='obrisiAp1' class='btn-delete'> Dodaj komentar </button></td> </tr>; ";
	$("#tablePrikazPrihvacene").append(c);
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

$(document).ready(function (){
	initShowButtons();
	
	//dodajVrstuKreirane();
	dodajVrstuPrihvacene();
	console.log("Blaaaaa");
	
	getActiveApartments();	
	getInactiveApartments();
	getAllComments();
	// potrebne funkcije za dodavanje apartmana
	dodavanjeApartmana();
	
	//izmena apartmana
	izmenaApartmana();
	
	getAllAmenities();
	
	
	
});