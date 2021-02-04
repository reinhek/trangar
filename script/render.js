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

	var time = new Date();
	console.log(time);
	console.log(currentSelected);
	console.log(pageSelected);
	
}

function detectMob() {
	screen_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	screen_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return ( ( screen_width <= 1024 ) || ( screen_height <= 700 ) );
  }

const renderMobile = () => {
	var body = document.getElementById('body');
	body.innerHTML = '';
	body.style.display = 'flex';
	body.style.justifyContent = 'center';
	body.style.alignItems = 'center';
	body.style.textAlign = 'center';
	body.style.backgroundColor = '#005951';
	
	var div = document.createElement('div');
	div.innerHTML = 'Page does not support lower resolutions.<br>Please resize the browser and refresh the page.';
	div.style.position = 'absolute';
	div.style.top = '40%';
	div.style.fontSize = '35px';
	
	
	
	body.appendChild(div);
}
