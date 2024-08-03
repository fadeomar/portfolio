import { useState, useRef, useEffect } from "react";
import { SectionWrapper } from "../../hoc";
import "./style.css";

const RangeInput = ({ label, id, min, max, value, step = 1, onChange }) => {
  return (
    <label>
      {label}
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
      />
    </label>
  );
};
const initialState = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
  blur: 0,
  opacity: 100,
  imgOpacity: 100,
  rotation: 0,
};
const PhotoEditor = () => {
  const canvasRef = useRef();
  const previewCanvasRef = useRef();
  const [imageLink, setImageLink] = useState(null);
  const [bg, setBg] = useState(null);
  const [state, setState] = useState(initialState);

  function applyEffects(ctx, img, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.filter = `blur(${state.blur}px) grayscale(${state.grayscale}%) brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;

    ctx.globalAlpha = state.opacity / 100;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotation * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  function updatePreview(previewCtx, img, previewCanvas) {
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    previewCtx.save();
    previewCtx.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;
    previewCtx.globalAlpha = state.opacity / 100;
    previewCtx.translate(previewCanvas.width / 2, previewCanvas.height / 2);
    previewCtx.rotate((state.rotation * Math.PI) / 180);
    const scale = Math.min(
      previewCanvas.width / img.width,
      previewCanvas.height / img.height
    );
    previewCtx.scale(scale, scale);
    previewCtx.drawImage(img, -img.width / 2, -img.height / 2);
    previewCtx.restore();
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const previewCtx = previewCanvas.getContext("2d");

      const background = new Image();
      background.src = imageLink;

      background.backgroundColor = "black";
      background.onload = () => {
        setBg(background);
        applyEffects(ctx, background, canvas);
        updatePreview(previewCtx, background, previewCanvas);
      };
    }
  }, [imageLink]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (canvas && bg) {
      const ctx = canvas.getContext("2d");
      const previewCtx = previewCanvas.getContext("2d");

      applyEffects(ctx, bg, canvas);
      updatePreview(previewCtx, bg, previewCanvas);
    }
  }, [state]);

  const handlePreset = () => {
    setState({
      brightness: 120,
      contrast: 150,
      saturation: 130,
      opacity: 100,
      blur: 2,
      grayscale: 20,
      sepia: 30,
      hueRotate: 45,
      invert: 10,
      rotation: 0,
    });
  };

  const handleReset = () => {
    setState(initialState);
  };
  return (
    <div className="PE_wrapper">
      <div className="PE_container">
        <div className="PE_controls">
          <label>
            Upload Image
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={(e) => {
                var files = e.target.files;
                if (files == undefined) {
                  //drag and drop
                  files = e.dataTransfer.files;
                }
                var FR = new FileReader();
                FR.file = files[0];

                FR.onload = function (event) {
                  console.log({ bb: event.target.result });
                  if (this.file.type.match("image.*")) {
                    setImageLink(event.target.result);
                  }
                };
                FR.readAsDataURL(FR.file);
              }}
            />
          </label>
          <RangeInput
            label={"Brightness"}
            name={"brightness"}
            id={"brightnessSlider"}
            min={"0"}
            max={"200"}
            value={state.brightness}
            onChange={(e) => {
              setState((old) => ({ ...old, brightness: e.target.value }));
            }}
          />
          <RangeInput
            label={"Contrast"}
            name={"contrast"}
            id={"contrastSlider"}
            min={"0"}
            max={"200"}
            value={state.contrast}
            onChange={(e) => {
              setState((old) => ({ ...old, contrast: e.target.value }));
            }}
          />
          <RangeInput
            label={"Saturation"}
            name={"saturation"}
            id={"saturationSlider"}
            min={"0"}
            max={"200"}
            value={state.saturation}
            onChange={(e) => {
              setState((old) => ({ ...old, saturation: e.target.value }));
            }}
          />
          <RangeInput
            label={"Opacity"}
            name={"opacity"}
            id={"opacitySlider"}
            min={"0"}
            max={"200"}
            value={state.opacity}
            onChange={(e) => {
              setState((old) => ({ ...old, opacity: e.target.value }));
            }}
          />
          <RangeInput
            label={"Blur"}
            name={"blur"}
            id={"blurSlider"}
            min={"0"}
            max={"10"}
            step={".1"}
            value={state.blur}
            onChange={(e) => {
              setState((old) => ({ ...old, blur: e.target.value }));
            }}
          />
          <RangeInput
            label={"Grayscale"}
            name={"grayscale"}
            id={"grayscaleSlider"}
            min={"0"}
            max={"100"}
            value={state.grayscale}
            onChange={(e) => {
              setState((old) => ({ ...old, grayscale: e.target.value }));
            }}
          />
          <RangeInput
            label={"Sepia"}
            name={"sepia"}
            id={"sepiaSlider"}
            min={"0"}
            max={"100"}
            value={state.sepia}
            onChange={(e) => {
              setState((old) => ({ ...old, sepia: e.target.value }));
            }}
          />
          <RangeInput
            label={"Hue Rotate"}
            name={"hueRotate"}
            id={"hueRotateSlider"}
            min={"0"}
            max={"360"}
            value={state.hueRotate}
            onChange={(e) => {
              setState((old) => ({ ...old, hueRotate: e.target.value }));
            }}
          />
          <RangeInput
            label={"Invert"}
            name={"invert"}
            id={"invertSlider"}
            min={"0"}
            max={"100"}
            value={state.invert}
            onChange={(e) => {
              setState((old) => ({ ...old, invert: e.target.value }));
            }}
          />
          <RangeInput
            label={"Rotation"}
            name={"rotation"}
            id={"rotationSlider"}
            min={"0"}
            max={"360"}
            value={state.rotation}
            onChange={(e) => {
              setState((old) => ({ ...old, rotation: e.target.value }));
            }}
          />
          <button id="presetButton" onClick={handlePreset}>
            Apply Preset
          </button>
          <button id="resetButton" onClick={handleReset}>
            Reset
          </button>
          <button id="downloadButton">Download Image</button>
          <canvas id="preview" ref={previewCanvasRef}></canvas>
        </div>
        <canvas id="canvas" width="800" height="600" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default SectionWrapper(PhotoEditor, "PhotoEditor");
