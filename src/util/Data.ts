export interface WorkItem {
  id: string | number;
  title: string;
  category: string;
  tools: string;
  image: string;
  alt?: string;
  width?: number;
  height?: number;
  video?: string;
  link?: string;
}

export const workData: WorkItem[] = [
  {
    id: 1,
    title: "Hospital Management System (HMS)",
    category: "Full Stack",
    tools: "React, Node.js, Express, MongoDB",
    image: "/images/hms.webp",
    alt: "Dashboard of the Hospital Management System web app built with React, Node.js and MongoDB",
    width: 1280,
    height: 832,
    video: "",
    link: "https://github.com/Damiduuofc/Care101",
  },
   {
  id: 2,
  title: "Rotaract Club of KDUSC - Official Website",
  category: "Official Website",
  tools: "ViteJS, JavaScript",
  image: "/images/rotaract-website.webp",
  alt: "Home page of the Rotaract Club of KDUSC official website",
    width: 1600,
    height: 950,
  video: "",
  link: "https://www.rackdusc.org",
},
{
  id: 3,
  title: "The Viyana Cafe - Official Website",
  category: "Official Website",
  tools: "Next.js, JavaScript",
  image: "/images/the_viyana_cafe.webp",
  alt: "Home page of The Viyana Cafe restaurant website built with Next.js",
    width: 1600,
    height: 950,
  video: "",
  link: "https://viyanarestaurant.com", // replace with your actual domain
},
  {
    id: 4,
    title: "Care101 Health App",
    category: "Full Stack / MERN",
    tools: "React, Node.js, MongoDB, Express",
    image: "/images/care101.webp",
    alt: "Care101 health app screens built on the MERN stack",
    width: 1440,
    height: 1024,

    link: "https://github.com/Damiduuofc/Care101",
  },
  {
    id: 5,
    title: "Care101 UI/UX Design",
    category: "UI/UX Design",
    tools: "Figma, Adobe XD, User Research, Prototyping",
    image: "/images/care101-uiux.webp",
    alt: "Care101 UI/UX design mockups in Figma",
    width: 1600,
    height: 935,
    
    link: "https://www.figma.com/design/NnaEqaLp8KL1wP1SHTpiSX/Care-101-Project?node-id=0-1&t=er8SB4pIsOSQ1tfa-1",
  },
  {
    id: 6,
    title: "Coffee & Joy Café Website",
    category: "Frontend",
    tools: "React, Next.js, Tailwind CSS",
    image: "/images/coffee-joy.webp",
    alt: "Coffee & Joy café website landing page built with Next.js and Tailwind CSS",
    width: 1600,
    height: 946,
    link: "https://github.com/Damiduuofc/coffee_and_Joy",
  },
  {
    id: 7,
    title: "Student Management System",
    category: "Backend / CRUD System",
    tools: "Java, MySQL, JDBC",
    image: "/images/student-system.webp",
    alt: "Student Management System desktop interface built with Java and MySQL",
    width: 1600,
    height: 891,
    link: "https://github.com/Damiduuofc/Student_Management_System",
  },
  {
    id: 8,
    title: "KDU MiniMart POS System",
    category: "Desktop Application",
    tools: "Electron, Node.js, Html, MySQL, CSS",
    image: "/images/kdu-minimart-pos.webp",
    alt: "KDU MiniMart point-of-sale app built with Electron and MySQL",
    width: 1600,
    height: 1041,
    link: "https://github.com/Damiduuofc/KDU-MINI-MART-POS-SYSTEM",
  }
];
