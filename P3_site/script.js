class Script{
	constructor(){
		let monSlider = new Slide(
["Image/Slide1.jpg","Image/Slide2.jpg","Image/Slide3.jpg","Image/Slide4.jpg"],
["Vélo","Vélo2","Vélo3","Vélo4"],
["Réservez votre vélo en un clic","Choisissez la station de votre choix","Remplissez les informations","C'est parti !"],
document.getElementById("Diaporama"),
document.getElementsByClassName("imageSlide"),
document.getElementById("slideBtnPause"),
document.getElementById("slideTxt")
);

let BtnLeft = document.getElementById("slideBtnLeft");
let BtnRight =  document.getElementById("slideBtnRight");
let BtnPause = document.getElementById("slideBtnPause");

monSlider.Play =false;
monSlider.Timer = setInterval(function (){monSlider.SlideRight()},5000);

BtnRight.addEventListener("click", function (){
	monSlider.SlideRight();
});
BtnLeft.addEventListener("click", function (){
	monSlider.SlideLeft();
});
BtnPause.addEventListener("click", function (){
	if (monSlider.Play){
		monSlider.Timer = setInterval(function (){monSlider.SlideRight()},5000);
	}
	if (!monSlider.Play){
		clearInterval(monSlider.Timer);	
	}
	monSlider.ChangePlayPause();
});
document.addEventListener('keydown',function(){
	if (event.keyCode === 37){
		monSlider.SlideLeft();
	}
	else if (event.keyCode === 39){
		monSlider.SlideRight();
	}
});

//Carte
let maMap = new map(45.75, 4.85);

//Jc Decaux
let maRequete = new requeteListeStation(maMap);

//Canvas
let monCanvas = new canvas();

let bouttonValider = document.getElementById("validerSignature");
let bouttonReset = document.getElementById("resetSignature");

//Valide la signature
	 bouttonValider.addEventListener("click",function(){
		let divRecapReservation = document.getElementById("RecapReservation");
		divRecapReservation.style.display = "block";
	});
		
//Reinitialise le canvas
	bouttonReset.addEventListener("click",function (){
		monCanvas.effacerSignature();
	});
//Donnees Reservation
let maReservation = new DonneesReservation();

let divrecapReservation = document.getElementById("RecapReservation");

document.getElementById("validerSignature").addEventListener("click",function(){
	if ((localStorage.getItem("ReservationenCours") == "null") || (Number(localStorage.getItem("ReservationenCours")) == 0)){
		sessionStorage.setItem("Station",sessionStorage.getItem("stationChoisit"));
		sessionStorage.setItem("Addresse",sessionStorage.getItem("Addressechoisit"));
		maReservation.Init();
		document.getElementById("Signature").style.display = "none";
	}
	else{
			sessionStorage.setItem("Addresse", document.getElementById("Adresse").textContent);
			clearInterval(maReservation.chrono); 
			maReservation.Init();
			document.getElementById("Signature").style.display = "none";
	}
});

if (localStorage.getItem("ReservationenCours") == "1"){
	divrecapReservation.style.display = "block";
	maReservation.Reserver = true;
	maReservation.chrono = setInterval(() => maReservation.Decompte(),1000);
}
else{
	divrecapReservation.style.display = "none";
	clearInterval(maReservation.chrono);
}
	}
}
let monScript = new Script();