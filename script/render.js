const renderHome = () => {
	document.getElementById('portfolio-content1').style.visibility = 'hidden';
	document.getElementById('portfolio-content2').style.visibility = 'hidden';
	document.getElementById('instructions').style.visibility = 'hidden';
	document.getElementById('home-content').style.visibility = 'visible';
	
	document.getElementById('prev-button').style.visibility = 'hidden';
	document.getElementById('next-button').style.visibility = 'hidden';
}

const renderPortfolio = () => {
	document.getElementById('portfolio-content1').style.visibility = 'visible';
	document.getElementById('instructions').style.visibility = 'hidden';
	document.getElementById('portfolio-content2').style.visibility = 'hidden';
	document.getElementById('home-content').style.visibility = 'hidden';
	
	document.getElementById('prev-button').style.visibility = 'visible';
	document.getElementById('next-button').style.visibility = 'visible';
}

const renderPortfolio2 = () => {
	document.getElementById('portfolio-content1').style.visibility = 'hidden';
	document.getElementById('instructions').style.visibility = 'hidden';
	document.getElementById('portfolio-content2').style.visibility = 'visible';
	document.getElementById('home-content').style.visibility = 'hidden';
	
	document.getElementById('prev-button').style.visibility = 'visible';
	document.getElementById('next-button').style.visibility = 'visible';
}

const renderPersonal = () => {
	window.location.href = "https://github.com/victorkoenders";
}

const renderTrangar = () => {
	window.location.href = "https://github.com/Trangar";
}

const renderInstruction = () => {
	if(currentSelected != null) {
		currentSelected.dehighlight();
		currentSelected.disable = false;
		currentSelected.rendered = false;
		currentSelected = null;
		
		pageSelected.dehighlight();
		pageSelected.disable = false;
		pageSelected.rendered = false;
		
		pageSelected = prev;
		pageSelected.highlight();
		pageSelected.disable = true;
		pageSelected.rendered = true;
		
		document.getElementById('home-content').style.visibility = 'hidden';
		document.getElementById('portfolio-content2').style.visibility = 'hidden';
		document.getElementById('portfolio-content1').style.visibility = 'hidden';
		document.getElementById('prev-button').style.visibility = 'hidden';
		document.getElementById('next-button').style.visibility = 'hidden';
		
		
		
		var element = document.getElementById('instructions');
		if(element.style.visibility == 'visible') {
			element.style.visibility = 'hidden';
		} else {
			element.style.visibility = 'visible';
		}
	} 
	
}

function detectMob() {
    return ( ( window.innerWidth <= 850 ) && ( window.innerHeight <= 700 ) );
  }

const renderMobile = () => {
	var body = document.getElementById('body');
	body.innerHTML = 'Page does not support mobile browsers.';
	body.style.display = 'flex';
	body.style.justifyContent = 'center';
	body.style.alignItems = 'center';
}