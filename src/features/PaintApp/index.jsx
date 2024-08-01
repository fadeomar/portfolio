import React, { useRef, useEffect, useState } from "react";
import { SectionWrapper } from "../../hoc";

import "./style.css";

const setCanvasBackground = (ctx, selectedColor) => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillSStyle = selectedColor;
};

const PaintApp = () => {
  let isDrawing = false;
  let snapshot;
  const canvasRef = useRef();
  const selectedColorRef = useRef("#000");
  const toolRef = useRef("brush");
  const prevMouseXRef = useRef();
  const prevMouseYRef = useRef();
  const isFillColorRef = useRef();
  const brushWidthRef = useRef(4);

  const drawTriangle = (e, ctx) => {
    const prevMouseX = prevMouseXRef.current;
    const prevMouseY = prevMouseYRef.current;
    const isFillColor = isFillColorRef.current;
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();

    if (!isFillColor) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  };

  const drawLine = (e, ctx) => {
    const prevMouseX = prevMouseXRef.current;
    const prevMouseY = prevMouseYRef.current;
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const drawCircle = (e, ctx) => {
    const prevMouseX = prevMouseXRef.current;
    const prevMouseY = prevMouseYRef.current;
    const isFillColor = isFillColorRef.current;

    ctx.beginPath();
    let radius = Math.sqrt(
      Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
    );
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    if (!isFillColor) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  };

  const drawRect = (e, ctx) => {
    const prevMouseX = prevMouseXRef.current;
    const prevMouseY = prevMouseYRef.current;
    const isFillColor = isFillColorRef.current;
    if (!isFillColor) {
      return ctx.strokeRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
      );
    }
    ctx.fillRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  };

  const startDraw = (e, ctx) => {
    const brushWidth = brushWidthRef.current;
    const selectedColor = selectedColorRef.current;
    isDrawing = true;

    prevMouseXRef.current = e.offsetX;
    prevMouseYRef.current = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const endDraw = (e) => {
    isDrawing = false;
  };

  const drawing = (e, ctx, isDrawing, snapshot) => {
    const selectedTool = toolRef.current;
    const selectedColor = selectedColorRef.current;
    if (!isDrawing) return;

    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool === "brush" || selectedTool === "eraser") {
      ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    } else if (selectedTool === "rectangle") {
      drawRect(e, ctx);
    } else if (selectedTool === "circle") {
      drawCircle(e, ctx);
    } else if (selectedTool === "triangle") {
      drawTriangle(e, ctx);
    } else if (selectedTool === "line") {
      drawLine(e, ctx);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const selectedColor = selectedColorRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground(ctx, selectedColor);
      canvas.addEventListener("mousedown", (e) => startDraw(e, ctx));

      canvas.addEventListener("mouseup", endDraw);
      canvas.addEventListener("mousemove", (e) => {
        drawing(e, ctx, isDrawing, snapshot);
      });
    }
  }, []);

  const handleColorClicked = (e) => {
    document
      .querySelector(".paint_options_flex .selected")
      .classList.remove("selected");
    if (e.target.tagName === "LI") {
    } else if (e.target.tagName === "INPUT") {
      e.target.parentElement.classList.add("selected");
    }
    e.target.classList.add("selected");
    let color = window
      .getComputedStyle(e.target)
      .getPropertyValue("background-color");
    selectedColorRef.current = color;
    console.log({ color, target: e.target.tagName });
  };
  return (
    <div className="paint_container">
      <section className="paint_tool_board">
        <div className="row">
          <label className="title">Shapes</label>
          <ul className="paint_options">
            {/* rectangle */}
            <li
              className="paint_option"
              id="rectangle"
              onClick={() => {
                toolRef.current = "rectangle";
              }}
            >
              <img src="icons/rectangle.svg" alt="rectangle" />
              <span>rectangle</span>
            </li>
            {/* line */}
            <li
              className="paint_option"
              id="line"
              onClick={() => {
                toolRef.current = "line";
              }}
            >
              <img src="icons/line.svg" alt="line" />
              <span>Line</span>
            </li>
            {/* circle */}
            <li
              className="paint_option"
              id="circle"
              onClick={() => {
                toolRef.current = "circle";
              }}
            >
              <img src="icons/Circle.svg" alt="Circle" />
              <span>Circle</span>
            </li>
            {/* triangle */}

            <li
              className="paint_option"
              id="triangle"
              onClick={() => {
                toolRef.current = "triangle";
              }}
            >
              <img src="icons/triangle.svg" alt="triangle" />
              <span>triangle</span>
            </li>
            {/* fill-color */}
            <li className="paint_option">
              <input
                type="checkbox"
                id="fill-color"
                onChange={(e) => {
                  isFillColorRef.current = e.target.checked;
                }}
              />
              <label htmlFor="fill-color">Fill color</label>
              <span>fill-color</span>
            </li>
          </ul>
        </div>
        <div className="row">
          <label className="title">Options</label>
          <ul className="paint_options">
            {/* brush */}
            <li
              className="paint_option active tool"
              id="brush"
              onClick={() => {
                toolRef.current = "brush";
              }}
            >
              <img src="icons/brush.svg" alt="brush" />
              <span>brush</span>
            </li>
            {/* eraser */}
            <li
              className="paint_option tool"
              id="eraser"
              onClick={() => {
                toolRef.current = "eraser";
              }}
            >
              <img src="icons/eraser.svg" alt="eraser" />
              <span>eraser</span>
            </li>
            {/* size-slider */}
            <li className="paint_option">
              <input
                type="range"
                id="size-slider"
                min="1"
                max="30"
                defaultValue={brushWidthRef.current}
                onChange={(e) => (brushWidthRef.current = e.target.value)}
              />
            </li>
          </ul>
        </div>
        <div className="row row_color">
          <label className="title">Colors</label>
          <ul className="paint_options_flex">
            <li className="paint_option" onClick={handleColorClicked}></li>
            <li
              className="paint_option selected"
              onClick={handleColorClicked}
            ></li>
            <li className="paint_option" onClick={handleColorClicked}></li>
            <li className="paint_option" onClick={handleColorClicked}></li>
            <li className="paint_option" onClick={handleColorClicked}>
              <input
                style={{ opacity: 0, cursor: "pointer" }}
                type="color"
                onChange={(e) => {
                  e.target.parentElement.style.background = e.target.value;
                  e.target.parentElement.click();
                }}
                name="color-picker"
                id="color-picker"
                value="#4a98f7"
              />
            </li>
          </ul>
        </div>
        <div className="row buttons_row">
          <button
            className="clear-canvas"
            onClick={() => {
              const canvas = canvasRef.current;
              const selectedColor = selectedColorRef.current;
              const ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              setCanvasBackground(ctx, selectedColor);
            }}
          >
            Clear canvas
          </button>
          <button
            className="save-img"
            onClick={() => {
              const canvas = canvasRef.current;
              const link = document.createElement("a");
              link.download = `${Date.now()}.jpg`;
              link.href = canvas.toDataURL();
              link.click();
            }}
          >
            save as Image
          </button>
        </div>
      </section>
      <section className="paint_drawing_board">
        <canvas id="canvas" ref={canvasRef}></canvas>
      </section>
    </div>
  );
};

export default SectionWrapper(PaintApp, "PaintApp");
