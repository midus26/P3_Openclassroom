class recuperationDonnees{
	constructor(numeroStation,Address,Status,VeloDisponible,AccrocheDisponible){
		this.numeroStation = numeroStation;
		this.Address = Address;
		this.Status = Status;
		this.VeloDisponible = VeloDisponible;
		this.AccrocheDisponible = AccrocheDisponible;
		this.divSignature = document.getElementById("Signature");
	};
	//Affichage Détail de la station choisit
	Affichage(){
		
	const divcolonneReservation = document.getElementById("colonneReservation");
	const divReservation = document.getElementById("Reservation");
	const divNomStation = document.getElementById("NomStation");
	const divAdresse = document.getElementById("Adresse");
	const divStationdisponible = document.getElementById("StationDisponible");
	const divnombrePlaceDisponible = document.getElementById("nombrePlaceDisponible");
	const divnombreVeloDisponible = document.getElementById("nombreVeloDisponible");
	
	divcolonneReservation.style.display = "block";
	divReservation.style.display = "block";
	divReservation.style.backgroundColor = "white";
	divReservation.style.color = "#5CADD3";
	
	//SI Erreur
	if (this.Address != "undefined"){
	divAdresse.innerHTML = "<p>" + this.Address + "</p>";
	}
	else{
		divAdresse.innerHTML = "";
	}
	//Status de la station choisit
	if (this.Status == "OPEN"){
		divStationdisponible.innerHTML = "<p>Station Disponible</p>";
		divStationdisponible.style.color = "green";
	}
	else if (this.Status == "CLOSED"){
		divStationdisponible.innerHTML = "<p>Station Non Disponible</p>";
		divStationdisponible.style.color = "red";
	}
	if (this.VeloDisponible > 0){
		divnombreVeloDisponible.innerHTML = "<p>" + this.VeloDisponible + " Velos disponible</p>";
		divnombreVeloDisponible.style.color = "#5CADD3";
	}
	else{
		divnombreVeloDisponible.innerHTML = "<p>Plus de vélo disponible</p>";
		divnombreVeloDisponible.style.color = "red";
	}
	divnombrePlaceDisponible.innerHTML = "<p>" + this.AccrocheDisponible + " Stands disponible</p>";
}
	//Cadre Nom Prenom Reserver
	Inscription(stationDisponible){
		const divFormulaire = document.getElementById("Formulaire");
		const divFormulaireboutonReserver = document.getElementById("boutonReserver");
		const divSignature = document.getElementById("Signature");

		//Si la station est disponible afficher le cadre pour reserver
		if (stationDisponible){
		divFormulaire.style.display = "block";
		let divNom = document.getElementById("Nom");
		let divPrenom = document.getElementById("Prenom");
		let divReserver = document.getElementById("boutonReserver");

		if( localStorage.getItem("Nom") != null ){
			divNom.value = localStorage.getItem("Nom");
		}
		if (localStorage.getItem("Prenom") != null){
			divPrenom.value = localStorage.getItem("Prenom");
		}
			
			divReserver.addEventListener("click",(event) =>{
				event.preventDefault();
				if (divNom.value !== "" && divPrenom.value !== ""){
					localStorage.setItem("Nom", divNom.value);
					localStorage.setItem("Prenom", divPrenom.value);
					divSignature.style.display = "flex";
					sessionStorage.setItem("stationChoisit",this.numeroStation);
					sessionStorage.setItem("Addressechoisit", this.Address);
				}
			})
		}
		else{
			divFormulaire.style.display = "none";
			divSignature.style.display = "none";
		}
	}
};