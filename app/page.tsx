"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  Target,
  Award,
  Globe,
  Heart,
  BookOpen,
  Lightbulb,
  Shield,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function Page() {
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [enrollmentOpen, setEnrollmentOpen] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sdgScrollPosition, setSdgScrollPosition] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [selectedGalleryEvent, setSelectedGalleryEvent] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    prn: "",
    branch: "",
    year: "",
    motivation: "",
    experience: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      setParallaxOffset(rate)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSdgScrollPosition((prev) => (prev + 1) % sdgGoals.length)
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", formData)
    setShowApplicationForm(false)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      prn: "",
      branch: "",
      year: "",
      motivation: "",
      experience: "",
    })
  }

  const sdgGoals = [
    { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere", icon: "🏠" },
    {
      id: 2,
      title: "Zero Hunger",
      description: "End hunger, achieve food security and improved nutrition",
      icon: "🌾",
    },
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
    { year: "2024", title: "IASF at KLE Tech University", description: "Successful participation at Hubli, Karnataka" },
    { year: "2025", title: "IASF at VNR VJIET", description: "Latest achievement at Hyderabad, Telangana" },
  ]

  const achievements = [
    {
      title: "50+ Students Impacted",
      description: "Directly mentored and guided engineering students",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "15+ Projects Completed",
      description: "Real-world solutions addressing societal challenges",
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: "3 National Conferences",
      description: "Active participation in IASF events across India",
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: "UN SDG Focus",
      description: "All 17 Sustainable Development Goals addressed",
      icon: <Globe className="h-8 w-8" />,
    },
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

  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openGalleryModal = (eventIndex: number) => {
    setSelectedGalleryEvent(eventIndex)
    setShowGalleryModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="font-bold text-xl text-gray-900">IUCEE-RIT</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </a>
              <a href="#vision" className="text-gray-700 hover:text-purple-600 transition-colors">
                Vision
              </a>
              <a href="#timeline" className="text-gray-700 hover:text-purple-600 transition-colors">
                Journey
              </a>
              <a href="#achievements" className="text-gray-700 hover:text-purple-600 transition-colors">
                Achievements
              </a>
              <a href="#sdg" className="text-gray-700 hover:text-purple-600 transition-colors">
                UN SDGs
              </a>
              <a href="#team" className="text-gray-700 hover:text-purple-600 transition-colors">
                Team
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-purple-600 transition-colors">
                Gallery
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-200">
              <nav className="flex flex-col gap-4">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#vision"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vision
                </a>
                <a
                  href="#timeline"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Journey
                </a>
                <a
                  href="#achievements"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Achievements
                </a>
                <a
                  href="#sdg"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  UN SDGs
                </a>
                <a
                  href="#team"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </a>
                <a
                  href="#gallery"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Multi-layered parallax backgrounds */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-purple-400/20"
          style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-tl from-white/30 via-transparent to-purple-300/20"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent"
          style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
        />

        {/* Enhanced floating elements with more dynamic movement */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse"
            style={{ transform: `translate(${Math.sin(parallaxOffset * 0.01) * 20}px, ${parallaxOffset * 0.2}px)` }}
          />
          <div
            className="absolute top-40 right-20 w-32 h-32 bg-purple-300/15 rounded-full blur-2xl animate-pulse"
            style={{ transform: `translate(${Math.cos(parallaxOffset * 0.008) * 30}px, ${parallaxOffset * 0.4}px)` }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse"
            style={{ transform: `translate(${Math.sin(parallaxOffset * 0.012) * 25}px, ${parallaxOffset * 0.6}px)` }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-600/15 rounded-full blur-lg animate-pulse"
            style={{ transform: `translate(${Math.cos(parallaxOffset * 0.015) * 15}px, ${parallaxOffset * 0.35}px)` }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance">
            IUCEE-RIT
            <span className="block text-purple-600">Student Chapter</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 text-pretty">
            Nurturing Socially Responsible Engineers for Global Impact
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vision & Mission</h2>
            <p className="text-xl text-gray-600">Transforming Engineering Education for a Better Tomorrow</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600 flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Our goal is to nurture socially responsible and innovative engineers who use their technical skills to
                  solve global challenges and drive sustainable development.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Innovation & Creativity</h4>
                      <p className="text-sm text-gray-600">
                        Empower students to design real-world solutions for societal and environmental issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Community Engagement</h4>
                      <p className="text-sm text-gray-600">
                        Collaborate with experts, NGOs, and local bodies to implement impactful projects.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Leadership & Teamwork</h4>
                      <p className="text-sm text-gray-600">
                        Promote inclusive leadership, collaboration, and lifelong learning.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Social Responsibility</h4>
                      <p className="text-sm text-gray-600">
                        Apply engineering for societal good in areas like sustainability, healthcare, and welfare.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Excellence & Collaboration</h4>
                      <p className="text-sm text-gray-600">
                        Encourage national/international competition participation and industry-academic partnerships.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600 flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  To create a platform where engineering students can develop innovative solutions, engage with
                  real-world challenges, and contribute meaningfully to society through collaborative learning and
                  sustainable practices.
                </p>
                <div className="space-y-3">
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    Research & Innovation
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    Community Impact
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    Sustainable Development
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    Global Collaboration
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 bg-purple-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones in Engineering Education Excellence</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-300"></div>
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="border-purple-200 shadow-md">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-purple-600 mb-2">{event.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Making a Difference Through Engineering Excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="text-purple-600 mb-4 flex justify-center">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sdg" className="py-20 px-4 bg-purple-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">UN Sustainable Development Goals</h2>
            <p className="text-xl text-gray-600">Our Clubs Focus on Global Impact</p>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${sdgScrollPosition * 320}px)`,
                width: `${sdgGoals.length * 320}px`,
              }}
            >
              {sdgGoals.concat(sdgGoals.slice(0, 3)).map((goal, index) => (
                <Card
                  key={`${goal.id}-${index}`}
                  className="w-80 flex-shrink-0 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{goal.icon}</span>
                      <div>
                        <CardTitle className="text-lg text-purple-600">SDG {goal.id}</CardTitle>
                        <CardDescription className="font-semibold">{goal.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{goal.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {sdgGoals.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${Math.floor(sdgScrollPosition / 3) === index ? "bg-purple-600" : "bg-purple-300"
                    }`}
                  onClick={() => setSdgScrollPosition(index * 3)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-xl text-gray-600">Meet the Visionaries Behind IUCEE-RIT</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-purple-200 shadow-lg text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Krishna Vedula</h3>
                <p className="text-purple-600 font-semibold mb-2">Director of IUCEE Student Chapter</p>
                <p className="text-gray-600">Leading the vision for innovative engineering education</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mr. Mayur Maske</h3>
                <p className="text-purple-600 font-semibold mb-2">Faculty Coordinator IUCEE RIT</p>
                <p className="text-gray-600">Guiding students towards academic excellence</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Alumni Network</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Tanmay Bhosle</strong> - University of Sydney, Australia
                  </p>
                  <p>
                    <strong>Shubham Katekar</strong> - Director at PullPubb
                  </p>
                  <p>
                    <strong>Sejal Patil</strong> - Co-founder at TechSync Consulting
                  </p>
                  <p>
                    <strong>Pawan Kamble</strong> - Industry Expert
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-purple-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey in Pictures</h2>
            <p className="text-xl text-gray-600">Moments from IASF Events Across India</p>
          </div>

          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-96 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                      <p className="text-gray-200">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevGalleryImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextGalleryImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Gallery indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === galleryIndex ? "bg-purple-600" : "bg-purple-300"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card
                key={index}
                className={`border-purple-200 shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${index === galleryIndex ? "ring-2 ring-purple-600" : ""
                  }`}
                onClick={() => openGalleryModal(index)}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                  <p className="text-purple-600 text-xs mt-2 font-medium">Click to view full gallery →</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <Dialog open={showGalleryModal} onOpenChange={setShowGalleryModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-600">
              {galleryImages[selectedGalleryEvent]?.title} - Full Gallery
            </DialogTitle>
            <DialogDescription>{galleryImages[selectedGalleryEvent]?.description}</DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {galleryImages[selectedGalleryEvent]?.fullGallery.map((item, index) => (
              <div key={index} className="relative group">
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.caption}
                  className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                  <p className="text-white text-sm font-medium">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowGalleryModal(false)} variant="outline">
              Close Gallery
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <span className="font-bold text-xl">IUCEE-RIT</span>
              </div>
              <p className="text-gray-300 mb-4">
                Nurturing socially responsible engineers who use their technical skills to solve global challenges and
                drive sustainable development.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-purple-400">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">iucee.rit@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">+91 12345 67890</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-purple-400 mt-1" />
                  <span className="text-gray-300">
                    Rajiv Gandhi Institute of Technology
                    <br />
                    Mumbai, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-purple-400">Quick Links</h3>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  Home
                </a>
                <a href="#vision" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  Vision & Mission
                </a>
                <a href="#timeline" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  Our Journey
                </a>
                <a href="#achievements" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  Achievements
                </a>
                <a href="#sdg" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  UN SDGs
                </a>
                <a href="#team" className="block text-gray-300 hover:text-purple-400 transition-colors">
                  Leadership
                </a>
              </div>
            </div>

            {/* Club Members */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-purple-400">Club Members</h3>
              <div className="space-y-3">
                {clubMembers.map((member, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-purple-400 text-xs">{member.role}</div>
                    <div className="text-gray-400 text-xs">
                      {member.department} - {member.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media Cards Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="font-bold text-lg mb-6 text-purple-400 text-center">Connect With Us</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Github className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">GitHub</h4>
                  <p className="text-gray-300 text-sm mb-4">Explore our open-source projects and contributions</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                  >
                    Follow Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Linkedin className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">LinkedIn</h4>
                  <p className="text-gray-300 text-sm mb-4">Connect with our professional network and updates</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                  >
                    Connect
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Twitter className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Twitter</h4>
                  <p className="text-gray-300 text-sm mb-4">Stay updated with our latest news and events</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                  >
                    Follow
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">© 2025 IUCEE-RIT Student Chapter. All rights reserved.</div>
              <div className="text-gray-400 text-sm">
                Built with ❤️ by IUCEE-RIT Tech Team | Powered by Next.js & Vercel
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        {enrollmentOpen ? (
          <Button
            size="lg"
            onClick={() => setShowApplicationForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-2xl text-lg px-8 py-4 rounded-full animate-pulse hover:animate-none transition-all duration-300 hover:scale-105"
          >
            🎓 Enroll Now
          </Button>
        ) : (
          <Button
            size="lg"
            disabled
            className="bg-gray-400 text-gray-600 cursor-not-allowed shadow-2xl text-lg px-8 py-4 rounded-full"
          >
            Enrollment Closed
          </Button>
        )}
      </div>
    </div>
  )
}
