
function dodajVrstuApartman(){
	let c = "<tr align='center'> " +
			" <td>2</td> " +
			" <td>Stan</td> " +
			" <td>Dzoni</td> " +
			" <td>2000e</td> " +
			" <td>2</td> " +
			" <td>5</td> " +
 			" <td>Ulica 700 rupa</td> " +
			" <td> <button id='editAp1'> Details </button></td> </tr>; ";
	$("#tablePrikazApartmana").append(c);
}



$(document).ready(function (){
		let vrsta = "<tr><td></td><td> Sadrzaj 1 </td></tr>"
		$('#tableSadrzaj').append(vrsta);
		
		let vrsta2 = "<tr><td></td><td> Sadrzaj 2 </td></tr>"
		$('#tableSadrzaj').append(vrsta2);
		
		vrsta = "<tr><td></td><td> Uzasno lose, srmdi na dosije X </td></tr>"
		$('#tableKomentari').append(vrsta);
		
		vrsta2 = "<tr><td></td><td> Grmi apartman, znaci lomi, resi apartman </td></tr>"
		$('#tableKomentari').append(vrsta2);
		
		dodajVrstuApartman();
		$.get({
	        url: '../rest/activeApartments',
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