import React from "react";

import Preview from "./Preview";

const Previews = ({ tetrominoes }) => {
  // We want everything except the last one
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  return (
    <>
      {[previewTetrominoes[0], previewTetrominoes[1]].map(
        (tetromino, index) => (
          <Preview tetromino={tetromino} index={index} key={index} />
        )
      )}
    </>
  );
};

export default React.memo(Previews);
