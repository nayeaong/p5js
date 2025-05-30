let treeImg, tree2Img, sqImg, maImg, LfireImg, BfireImg;
let treePosX, treePosY, treeScale;
let smokeParticles = [];


function preload() {
  treeImg = loadImage("tree.png");
  tree2Img = loadImage("tree2.png");
  sqImg = loadImage("sq.png");
  maImg = loadImage("ma.png");
  LfireImg = loadImage("Lfire.png");
  BfireImg = loadImage("Bfire.png");
}

function setup() {
  fullscreen(true);
  createCanvas(windowWidth, windowHeight); // 반드시 fullscreen 이후에!
  imageMode(CENTER);

  treePosX = width * 0.5;
  treePosY = height * 0.6;
  treeScale = 0.3;

  startTime = millis(); // 시작 시간 저장
}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function draw() {
  background(255);
  drawSkyWithGradient();
  drawSunlight();
  drawSun();

  let imgW = treeImg.width * treeScale;
  let imgH = treeImg.height * treeScale;

  image(BfireImg, treePosX - 300, treePosY - 180, imgW, imgH + 200);

  image(treeImg, treePosX, treePosY, imgW, imgH + 150);
  image(treeImg, treePosX + 400, treePosY, imgW + 60, imgH + 150);
  image(treeImg, treePosX - 600, treePosY, imgW + 60, imgH + 150);
  image(treeImg, treePosX - 150, treePosY, imgW + 60, imgH + 150);

  image(tree2Img, treePosX - 300, treePosY, imgW, imgH + 150);
  image(tree2Img, treePosX + 250, treePosY, imgW, imgH + 150);
  image(tree2Img, treePosX - 187, treePosY, imgW, imgH + 150);
  image(tree2Img, treePosX + 600, treePosY, imgW, imgH + 150);
  image(tree2Img, treePosX - 70, treePosY + 50, imgW, imgH + 50);
  image(tree2Img, treePosX + 90, treePosY, imgW, imgH + 50);

  image(maImg, treePosX - 400, treePosY, imgW, imgH + 200);
  image(maImg, treePosX + 200, treePosY, imgW, imgH + 130);

  image(BfireImg, treePosX + 200, treePosY + 70, imgW + 50, imgH + 300);
  image(BfireImg, 0, treePosY + 70, imgW + 500, imgH + 300);
  image(BfireImg, 700, treePosY + 70, imgW + 500, imgH + 300);

  // 🌫 연기 생성 위치 (위치만 조정됨, X 좌표 그대로)
  smokeParticles.push(new SmokeParticle(treePosX + 320, treePosY - 160 ));  
   smokeParticles.push(new SmokeParticle(treePosX + 330, treePosY - 160 ));
  smokeParticles.push(new SmokeParticle(treePosX - 400, treePosY - 270));  
  smokeParticles.push(new SmokeParticle(treePosX+30 , treePosY + 130));  

  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    let p = smokeParticles[i];
    p.update();
    p.display();
    if (p.isFinished()) {
      smokeParticles.splice(i, 1);
    }
  }

   // 🎬 3초 후 부드럽게 회색으로 덮기 (fade 효과)
  if (millis() - startTime > 3000) {
    let fadeAlpha = map(millis() - startTime, 3000, 4000, 0, 255);
    fadeAlpha = constrain(fadeAlpha, 0, 150);
    noStroke();
    fill(169, 169, 169, fadeAlpha); // #A9A9A9 회색 + 알파값
    rect(0, 0, width, height);      // 전체 화면 덮기
  }
}
   



function drawSkyWithGradient() {
  for (let x = 0; x < width; x++) {
    let inter = map(x, 0, width, 0, 1);
    let c = lerpColor(color(135, 206, 235), color(255, 255, 200), inter);
    stroke(c);
    line(x, 0, x, height * 0.67);
  }
  noStroke();
  fill(34, 139, 34);
  rect(0, height * 0.67, width, height * 0.33);
}

function drawSunlight() {
  noStroke();
  for (let i = width * 0.3; i > 0; i -= width * 0.01) {
    fill(255, 255, 0, 20);
    ellipse(width * 0.8, height * 0.15, i);
  }
}

function drawSun() {
  fill(255, 255, 150);
  ellipse(width * 0.8, height * 0.15, width * 0.08, height * 0.1);
}

function drawClover(xFactor, yFactor) {
  let x = width * xFactor;
  let y = height * yFactor;
  fill(0, 150, 0);
  ellipse(x - 5, y - 5, 10, 10);
  ellipse(x + 5, y - 5, 10, 10);
  ellipse(x, y + 5, 10, 10);
  rect(x - 1, y + 5, 2, 10);
}

function drawDandelion(xFactor, yFactor) {
  let x = width * xFactor;
  let y = height * yFactor;
  fill(255, 215, 0);
  ellipse(x, y, 15, 15);
  fill(0, 128, 0);
  rect(x - 1, y, 2, 15);
}

function drawShrubs() {
  drawClover(0.15, 0.75);
  drawClover(0.16, 0.76);
  drawClover(0.17, 0.77);
}

function drawFlowers() {
  drawDandelion(0.25, 0.78);
  drawDandelion(0.26, 0.79);
  drawDandelion(0.27, 0.80);
  drawDandelion(0.53, 0.80);
  drawDandelion(0.7, 0.83);
}

class SmokeParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 180;
    this.age = 0;
    this.lifetime = 180;
    this.path = [];

    this.baseX = x;
    this.baseY = y;
    this.noiseOffset = random(1000);
    this.size = random(20, 40);
  }

  update() {
    this.age++;
    this.y -= 0.7;
    this.x = this.baseX + map(noise(this.noiseOffset + this.age * 0.01), 0, 1, -20, 20);
    this.path.push({ x: this.x, y: this.y });
    if (this.path.length > 20) {
      this.path.shift();
    }
    this.alpha = map(this.age, 0, this.lifetime, 180, 0);
  }

  display() {
    noFill();
    stroke(150, this.alpha);
    strokeWeight(20); // 연기 크기 2배
    beginShape();
    for (let p of this.path) {
      curveVertex(p.x, p.y);
    }
    endShape();
  }

  isFinished() {
    return this.age > this.lifetime;
  }
}
