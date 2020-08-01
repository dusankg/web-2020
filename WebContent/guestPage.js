
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
		$("#showMyAccount").click( function(){
			$("#divOffer").hide();
			$("#divRezervacije").hide();
			$("#divMyAccount").show();
			$("#divSviGosti").hide();
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