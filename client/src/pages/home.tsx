import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Store,
  CreditCard,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Star,
} from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/Logo-01_Transparent_1769326320869.png";
import { ModeToggle } from "@/components/mode-toggle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', businessName: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div
              className="flex-shrink-0 flex items-center gap-4 cursor-pointer h-full"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="h-full aspect-[1.85/1] relative overflow-hidden">
                <img
                  src={logoImage}
                  alt="KOS2KOS Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-3xl tracking-wide text-slate-900 dark:text-white hidden sm:block">
                KOS<span className="text-primary">2</span>KOS
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("acquisitions")}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                Sell Your Business
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white/10 dark:hover:bg-white/20 hover:bg-slate-800 border border-transparent dark:border-white/10 dark:text-white text-sm font-semibold transition-all"
              >
                Contact Us
              </button>
              <ModeToggle />
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ModeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden glass border-b border-slate-200 dark:border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 rounded-md"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 rounded-md"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("acquisitions")}
                className="block w-full text-left px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 rounded-md"
              >
                Sell Your Business
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="block w-full text-left px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 rounded-md"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-3 text-base font-medium text-primary hover:text-blue-600 dark:hover:text-blue-300"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-200/50 dark:bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-200/50 dark:bg-accent/20 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-primary/10 border border-blue-200 dark:border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                Serving North Carolina and Indiana
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
                Local Businesses. <br />
                <span className="text-gradient-primary">
                  Reliable Service.
                </span>{" "}
                <br />
                Real Value.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                We provide convenient, fully managed self-service solutions for
                businesses and communities. Simple, reliable, and tailored to
                your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full glass-button flex items-center justify-center gap-2 group"
                >
                  Request a Machine
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("acquisitions")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  Sell a Business or Route
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Service 1 */}
            <motion.div
              variants={fadeInUp}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Store size={120} className="text-slate-900 dark:text-white" />
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <Store className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Vending Services
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Full-service vending management. We handle installation,
                stocking, and maintenance at absolutely no cost to your
                business.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Snacks & Drinks",
                  "Healthy Options",
                  "Cashless Payment",
                  "24/7 Support",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              id="acquisitions"
              variants={fadeInUp}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group border-primary/30"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp
                  size={120}
                  className="text-slate-900 dark:text-white"
                />
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <TrendingUp className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Business Acquisitions
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Looking to sell your route or small business? We are actively
                acquiring vending machines and small businesses in the area.
              </p>
              <div className="mt-auto">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium transition-colors"
                >
                  Discuss a Sale
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 dark:via-blue-900/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                KOS2KOS, LLC is a locally owned company focused on acquiring and
                operating small, cash-flowing businesses. We specialize in
                self-service machines with plans to expand into other small
                business opportunities.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Our goal is simple: To provide reliable, convenient services
                while building long-term partnerships with local businesses. We
                treat every location like a partner, not just a stop on a route.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">
                    Local Focus
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Deeply rooted in the Charlotte community.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">
                    Reliable Support
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Quick response times and regular maintenance.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative elements representing the "network" from the logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
              <div className="glass-card rounded-2xl p-8 relative z-10 border-t border-l border-slate-200 dark:border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-lg bg-slate-100/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-3xl font-bold text-primary dark:text-white mb-2">
                      100%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Free Placement
                    </span>
                  </div>
                  <div className="aspect-square rounded-lg bg-slate-100/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-3xl font-bold text-primary dark:text-white mb-2">
                      24/7
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Support
                    </span>
                  </div>
                  <div className="aspect-square rounded-lg bg-slate-100/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-3xl font-bold text-primary dark:text-white mb-2">
                      Local
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Owned
                    </span>
                  </div>
                  <div className="aspect-square rounded-lg bg-slate-100/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-3xl font-bold text-primary dark:text-white mb-2">
                      Modern
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Machines
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ideal Locations Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Ideal Locations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We serve a wide variety of businesses and community centers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Warehouses",
              "Gyms",
              "Barbershops",
              "Offices",
              "Apartments",
              "Hotels",
            ].map((loc, i) => (
              <div
                key={i}
                className="glass p-4 rounded-xl text-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-default"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {loc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Google Reviews</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">5.0</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">7 reviews</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Ibukunoluwa Owolabi",
                badge: "Local Guide",
                details: "23 reviews \u00b7 5 photos",
                time: "1 week ago",
                text: "Always stocked, clean, and working properly. Super convenient and the snack options are great. Definitely one of the best vending machines around!",
              },
              {
                name: "Precious",
                badge: null,
                details: "1 review",
                time: "1 week ago",
                text: "Excellent services that prioritize customer satisfaction!",
              },
              {
                name: "Mofe Fagbemi",
                badge: "Local Guide",
                details: "11 reviews \u00b7 2 photos",
                time: "1 week ago",
                text: "Top tier services, would definitely recommend!",
              },
              {
                name: "Temidayo Fadase",
                badge: null,
                details: "3 reviews",
                time: "4 days ago",
                text: "One of the best business to work with and wonderful customer service.",
              },
              {
                name: "Evi Odioko",
                badge: "Local Guide",
                details: "5 reviews \u00b7 25 photos",
                time: "1 week ago",
                text: "Professional service!",
              },
              {
                name: "Oluwaseun",
                badge: null,
                details: "1 review",
                time: "1 week ago",
                text: "Great options, reliable and convenient services, and super friendly customer service. You won't be disappointed at all!",
              },
              {
                name: "Chinazom C",
                badge: "Local Guide",
                details: "66 reviews \u00b7 34 photos",
                time: "1 week ago",
                text: "",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow"
                data-testid={`card-review-${i}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">{review.name}</span>
                      {review.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {review.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.time}</span>
                </div>
                {review.text && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {review.text}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Let's Work Together
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  If you’re interested in self-service machines, or partnering
                  with KOS2KOS, LLC, we’d love to connect.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-slate-900 dark:text-white font-medium">
                        Call Us
                      </h4>
                      <p className="text-muted-foreground">(763) 516-7767</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-slate-900 dark:text-white font-medium">
                        Email Us
                      </h4>
                      <p className="text-muted-foreground">
                        biz.kos2kos@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-slate-900 dark:text-white font-medium">
                        Service Area
                      </h4>
                      <p className="text-muted-foreground">
                        North Carolina and Indiana
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
                  <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                    "Simple solutions for everyday convenience."
                  </p>
                  <p className="text-slate-900 dark:text-white font-medium mt-2">
                    KOS2KOS
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-white/5">
                {submitStatus && (
                  <div 
                    data-testid={`status-${submitStatus.type}`}
                    className={`mb-4 p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' 
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit} data-testid="form-contact">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      data-testid="input-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      data-testid="input-business-name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Company (Optional)"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      data-testid="input-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      data-testid="input-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="How can we help you?"
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="button-submit"
                    className="w-full py-4 rounded-lg glass-button text-white font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-2 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 h-16">
            <div className="h-full aspect-[2/1] overflow-hidden">
              <img
                src={logoImage}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              KOS2KOS, LLC
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} KOS2KOS, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
