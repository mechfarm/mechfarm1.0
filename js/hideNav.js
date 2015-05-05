var main = function(){
	$('.showNav').click(function(){ 
		$('.nav').animate({ 
			left: '0px'
		}, 500);
		$('body').animate({
			left: '300px'
		}, 300);
	});
	
	$('.hideNav').click(function(){ 
		$('.nav').animate({ 
			left: '-300px'
		}, 300);
		$('body').animate({ 
			left: '0px'
		}, 500);
	});
}

$(document).ready(main); // avvia lo script quando il documento è caricato completamente

/* COMMENTO SPIEGAZIONE:
var main = function(){ // crea funzione
	$('.showNav').click(function(){ // controlla quando .showNav viene cliccato
		$('.nav').animate({  // quando è cliccato muove .nav finché left non è a 0px
			left: '0px'
		}, 500); // fa questa azione in 500ms
		$('body').animate({ // stessa cosa di sopra.
			left: '300px'
		}, 300); // ma in 300ms
	});
*/