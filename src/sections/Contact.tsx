import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  MapPin, 
  Send, 
  Github, 
  Linkedin,
  CheckCircle2,
  Loader2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 85%',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        '.info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.info-cards',
            start: 'top 85%',
          },
        }
      );

      // Input border animations
      gsap.fromTo(
        '.input-border',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'roshan.panta.it@gmail.com',
      href: 'mailto:roshan.panta.it@gmail.com',
    },
    {
      icon: <MapPin className="w-5 h-5" />,   
      label: 'Location',
      value: 'Nepal',
      href: null,
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/Roshan2059',
      href: 'https://github.com/Roshan2059',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/roshan-panta',
      href: 'https://www.linkedin.com/in/roshan-panta-b87a93244/',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="contact-header text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#00f0ff] text-sm font-mono mb-4">
            <Send className="w-4 h-4" />
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto">
            Have a project, opportunity, or just want to chat about QA? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="info-cards lg:col-span-2 space-y-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="info-card group p-4 rounded-xl bg-[#1a1a2e]/50 border border-[#2a2a3e] hover:border-[#00f0ff]/30 transition-all duration-300"
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff] group-hover:bg-[#00f0ff]/20 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#a0a0b0] uppercase tracking-wider">{info.label}</p>
                      <p className="text-white font-medium group-hover:text-[#00f0ff] transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff]">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#a0a0b0] uppercase tracking-wider">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Availability Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#00ff9d]/10 to-[#00f0ff]/10 border border-[#00ff9d]/20">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00ff9d] animate-pulse-glow" />
                <div>
                  <p className="text-white font-medium">Open to Opportunities</p>
                  <p className="text-sm text-[#a0a0b0]">Currently exploring new roles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00ff9d]/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#00ff9d]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-[#a0a0b0]">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                      <label className="block text-sm text-[#a0a0b0] mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-[#2a2a3e] text-white py-3 focus:outline-none focus:border-[#00f0ff] transition-colors"
                        placeholder="Your name"
                      />
                      <div className="input-border absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#7000ff] origin-left" />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label className="block text-sm text-[#a0a0b0] mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-[#2a2a3e] text-white py-3 focus:outline-none focus:border-[#00f0ff] transition-colors"
                        placeholder="your@email.com"
                      />
                      <div className="input-border absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#7000ff] origin-left" />
                    </div>

                    {/* Message Input */}
                    <div className="relative">
                      <label className="block text-sm text-[#a0a0b0] mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-[#2a2a3e] text-white py-3 focus:outline-none focus:border-[#00f0ff] transition-colors resize-none"
                        placeholder="Tell me about your project or opportunity..."
                      />
                      <div className="input-border absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#7000ff] origin-left" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden rounded-lg px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#00c8d5] text-[#05050a] font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
