let hand_behind, hand_front, cigaTrash;

function preload() {
  hand_behind = loadImage('hand_behind.png');
  hand_front = loadImage('hand_front.png');
  cigaImg = loadImage('cigaImg.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(255);
  drawHandWithCigarette(300, 300);
}

function drawHandWithCigarette(x, y) {
  // 이미지 크기
  let imgSize = 200;

// 1. 손 뒤
  image(hand_behind, width/2,height/2,cigaImg.width/2,cigaImg.height/2);

  // 2. 담배 (손 중심에서 살짝 오른쪽 위로)
  let cigaOffsetX = 20;
  let cigaOffsetY = -40;


  image(cigaImg,width/2,height/2 - 140,cigaImg.width/2,cigaImg.height/2);

  // 3. 손 앞 (가장 마지막에 그림 → 가장 앞에 나타나야 정상)
  image(hand_front,width/2,height/2,cigaImg.width/2,cigaImg.height/2 );
}
