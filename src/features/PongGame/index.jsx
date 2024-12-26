import React, { useEffect, useRef } from "react";

class Ball {
  constructor(radius, color, x, y, dx, dy, canvas, paddle) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.canvas = canvas;
    this.paddle = paddle;
    this.ctx = canvas.getContext("2d");
    this.score = 0;
    this.lastCollision = false; // Flag to track collision
  }

  draw() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    // Draw the paddle
    this.paddle.draw();

    // Draw the score
    ctx.fillStyle = "orange";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${this.score}`, 10, 30);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    const { canvas, paddle } = this;

    // Bounce off left and right edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Bounce off top edge
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Ball is going out of the bottom edge
    if (this.y + this.radius > canvas.height) {
      this.score = 0; // Reset score to zero
      this.dy = -this.dy; // Reflect ball's direction to bounce up
    }

    this.checkCollision();
  }

  checkCollision() {
    const ballLeft = this.x - this.radius;
    const ballRight = this.x + this.radius;
    const ballTop = this.y - this.radius;
    const ballBottom = this.y + this.radius;

    const paddleLeft = this.paddle.x - this.paddle.width / 2;
    const paddleRight = this.paddle.x + this.paddle.width / 2;
    const paddleTop = this.paddle.y;
    const paddleBottom = this.paddle.y + this.paddle.height;

    const isColliding =
      ballRight > paddleLeft &&
      ballLeft < paddleRight &&
      ballBottom > paddleTop &&
      ballTop < paddleBottom;

    if (isColliding && !this.lastCollision) {
      this.dy = -this.dy; // Reflect ball's direction
      this.score += 1; // Increase score
    }

    this.lastCollision = isColliding;
  }
}

class Paddle {
  constructor(width, height, initialX, canvas, ball) {
    this.width = width;
    this.height = height;
    this.x = initialX;
    this.y = canvas.height - height - 10;
    this.canvas = canvas;
    this.ball = ball;
    this.ctx = canvas.getContext("2d");
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.init();
  }

  init() {
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    this.x = Math.max(
      this.width / 2,
      Math.min(mouseX, this.canvas.width - this.width / 2)
    );
  }

  // draw() {
  //   this.ctx.beginPath();
  //   this.ctx.rect(this.x - this.width / 2, this.y, this.width, this.height);
  //   this.ctx.fillStyle = "black";
  //   this.ctx.fill();
  //   this.ctx.closePath();
  // }

  draw() {
    const radius = 10; // Adjust for corner rounding

    // Create a linear gradient with rainbow colors
    const gradient = this.ctx.createLinearGradient(
      this.x - this.width / 2, // Starting x
      this.y, // Starting y
      this.x + this.width / 2, // Ending x
      this.y + this.height // Ending y
    );

    // Define rainbow colors
    gradient.addColorStop(0, "#FF0000"); // Red
    gradient.addColorStop(0.14, "#FF7F00"); // Orange
    gradient.addColorStop(0.28, "#FFFF00"); // Yellow
    gradient.addColorStop(0.42, "#00FF00"); // Green
    gradient.addColorStop(0.57, "#0000FF"); // Blue
    gradient.addColorStop(0.71, "#4B0082"); // Indigo
    gradient.addColorStop(0.85, "#9400D3"); // Violet
    gradient.addColorStop(1, "#FF0000"); // Red (back to start)

    // Draw the paddle with rounded corners
    this.ctx.beginPath();
    this.ctx.moveTo(this.x - this.width / 2 + radius, this.y);
    this.ctx.lineTo(this.x + this.width / 2 - radius, this.y);
    this.ctx.arc(
      this.x + this.width / 2 - radius,
      this.y + radius,
      radius,
      1.5 * Math.PI,
      2 * Math.PI
    );
    this.ctx.lineTo(this.x + this.width / 2, this.y + this.height - radius);
    this.ctx.arc(
      this.x + this.width / 2 - radius,
      this.y + this.height - radius,
      radius,
      0,
      0.5 * Math.PI
    );
    this.ctx.lineTo(this.x - this.width / 2 + radius, this.y + this.height);
    this.ctx.arc(
      this.x - this.width / 2 + radius,
      this.y + this.height - radius,
      radius,
      0.5 * Math.PI,
      Math.PI
    );
    this.ctx.lineTo(this.x - this.width / 2, this.y + radius);
    this.ctx.arc(
      this.x - this.width / 2 + radius,
      this.y + radius,
      radius,
      Math.PI,
      1.5 * Math.PI
    );
    this.ctx.closePath();

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }

  destroy() {
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }
}

const GameCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const paddle = new Paddle(100, 20, canvas.width / 2, canvas, null);
    const ball = new Ball(
      10,
      "blue",
      canvas.width / 2,
      canvas.height / 2,
      4,
      4,
      canvas,
      paddle
    );

    // Assign ball to paddle
    paddle.ball = ball;

    const gameLoop = () => {
      ball.move();
      ball.draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      paddle.destroy();
    };
  }, []);

  return (
    <div style={{ paddingTop: 64 }}>
      <canvas
        ref={canvasRef}
        width={375}
        height={500}
        style={{
          backgroundColor: "white",
          display: "block",
          margin: "auto",
        }}
      ></canvas>
    </div>
  );
};

export default GameCanvas;
