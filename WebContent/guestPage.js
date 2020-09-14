function dodajApartmanTr(apartman){
	let c = "<tr align='center'> " +
			" <td>" + apartman.id + "</td> " +
			" <td>" + apartman.type + "</td> " +
			" <td>" + apartman.host + "</td> " +
			" <td>" + apartman.pricePerNight + "</td> " +
			" <td>" + apartman.numberOfRooms + "</td> " +
			" <td>" + apartman.numberOfGuests + "</td> " +
 			" <td>" + apartman.location + "</td> " +
			" <td> <button id='showComments" + apartman.id + "' class='btn-edit'> Comments </button></td>" +
			" <td> <button id='bookApartment" + apartman.id + "' class= 'btn-add' >  Book </button></td> </tr>; ";
	$("#tablePrikazApartmana").append(c);
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

	// dobavljanje svih aktivnih oglasa za prikaz
	$(document).ready(function (){
		initShowButtons();
		
		dodajVrstuKreirane();
		dodajVrstuPrihvacene();
	
		$.ajax({
	
			type: "GET",
			url: 'rest/apartment/active',
			contentType: 'application/json',
			success: function(oglasi) {
		    	for(let apartman of oglasi) {
					dodajApartmanTR(apartman);
					 	$( "#detalji" +oglas.uuid).click(function() {
							alert(oglas.uuid);
					 
						});
					}
			}
		});
			
	});
	
