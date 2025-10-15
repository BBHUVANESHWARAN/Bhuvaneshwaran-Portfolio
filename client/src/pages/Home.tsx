import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone, Download, ExternalLink, ChevronDown, Code2, Brain, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Neural_network_hero_background_4b6c4abc.png";
import aboutImage from "@assets/generated_images/AI_workspace_about_section_93533ff9.png";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} copied successfully`,
    });
  };

  const skills = {
    "AI/ML Frameworks": ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV"],
    "LLMs & NLP": ["GPT", "BERT", "T5", "Hugging Face", "RAG", "AI Agents"],
    "Programming": ["Python"],
    "Deep Learning": ["CNNs", "RNNs", "GANs", "Transformers", "Autoencoders"],
    "Deployment": ["Flask", "Django", "FastAPI", "Docker"],
    "Databases": ["MongoDB", "Weaviate", "Pinecone", "SQL", "Neo4j"],
    "Cloud & Tools": ["AWS", "GCP", "Git", "GitHub"],
    "Data Science": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau"]
  };

  const experience = [
    {
      company: "Barrla Systems Pvt Ltd",
      role: "AI Developer",
      period: "March 2024 - Present",
      achievements: [
        "Engaged in innovation, study, analysis, development, and enhancement (isADE) efforts in ML, DL, NLP, and Gen AI",
        "Improved deep learning model accuracy through advanced hyperparameter tuning strategies and deployment"
      ],
      tech: ["Machine Learning", "Deep Learning", "NLP", "GenAI"]
    },
    {
      company: "RETECH SOLUTIONS PVT LTD",
      role: "Data Science Developer",
      period: "January 2023 - March 2024",
      achievements: [
        "Built machine learning and deep learning models for image processing, NLP, and predictive analytics",
        "Designed AI pipelines for real-world data science problems, optimizing workflows for maximum efficiency"
      ],
      tech: ["ML Models", "Image Processing", "NLP", "Data Pipelines"]
    },
    {
      company: "CRACKERS CITY SOLUTIONS PVT LTD",
      role: "Data Science Intern",
      period: "May 2021 - October 2021",
      achievements: [
        "Contributed to AI-powered projects, gaining foundational knowledge in deep learning and NLP techniques",
        "Applied Python, Machine Learning, and Deep Learning to solve real-world problems"
      ],
      tech: ["Python", "ML", "DL", "AI"]
    }
  ];

  const projects = [
    {
      title: "RAG Chat App",
      description: "Built a web application integrating Google Gemini for Retrieval-Augmented Generation. Scrapes content from URLs, processes into vector embeddings with Weaviate DB, enabling intelligent chatbot responses.",
      tech: ["Google Gemini", "RAG", "Weaviate DB", "Vector Embeddings"],
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "Custom Bi-Directional LSTM with LLM",
      description: "Developed a custom Bi-Directional LSTM from scratch for multiclass text classification with integrated LLM techniques to enhance model performance.",
      tech: ["LSTM", "LLM", "Text Classification", "Deep Learning"],
      icon: <Code2 className="h-6 w-6" />
    },
    {
      title: "Real-Time Social Media Sentiment Analysis",
      description: "Dashboard monitoring social media trends and analyzing public sentiment in real-time. Uses LLMs for accurate sentiment prediction with interactive Plotly visualizations.",
      tech: ["LLMs", "MongoDB", "Plotly", "Real-time Analysis"],
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: "AI Chatbot with LLM Integration",
      description: "Designed a Flask-based chatbot powered by advanced language models (LLM), improving multi-turn interaction capabilities.",
      tech: ["Flask", "LLM", "NLP", "Chatbot"],
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "AI-Powered Phishing Detection System",
      description: "Built an intelligent system that identifies phishing emails and malicious URLs using advanced NLP techniques.",
      tech: ["NLP", "Security", "ML", "Classification"],
      icon: <Database className="h-6 w-6" />
    }
  ];

  const education = [
    {
      degree: "Master of Computer Application",
      institution: "AYYA NADAR JANAKI AMMAL COLLEGE",
      year: "2023",
      score: "7.24/10"
    },
    {
      degree: "B.Sc (Computer Science)",
      institution: "AYYA NADAR JANAKI AMMAL COLLEGE",
      year: "2021",
      score: "7.15/10"
    }
  ];

  const achievements = [
    "Python (Basic) - HackerRank",
    "Problem Solving (Basic) - HackerRank",
    "Diploma Course in Digital Marketing",
    "Typewriting (English - Junior)",
    "NCC Leader - Cadet Under Officer (CUO)",
    "Participated in national-level workshops on AngularJS, Flutter, and cross-platform development"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Neural network background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              BHUVANESHWARAN B
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-semibold animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              AI Developer | Machine Learning Engineer
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Building intelligent systems with 2+ years of hands-on experience in ML, DL, NLP, and GenAI
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button 
                size="lg"
                onClick={() => scrollToSection('projects')}
                data-testid="button-view-projects"
                className="bg-accent text-accent-foreground"
              >
                View Projects
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                data-testid="button-download-resume"
                className="backdrop-blur-sm bg-background/20 border-2 border-white/20"
              >
                <a href="/api/resume" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <Button
                variant="ghost"
                size="icon"
                asChild
                data-testid="link-github"
                className="h-12 w-12"
              >
                <a href="https://github.com/BBHUVANESHWARAN" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                data-testid="link-linkedin"
                className="h-12 w-12"
              >
                <a href="https://linkedin.com/in/bhuvaneshwaran-b-45575a216" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                Innovative and detail-oriented AI Developer with <span className="text-accent font-semibold">2 years of hands-on experience</span> in building, training, and deploying machine learning models.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                I specialize in <span className="text-foreground font-semibold">Machine Learning, Deep Learning, NLP, GenAI and LLMs</span>. Passionate about building scalable AI solutions using Python, FastAPI, and Django.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Expertise in <span className="text-foreground font-semibold">RAG-based AI applications, model optimization</span>, and deploying production-ready AI systems that solve real-world problems.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center" data-testid="stat-experience">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-years">2+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center" data-testid="stat-projects">
                  <div className="text-4xl font-bold text-accent mb-2" data-testid="text-stat-projects">5+</div>
                  <div className="text-sm text-muted-foreground">Major Projects</div>
                </div>
                <div className="text-center" data-testid="stat-technologies">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-technologies">20+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src={aboutImage} 
                  alt="AI Developer Workspace" 
                  className="rounded-2xl border border-border shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} className="hover-elevate transition-all duration-300" data-testid={`card-skill-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <CardTitle className="text-lg" data-testid={`text-skill-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="font-mono text-xs bg-primary/10 text-primary"
                        data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Experience</h2>
          <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative" data-testid={`experience-${index}`}>
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-0">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
                </div>
                
                <Card className="hover-elevate transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                      <div>
                        <CardTitle className="text-xl mb-1" data-testid={`text-role-${index}`}>{exp.role}</CardTitle>
                        <p className="text-lg font-semibold text-accent" data-testid={`text-company-${index}`}>{exp.company}</p>
                      </div>
                      <Badge variant="outline" className="font-mono text-sm" data-testid={`badge-period-${index}`}>
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-2 text-muted-foreground" data-testid={`text-achievement-${index}-${i}`}>
                          <span className="text-accent mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-mono text-xs" data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="hover-elevate transition-all duration-300"
                data-testid={`card-project-${index}`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2" data-testid={`text-project-title-${index}`}>{project.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`text-project-description-${index}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="font-mono text-xs bg-accent/10 text-accent"
                        data-testid={`badge-project-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-education-${index}`}>
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-xl mb-1" data-testid={`text-degree-${index}`}>{edu.degree}</CardTitle>
                      <p className="text-lg text-muted-foreground" data-testid={`text-institution-${index}`}>{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2" data-testid={`badge-year-${index}`}>{edu.year}</Badge>
                      <p className="text-sm font-semibold text-accent" data-testid={`text-score-${index}`}>{edu.score}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Achievements & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-achievement-${index}`}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex-shrink-0">
                    <div className="h-3 w-3 rounded-full bg-accent"></div>
                  </div>
                  <p className="text-foreground" data-testid={`text-achievement-item-${index}`}>{achievement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's Build Something Together</h2>
          <p className="text-lg text-muted-foreground mb-12">
            I'm always interested in hearing about new projects and opportunities in AI/ML.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a 
                    href="mailto:bhuvaneshboominathan@gmail.com" 
                    className="text-foreground font-medium hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    bhuvaneshboominathan@gmail.com
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('bhuvaneshboominathan@gmail.com', 'Email')}
                  data-testid="button-copy-email"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a 
                    href="tel:8098492074" 
                    className="text-foreground font-medium hover:text-accent transition-colors"
                    data-testid="link-phone"
                  >
                    +91 8098492074
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard('8098492074', 'Phone')}
                  data-testid="button-copy-phone"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="lg" asChild data-testid="button-github">
              <a href="https://github.com/BBHUVANESHWARAN" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild data-testid="button-linkedin">
              <a href="https://linkedin.com/in/bhuvaneshwaran-b-45575a216" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-foreground font-semibold mb-1">Bhuvaneshwaran B</p>
              <p className="text-sm text-muted-foreground">
                AI Developer | Chennai, India
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-experience"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-projects"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-contact"
              >
                Contact
              </button>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} All rights reserved
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
