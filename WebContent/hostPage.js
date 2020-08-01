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
			" <td> Zelim da mi za te pare peru noge </td> " +
 			" <td> Prihvacena </td> " +
			" <td> <button id='obrisiAp1' class='btn-delete'> Dodaj komentar </button></td> </tr>; ";
	$("#tablePrikazPrihvacene").append(c);
}

$(document).ready(function (){
	initShowButtons();
	
	dodajVrstuKreirane();
	dodajVrstuPrihvacene();
	
});