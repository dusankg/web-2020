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

$(document).ready(function (){
	initShowButtons();
	
	dodajVrstuKreirane();
	dodajVrstuPrihvacene();
	
	$("#confirmNewApartment").click(function(event) {
				
				console.log("Pokretanje funcije za dodavanje apartmana");
				alert("Dodavanjeeee");
				event.preventDefault();
				
				var type = $("#newApartmentType");
				var rooms = $("#newApartmentRooms");
				var guests = $("#newApartmentGuests");
				var price = $("#newApartmentPrice");
				var checkInTime= $("#newApartmentEnterTime");
				var checkOutTime = $("#newApartmentLeaveTim");

				var oglas = new Object();
				oglas.id = 1;
				oglas.type = type.val();
				oglas.numberOfRooms = rooms.val();
				oglas.numberOfGuests = guests.val();
				oglas.host = "biloKojiSvakakoSeMenja";
				
				oglas.pricePerNight = price.val();
				oglas.checkInTime = 1;
				oglas.checkOutTime = 2;
				
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
	
	
	
	
	
	
});