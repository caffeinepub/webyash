import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Code2,
  DollarSign,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Smartphone,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetAllPackages,
  useGetAllTestimonials,
  useInitialize,
  useSubmitContact,
} from "./hooks/useQueries";

/* ─── Types ────────────────────────────────────────────────── */
interface Package {
  features: string[];
  name: string;
  description: string;
  isPopular: boolean;
  price: bigint;
}

interface Testimonial {
  clientName: string;
  company: string;
  message: string;
  rating: bigint;
}

/* ─── Fallback Data ────────────────────────────────────────── */
const FALLBACK_PACKAGES: Package[] = [
  {
    name: "Basic",
    description:
      "Perfect for small businesses and personal brands just getting started online.",
    price: BigInt(4999),
    isPopular: false,
    features: [
      "5-page responsive website",
      "Mobile-friendly design",
      "Contact form",
      "Basic SEO setup",
      "1-month free support",
    ],
  },
  {
    name: "Business",
    description:
      "Ideal for growing businesses that need a professional online presence with more features.",
    price: BigInt(9999),
    isPopular: true,
    features: [
      "10-page responsive website",
      "Custom UI/UX design",
      "CMS integration",
      "Advanced SEO",
      "Google Analytics setup",
      "3-month free support",
    ],
  },
  {
    name: "Premium",
    description:
      "Full-featured solution for established businesses with complex requirements.",
    price: BigInt(19999),
    isPopular: false,
    features: [
      "Unlimited pages",
      "E-commerce integration",
      "Custom animations",
      "Performance optimization",
      "Priority support (6 months)",
      "Social media integration",
    ],
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    clientName: "Priya Sharma",
    company: "Bloom Florists",
    message:
      "WebYash delivered a stunning website for our florist shop in just 5 days. Sales increased by 40% in the first month alone. Highly recommended!",
    rating: BigInt(5),
  },
  {
    clientName: "Rahul Mehta",
    company: "TechFlow Solutions",
    message:
      "Professional, fast, and affordable. Yash understood our vision perfectly and the end result exceeded our expectations. Our clients love the new site.",
    rating: BigInt(5),
  },
  {
    clientName: "Anita Desai",
    company: "Spice Garden Restaurant",
    message:
      "Our restaurant needed an online booking system and WebYash built it beautifully. The design is elegant and our online orders have tripled!",
    rating: BigInt(5),
  },
];

/* ─── Animation Variants ───────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Animated Section Wrapper ─────────────────────────────── */
function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Portfolio Data ────────────────────────────────────────── */
const PORTFOLIO_ITEMS = [
  {
    title: "FashionNova Store",
    type: "E-commerce",
    image: "/assets/generated/portfolio-ecommerce.dim_600x400.jpg",
    tag: "E-Commerce",
  },
  {
    title: "Nexus Corp",
    type: "Corporate Website",
    image: "/assets/generated/portfolio-corporate.dim_600x400.jpg",
    tag: "Corporate",
  },
  {
    title: "Spice Garden",
    type: "Restaurant",
    image: "/assets/generated/portfolio-restaurant.dim_600x400.jpg",
    tag: "Restaurant",
  },
  {
    title: "CloudBase SaaS",
    type: "SaaS Platform",
    image: "/assets/generated/portfolio-saas.dim_600x400.jpg",
    tag: "SaaS",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Launch-ready websites delivered in 5–7 business days.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    desc: "Pixel-perfect across all devices and screen sizes.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    desc: "Built with search engine best practices from day one.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock assistance whenever you need us.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Premium quality at prices that make sense for your budget.",
  },
  {
    icon: Code2,
    title: "Modern Tech",
    desc: "Built with the latest frameworks for speed and reliability.",
  },
];

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Services", "Portfolio", "Testimonials", "Contact"];

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex items-center"
        >
          <img
            src="/assets/generated/webyash-logo-transparent.dim_400x120.png"
            alt="WebYash"
            className="h-9 w-auto"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("contact")}
            className="gradient-btn text-white font-semibold px-5 py-2 rounded-lg"
          >
            Get a Quote
          </Button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-card border-t border-border"
          >
            <div className="container px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-left text-base font-medium text-foreground py-1"
                >
                  {link}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="gradient-btn text-white font-semibold mt-2"
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero Section ───────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1400x700.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/75" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 bg-primary pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 bg-accent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-body text-xs px-4 py-1.5 tracking-wide uppercase">
              🚀 Professional Web Design Agency
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="display-heading text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
          >
            We Build Websites
            <br />
            <span className="gradient-text">That Grow</span>
            <br />
            Your Business
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-10 leading-relaxed font-body"
          >
            Professional, fast, and affordable websites tailored for your brand.
            From idea to launch — we handle everything.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="gradient-btn text-white font-semibold text-base px-8 py-6 rounded-xl gap-2"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Packages <ChevronRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground bg-transparent hover:bg-secondary font-semibold text-base px-8 py-6 rounded-xl gap-2"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get a Free Quote <ArrowRight size={18} />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto"
          >
            {[
              { num: "50+", label: "Projects Done" },
              { num: "100%", label: "Client Satisfaction" },
              { num: "5★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="display-heading text-2xl md:text-3xl gradient-text">
                  {stat.num}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-muted-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Services / Packages Section ──────────────────────────── */
function PackageCard({
  pkg,
  index,
}: {
  pkg: Package;
  index: number;
}) {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
        pkg.isPopular
          ? "glow-border bg-gradient-to-b from-primary/10 to-accent/5"
          : "glass-card"
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="gradient-btn text-white border-0 font-semibold px-4 py-1 shadow-glow text-xs">
            ⭐ Most Popular
          </Badge>
        </div>
      )}

      <div className="mb-6">
        <h3 className="section-heading text-2xl mb-2 text-foreground">
          {pkg.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {pkg.description}
        </p>
      </div>

      <div className="mb-8">
        <span className="display-heading text-4xl text-foreground">
          ₹{Number(pkg.price).toLocaleString("en-IN")}
        </span>
        <span className="text-muted-foreground text-sm ml-2">/ project</span>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check size={16} className="text-primary mt-0.5 shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full font-semibold py-5 rounded-xl text-sm ${
          pkg.isPopular
            ? "gradient-btn text-white"
            : "border border-border bg-transparent hover:bg-secondary text-foreground"
        }`}
        onClick={scrollToContact}
      >
        Get Started <ArrowRight size={16} className="ml-2" />
      </Button>
    </motion.div>
  );
}

function ServicesSection() {
  const { data: packages, isLoading, isError } = useGetAllPackages();

  const displayPackages =
    !isLoading && (isError || !packages || packages.length === 0)
      ? FALLBACK_PACKAGES
      : (packages ?? []);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 uppercase tracking-wide">
              Pricing
            </Badge>
            <h2 className="section-heading text-4xl md:text-5xl mb-4">
              Our Packages
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base">
              Transparent pricing with no hidden fees. Choose the plan that fits
              your needs perfectly.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-8 h-96 animate-pulse"
                >
                  <div className="h-6 bg-muted rounded mb-4 w-1/3" />
                  <div className="h-4 bg-muted rounded mb-2 w-full" />
                  <div className="h-4 bg-muted rounded mb-8 w-2/3" />
                  <div className="h-10 bg-muted rounded mb-6 w-1/2" />
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-3 bg-muted rounded mb-2" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {displayPackages.map((pkg, i) => (
                <PackageCard key={pkg.name} pkg={pkg} index={i} />
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Why Choose Us Section ─────────────────────────────────── */
function BenefitsSection() {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-xs px-3 py-1 uppercase tracking-wide">
              Why Us
            </Badge>
            <h2 className="section-heading text-4xl md:text-5xl mb-4">
              Why Choose WebYash?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We combine technical expertise with stunning design to build
              websites that actually convert visitors into customers.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card rounded-2xl p-7 flex gap-5 items-start group"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <benefit.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base mb-1 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Portfolio Section ──────────────────────────────────────── */
function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 uppercase tracking-wide">
              Portfolio
            </Badge>
            <h2 className="section-heading text-4xl md:text-5xl mb-4">
              Our Work
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A selection of projects we've built for clients across industries.
              Each one crafted with care and precision.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {PORTFOLIO_ITEMS.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl overflow-hidden glass-card"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-xs">
                      {item.tag}
                    </Badge>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ExternalLink size={16} className="text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ───────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= rating ? "text-amber-400 fill-amber-400" : "text-muted"
          }
        />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  const { data: testimonials, isLoading, isError } = useGetAllTestimonials();

  const displayTestimonials =
    !isLoading && (isError || !testimonials || testimonials.length === 0)
      ? FALLBACK_TESTIMONIALS
      : (testimonials ?? []);

  return (
    <section id="testimonials" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-xs px-3 py-1 uppercase tracking-wide">
              Reviews
            </Badge>
            <h2 className="section-heading text-4xl md:text-5xl mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Don't just take our word for it — hear from the businesses we've
              helped grow online.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-7 h-52 animate-pulse"
                >
                  <div className="h-3 bg-muted rounded mb-3 w-1/4" />
                  <div className="h-4 bg-muted rounded mb-2 w-full" />
                  <div className="h-4 bg-muted rounded mb-2 w-5/6" />
                  <div className="h-4 bg-muted rounded w-4/6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayTestimonials.map((t, i) => (
                <motion.div
                  key={`${t.clientName}-${i}`}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="glass-card rounded-2xl p-7 flex flex-col gap-4"
                >
                  <StarRating rating={Number(t.rating)} />
                  <p className="text-sm text-muted-foreground leading-relaxed italic flex-1">
                    "{t.message}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold font-heading">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground font-heading">
                        {t.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Contact Section ─────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { mutateAsync, isPending } = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error(
        "Something went wrong. Please try again or call us directly.",
      );
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/15 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1 uppercase tracking-wide">
              Contact
            </Badge>
            <h2 className="section-heading text-4xl md:text-5xl mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Ready to build your dream website? Reach out and we'll get back to
              you within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-2 glass-card glow-border rounded-2xl p-8 flex flex-col gap-6"
            >
              <div>
                <h3 className="section-heading text-2xl mb-1 text-foreground">
                  Yash
                </h3>
                <p className="text-primary text-sm font-semibold font-body">
                  WebYash Agency
                </p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                We respond quickly and deliver fast. No lengthy processes — just
                great websites built for your success.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="tel:9371078102"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-semibold text-foreground font-body">
                      +91 93710 78102
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:yashsangani1101@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-foreground font-body break-all">
                      yashsangani1101@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold text-foreground font-body">
                      India · Remote Worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  ⚡ Average response time:{" "}
                  <strong className="text-foreground">2 hours</strong>
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="lg:col-span-3 glass-card rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="bg-background/50 border-border focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Email <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="bg-background/50 border-border focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-phone"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Phone{" "}
                  <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your project — what do you need built?"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="bg-background/50 border-border focus:border-primary transition-colors min-h-[140px] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="gradient-btn text-white font-semibold py-5 rounded-xl text-sm gap-2 w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight size={16} />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We'll reply within 24 hours. No spam, ever.
              </p>
            </motion.form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/webyash-logo-transparent.dim_400x120.png"
              alt="WebYash"
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building powerful web experiences that help Indian businesses
              thrive online.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Phone size={14} className="text-primary" />
              <a
                href="tel:9371078102"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +91 93710 78102
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {["home", "services", "portfolio", "testimonials", "contact"].map(
                (link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
                    >
                      {link}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Services
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Landing Pages",
                "Business Websites",
                "E-commerce Stores",
                "SEO Optimization",
                "Website Redesign",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} WebYash. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Floating Button ───────────────────────────────── */
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://wa.me/919371078102"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 overflow-hidden"
      animate={{ scale: hovered ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="bg-[#075E54] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap font-body"
          >
            Chat on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button circle */}
      <motion.div
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe57] flex items-center justify-center shadow-xl cursor-pointer transition-colors duration-200"
        animate={{
          boxShadow: hovered
            ? "0 8px 32px rgba(37,211,102,0.5)"
            : "0 4px 20px rgba(37,211,102,0.35)",
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          fill="white"
          width="26"
          height="26"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  // Initialize backend data on load
  useInitialize();

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <BenefitsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
