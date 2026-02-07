import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Code2, Server, Globe2, ShieldCheck, Terminal, Cpu, ArrowUpRight, Lock } from 'lucide-react';
import './index.css';

// --- Preloader Component ---
const Preloader = () => {
    return (
        <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                className="loader-circle"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
};

// --- Main Portfolio Component ---
const Portfolio = () => {
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const staggerContainer = {
        visible: {
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="app-container">
            <AnimatePresence>
                {loading && <Preloader key="preloader" />}
            </AnimatePresence>

            {!loading && (
                <>
                    <div className="noise-overlay" />

                    {/* Navbar */}
                    <motion.nav
                        className={`navbar ${scrolled ? 'scrolled' : ''}`}
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="container nav-content">
                            <a href="#" className="logo">SG<span>.</span></a>
                            <div className="nav-links">
                                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <a key={item} href={`#${item.toLowerCase()}`} className="nav-item">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.nav>

                    <main>
                        {/* Hero Section - Centered & Minimal */}
                        <section id="home" className="hero-section centered">
                            <div className="container">
                                <motion.div
                                    className="hero-content"
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                                >
                                    <motion.div className="profile-orbit-wrapper" variants={fadeInUp}>
                                        <div className="orbit-c"></div>
                                        <div className="profile-img-c">
                                            <img src="https://i.postimg.cc/TwBy55gh/Whats-App-Image-2026-01-07-at-3-35-06-PM.jpg" alt="Sathwik Gampa" />
                                        </div>
                                    </motion.div>

                                    <motion.h1 variants={fadeInUp} className="hero-title">
                                        Building Logic <br />
                                        <span className="gradient-text">That Scales.</span>
                                    </motion.h1>

                                    <motion.p variants={fadeInUp} className="hero-subtitle">
                                        Architecting decentralized systems and real-time infrastructure. <br />
                                        I solve complex problems with clean, production-ready code.
                                    </motion.p>

                                    <motion.div variants={fadeInUp} className="hero-cta">
                                        <a href="#projects" className="btn btn-primary">View Work</a>
                                        <a href="#contact" className="btn btn-ghost">Contact Me</a>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Abstract Background Elements */}
                            <div className="bg-glow top-glow"></div>
                            <div className="bg-glow bottom-glow"></div>
                        </section>

                        {/* About Section */}
                        <section id="about" className="section py-large">
                            <div className="container">
                                <motion.div
                                    className="section-header"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="section-label">About Me</span>
                                    <h2>Beyond Syntax</h2>
                                </motion.div>

                                <div className="about-wrapper glass-card">
                                    <p className="about-text">
                                        I don't just write code; I engineer solutions. As a B.Tech IT student at VNRVJIET, I've moved past academic theory to build resilient systems. My focus is on <strong>Blockchain Security</strong>, <strong>Real-time Logistics</strong>, and <strong>Cloud Architecture</strong>. I build with a startup mindset—shipping features that matter, optimizing for latency, and ensuring security isn't an afterthought.
                                    </p>
                                    <div className="interests-grid">
                                        {['Blockchain', 'Cybersecurity', 'Cloud Native', 'AI/ML'].map((interest) => (
                                            <div key={interest} className="interest-pill">{interest}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Skills Section */}
                        <section id="skills" className="section py-large">
                            <div className="container">
                                <motion.div
                                    className="section-header"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="section-label">Arsenal</span>
                                    <h2>Technical Stack</h2>
                                </motion.div>

                                <div className="skills-grid-bento">
                                    <motion.div className="bento-card" whileHover={{ y: -5 }}>
                                        <div className="icon-box"><Code2 /></div>
                                        <h3>Languages</h3>
                                        <p>Java, Python, C, Solidity, JavaScript</p>
                                    </motion.div>

                                    <motion.div className="bento-card" whileHover={{ y: -5 }}>
                                        <div className="icon-box"><Globe2 /></div>
                                        <h3>Web & Backend</h3>
                                        <p>React, Node.js, Firebase, Socket.io, PHP</p>
                                    </motion.div>

                                    <motion.div className="bento-card" whileHover={{ y: -5 }}>
                                        <div className="icon-box"><Server /></div>
                                        <h3>Blockchain & Cloud</h3>
                                        <p>Ethereum, IPFS, Oracle Cloud, AWS</p>
                                    </motion.div>

                                    <motion.div className="bento-card" whileHover={{ y: -5 }}>
                                        <div className="icon-box"><Terminal /></div>
                                        <h3>Tools</h3>
                                        <p>Git, Docker, Linux, VS Code</p>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section id="projects" className="section py-large">
                            <div className="container">
                                <motion.div
                                    className="section-header"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="section-label">Case Studies</span>
                                    <h2>Selected Works</h2>
                                </motion.div>

                                <div className="projects-grid">
                                    {/* Project 1 */}
                                    <motion.div
                                        className="project-card"
                                        whileHover={{ y: -10 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="project-top">
                                            <div className="folder-icon"><MapPin size={28} /></div>
                                            <div className="links">
                                                <a href="#"><Github size={20} /></a>
                                                <a href="#"><ExternalLink size={20} /></a>
                                            </div>
                                        </div>
                                        <h3>Bus Tracker App</h3>
                                        <div className="project-desc">
                                            <p>Mission-critical logistics system. Engineered sub-second latency GPS tracking using <strong>Socket.io</strong> and <strong>Firebase</strong>. Features dual-interfaces for drivers and students to optimize campus routing.</p>
                                        </div>
                                        <ul className="project-tech">
                                            <li>React</li>
                                            <li>Node.js</li>
                                            <li>Real-time</li>
                                        </ul>
                                    </motion.div>

                                    {/* Project 2 */}
                                    <motion.div
                                        className="project-card"
                                        whileHover={{ y: -10 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, delay: 0.1 }}
                                    >
                                        <div className="project-top">
                                            <div className="folder-icon"><ShieldCheck size={28} /></div>
                                            <div className="links">
                                                <a href="#"><Github size={20} /></a>
                                                <a href="#"><ExternalLink size={20} /></a>
                                            </div>
                                        </div>
                                        <h3>TrustLink Verifier</h3>
                                        <div className="project-desc">
                                            <p>Defensive platform against employment fraud. Implements custom <strong>fraud-pattern recognition logic</strong> to identify fake internships. Responsive UI designed for maximum accessibility.</p>
                                        </div>
                                        <ul className="project-tech">
                                            <li>Security Logic</li>
                                            <li>PHP</li>
                                            <li>Analytics</li>
                                        </ul>
                                    </motion.div>

                                    {/* Project 3 */}
                                    <motion.div
                                        className="project-card"
                                        whileHover={{ y: -10 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, delay: 0.2 }}
                                    >
                                        <div className="project-top">
                                            <div className="folder-icon"><Cpu size={28} /></div>
                                            <div className="links">
                                                <a href="#"><Github size={20} /></a>
                                                <a href="#"><ExternalLink size={20} /></a>
                                            </div>
                                        </div>
                                        <h3>Decentralized Certs</h3>
                                        <div className="project-desc">
                                            <p>Trustless academic infrastructure. Uses <strong>Ethereum Smart Contracts</strong> to hash credentials and <strong>IPFS</strong> for storage. Eliminates administrative bottlenecks with one-click verification.</p>
                                        </div>
                                        <ul className="project-tech">
                                            <li>Solidity</li>
                                            <li>Web3.js</li>
                                            <li>IPFS</li>
                                        </ul>
                                    </motion.div>

                                    {/* Project 4 */}
                                    <motion.div
                                        className="project-card"
                                        whileHover={{ y: -10 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, delay: 0.3 }}
                                    >
                                        <div className="project-top">
                                            <div className="folder-icon"><Lock size={28} /></div>
                                            <div className="links">
                                                <a href="#"><Github size={20} /></a>
                                                <a href="#"><ExternalLink size={20} /></a>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <h3 style={{ marginBottom: 0 }}>Smart Contracts</h3>
                                            <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>Ongoing</span>
                                        </div>
                                        <div className="project-desc">
                                            <p>Decentralized freelance payment system. Solves trust issues by <strong>locking funds in escrow</strong> until work is confirmed. Ensures fair transactions between clients and freelancers.</p>
                                        </div>
                                        <ul className="project-tech">
                                            <li>Ethereum</li>
                                            <li>Smart Contracts</li>
                                            <li>Escrow</li>
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="section py-large contact-section">
                            <div className="container contact-wrapper">
                                <motion.h2
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Let's Build Something <br /><span className="text-accent">Impossible.</span>
                                </motion.h2>
                                <p className="contact-sub">Open for full-stack and blockchain engineering roles.</p>
                                <div className="contact-cta-box">
                                    <a href="mailto:email@example.com" className="email-link">
                                        <Mail className="inline-icon" /> Get in Touch
                                    </a>
                                    <div className="social-row">
                                        <a href="https://github.com/sathwikgampa" target="_blank"><Github /></a>
                                        <a href="https://www.linkedin.com/in/sathwik-gampa-370645326" target="_blank"><Linkedin /></a>
                                    </div>
                                </div>
                                <div className="footer-loc">
                                    <p>Hyderabad, India</p>
                                    <p className="copy">© 2026 Sathwik Gampa</p>
                                </div>
                            </div>
                        </section>
                    </main>
                </>
            )}
        </div>
    );
};

export default Portfolio;
