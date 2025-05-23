let myFont;
let gameStarted = false;
let GoHome = false;
let IsPaused = false;
let bgImg;
let titleImg;
let currentImg;
let idleImg;
let clickImg;
const AS = "assets/";
let btnX, btnY, btnW, btnH;
let customCursor;
let ittyImgs = [];
let ittyFrame = 0;
let btnImgs = [];
let btnNames = ["pause", "help", "resume"];
const titlebtnNames = ["help"];
const gamebtnNames = ["pause", "help"];
const pausebtnNames = ["resume", "help"];
let ittypauseImgs = [];
let pauseFrame = 0;
let cartImg;
let potatochips;
let cereal;
let bread;
let jam;
let tomatosoupcan;
let brownies;
let peanutbutter;
let ramen;
let ricesack;
let water;
let itemButtons = [];
let hoveredButton = null;
let draggedButton = null;

function drawLabel(x, y, name,w=0) {
  textFont(myFont);
  textSize(12);
  let padding = 6;
  let boxW = textWidth(name) + padding * 2;
  let boxH = 18;
  
  let boxX = x + (w / 2) - (boxW / 2); // 아이템 중앙 정렬
  let boxY = y+20;

  // 반투명 박스
  fill(225, 100); // 검정 + 투명도
  noStroke();
  rect(boxX,boxY, boxW, boxH, 6); // 둥근 모서리

  // 텍스트
  fill(255);
  textAlign(CENTER, CENTER);
  text(name, x + w / 2, boxY + boxH / 2);
}
function preload() {
  myFont = loadFont("assets/MedodicaRegular.otf");
  bgImg = loadImage(AS + "background.png");
  titleImg = loadImage(AS + "pixelogo.png");
  startIdleImg = loadImage(AS + "play1.png");
  startouchImg = loadImage(AS + "play2.png");
  pausedImg = loadImage(AS + "paused.png");
  cartImg = loadImage(AS + "cart.png");
  customCursor = loadImage(AS + "cursor.png");
  potatochips = loadImage(AS + "items/potatochips.png");
  cereal = loadImage(AS + "items/cereal.png");
  bread = loadImage(AS + "items/bread.png");
  jam = loadImage(AS + "items/blueberryjam.png");
  tomatosoupcan = loadImage(AS + "items/tomatosoupcan.png");
  brownies = loadImage(AS + "items/brownies.png");
  peanutbutter = loadImage(AS + "items/peanutbutter.png");
  ramen = loadImage(AS + "items/ramen.png");
  ricesack = loadImage(AS + "items/ricesack.png");
  water = loadImage(AS + "items/water.png");
  for (let i = 1; i <= 7; i++) {
    ittyImgs.push(loadImage(AS + "ittysprite" + i + ".png"));
  }
  for (let i = 1; i <= 4; i++) {
    ittypauseImgs.push(loadImage(AS + "ittymarket.ver" + i + ".png"));
  }

  //버튼애들
  for (let name of btnNames) {
    const btn1Img = loadImage(`${AS}${name}1.png`);
    const btn2Img = loadImage(`${AS}${name}2.png`);
    btnImgs.push({
      name: name,
      idleImg: btn1Img,
      clickImg: btn2Img,
      currentImg: btn1Img,
      w: 20,
      h: 21,
    });
  }

  homeIdleImg = loadImage(AS + "home1.png");
  hometouchImg = loadImage(AS + "home2.png");
}

function setup() {
  createCanvas(320, 240);
  noSmooth();
  frameRate(60);
  noCursor();
  itemButtons = [
    { x: 188, y: 119, w: 26, h: 24, img: potatochips, label: "potatochips"},
    { x: 125, y: 117, w: 59, h: 27, img: bread,label: "bread"},
    { x: 85, y: 121, w: 39, h: 24, img: water,label: "water" },
    { x: 90, y: 87, w: 40, h: 11, img: jam,label: "blueberryjam" },
    { x: 138, y: 86, w: 32, h: 12, img: peanutbutter,label: "peanutbutter" },
    { x: 178, y: 82, w: 41, h: 16, img: ramen,label:"ramen" },
    { x: 90, y: 176, w: 63, h: 18, img: tomatosoupcan,label:"tomatosoupcan" },
    { x: 161, y: 170, w: 56, h: 24, img: ricesack,label: "rice" },
    { x: 92, y: 43, w: 44, h: 29, img: cereal,label:"cerealbox"},
    { x: 149, y: 50, w: 68, h: 21, img: brownies,label:"brownies" },
  ];

  textFont(myFont);
  textSize(24);
  for (let i = 0; i < btnImgs.length; i++) {
    btnImgs[i].x = 0;
    btnImgs[i].y = 0;
  }
  noCursor();
}

function Playing() {
  gameStarted = true;
  IsPaused = false;
  GoHome = false;
}
function Goback() {
  gameStarted = false;
  IsPaused = false;
  GoHome = true;
}

//
//뭔갈 그림
function draw() {
  if (!gameStarted || GoHome) {
    drawTitleScreen();
  } else if (IsPaused) {
    pauseGame();
  } else {
    drawGame();
    let cartDeltaX = updateCart();

    hoveredButton = null;
    for (let btn of itemButtons) {
      if (
        mouseX >= btn.x &&
        mouseX <= btn.x + btn.w &&
        mouseY >= btn.y &&
        mouseY <= btn.y + btn.h
      ) {
        hoveredButton = btn;
      }
    }

    draggedButton = null;
    for (let item of cartItems) {
      if (item.dragging) {
        draggedButton = item.sourceButton;
      }
      if (item.inCart && !item.dragging) {
        item.x += cartDeltaX;
      }
      item.update(cartItems);
      item.display();
    }
  }

  if (hoveredButton && hoveredButton.label) {
    drawLabel(hoveredButton.x, hoveredButton.y, hoveredButton.label);
  } else if (draggedButton&&draggedButton.label) {
    drawLabel(mouseX + 10, mouseY, draggedButton.label);
  }
  image(customCursor, mouseX - 0, mouseY - 0, 20, 20);
}

//로고

function drawTitleScreen() {
  image(bgImg, 0, 0, width, height);

  floatOffset = sin(frameCount * 0.05) * 3;

  let titleW = 151;
  let titleH = 108;
  let titleX = width / 2 - titleW / 2;
  let titleY = height / 2 - 70 + floatOffset;
  image(titleImg, titleX, titleY, titleW, titleH);

  let btnW = 70;
  let btnH = 70;
  let btnX = width / 2 - btnW / 2;
  let btnY = height / 2 + 40;

  let isPressed =
    mouseIsPressed &&
    mouseX > btnX &&
    mouseX < btnX + btnW &&
    mouseY > btnY &&
    mouseY < btnY + btnH;
  let currentBtnImg = startIdleImg;
  if (isPressed) {
    currentBtnImg = startouchImg;
    setTimeout(() => {
      Playing();
    }, 200);
  }
  image(currentBtnImg, btnX, btnY, btnW, btnH);

  //help button

  for (let i = 0; i < titlebtnNames.length; i++) {
    const btnName = titlebtnNames[i];
    const btn = btnImgs.find((b) => b.name === btnName);
    btn.x = width - 30;
    btn.y = 10;

    let isPressed =
      mouseIsPressed &&
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h;

    let currentImg = btn.idleImg;
    if (isPressed) {
      currentImg = btn.clickImg;
      //기능넣어야함
    }
    image(currentImg, btn.x, btn.y, btn.w, btn.h);
  }
  image(customCursor, mouseX - 0, mouseY - 0, 20, 20);
}

//게임화면

for (let item of cartItems) {
  if (item.dragging) {
    draggedButton = item.sourceButton; // 또는 item.name 등 버튼 정보
  }
}
function drawGame() {
  image(bgImg, 0, 0, width, height);

  ittyFrame += 0.05;
  if (ittyFrame >= ittyImgs.length) {
    ittyFrame = 0;
  }
  image(ittyImgs[int(ittyFrame)], 37, 25, 290, 217);

  for (let i = 0; i < gamebtnNames.length; i++) {
    const btnName = gamebtnNames[i];
    const btn = btnImgs.find((b) => b.name === btnName);

    let spacing = 10;
    btn.x = width - (btn.w + spacing) * (gamebtnNames.length - i);
    btn.y = 10;

    const isPressed =
      mouseIsPressed &&
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h;

    let currentImg = btn.idleImg;
    if (isPressed && btnName === "pause") {
      currentImg = btn.clickImg;
      setTimeout(() => {
        IsPaused = true;
      }, 200);
    }
    if (isPressed && btnName === "help") {
      currentImg = btn.clickImg;
    }
    image(currentImg, btn.x, btn.y, btn.w, btn.h);
  }
}

function mousePressed() {
  let created = false;
  for (let item of cartItems) {
    item.pressed(mouseX, mouseY);
  }
  if (!gameStarted) return;
  for (let btn of itemButtons) {
    if (
      mouseX >= btn.x &&
      mouseX <= btn.x + btn.w &&
      mouseY >= btn.y &&
      mouseY <= btn.y + btn.h
    ) {
      let grocery = new DraggableItem(mouseX, mouseY, btn.img);
      grocery.dragging = true;
      grocery.offsetX = 0;
      grocery.offsetY = 0;
      grocery.sourceButton = btn;
      grocery.label = btn.label;
      cartItems.push(grocery);
      created = true;
      break;
    }
  }
  if (!created) {
    for (let i = cartItems.length - 1; i >= 0; i--) {
      const item = cartItems[i];
      item.pressed(mouseX, mouseY);
      if (item.dragging) {cartItems.splice(i, 1);
        cartItems.push(item);
        break;
      }
    }
  }
}

function mouseReleased() {
  for (let item of cartItems) {
    item.released();
    if (!item.inCart) {
      item.falling = true;
    }
  }
}

//게임잠깐 정지
function pauseGame() {
  background(229, 124, 217);

  let textW = 100;
  let textH = 25;
  let textX = width / 2 - textW / 2;
  let textY = height / 2 - textH;
  image(pausedImg, textX, textY, textW, textH);

  let btnW = 70;
  let btnH = 70;
  let btnX = width / 2 - btnW / 2;
  let btnY = height / 2;

  let isPressed =
    mouseIsPressed &&
    mouseX > btnX &&
    mouseX < btnX + btnW &&
    mouseY > btnY &&
    mouseY < btnY + btnH;

  let currentBtnImg = homeIdleImg;
  if (isPressed) {
    currentBtnImg = hometouchImg;
    setTimeout(() => {
      Goback();
    }, 200);
  }
  image(currentBtnImg, btnX, btnY, btnW, btnH);

  for (let i = 0; i < pausebtnNames.length; i++) {
    const btnName = pausebtnNames[i];
    const btn = btnImgs.find((b) => b.name === btnName);

    let spacing = 10;
    btn.x = width - (btn.w + spacing) * (pausebtnNames.length - i);
    btn.y = 10;

    const isPressed =
      mouseIsPressed &&
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h;

    let currentImg = btn.idleImg;
    if (isPressed && btnName === "resume") {
      currentImg = btn.clickImg;
      setTimeout(() => {
        IsPaused = false;
      }, 200);
    }
    image(currentImg, btn.x, btn.y, btn.w, btn.h);
  }
  pauseFrame += 0.05;
  if (pauseFrame >= ittypauseImgs.length) {
    pauseFrame = 0;
  }
  image(ittypauseImgs[int(pauseFrame)], mouseX + 10, mouseY + 10, 42, 53);
}


function mouseDragged() {
  for (let item of cartItems) {
    if (item.dragging) {
      item.x = mouseX;
      item.y = mouseY;
    }
  }
}
function touchStarted() {
  // 마우스랑 동일하게 처리
  mousePressed();
  return false; // 모바일 스크롤 방지
}

function touchEnded() {
  mouseReleased();
  return false;
}

function touchMoved() {
  mouseDragged();
  return false;
}
