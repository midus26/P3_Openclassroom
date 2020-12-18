class canvas{
	constructor(){
		this.divSignature = document.getElementById("Signature");
		this.divCanvas = document.getElementById("Canvas");//Canvas (zone ou dessiner)
		this.bouttonReset = document.getElementById("resetSignature");//Bouton pour reinitialiser la signature
		this.bouttonValider = document.getElementById("validerSignature");//Bouton pour valider la signature
		this.ctx = this.divCanvas.getContext('2d');
		let dessiner = false;
				
		//Appel des fonctions pour dessiner à la souris
		this.divCanvas.addEventListener("mousedown",(e) => {this.debutDessin(e,true)});
		this.divCanvas.addEventListener("mouseup",() => {this.finDessin()});
		this.divCanvas.addEventListener("mousemove",(e) => {this.Dessiner(e,true)});
		
		//Appel des fonctions pour dessiner au pavé tactile
		this.divCanvas.addEventListener("touchstart",(e) => {this.debutDessin(e,false),false});
		this.divCanvas.addEventListener("touchend",() => {this.finDessin()},false);
		this.divCanvas.addEventListener("touchmove",(e) => {this.Dessiner(e,false),false});
	};
	
	//Debut du dessin
	debutDessin(e,souris){
		this.dessiner = true;
		this.ctx.fillStyle = "black";
		this.ctx.lineWidth = 5;
		this.bouttonReset.style.display = "block";
		this.bouttonValider.style.display = "block";
		let rect = this.divCanvas.getBoundingClientRect(); // Permet de prendre en compte l'emplacement de l'objet par rapport au viewport
		if (souris){
			//Decalage de la souris selon le noeud parent
			this.ctx.fillRect(e.offsetX,e.offsetY,2,2);
		}
		else if (!souris){
			//Soustraction de la dimension de la fenetre et de la position de la souris
			this.ctx.fillRect(e.touches[0].clientX - rect.left,e.touches[0].clientY - rect.top,2,2);
		}
		this.ctx.closePath();
	}
	//Fini de dessiner
	finDessin(){
		this.dessiner = false;
		this.ctx.beginPath();
	}
	//Dessin en cours
	Dessiner(e,souris){
		if(this.dessiner){
			e.preventDefault();
			if (souris){
				this.ctx.lineTo(e.offsetX,e.offsetY);
			}
			else if (!souris){
				let rect = this.divCanvas.getBoundingClientRect();
				this.ctx.lineTo(e.touches[0].clientX - rect.left,e.touches[0].clientY - rect.top);
			}
			this.ctx.stroke();
		}
	}
	//Position de la souris
	effacerSignature(){
		this.ctx.clearRect(0,0,200,150);
		this.bouttonReset.style.display = "none";
		this.bouttonValider.style.display = "none";
	}
};