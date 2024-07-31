import React, { useState } from "react";
import "./style.css";

const ClickToCopy = ({ children, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const el = document.createElement("textarea");
    el.value = children;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className={`copy_text_container`} onClick={handleCopyClick} {...props}>
      <p className="copy_text_helper">click to copy</p>
      <div className="copy_text_content">{children}</div>
      {isCopied && <div style={{ color: "green" }}>copied</div>}
    </div>
  );
};

export default ClickToCopy;
