import React, { useRef, useEffect, useState } from "react";
import { SectionWrapper } from "../../hoc";
import Sidebar from "./Sidebar";

import "./style.css";

const AnimationGenerator = () => {
  const [selectedAnimation, setSelectedAnimation] = useState("");

  return (
    <div className="AG_container">
      <section className="AG_left_side">
        <Sidebar onSelect={setSelectedAnimation} />
      </section>
      <section className="AG_right_side">
        <div class={`AG_result ${selectedAnimation}`}></div>
      </section>
    </div>
  );
};

export default SectionWrapper(AnimationGenerator, "AnimationGenerator");
