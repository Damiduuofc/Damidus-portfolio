export interface WorkItem {
  id: string | number;
  title: string;
  category: string;
  tools: string;
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

export const workData: WorkItem[] = [
  {
    id: 1,
    title: "Hospital Management System (HMS)",
    category: "Full Stack",
    tools: "React, Node.js, Express, MongoDB",
    image: "/images/hms.jpg",
    alt: "Hospital Management System",
    video: "",
    link: "https://github.com/Damiduuofc/Care101",
  },
    {
    id: 2,
    title: "Rotaract Club of KDUSC - Official Website",
    category: "Official Website",
    tools: "ViteJS, JavaScript",
    image: "/images/rotaract-website.jpg",
    alt: "Rotaract Club of KDUSC Official Website",
    video: "",
    link: "www.rackdusc.org",
  },
    {
    id: 3,
    title: "the_viyana_cafe - Official Website",
    category: "Official Website",
    tools: "NextJs,JavaScript",
    image: "/images/the_viyana_cafe.jpg",
    alt: "The Viyana Cafe Official Website",
    video: "",
    link: "viyanarestaurant.…",
  },
  {
    id: 4,
    title: "Care101 Health App",
    category: "Full Stack / MERN",
    tools: "React, Node.js, MongoDB, Express",
    image: "/images/care101.jpg",
    alt: "Care101 Health Application",

    link: "https://github.com/Damiduuofc/Care101",
  },
  {
    id: 5,
    title: "Care101 UI/UX Design",
    category: "UI/UX Design",
    tools: "Figma, Adobe XD, User Research, Prototyping",
    image: "/images/care101-uiux.jpg",
    alt: "Care101 UI UX Design",
    
    link: "https://www.figma.com/design/NnaEqaLp8KL1wP1SHTpiSX/Care-101-Project?node-id=0-1&t=er8SB4pIsOSQ1tfa-1",
  },
  {
    id: 6,
    title: "Coffee & Joy Café Website",
    category: "Frontend",
    tools: "React, Next.js, Tailwind CSS",
    image: "/images/coffee-joy.jpg",
    alt: "Coffee and Joy Website",
    link: "https://github.com/Damiduuofc/coffee_and_Joy",
  },
  {
    id: 7,
    title: "Student Management System",
    category: "Backend / CRUD System",
    tools: "Java, MySQL, JDBC",
    image: "/images/student-system.jpg",
    alt: "Student Management System",
    link: "https://github.com/Damiduuofc/Student_Management_System",
  },
  {
    id: 8,
    title: "KDU MiniMart POS System",
    category: "Desktop Application",
    tools: "Electron, Node.js, Html, MySQL, CSS",
    image: "/images/kdu-minimart-pos.jpg",
    alt: "KDU MiniMart POS System",
    link: "https://github.com/Damiduuofc/KDU-MINI-MART-POS-SYSTEM",
  }
];