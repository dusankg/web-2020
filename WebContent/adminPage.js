
function dodajVrstuApartman(){
	let c = "<tr align='center'> " +
			" <td>2</td> " +
			" <td>Stan</td> " +
			" <td>Dzoni</td> " +
			" <td>2000e</td> " +
			" <td>2</td> " +
			" <td>5</td> " +
 			" <td>Ulica 700 rupa</td> " +
			" <td> <button id='obrisiAp1'> Delete </button></td>" +
			" <td> <button id='editAp1'> Edit </button></td> </tr>; ";
	$("#tablePrikazApartmana").append(c);
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
	
	dodajVrstuApartman();
	dodajVrstuUser();
	
	
	
	
	
	
});