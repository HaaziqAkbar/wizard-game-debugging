const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint
const Body = Matter.Body;
const Composites = Matter.Composites
const Composite = Matter.Composite;

let engine, world;
var wizard, wizardimage;

var ground;
var rightInvisibleGround;
var leftInvisbleGround;
var wand;
var wand_img;
var button, btn_img;
var things, jungle, jungle2;


function preload() {
  wand_img = loadImage('./Assets/wand.png');
 
  jungle = loadImage('./Assets/jungle2.png');
  wizardimage = loadImage('./Assets/wizard.png');
}


function setup() {
  engine = Engine.create();
  world = engine.world;

  wizard = createSprite(300, 490, 50, 50);
  wizard.addImage(wizardimage);
  wizard.scale = 0.4;

  rope = new Rope(8, { x: 10, y: 200 });
  rope_2 = new Rope(7, { x: 370, y: 40 });
  rope_3 = new Rope(4, { x: 500, y: 225 });


  wand = Bodies.rectangle(300, 300, 20, 10);
  Matter.Composite.add(rope.body, wand);

  wand_con = new Link(rope, wand);
  wand_con_2 = new Link(rope_2, wand);
  wand_con_3 = new Link(rope_3, wand);


  rectMode(CENTER);

  // button 1.
  button = createImg("./Assets/cut_btn.png");
  button.position(10, 210);
  button.size(50, 50);
  button.mouseClicked(drop);

  // button2.
  button = createImg("./Assets/cut_btn.png");
  button.position(370, 45);
  button.size(50, 50);
  button.mouseClicked(drop2);


  // button3.
  button = createImg("./Assets/cut_btn.png");
  button.position(450, 225);
  button.size(50, 50);
  button.mouseClicked(drop3);

}


function draw() {
  createCanvas(800, 600);
  background(jungle);

  ground = new Ground(400, 600, 800, 50, true);

  push();
  imageMode(CENTER);
  if (wand != null) {
   image(wand_img,wand.position.x,wand.position.y,70,70);
  }
  pop();


  rightInvisibleGround = createSprite(790, 300, 20, 600);
  rightInvisibleGround.visible = false;


  leftInvisbleGround = createSprite(9, 300, 20, 600);
  leftInvisbleGround.visible = false;

  ground.show();
  rope.show();
  rope_2.show();
  rope_3.show();

  // rightInvisibleGround.show();
  //leftInvisbleGround.show();


  if (keyDown("d")) {
    wizard.x += 10;
  };

  if (keyDown("a")) {
    wizard.x -= 10;
  };

  if (wizard.isTouching(rightInvisibleGround)) {
    wizard.x -= 11;
  }

  if (wizard.isTouching(leftInvisbleGround)) {
    wizard.x += 11;
  }


  drawSprites();
  Engine.update(engine)
}


function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, wand);
      wand = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function drop() {
  rope.break();
  wand_con.detach();
  wand_con = null;
}

function drop2() {
  rope_2.break();
  wand_con_2.detach();
  wand_con_2 = null;
}

function drop3() {
  rope_3.break();
  wand_con_3.detach();
  wand_con_3 = null;
}