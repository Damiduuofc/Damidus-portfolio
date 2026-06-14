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
    video: "/videos/hms-demo.mp4",
    link: "https://github.com/your-username/hms-project",
  },
  {
    id: 2,
    title: "Care101 Health App",
    category: "Full Stack / MERN",
    tools: "React, Node.js, MongoDB, Express",
    image: "/images/care101.jpg",
    alt: "Care101 Health Application",
    video: "/videos/care101-demo.mp4",
    link: "https://github.com/your-username/care101-app",
  },
  {
    id: 3,
    title: "Care101 UI/UX Design",
    category: "UI/UX Design",
    tools: "Figma, Adobe XD, User Research, Prototyping",
    image: "/images/care101-uiux.jpg",
    alt: "Care101 UI UX Design",
    video: "/videos/care101-uiux.mp4",
    link: "https://www.figma.com/your-care101-design-link",
  },
  {
    id: 4,
    title: "Coffee & Joy Café Website",
    category: "Frontend",
    tools: "React, Next.js, Tailwind CSS",
    image: "/images/coffee-joy.jpg",
    alt: "Coffee and Joy Website",
    video: "/videos/coffee-joy-demo.mp4",
    link: "https://github.com/your-username/coffee-joy",
  },
  {
    id: 5,
    title: "Student Management System",
    category: "Backend / CRUD System",
    tools: "Java, MySQL, JDBC",
    image: "/images/student-system.jpg",
    alt: "Student Management System",
    video: "/videos/student-system-demo.mp4",
    link: "https://github.com/your-username/student-management",
  },
  {
    id: 6,
    title: "KDU MiniMart POS System",
    category: "Full Stack / POS System",
    tools: "React, Node.js, Express, MySQL, Tailwind CSS",
    image: "/images/kdu-minimart-pos.jpg",
    alt: "KDU MiniMart POS System",
    video: "/videos/kdu-minimart-pos.mp4",
    link: "https://github.com/your-username/kdu-minimart-pos",
  }
];