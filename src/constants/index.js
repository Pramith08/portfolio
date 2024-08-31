import project1 from "../assets/projects/project-1.jpg";

export const EXPERIENCES = [
  {
    year: "14/12/2023 - 15/12/2023",
    role: "Research Paper Published in International Conference",
    company: "ICCEBS'23",
    description: `Presented and published a research paper detailing a novel approach for early lung cancer detection, integrating the Watershed Algorithm for feature extraction with Convolutional Neural Network (CNN) for early diagnosis.`,
    technologies: ["Python", "CNN", "Watershed Algorithm", "HTML", "CSS", "Javascript"],
  },
  {
    year: "06/03/2023 - 05/05/2023",
    role: "Intern Trainee",
    company: "Vectra Technosoft Private Limited",
    description: `Internship training on PODMAN and CONTAINERS on Linux environment.`,
    technologies: ["Linux", "Containers", "Podman"],
  },
  {
    year: "22/10/2022",
    role: "Global Hackathon",
    company: "IEEE Xtreme 16.0.",
    description: `Participated in 24-hour coding competition, IEEE Xtreme 16.0.`,
    technologies: ["Python", "C", "C++", "Java", "HTML", "CSS", "Javascript"],
  },
];

export const PROJECTS = [
  {
    title: "Aero Encrypt",
    image: project1,
    description:
      "A Flutter-based app for secure password storage and retrieval using hybrid AES+RSA encryption, ensuring credentials are stored locally and accessible only by the user.",
    technologies: ["Python", "Flutter", "Docker"],
  },
  {
    title: "Lung Cancer Detection System",
    image: project1,
    description:
      " A web application for early detection of lung cancer and tumors, integrating CNN and the Watershed algorithm to analyze lung CT scans and provide accurate diagnosis support.",
    technologies: ["Python", "CNN", "Watershed Algorithm", "HTML", "CSS", "Javascript"],
  },{
    title: "Ezzy Search",
    image: project1,
    description:
      "Developed a Python application with a Streamlit interface to help new GitHub users explore repositories, using Selenium for automated web scraping to enhance the search process.",
    technologies: ["Python", "Streamlit", "Selenium"],
  },
  {
    title: "Ezzy Search - Discord Bot",
    image: project1,
    description:
      "Created a Discord bot for Ezzy Search, enabling users to seamlessly explore GitHub repositories within Discord. The bot integrates with the existing Python application and Streamlit interface, utilizing Selenium for automated web scraping to deliver real-time search results.",
    technologies: ["Python", "Streamlit", "Selenium", "Discord"],
  },{
    title: "Pramith' Portfolio",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
    technologies: ["HTML", "Tailwind CSS", "React.js"],
  },
];

export const CONTACT = {
  phoneNo: "+91 8925403042 ",
  email: "pramithkiran9@gmail.com",
};
