const screen_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const screen_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

if(detectMob()) {
	renderMobile();
}

class Car {
	constructor(name, x, y) {
		this.x = x*screen_width/100;
		this.y = y*screen_height/100;
		this.width = 40;
		this.height = 70;
		this.deg = 90;
		this.speed = 0.0;
		
		var img = document.createElement('img');
		img.id = name;
		img.src = './image/car.png';
		img.style.width = this.width + 'px';
		img.style.height = this.height + 'px';
		img.style.left = this.x + 'px';
		img.style.top = this.y + 'px';
		img.style.transform = 'rotate(' + this.deg + 'deg)';
		img.style.position = 'absolute';
		img.style.zIndex = '10';
		document.getElementById('app').appendChild(img);
		this.ref = document.getElementById(name);
	}
	
	rotateRight = () => {
		this.deg += 5;
	}
	
	rotateLeft = () => {
		this.deg -= 5;
		
	}
	
	forward = () => {
		if(this.speed < 10.0) {
			this.speed += 5.0 * 0.035;
		}
	}
	
	backward = () => {
		if(this.speed > -5.0) {
			this.speed -= 5.0 * 0.035;
		}
	}
	
	setInvisible = () => {
		this.ref.style.visibility = 'hidden';
	}
	
	render = () => {
		this.ref.style.left = this.x*100/screen_width + 'vw';
		this.ref.style.top = this.y*100/screen_height + 'vh';
		this.ref.style.transform = 'rotate(' + this.deg + 'deg)';
	}
}

class Button {
	constructor(id) {
		this.ref = document.getElementById(id);
		var style = window.getComputedStyle(this.ref);
		this.x = parseInt(style.left.trimRight('px'));
		this.y = parseInt(style.top.trimRight('px'));
		this.width = parseInt(style.width.trimRight('px'));
		this.height = parseInt(style.height.trimRight('px'));
		this.ishighlight = false;
		this.disabled = false;
		this.rendered = false;
		this.hovered = false;
	}
	
	setHref = (url) => {
		this.href = url;
	}
	
	setFunc = (func) => {
		this.func = func;
	}
	
	highlight = () => {
		this.ref.style.backgroundColor = 'white';
		this.ref.style.color = 'black';
		this.ishighlight = true;
	}
	
	dehighlight = () => {
		this.ref.style.backgroundColor = '#634160';
		this.ref.style.color = 'white';
		this.ishighlight = false;
	}
}


function init() {
	car1 = new Car('car', 87, 22);
	car2 = new Car('car2', 0, 0);
	car2.setInvisible();
	
	home = new Button("home");
	home.setFunc(renderHome);
	
	portfolio = new Button("portfolio");
	portfolio.setFunc(renderPortfolio);
	
	personal = new Button("personal-github");
	personal.setFunc(renderPersonal);
	
	trangar = new Button("trangar-github");
	trangar.setFunc(renderTrangar);
	
	prev = new Button("prev-button");
	prev.setFunc(renderPortfolio);
	prev.highlight();
	prev.disabled = true;
	pageSelected = prev;
	
	next = new Button("next-button");
	next.setFunc(renderPortfolio2);
	
	document.addEventListener("keydown", (e) => {
			if(controller[e.key]) {
				controller[e.key].pressed = true
			}
	});
	
	document.addEventListener("keyup", (e) => {
			if(controller[e.key]) {
				controller[e.key].pressed = false
			}
	});
	
	home.ref.addEventListener("onmouseover", function() {
		this.highlight();
		console.log('hovered');
	});
	
	home.ref.addEventListener("onmouseout", function() {
		this.dehighlight();
	});
}

var car1;
var car2;
var home;
var portfolio;
var personal;
var trangar;
var currentSelected;

var prev;
var next;
var pageSelected;

var timeNow = new Date();

init();
var cars = [car1, car2];
var buttons = [home, portfolio, personal, trangar];
var pages = [prev, next];

const executeKeys = () => {
	Object.keys(controller).forEach(key=> {
		controller[key].pressed && controller[key].func()
	})
}


const updateCars = () => {
	Object.values(cars).forEach(car=> {
		var otherCar;
		
		if(car === car1) {
			otherCar = car2;
		} else {
			otherCar = car1;
		}
		
		
		if (car.speed > 0.1) {
		car.speed -= 2.5 * 0.035;
		} else if (car.speed < -0.1 ) {
			car.speed += 2.5 * 0.035;
		} else if(car.speed > 0 && car.speed < 0.1) {
			car.speed = 0;
		} else if(car.speed < 0 && car.speed > -0.1) {
			car.speed = 0;
		}
		
		if(car.deg >= 360 || car.deg <= -360) {
			car.deg %= 360;
		}
		
		var sinTheta = Math.sin( (90 + car.deg) * (Math.PI / 180));
		var cosTheta = Math.cos((90 + car.deg) * (Math.PI / 180));
		var dx = cosTheta * car.speed;
		var dy = sinTheta * car.speed;
		
		if(car.y + dy < 0 || car.y + dy > window.innerHeight ) {
			dy = -dy;
			car.speed = -car.speed;
		}
		
		if(car.x + dx < 0 || car.x + dx > window.innerWidth ) {
			dx = -dx;
			car.speed = -car.speed;
		}
		
		car.y += dy;
		car.x += dx;
		
		car.render();
	})
}

const checkCollision = (button) => {
	if(car1.x - car1.width >= button.x - button.width/2 && car1.x <= button.x + button.width &&
		car1.y >= button.y - button.height/2 && car1.y <= button.y + button.height) {
			return true;
		} else {
			return false;
		}
}

const handleButtons = () => {
	Object.values(buttons).forEach(button=> {
		if(button.ishighlight && checkCollision(button)) {
			if(button != currentSelected && currentSelected != null) {
				currentSelected.dehighlight();
				currentSelected.disabled = false;
				button.rendered = false;
			}
			
			currentSelected = button;
			button.disabled = !button.disabled;
			
			if(!button.rendered) {
				button.func();
				button.rendered = true;
			}
			
		}
	})
	
	Object.values(pages).forEach(button=> {
		if(button.ishighlight && checkCollision(button)) {
			if(button != pageSelected && pageSelected != null) {
				pageSelected.dehighlight();
				pageSelected.disabled = false;
				button.rendered = false;
			}
			
			pageSelected = button;
			button.disabled = !button.disabled;
			
			if(!button.rendered) {
				button.func();
				button.rendered = true;
			}
			
		}
	})
}



const handleCollisions = (buttons, currentSelected) => {
	Object.values(buttons).forEach(button=> {
		if((checkCollision(button) && button != currentSelected) || button.hovered) {
			button.highlight();
		} else if(button != currentSelected && !button.hovered){
			button.dehighlight();
		}
	})
}


const controller = {
	"ArrowLeft": {pressed: false, func: car1.rotateLeft},
	"ArrowRight": {pressed: false, func: car1.rotateRight},
	"ArrowUp": {pressed: false, func: car1.forward},
	"ArrowDown": {pressed: false, func: car1.backward},
	" ": {pressed: false, func: handleButtons},
	"Escape": {pressed: false, func: renderInstruction},
}





var loop = setInterval(function() {
	
	executeKeys();
	
	updateCars();
	
	handleCollisions(buttons, currentSelected);
	
	if(portfolio.rendered) {
		handleCollisions(pages, pageSelected);
	}
	
	
	
}, 35);

