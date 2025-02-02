import React, { useRef } from "react";
import { Tilt } from "react-tilt";
import { motion, useInView } from "framer-motion";

import { styles } from "../../styles";
import { github } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { tools } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";
import { Link } from "react-router-dom";

const ToolCard = ({
  index,
  name,
  description,
  tags,
  image,
  slug,
  source_code_link,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "show" : "hidden"}
      variants={fadeIn("up", "spring", index * 0.05, 0.75)}
    >
      <Link
        to={slug ? `/tools/${slug}` : "/"}
        className="flex items-center gap-2"
        onClick={() => {
          // setActive("");
          window.scrollTo(0, 0);
        }}
      >
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
        >
          <div className="relative w-full h-[230px]">
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* 
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div> */}
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </Link>
    </motion.div>
  );
};

const Tools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <motion.div
        ref={ref}
        animate={isInView ? "show" : "hidden"}
        variants={textVariant(0.1)}
      >
        <p className={`${styles.sectionSubText} `}>Useful Tools</p>
        <h2 className={`${styles.sectionHeadText}`}>Tools.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          very useful tools that will make the life a bit easer :)
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {tools.map((tool, index) => (
          <ToolCard key={`tool-${index}`} index={index} {...tool} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tools, "");
