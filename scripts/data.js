// Data for the website
const timelineEvents = [
  {
    year: "2020",
    title: "IUCEE RIT Chapter Founded",
    description: "Established with a vision to transform engineering education",
  },
  {
    year: "2021",
    title: "First IASF Participation",
    description: "Students participated in Indian Annual Student Forum",
  },
  {
    year: "2022",
    title: "UN SDG Initiative Launch",
    description: "Started focusing on Sustainable Development Goals",
  },
  {
    year: "2023",
    title: "National Recognition",
    description: "Received recognition for innovative engineering solutions",
  },
  {
    year: "2024",
    title: "IASF at KLE Tech University",
    description: "Successful participation at Hubli, Karnataka",
  },
  {
    year: "2025",
    title: "IASF at VNR VJIET",
    description: "Latest achievement at Hyderabad, Telangana",
  },
]

const achievements = [
  {
    title: "50+ Students Impacted",
    description: "Directly mentored and guided engineering students",
    icon: "users",
  },
  {
    title: "15+ Projects Completed",
    description: "Real-world solutions addressing societal challenges",
    icon: "target",
  },
  {
    title: "3 National Conferences",
    description: "Active participation in IASF events across India",
    icon: "award",
  },
  {
    title: "UN SDG Focus",
    description: "All 17 Sustainable Development Goals addressed",
    icon: "globe",
  },
]

const sdgGoals = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere", icon: "🏠" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition", icon: "🌾" },
  { id: 3, title: "Good Health", description: "Ensure healthy lives and promote well-being for all", icon: "❤️" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education", icon: "📚" },
  {
    id: 5,
    title: "Gender Equality",
    description: "Achieve gender equality and empower all women and girls",
    icon: "⚖️",
  },
  { id: 6, title: "Clean Water", description: "Ensure availability and sustainable management of water", icon: "💧" },
  {
    id: 7,
    title: "Affordable Energy",
    description: "Ensure access to affordable, reliable, sustainable energy",
    icon: "⚡",
  },
  { id: 8, title: "Decent Work", description: "Promote sustained, inclusive economic growth", icon: "💼" },
  { id: 9, title: "Innovation", description: "Build resilient infrastructure, promote innovation", icon: "🏗️" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries", icon: "🤝" },
  {
    id: 11,
    title: "Sustainable Cities",
    description: "Make cities and human settlements inclusive and sustainable",
    icon: "🏙️",
  },
  {
    id: 12,
    title: "Responsible Consumption",
    description: "Ensure sustainable consumption and production patterns",
    icon: "♻️",
  },
  { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change", icon: "🌍" },
  { id: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans, seas", icon: "🌊" },
  {
    id: 15,
    title: "Life on Land",
    description: "Protect, restore and promote sustainable use of ecosystems",
    icon: "🌳",
  },
  { id: 16, title: "Peace & Justice", description: "Promote peaceful and inclusive societies", icon: "⚖️" },
  { id: 17, title: "Partnerships", description: "Strengthen the means of implementation", icon: "🤝" },
]

const clubMembers = [
  { name: "Arjun Sharma", role: "President", department: "Computer Engineering", year: "Final Year" },
  { name: "Priya Patel", role: "Vice President", department: "Electronics Engineering", year: "Third Year" },
  { name: "Rahul Kumar", role: "Secretary", department: "Mechanical Engineering", year: "Third Year" },
  { name: "Sneha Reddy", role: "Treasurer", department: "Civil Engineering", year: "Second Year" },
  { name: "Vikram Singh", role: "Technical Head", department: "Computer Engineering", year: "Final Year" },
  { name: "Ananya Gupta", role: "Event Coordinator", department: "Electrical Engineering", year: "Third Year" },
]

const galleryImages = [
  {
    src: "/images/iasf-mysore.jpg",
    title: "IASF 1 - Mysore",
    description: "Vidyavardhaka College of Engineering, Mysore, Karnataka",
    alt: "IASF 1 Vidyavardhaka College of Engineering, Mysore, Karnataka",
    fullGallery: [
      { src: "/images/iasf-mysore.jpg", type: "image", caption: "Group photo at Vidyavardhaka College" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Workshop session in progress" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Student presentations" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Networking session" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Awards ceremony" },
    ],
  },
  {
    src: "/images/iasf-hyderabad.jpg",
    title: "IASF 2025 - Hyderabad",
    description: "VNR Vignana Jyothi Institute of Engineering & Technology, Telangana",
    alt: "IASF 2025 at Vallurupalli Nageswara Rao Vignana Jyothi Institute, Hyderabad",
    fullGallery: [
      { src: "/images/iasf-hyderabad.jpg", type: "image", caption: "Traditional attire group photo at VNR VJIET" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Cultural program highlights" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Technical exhibition" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Keynote speech session" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Innovation showcase" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Closing ceremony" },
    ],
  },
  {
    src: "/images/iasf-hubli.jpg",
    title: "IASF 2024 - Hubli",
    description: "KLE Technological University, Hubli, Karnataka",
    alt: "IASF 2024 at KLE Technological University, Hubli, Karnataka",
    fullGallery: [
      { src: "/images/iasf-hubli.jpg", type: "image", caption: "Outdoor group photo at KLE Tech University" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Campus tour and exploration" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Project demonstrations" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Panel discussion with experts" },
      { src: "/placeholder.svg?height=400&width=600", type: "image", caption: "Team building activities" },
    ],
  },
]

/*
Database Structure for Form Data:

CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    prn VARCHAR(50) NOT NULL UNIQUE,
    branch ENUM('computer', 'electronics', 'mechanical', 'civil', 'electrical') NOT NULL,
    year ENUM('first', 'second', 'third', 'final') NOT NULL,
    motivation TEXT NOT NULL,
    experience TEXT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index for faster queries
CREATE INDEX idx_email ON applications(email);
CREATE INDEX idx_prn ON applications(prn);
CREATE INDEX idx_status ON applications(status);
CREATE INDEX idx_application_date ON applications(application_date);

-- For Excel export functionality:
-- Use libraries like:
-- - Node.js: xlsx, exceljs
-- - PHP: PhpSpreadsheet
-- - Python: openpyxl, xlsxwriter
-- - JavaScript (client-side): SheetJS

Example Excel export query:
SELECT 
    name as 'Full Name',
    email as 'Email Address',
    phone as 'Phone Number',
    prn as 'PRN/Roll Number',
    branch as 'Branch',
    year as 'Academic Year',
    motivation as 'Motivation',
    experience as 'Experience',
    application_date as 'Application Date',
    status as 'Status'
FROM applications 
ORDER BY application_date DESC;
*/
