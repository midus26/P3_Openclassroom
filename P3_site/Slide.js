class Slide{
	constructor(cheminImage,altImage,textSlide,Diaporama,Image,PlayPause,DiaporamaTxt){
	this.cheminImage = cheminImage;
	this.altImage = altImage;
	this.textSlide = textSlide;
	this.Diaporama = Diaporama;
	this.Image = Image;
	this.PlayPause = PlayPause;
	this.DiaporamaTxt = DiaporamaTxt;
	this.Play = false;
	this.ImageActuelle = 0;
	};
	
	/*Bouton switch*/
	SlideLeft(){
		this.ImageActuelle--;
		if (this.ImageActuelle < 0){
			this.ImageActuelle = this.cheminImage.length-1;
		}
		this.Image[0].src = this.cheminImage[this.ImageActuelle];
		this.DiaporamaTxt.innerHTML = "<p>" + this.textSlide[this.ImageActuelle] + "</p>";
	}
	SlideRight(){
		this.ImageActuelle++;
		if (this.ImageActuelle>this.cheminImage.length-1){
			this.ImageActuelle=0;
		}
		this.Image[0].src = this.cheminImage[this.ImageActuelle];
		this.DiaporamaTxt.innerHTML = "<p>" + this.textSlide[this.ImageActuelle] + "</p>";
	}
	
	/*Switch Boutton Play/Pause*/
	ChangePlayPause(){
		if (this.Play){
			this.PlayPause.style.backgroundColor = "RGBa(0,0,0,0.4)";
			this.Play = false;
		}
		else{
			this.PlayPause.style.backgroundColor = "white";
			this.Play = true;
		}
	}
};

