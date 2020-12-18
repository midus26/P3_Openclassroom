class DonneesReservation{
	constructor(){
		//LocalStorage
		this.nomReservant = localStorage.getItem("Nom");
		this.prenomReservant = localStorage.getItem("Prenom");
		this.stationReserver = sessionStorage.getItem("Station");
		this.ReservationenCours = localStorage.getItem("ReservationenCours");
		//Id
		this.divTemps = document.getElementById("TempsRestant");
		this.divNom = document.getElementById("Nom");
		this.divPrenom = document.getElementById("Prenom");
		//Information supplémentaire pour le fonctionnement
		this.Reserver = false;
		this.chrono = null;
	};	
	//Initialise la réservation
	Init(){
		this.Reserver = true;
		localStorage.setItem("ReservationenCours",1);
		this.InitCompteur();
		this.Affichage();
		this.chrono = setInterval(() =>this.Decompte(),1000);
	}
	//Mets à jour le suivi du decompte
	Affichage(){
		if (this.Reserver){
			let divdetailRecap = document.getElementById("DetailReservation");
			let divdetailTemps = document.getElementById("TempsRestant");
			divdetailRecap.textContent = localStorage.getItem("Prenom") + " " + localStorage.getItem("Nom") + " à reserver un vélo à la station " + sessionStorage.getItem("Addresse");
			divdetailTemps.textContent = "il reste " + sessionStorage.getItem("Minute") + " Minute " + sessionStorage.getItem("Seconde") + " Seconde pour recuperer votre vélo";
		}
		else{
			let divdetailRecap = document.getElementById("DetailReservation");
			let divdetailTemps = document.getElementById("TempsRestant");
			divdetailRecap.textContent = "Fin de la reservation";
			divdetailTemps.textContent = "Délai écoulé";
		}
	}
	//Debut du compteur
	InitCompteur(){
		sessionStorage.setItem("Minute", 20);
		sessionStorage.setItem("Seconde",0);
	}
	//Methode decompte du temps
	Decompte(){
		if (sessionStorage.getItem("Minute") >= 0 && sessionStorage.getItem("Seconde") >= 0){
			sessionStorage.setItem("Seconde" , sessionStorage.getItem("Seconde")-1);
			if (sessionStorage.getItem("Seconde") < 0){
				sessionStorage.setItem("Minute", sessionStorage.getItem("Minute")-1);
				sessionStorage.setItem("Seconde", 59);
				if (sessionStorage.getItem("Minute") == -1){
					this.Reserver = false;
					clearInterval(this.chrono);
					localStorage.setItem("ReservationenCours",0);
					sessionStorage.removeItem("Minute");
					sessionStorage.removeItem("Seconde");
				}
			}
			this.Affichage();
		}
	}
};