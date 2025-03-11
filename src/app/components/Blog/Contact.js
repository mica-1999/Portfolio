"use client";
import { useState, useRef } from 'react';

export default function Contact() {
    const messageFormDiv = useRef(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
  
    // Form status
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        error: false,
        message: ''
    });
    
    // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // FAQ items with open/close state
    const [openFaq, setOpenFaq] = useState(null);
    
    // FAQ data
    const faqs = [
        {
        question: "What type of projects do you work on?",
        answer: "I specialize in web development projects including responsive websites, web applications, e-commerce solutions, and custom CMS implementations. I'm particularly experienced with React, Next.js, and Node.js."
        },
        {
        question: "What is your typical project timeline?",
        answer: "Project timelines vary based on complexity and requirements. A simple website might take 2-3 weeks, while complex web applications could take 2-3 months. I'll provide a detailed timeline during our initial consultation."
        },
        {
        question: "Do you offer maintenance after project completion?",
        answer: "Yes! I offer maintenance packages to ensure your website or application stays updated, secure, and performs optimally. We can discuss the specific maintenance needs for your project."
        },
        {
        question: "How do we get started working together?",
        answer: "Simply fill out the contact form on this page with details about your project. I'll reach out within 24-48 hours to schedule an initial consultation where we can discuss your requirements in detail."
        }
    ];
    
    // Toggle FAQ item
    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Scroll to form on button click with offset
    const scrollToForm = (e) => {
        e.preventDefault(); // Prevent the default link behavior
        if (messageFormDiv.current) {
            // Get the element's position
            const yOffset = -80; // Adjust this value as needed for your navbar height
            const element = messageFormDiv.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            // Scroll to the adjusted position
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
        setFormStatus({
            submitted: true,
            success: false,
            error: true,
            message: 'Please fill in all required fields.'
        });
        return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
        setFormStatus({
            submitted: true,
            success: false,
            error: true,
            message: 'Please enter a valid email address.'
        });
        return;
        }
        
        setIsSubmitting(true);
        
        try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setFormStatus({
            submitted: true,
            success: true,
            error: false,
            message: 'Your message has been sent successfully! I\'ll get back to you soon.'
        });
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        } catch (error) {
        setFormStatus({
            submitted: true,
            success: false,
            error: true,
            message: 'There was an error sending your message. Please try again later.'
        });
        } finally {
        setIsSubmitting(false);
        }
    };
    
    return (
        <div className="blog-container contact-container">
        <div className="blog-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Have a question or want to work together? Let's discuss your next project.</p>
        </div>
        
        <div className="contact-content">
            <div className="contact-intro">
            <div className="contact-why">
                <h3>Why Work With Me?</h3>
                <div className="reason-cards">
                <div className="reason-card">
                    <div className="reason-icon">
                    <i className="ri-timer-line"></i>
                    </div>
                    <h4>Fast Delivery</h4>
                    <p>I pride myself on delivering projects on time without compromising quality.</p>
                </div>
                
                <div className="reason-card">
                    <div className="reason-icon">
                    <i className="ri-smartphone-line"></i>
                    </div>
                    <h4>Responsive Design</h4>
                    <p>All projects are built with mobile-first approach ensuring perfect display on all devices.</p>
                </div>
                
                <div className="reason-card">
                    <div className="reason-icon">
                    <i className="ri-customer-service-2-line"></i>
                    </div>
                    <h4>Dedicated Support</h4>
                    <p>I offer ongoing support and maintenance to ensure your project continues to run smoothly.</p>
                </div>
                </div>
            </div>
            
            <div className="availability-card">
                <h3>Current Availability</h3>
                <div className="availability-status">
                <span className="status-indicator available"></span>
                <span className="status-text">Available for new projects</span>
                </div>
                <p>I'm currently accepting new projects starting from <strong>June 2023</strong>.</p>
                <p>Average response time: <strong>24 hours</strong></p>
                <div className="preferred-projects">
                <h4>Preferred Project Types:</h4>
                <ul>
                    <li><i className="ri-check-line"></i> Web Applications</li>
                    <li><i className="ri-check-line"></i> E-commerce Websites</li>
                    <li><i className="ri-check-line"></i> Frontend Development</li>
                    <li><i className="ri-check-line"></i> React/Next.js Projects</li>
                </ul>
                </div>
            </div>
            </div>
            
            <div className="contact-form-container" ref={messageFormDiv}>
            <h3>Send Me A Message</h3>
            
            {formStatus.submitted && formStatus.success && (
                <div className="form-success">
                <i className="ri-check-line"></i>
                <p>{formStatus.message}</p>
                </div>
            )}
            
            {formStatus.submitted && formStatus.error && (
                <div className="form-error">
                <i className="ri-error-warning-line"></i>
                <p>{formStatus.message}</p>
                </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Your Name <span className="required">*</span></label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Your Email <span className="required">*</span></label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    />
                </div>
                </div>
                
                <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows="6"
                    required
                ></textarea>
                </div>
                
                <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
                >
                {isSubmitting ? (
                    <>
                    <span className="spinner-small"></span>
                    Sending...
                    </>
                ) : (
                    <>
                    <i className="ri-send-plane-fill"></i>
                    Send Message
                    </>
                )}
                </button>
            </form>
            </div>
        </div>
        
        <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-container">
            {faqs.map((faq, index) => (
                <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
                >
                <div className="faq-question">
                    <h4>{faq.question}</h4>
                    <span className="faq-icon">
                    <i className={`ri-${openFaq === index ? 'subtract' : 'add'}-line`}></i>
                    </span>
                </div>
                <div className="faq-answer">
                    <p>{faq.answer}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        
        <div className="call-to-action">
            <h3>Ready to start your project?</h3>
            <p>Let's create something amazing together!</p>
            <button 
                className="cta-btn" 
                onClick={scrollToForm}
            >
                <i className="ri-calendar-line"></i>
                Schedule a Call
            </button>
        </div>
        </div>
    );
}
