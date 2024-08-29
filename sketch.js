let tree = new Tree("0", 25, 25, 30, 30, 15);

function setup() {
    createCanvas(600, 400);
    background(0);
}

function draw() {
    background(255);
    rect(0, 0, width - 1, height - 1);
    tree.draw();
}

function mousePressed() {
    tree.onMousePressed(mouseX, mouseY);
}
