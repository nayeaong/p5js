let handpose;
let video;
let predictions = [];
let cigarette;
let cigaretteX, cigaretteY;
let isHolding = true;
let dropSpeed = 0;
let gravity = 0.5;

function preload() {
  cigarette = loadImage('cig.png');
}
function modelReady() {
  console.log("Handpose model ready!");
}
// ... existing code ...
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);  // 캔버스 크기와 동일하게 설정
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });
}
// ... existing code ...

function draw() {
  background(220);  // 배경색 설정
  ellipse(100, 100, 50,50);  // 출력 확인용
  image(video, 0, 0, width, height);

  
  // 비디오를 거울처럼 반전시켜 표시
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  // 손 인식 결과 표시
  drawHand();

  // 담배 위치 업데이트 및 표시
  updateCigarette();
  displayCigarette();
}

function drawHand() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    
    // 모든 손가락이 펴져있는지 확인
    let allFingersExtended = true;
    for (let i = 0; i < hand.annotations.length; i++) {
      let finger = hand.annotations[i];
      // 엄지손가락이 아닌 경우
      if (i > 0) {
        let tip = finger[3];
        let base = finger[0];
        // 손가락이 펴져있는지 확인 (y좌표 비교)
        if (tip[1] < base[1]) {
          allFingersExtended = false;
          break;
        }
      }
    }

    // 손바닥 중심점 계산
    let palmX = hand.annotations.palmBase[0][0];
    let palmY = hand.annotations.palmBase[0][1];

    // 손이 펴져있을 때 담배 떨어뜨리기
    if (allFingersExtended && isHolding) {
      isHolding = false;
      cigaretteX = palmX;
      cigaretteY = palmY;
      dropSpeed = 0;
    }

    // 손이 펴져있지 않을 때는 담배를 들고 있음
    if (!allFingersExtended) {
      isHolding = true;
      cigaretteX = palmX;
      cigaretteY = palmY;
    }
  }
}

function updateCigarette() {
  if (!isHolding) {
    dropSpeed += gravity;
    cigaretteY += dropSpeed;
    
    // 바닥에 닿으면 멈춤
    if (cigaretteY > height - 50) {
      cigaretteY = height - 50;
      dropSpeed = 0;
    }
  }
}

function displayCigarette() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(cigarette, -cigaretteX - 25, cigaretteY - 25, 50, 50);
  pop();
}