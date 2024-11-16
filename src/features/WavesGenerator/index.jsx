import React, { useState } from "react";

function SmoothWaveGenerator() {
  const [range, setRange] = useState(50);

  const handleRangeChange = (e) => {
    setRange(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={range}
        onChange={handleRangeChange}
        style={{ marginTop: 100 }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d={generateSmoothWavePath(range)}
        />
      </svg>
    </div>
  );
}

export default SmoothWaveGenerator;

function generateSmoothWavePath(range) {
  const width = 1440; // SVG width
  const height = 320; // SVG height
  const points = 20; // Fewer points for smoother curves
  const amplitude = range / 2; // Amplitude of the wave
  const frequency = range / 10; // Frequency of the wave

  let path = `M0,${height / 2}`;
  const segmentWidth = width / points;

  for (let i = 1; i <= points; i++) {
    const x = i * segmentWidth;
    const y = height / 2 + Math.sin(i * frequency) * amplitude;
    const cp1x = x - segmentWidth / 2;
    const cp1y = height / 2 + Math.sin((i - 0.5) * frequency) * amplitude;
    const cp2x = x - segmentWidth / 2;
    const cp2y = height / 2 + Math.sin((i - 0.5) * frequency) * amplitude;

    path += ` C${cp1x},${cp1y},${cp2x},${cp2y},${x},${y}`;
  }

  path += ` L${width},${height} L0,${height} Z`; // Close the path
  return path;
}
