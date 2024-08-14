import React from "react";

const GameOver = ({ onRestart }) => {
  return (
    <div style={styles.overlay}>
      <h1 style={styles.message}>Game Over</h1>
      <button style={styles.button} onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};

const styles = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "#fff",
    fontSize: "3em",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.5em",
    cursor: "pointer",
  },
};

export default GameOver;
