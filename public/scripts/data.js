// =================================================================
// IUCEE-RIT Website Data
// This file contains all the dynamic content for the website.
// =================================================================

// --- Timeline Data ---
// Used for the "Our Journey" section.
window.timelineEvents = [
  {
    year: "2020",
    title: "IUCEE RIT Chapter Founded",
    description: "Established with a vision to transform engineering education.",
  },
  {
    year: "2021",
    title: "First IASF Participation",
    description: "Students participated in the Indian Annual Student Forum.",
  },
  {
    year: "2022",
    title: "UN SDG Initiative Launch",
    description: "Started focusing projects on Sustainable Development Goals.",
  },
  {
    year: "2023",
    title: "National Recognition",
    description: "Received recognition for innovative engineering solutions.",
  },
  {
    year: "2024",
    title: "IASF at KLE Tech University",
    description: "Successful participation at Hubli, Karnataka.",
  },
  {
    year: "2025",
    title: "IASF at VNR VJIET",
    description: "Latest achievement at Hyderabad, Telangana.",
  },
];

// --- Achievements Data ---
// Used for the "Our Impact" section.
window.achievements = [
  {
    title: "50+ Students Impacted",
    description: "Directly mentored and guided engineering students.",
    icon: "users",
    link: "#alumni",
  },
  {
    title: "15+ Projects Completed",
    description: "Real-world solutions addressing societal challenges.",
    icon: "target",
    link: "#projects",
  },
  {
    title: "3 National Conferences",
    description: "Active participation in IASF events across India.",
    icon: "award",
    link: "#gallery",
  },
  {
    title: "UN SDG Focus",
    description: "All projects are aligned with one or more of the 17 SDGs.",
    icon: "globe",
    link: "#sdg",
  },
];

// --- UN Sustainable Development Goals Data ---
// Used for the SDG scroller. Renamed from sdgGoals to sdgData.
window.sdgData = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", icon: "🏠" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security.", icon: "🌾" },
  { id: 3, title: "Good Health", description: "Ensure healthy lives and promote well-being.", icon: "❤️" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education.", icon: "📚" },
  { id: 5, title: "Gender Equality", description: "Achieve gender equality for all.", icon: "⚖️" },
  { id: 6, title: "Clean Water", description: "Ensure availability of clean water.", icon: "💧" },
  { id: 7, title: "Affordable Energy", description: "Ensure access to affordable, reliable energy.", icon: "⚡" },
  { id: 8, title: "Decent Work", description: "Promote inclusive and sustainable economic growth.", icon: "💼" },
  { id: 9, title: "Innovation", description: "Build resilient infrastructure, promote innovation.", icon: "🏗️" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", icon: "🤝" },
  { id: 11, title: "Sustainable Cities", description: "Make cities inclusive, safe, and sustainable.", icon: "🏙️" },
  { id: 12, title: "Responsible Consumption", description: "Ensure sustainable consumption patterns.", icon: "♻️" },
  { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change.", icon: "🌍" },
  { id: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans.", icon: "🌊" },
  { id: 15, title: "Life on Land", description: "Protect, restore and promote sustainable use of ecosystems.", icon: "🌳" },
  { id: 16, title: "Peace & Justice", description: "Promote peaceful and inclusive societies.", icon: "⚖️" },
  { id: 17, title: "Partnerships", description: "Strengthen the means of implementation.", icon: "🤝" },
];

// --- Gallery Data ---
window.galleryData = [
  {
    src: "/images/iasf-hyderabad/iasf-hyderabad.jpg",
    alt: "IASF 2025 at VNR VJIET, Hyderabad",
    title: "IASF 2025 - Hyderabad",
    description: "VNR Vignana Jyothi Institute of Engineering & Technology",
    fullGallery: [
      "/images/iasf-hyderabad/1.jpg",
      "/images/iasf-hyderabad/2.jpg",
      "/images/iasf-hyderabad/3.jpg",
      "/images/iasf-hyderabad/4.jpg",
    ],
  },
  {
    src: "/images/iasf-hubli/iasf-hubli.jpg",
    alt: "IASF 2024 at KLE Technological University, Hubli",
    title: "IASF 2024 - Hubli",
    description: "KLE Technological University, Hubli, Karnataka",
    fullGallery: [
      "/images/iasf-hubli/1.jpg",
      "/images/iasf-hubli/2.jpg",
      "/images/iasf-hubli/3.jpg",
      "/images/iasf-hubli/4.jpg",
      "/images/iasf-hubli/5.jpg",
    ],
  },
  {
    src: "/images/iasf-mysore/iasf-mysore.jpg",
    alt: "IASF 1 at Vidyavardhaka College of Engineering, Mysore",
    title: "IASF 1 - Mysore",
    description: "Vidyavardhaka College of Engineering, Mysore, Karnataka",
    fullGallery: [
      "/images/iasf-mysore/1.jpg",
      "/images/iasf-mysore/2.jpg",
      "/images/iasf-mysore/3.jpg",
      "/images/iasf-mysore/4.jpg",
      "/images/iasf-mysore/5.jpg",
    ],
  },
];


// --- Social Media Links Data ---
window.socialMedia = [
  {
    name: "GitHub",
    icon: "github",
    color: "#ffffff",
    url: "https://github.com/iucee-rit",
    description: "Explore our open-source projects and code."
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0077B5",
    url: "https://linkedin.com/company/iucee-rit",
    description: "Connect with our professional network."
  },
  {
    name: "X (Twitter)",
    icon: "twitter",
    color: "#1DA1F2",
    url: "https://twitter.com/iucee_rit",
    description: "Follow for live updates and news."
  },
  {
    name: "Instagram",
    icon: "instagram",
    color: "#E4405F",
    url: "https://www.instagram.com/iucee_rit_/",
    description: "See our latest photos and stories."
  }
];

// --- Alumni Data ---
window.alumni = [
  { name: "Pawan Kamble", currentRole: "Student at University of Sydney", link: "https://www.linkedin.com/in/pawan-kamble-b00688229/", image: "profiles/alumni1.jpg" },
  { name: "Shubham Katekar", currentRole: "Co-founder at Techsyne Consulting", link: "https://www.linkedin.com/in/shubham-katekar-8b9487190/", image: "profiles/alumni2.jpg" },
  { name: "Sejal Patil", currentRole: "Director at Pullpubb", link: "https://www.linkedin.com/in/sejal-patil-2023b1191/", image: "profiles/alumni3.jpg" },
  { name: "Tanmay Bhosle", currentRole: "Part Planning Engineer @ MAN Truck & Bus", link: "https://www.linkedin.com/in/tanmay-bhosle-a63445191/", image: "profiles/alumni4.jpg" },
  { name: "Kunal Ashtekar", currentRole: "Programmer Analyst @ Cognizant", link: "https://www.linkedin.com/in/kunal-ashtekar-91599818b/", image: "profiles/alumni5.png" },
  { name: "Harsh Patil", currentRole: "Data Analyst @ Client Solutions", link: "https://www.linkedin.com/in/harsh-patil-34b82b1a8/", image: "profiles/alumni6.png" },
];

// --- Projects Data ---
window.projectsData = [
  {
    id: 1,
    title: "Smart Irrigation System",
    description: "An IoT-based system to optimize water usage for local farms, featuring real-time soil moisture monitoring and automated water distribution to conserve resources and improve crop yield.",
    images: [
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png"
    ],
    category: "IoT",
    year: "2024",
    technologies: ["Arduino", "IoT", "Sensors", "C++"],
    status: "Completed"
  },
  {
    id: 2,
    title: "Portable Water Purification",
    description: "A low-cost, multi-stage filtration device designed to provide safe and clean drinking water in remote and underserved rural areas, tackling waterborne diseases.",
    images: [
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png"
    ],
    category: "Health",
    year: "2023",
    technologies: ["Filtration", "Mechanical Design", "Material Science"],
    status: "Completed"
  },
  {
    id: 3,
    title: "AI-Powered Waste Sorter",
    description: "A machine learning model integrated with a conveyor system that uses computer vision to automatically identify and sort different types of recyclable materials, improving efficiency in waste management.",
    images: [
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png",
      "/profiles/alumni6.png"
    ],
    category: "AI/ML",
    year: "2024",
    technologies: ["Python", "TensorFlow", "Computer Vision", "Raspberry Pi"],
    status: "In Progress"
  },
];
// --- Team Data ---
// Updated structure to match the new team cards.
window.teamData = [
  {
    name: "Dr. Krishna Vedula",
    role: "Director of IUCEE Student Chapter",
    image: "profiles/krishna.png",
    department: "Executive Director, IUCEE",
    bio: "Leading the vision for innovative engineering education across India.",
    expertise: ["Engineering Education", "Global Collaboration"],
    publications: 20,
    projects: 50,
    link: "https://www.linkedin.com/in/krishna-vedula/" // ADD ACTUAL LINK
  },
  {
    name: "Mr. Mayur Maske",
    role: "Faculty Coordinator",
    image: "profiles/maske.png",
    department: "Mechanical Engineering",
    bio: "Guiding students towards academic and professional excellence.",
    expertise: ["Mechanical Design", "Student Mentorship"],
    publications: 5,
    projects: 10,
    link: "https://www.linkedin.com/in/mayur-maske/"
  },
  {
    name: "Arjun Sharma",
    role: "President",
    image: "profiles/placeholder.png",
    department: "Computer Engineering - Final Year",
    bio: "Overseeing all chapter activities and strategic direction.",
    expertise: ["Leadership", "Project Management", "Web Dev"],
    link: "https://www.linkedin.com/in/arjun-sharma/"
  },
  {
    name: "Priya Patel",
    role: "Vice President",
    image: "profiles/placeholder.png",
    department: "Electronics Engineering - Third Year",
    bio: "Assisting in chapter management and external relations.",
    expertise: ["Embedded Systems", "Public Speaking"],
    link: "https://www.linkedin.com/in/priya-patel/"
  },
];
// --- Events Data ---
// Sample data matching the new events card structure.
window.eventsData = {
  upcoming: [
    // {
    //   title: "Get Minds Together",
    //   description: "",
    //   image: "/images/iasf-hubli.jpg",
    //   category: "Webinar",
    //   date: "2025-10-15T19:00:00",
    //   time: "7:00 PM IST",
    //   location: "Online",
    //   registered: 45,
    //   capacity: 100
    // }
  ],
  past: [
    {
      title: "Electric Vehicals",
      description: "A Wrokshop on Electric Vehical",
      image: "/images/Past/EV/1.jpg",
      category: "Workshop",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["Information on EV", "EV system design", "Market details"],
      gallery: [
        "/images/Past/EV/1.jpg",
      ]
    },
    {
      title: "Figma",
      description: "A Wrokshop on Design in Figma",
      image: "/images/Past/figma/1.jpg",
      category: "Workshop",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["Figma", "Profile Card Design"],
      gallery: [
        "/images/Past/figma/1.jpg",
      ]
    },
    {
      title: "CAD",
      description: "A Wrokshop on Design in Solidworks (CAD)",
      image: "/images/Past/cad/1.jpg",
      category: "Workshop",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["CAD", "Solidworks"],
      gallery: [
        "/images/Past/cad/1.jpg",
      ]
    },
    {
      title: "AI",
      description: "A Wrokshop on AI Prompt Engineering",
      image: "/images/Past/ai/1.jpg",
      category: "Workshop",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["AI", "ChatGPT", "Prompt Engineering"],
      gallery: [
        "/images/Past/ai/1.jpg",
      ]
    },
    {
      title: "Monument activity",
      description: "Like.... What?",
      image: "/images/Past/activity/1.jpg",
      category: "Activity",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["Bottles and Creatvity", "Still.... What?"],
      gallery: [
        "/images/Past/activity/1.jpg",
        "/images/Past/activity/2.jpg",
      ]
    },
    {
      title: "Monument activity",
      description: "Like.... What?",
      image: "/images/Past/activity/1.jpg",
      category: "Activity",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["Bottles and Creatvity", "Still.... What?"],
      gallery: [
        "/images/Past/activity/1.jpg",
        "/images/Past/activity/2.jpg",
      ]
    },
    {
      title: "Monument activity",
      description: "Like.... What?",
      image: "/images/Past/activity/1.jpg",
      category: "Activity",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["Bottles and Creatvity", "Still.... What?"],
      gallery: [
        "/images/Past/activity/1.jpg",
        "/images/Past/activity/2.jpg",
      ]
    },
    {
      title: "Monument activity",
      description: "Like.... What?",
      image: "/images/Past/activity/1.jpg",
      category: "Activity",
      date: "2025-08-20",
      location: "RIT Campus, Club Room",
      attendees: 13,
      highlights: ["Bottles and Creatvity", "Still.... What?"],
      gallery: [
        "/images/Past/activity/1.jpg",
        "/images/Past/activity/2.jpg",
      ]
    },
  ]
};