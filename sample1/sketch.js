// ball
let xPos, xDir;
let yPos, yDir;
let diam;
let speed;

// pad를 위한 변수
let padX // pad의 중심 X
let padWidth;  // pad의 폭

function setup() {
  createCanvas(600, 600);
  speed = 4;
  xPos = width / 2;
  xDir = speed;
  yPos = height / 2;
  yDir = speed;
  diam = 50;
  
  padWidth = 200;
}

function draw() {
  background(128);

  fill(255, 255, 0);
  ellipse(xPos, yPos, diam, diam);
  xPos = xPos + xDir;
  yPos = yPos + yDir;

  // pad를 마우스 위치에 그리자
  padX = mouseX - padWidth/2;
  fill(0, 255, 0)
  rect(padX, height-30, padWidth, 30);

  // ball bouncing 
  if ( xPos - diam/2 < 0) xDir = xDir * -1; 
  if ( xPos + diam/2 > width) xDir *=  -1;

  if ( yPos - diam/2 < 0) yDir *= -1; 
  if ( yPos + diam/2 > height) yDir *=  -1;
}