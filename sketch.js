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
let riceImg;
let waterImg;
let itemButtons = [];

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
  riceImg = loadImage(AS + "items/ricesack.png");
  waterImg = loadImage(AS + "items/water.png");
  for (let i = 1; i <= 7; i++) {
    ittyImgs.push(loadImage(AS + "ittysprite" + i + ".png"));
  }
  for (let i = 1; i <= 4; i++) {
    ittypauseImgs.push(loadImage(AS + "ittymarket.ver" + i + ".png"));
  }

  //踰꾪듉�좊뱾
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
    { x: 188, y: 119, w: 26, h: 24, img: potatochips },
    { x: 125, y: 117, w: 29, h: 27, img: bread },
    { x: 149, y: 117, w:30, h:27, img: bread},
    { x: 85, y: 121, w: 39, h: 24, img: waterImg },
    { x: 90, y: 87, w: 40, h: 11, img: jam },
    { x: 138, y: 86, w: 32, h: 12, img: peanutbutter },
    { x: 178, y: 82, w: 41, h: 16, img: ramen },
    { x: 90, y: 176, w: 63, h: 18, img: tomatosoupcan },
    { x: 161, y: 170, w: 56, h: 24, img: riceImg },
    { x: 92, y: 43, w: 44, h: 29, img: cereal },
    { x: 149, y: 50, w: 68, h: 21, img: brownies },
  ];

  textFont(myFont);
  textSize(24);
  for (let i = 0; i < btnImgs.length; i++) {
    btnImgs[i].x = 0;
    btnImgs[i].y = 0;
  }
  noCursor()
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
//萸붽컝 洹몃┝
function draw() {
  if (!gameStarted || GoHome) {
    drawTitleScreen();
  } else if (IsPaused) {
    pauseGame();
  } else {
    drawGame();
    let cartDeltaX = updateCart();
    for (let item of cartItems) {
      if (item.inCart && !item.dragging) {
        item.x += cartDeltaX;
      }
      item.update(cartItems);
      item.display();
    }
  }
    image(customCursor, mouseX - 0, mouseY - 0, 20, 20);
}

//濡쒓퀬

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
      //湲곕뒫�ｌ뼱�쇳븿
    }
    image(currentImg, btn.x, btn.y, btn.w, btn.h);
  }
  image(customCursor, mouseX - 0, mouseY - 0, 20, 20);
}

//寃뚯엫�붾㈃

let draggedButton = null;

for (let item of cartItems) {
  if (item.dragging) {
    draggedButton = item.sourceButton; // �먮뒗 item.name �� 踰꾪듉 �뺣낫
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
  
  for (let item of cartItems) {
    item.pressed(mouseX, mouseY);
  break;}
  if (!gameStarted) return;
  for (let btn of itemButtons) { 
    if (
      mouseX >= btn.x &&
      mouseX <= btn.x + btn.w &&
      mouseY >= btn.y &&
      mouseY <= btn.y + btn.h
    ) {let grocery = new DraggableItem(mouseX,mouseY, btn.img);
       grocery.dragging=true;
      grocery.offsetX = 0;
      grocery.offsetY = 0;
      cartItems.push(grocery);
       grocery.sourceButton = btn;
   }  
}
 for (let item of cartItems) {
  item.pressed(mouseX, mouseY);
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

//寃뚯엫�좉퉸 �뺤�
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
  image(ittypauseImgs[int(pauseFrame)], mouseX+10, mouseY+10, 42, 53);
}
