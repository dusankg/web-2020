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

function getApartments(){
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/my-inactive',
		contentType: 'application/json',
		success: function(oglasi) {
	    	for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
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
				}
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

function dodajApartmanTr(apartman){
	let c = "<tr align='center'> " +
			" <td>" + apartman.id + "</td> " +
			" <td>" + apartman.type + "</td> " +
			" <td>" + apartman.host + "</td> " +
			" <td>" + apartman.pricePerNight + "</td> " +
			" <td>" + apartman.numberOfRooms + "</td> " +
			" <td>" + apartman.numberOfGuests + "</td> " +
 			" <td>" + apartman.location + "</td> " +
			" <td> <button id='editApartment" + apartman.id + "' class='btn-edit'> Edit </button></td>" +
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
		var rooms = $("#newApartmentRooms");
		var guests = $("#newApartmentGuests");
		var price = $("#newApartmentPrice");
		var checkInTime= $("#newApartmentEnterTime");
		var checkOutTime = $("#newApartmentLeaveTime");

		//console.log(checkInTime.val());
		var oglas = new Object();
		oglas.id = 1;
		oglas.type = type.val();
		oglas.numberOfRooms = rooms.val();
		oglas.numberOfGuests = guests.val();
		oglas.host = "biloKojiSvakakoSeMenja";
		
		oglas.pricePerNight = price.val();
		oglas.checkInTime = checkInTime.val();
		oglas.checkOutTime = checkOutTime.val();
		
		// Ovako treba za type i slike
		//oglas.imeKategorije=$("#cat").find(":selected").text();
		//oglas.image = $("#img-upload").attr('src');
		$.post({
			url : 'rest/apartment',
			data : JSON.stringify(oglas),
			contentType : 'application/json',
			success : function(data) {
				alert("Uspesno dodat apartman");
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
		var type = $("#editApartmentType");
		var rooms = $("#editApartmentRooms");
		var guests = $("#editApartmentGuests");
		var price = $("#editApartmentPrice");
		var checkInTime= $("#editApartmentEnterTime");
		var checkOutTime = $("#editApartmentLeaveTime");

		//console.log(checkInTime.val());
		var oglas = new Object();
		oglas.id = id.val();
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

function getApartmentById(id){
	$.ajax({
		
		type: "GET",
		url: 'rest/apartment/' + id,
		contentType: 'application/json',
		success: function(apartman) {
			$('input#editApartmentID').val(apartman.id);
			$('input#editApartmentHost').val(apartman.host);
			$('input#editApartmentType').val(apartman.type);
			$('input#editApartmentRooms').val(apartman.numberOfRooms);
			$('input#editApartmentGuests').val(apartman.numberOfGuests);
			$('input#editApartmentPrice').val(apartman.pricePerNight);
			$('input#editApartmentEnterTime').val(apartman.checkInTime);
			$('input#editApartmentLeaveTime').val(apartman.checkOutTime);
			
	    	/*for(let apartman of oglasi) {
				dodajApartmanTr(apartman);
				 	$( "#detalji" +apartman.id).click(function() {
						alert(oglas.uuid);
				 
					});
				}*/
		}
	});	
}
$(document).ready(function (){
	initShowButtons();
	
	//dodajVrstuKreirane();
	dodajVrstuPrihvacene();
	console.log("Blaaaaa");
	getApartments();
	
	// potrebne funkcije za dodavanje apartmana
	dodavanjeApartmana();
	
	//izmena apartmana
	izmenaApartmana();
	
	
	
	
	
});