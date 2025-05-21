
let item;
let targetCartX;
let cartX,cartY;
let velocity=0
let stiffness=0.05
let damping=0.7
let gravity = 0.5;
let cartItems = [];

function removeFallingItem(item) {
  const index = cartItems.indexOf(item);
  if (index !== -1) {
    cartItems.splice(index, 1);
    console.log("삭제됨:", item);
  }}

let prevCartX = -95
;
let CartOpen = false;
cartX =-95;
targetCartX = cartX;


function updateCart() {
  cartY = height-cartImg.height-10;
  if (!CartOpen&& 
      mouseX <= 19&&
    mouseY >=144&& 
      mouseY <=144+cartImg.height) {
  targetCartX = 0;
  CartOpen = true;
  }  
  if(CartOpen&&
      (mouseX > cartX + cartImg.width ||
     mouseY < cartY ||
     mouseY > cartY + cartImg.height)) {
  targetCartX = -95;
  CartOpen = false;
  }
   
  let force = targetCartX - cartX;
  velocity += force * stiffness;
  velocity *= damping;
  cartX += velocity;
  
  let cartDeltaX = cartX - prevCartX;
  prevCartX = cartX;
  
  image(cartImg, cartX, cartY);

  return cartDeltaX;
}
for (let item of cartItems) {
  if (item.inCart && !item.dragging&&!CartOpen) {
      item.x += cartDeltaX;
    }
  item.update(cartItems);
  item.display(cartItems);
}
function isInCartArea(item) {
  const cartBoxX = cartX - 10;
  const cartBoxY = cartY;
  const cartBoxW = cartImg.width +5;
  const cartBoxH = cartImg.height;

  return (
  item.x + item.img.width / 2 > cartBoxX &&
  item.x + item.img.width / 2 < cartBoxX + cartBoxW &&
  item.y + item.img.height / 2 > cartBoxY &&
  item.y + item.img.height / 2 < cartBoxY + cartBoxH
);
}

class DraggableItem {
  released() {
    this.dragging = false;
  }
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.dragging = false;
    this.inCart = false;
    this.dragging = false;
    this.vy=0;
    this.offsetX = 0;
  this.offsetY = 0;
  }

  update(others) {
    this.inCart = isInCartArea(this);
    if (this.dragging) {
      this.x = mouseX+this.offsetX;
      this.y = mouseY+this.offsetY; }
if (this.falling) {
  this.vy += gravity;    // 중력 가속도
  this.y += this.vy;
  }
    if(this.falling&&
      this.y>height){
      this.falling =false;
      removeFallingItem(this)
    }

  }

  display() {
    image(this.img, this.x, this.y);
  }
  
  pressed(mx, my) {
    
  if (
    mx >= this.x &&
    mx <= this.x + this.img.width &&
    my >= this.y &&
    my <= this.y + this.img.height
  ) {
    this.dragging = true;
    this.offsetX = this.x - mx;
    this.offsetY = this.y - my;
  }
}
}