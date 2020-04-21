/***** sketch.js *****/
/**
 * \example Gui/mouse-track
 *
 * GUI mouse tracker
 * =========
 *
 * p5js file that reads mouse (x,y) coordinates and send them to render.cpp through a buffer
 *
 **/

let w;
let phase = 0;
let speed = 1;

function setup() {
	//Create a canvas of dimensions given by current browser window
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	// w is used for drawing bars off screen
	w = sqrt(width * width + height * height)*1.5;

}

function draw() {

	background(255);

	// Retrieve the data being sent from render.cpp
	let numOscillators = Bela.data.buffers[0] * 2;
	let cycleTime = Bela.data.buffers[1];

	speed = map(cycleTime, 0.1, 5.0, 10, 0.5);

	push();

	translate(width / 2, height / 2);　
	rotate(60);
	translate(-w / 2, -w / 2);
	phase += speed;
	for (let i = 0; i < numOscillators; i++)
	{

		x = w - ((i / numOscillators * w + phase) % w);

		if (i % 2 === 0) {
			stroke(213, 213, 213);
		} else {
			stroke(28, 232, 181);
		}
		strokeWeight(w / (numOscillators*2));
		line(x, 0, x, w);
	}

	pop();

	textAlign(CENTER);
	textSize(40);
	text("MOVE MOUSE TO\nCHANGE SPEED", width / 2, height - 100);

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	w = sqrt(width * width + height * height);
}

function mouseMoved() {
	//Sends to render.cpp a buffer. First argument is buffer index, second one is data type and third one is data sent.
	//In this case we send an array with two elements.
	Bela.data.sendBuffer(0, 'float', [mouseX/width, mouseY/height]);
}
