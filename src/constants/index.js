import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  // new
  treeImg,
  clipPathImg,
  wordsCountImg,
  scrabbleFeatured,
  CubeImage,
  snakeImage,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  { id: "tools_section", title: "Tools", path: "/tools" },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

// new
const tools = [
  {
    name: "Box Shadow Generator",
    slug: "box-shadow-generator",
    description:
      "Box Shadow Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "box-shadow", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Clip Path Generator",
    slug: "clip-path-generator",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: clipPathImg,
    source_code_link: "https://github.com/",
    props: {
      testImage: treeImg,
    },
  },
  {
    name: "Paint App",
    slug: "paint-app",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: treeImg,
    source_code_link: "https://github.com/",
  },
  {
    name: "Photo Editor",
    slug: "photo-editor",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: backend,
    source_code_link: "https://github.com/",
  },
  {
    name: "Words Count",
    slug: "words-count",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: wordsCountImg,
    source_code_link: "https://github.com/",
  },
  {
    name: "Scrabble Word Finder",
    slug: "scrabble-word-finder",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: scrabbleFeatured,
    source_code_link: "https://github.com/",
  },
  {
    name: "CSS Animation Generator",
    slug: "css-animation-generator",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: scrabbleFeatured,
    source_code_link: "https://github.com/",
  },
  {
    name: "Solar System",
    slug: "solar-system",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: scrabbleFeatured,
    source_code_link: "https://github.com/",
  },
  {
    name: "Cube Traffic",
    slug: "cube-traffic",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: CubeImage,
    source_code_link: "https://github.com/",
  },
  {
    name: "Tetris Game",
    slug: "tetris",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: CubeImage,
    source_code_link: "https://github.com/",
  },
  {
    name: "Pong Game",
    slug: "pong-game",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: CubeImage,
    source_code_link: "https://github.com/",
  },

  {
    name: "Car Rent",
    slug: "car",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Snake Game",
    slug: "snake-game",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: snakeImage,
    source_code_link: "https://github.com/",
  },
  {
    name: "Waves Generator",
    slug: "waves-generator",
    description:
      "Clip Path Generator is very useful to generate css box shadows with all abilities to change the values and see the changes directly in the screen and copy the desired results you want or get some recommended values for box shadows you can use too try it now...",
    tags: [
      { name: "css", color: "blue-text-gradient" },
      { name: "clip-spath", color: "green-text-gradient" },
      { name: "generator", color: "green-pink-gradient" },
    ],
    image: snakeImage,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trix Game",
    slug: "trix-game",
    description: "trix-game...",
    tags: [{ name: "Game", color: "green-pink-gradient" }],
    image: snakeImage,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects, tools };
