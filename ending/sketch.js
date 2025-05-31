function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  textSize(24);         // 글씨 크기
  textLeading(36);      // 줄 간격
  textWrap(WORD);       // 단어 기준 줄바꿈

  let x = windowWidth / 4;
  let y = windowHeight / 6;
  let textBoxWidth = windowWidth / 2;

  // 각 문단 내용
  let paragraphs = [
    "김나영: 원하는 것을 AI가 다 구현해 줄 수 있을 것 같았는데 그렇지 않았음. 또한 기능들을 함수 단위로 나누고 합치는 것이 어려운 작업임을 느낌.",
    "문수현: 마우스와 키보드 이외의 새로운 인터렉션을 공부해 볼 수 있어서 유익했습니다.",
    "서예린: 한 학기동안 배운 것으로 하나의 작품을 만들어서 뿌듯하다",
    "AI를 이용해 제작한 콘텐츠: 모든 콘텐츠 / 마을 전체 화면, 산불, 수질 오염 등",
    "AI 사용 비율: 99% > AI를 사용해 기본적인 코드 틀을 잡은 뒤 위치, 색 등 디테일한 부분 직접 수정",
    "사용한 기능, 문법 사항: if문, for 문, loadImage, handPose, 배열, class 등"
  ];

  // 문단별 색상 (각각 다른 색)
  let colors = [
    color(255, 0, 0),      // 빨강
    color(0, 102, 204),    // 파랑
    color(0, 153, 0),      // 초록
    color(153, 51, 255),   // 보라
    color(255, 153, 0),    // 주황
    color(0)               // 검정
  ];

  // 문단 출력
  for (let i = 0; i < paragraphs.length; i++) {
    fill(colors[i]); // 문단별 색 설정
    text(paragraphs[i], x, y, textBoxWidth);

    // 현재 문단의 줄 수 추정
    let lines = ceil(textWidth(paragraphs[i]) / textBoxWidth);

    // 문단 간 간격 설정
    if (i === 1) {
      y += lines * 36 + 40; // 문단 띄기
    } else {
      y += lines * 36 + 20;
    }
  }
}
