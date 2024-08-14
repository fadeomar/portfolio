import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GameOver from "./GameOver";

function boxCollision({ box1, box2 }) {
  const xCollision = box1.right >= box2.left && box1.left <= box2.right;
  const yCollision =
    box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
  const zCollision = box1.front >= box2.back && box1.back <= box2.front;

  return xCollision && yCollision && zCollision;
}

const ScoreComponent = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timeID = setInterval(() => {
      setScore((score) => score + 1);
    }, 500);
    return () => {
      clearInterval(timeID);
    };
  }, []);
  return (
    <div
      style={{
        padding: 40,
        background: "gray",
        color: "white",
        marginTop: 40,
        fontSize: "2rem",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <p>score: {score}</p>
      <p>best score: {score}</p>
    </div>
  );
};

class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color = "aquamarine",
    velocity = { x: 0, y: 0, z: 0 },
    position = { x: 0, y: 0, z: 0 },
    zAcceleration = false,
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color })
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);

    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;

    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;

    this.velocity = velocity;
    this.gravity = -0.002;

    this.zAcceleration = zAcceleration;
  }

  updateSides() {
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;

    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
  }

  update(ground) {
    this.updateSides();

    if (this.zAcceleration) this.velocity.z += 0.0003;

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;

    if (
      boxCollision({
        box1: this,
        box2: ground,
      })
    ) {
      const friction = 0.5;
      this.velocity.y *= friction;
      this.velocity.y = -this.velocity.y;
    } else this.position.y += this.velocity.y;
  }
}

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const mountRef = useRef(null);

  useEffect(() => {
    if (mountRef?.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(4.61, 2.74, 8);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.shadowMap.enabled = true;
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);

      const cube = new Box({
        width: 1,
        height: 1,
        depth: 1,
        velocity: {
          x: 0,
          y: -0.01,
          z: 0,
        },
      });
      cube.castShadow = true;
      scene.add(cube);

      const ground = new Box({
        width: 10,
        height: 0.5,
        depth: 50,
        color: "yellow",
        position: {
          x: 0,
          y: -2,
          z: 0,
        },
      });

      ground.receiveShadow = true;
      scene.add(ground);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.y = 3;
      light.position.z = 1;
      light.castShadow = true;
      scene.add(light);

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      camera.position.z = 5;

      const keys = {
        a: {
          pressed: false,
        },
        d: {
          pressed: false,
        },
        s: {
          pressed: false,
        },
        w: {
          pressed: false,
        },
      };

      window.addEventListener("keydown", (event) => {
        switch (event.code) {
          case "KeyA":
            keys.a.pressed = true;
            break;
          case "KeyD":
            keys.d.pressed = true;
            break;
          case "KeyS":
            keys.s.pressed = true;
            break;
          case "KeyW":
            keys.w.pressed = true;
            break;
          case "Space":
            cube.velocity.y = 0.08;
            break;
        }
      });

      window.addEventListener("keyup", (event) => {
        switch (event.code) {
          case "KeyA":
            keys.a.pressed = false;
            break;
          case "KeyD":
            keys.d.pressed = false;
            break;
          case "KeyS":
            keys.s.pressed = false;
            break;
          case "KeyW":
            keys.w.pressed = false;
            break;
        }
      });

      const enemies = [];

      let frames = 0;
      let spawnRate = 200;
      function animate() {
        if (gameOver) return;
        const animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);

        cube.velocity.x = 0;
        cube.velocity.z = 0;
        if (keys.a.pressed) cube.velocity.x = -0.05;
        else if (keys.d.pressed) cube.velocity.x = 0.05;

        if (keys.s.pressed) cube.velocity.z = 0.05;
        else if (keys.w.pressed) cube.velocity.z = -0.05;

        cube.update(ground);
        enemies.forEach((enemy) => {
          enemy.update(ground);
          if (
            boxCollision({
              box1: cube,
              box2: enemy,
            })
          ) {
            console.log("show game over!");
            setGameOver(true);
            cancelAnimationFrame(animationId);
          }
        });

        if (frames % spawnRate === 0) {
          if (spawnRate > 20) spawnRate -= 20;

          const enemy = new Box({
            width: 1,
            height: 1,
            depth: 1,
            position: {
              x: (Math.random() - 0.5) * 10,
              y: 0,
              z: -20,
            },
            velocity: {
              x: 0,
              y: 0,
              z: 0.005,
            },
            color: "tomato",
            zAcceleration: true,
          });
          enemy.castShadow = true;
          scene.add(enemy);
          enemies.push(enemy);
        }

        frames++;
      }
      animate();

      return () => {
        if (mountRef?.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, [gameOver]);

  return (
    <div>
      {gameOver && (
        <GameOver
          onRestart={() => {
            setGameOver(false);
          }}
        />
      )}
      {!gameOver && <ScoreComponent />}
      <div ref={mountRef}></div>
    </div>
  );
};

export default Game;
