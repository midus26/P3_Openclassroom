
/*clé API JC DECAUX = 664d89d05067d5f562c484807762b6194c512f95*/
class requeteListeStation{
	constructor(carte){
		this.maMap = carte;
	var request = new XMLHttpRequest();
	request.maMap = this.maMap;
	request.onreadystatechange = function(){
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var reponse = JSON.parse(this.responseText);
		let monMarker;
		let groupeMarker = new L.MarkerClusterGroup();
		for(let i=0;i<=reponse.length-1;i++){
			monMarker = new L.marker([reponse[i].position.latitude,reponse[i].position.longitude]);
			monMarker.numeroStation = reponse[i].number;
			monMarker.Address = reponse[i].name;
			monMarker.Status = reponse[i].status;
			monMarker.Bikes = reponse[i].mainStands.availabilities.bikes;
			monMarker.Stands = reponse[i].mainStands.availabilities.stands;
			monMarker.addEventListener('click',function (){
				//Recuperer la station demander du client à JCDECAUX
				var requestStation = new XMLHttpRequest();
					requestStation.onreadystatechange = function(){
						if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var reponseStation = JSON.parse(this.responseText);
							let maStation = new recuperationDonnees(reponseStation.number,reponseStation.name,reponseStation.status,reponseStation.totalStands.availabilities.bikes,reponseStation.totalStands.availabilities.stands);//Recuperation a jour de la Station
							maStation.Affichage();//Affichage des informations dans le cadre à droite de la carte
							if (maStation.Status == "OPEN" && maStation.VeloDisponible > 0){
								maStation.Inscription(true);
							}			
							else{
								maStation.Inscription(false);
							}
						}
					}
				let url= "https://api.jcdecaux.com/vls/v3/stations/" + this.numeroStation + "?contract=lyon&apiKey=664d89d05067d5f562c484807762b6194c512f95";
				requestStation.open("GET", url);
				requestStation.send();
			});
			groupeMarker.addLayer(monMarker);//Fonction de regroupement des marker
		}
		this.maMap.mymap.addLayer(groupeMarker);
	}
	}
	request.open("GET","https://api.jcdecaux.com/vls/v3/stations?contract=lyon&apiKey=664d89d05067d5f562c484807762b6194c512f95");
	request.send();
	};
};

