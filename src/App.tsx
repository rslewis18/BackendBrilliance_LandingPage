import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  CircleDollarSign,
  Clock3,
  FileText,
  Globe2,
  Mail,
  MessageSquareText,
  MousePointerClick,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const bookingLink = import.meta.env.VITE_BOOKING_LINK || "#booking";
const auditLink = import.meta.env.VITE_REVENUE_AUDIT_LINK || "#revenue-audit";
const siteUrl = import.meta.env.VITE_SITE_URL || "https://backendbrilliance.com";

const navItems = [
  ["About", "#about"],
  ["What's Included", "#included"],
  ["How It Works", "#how-it-works"],
  ["Services", "#pricing"],
  ["FAQ", "#faq"],
] as const;

const includedItems = [
  {
    icon: Globe2,
    title: "AI-Optimized Website",
    copy: "A modern, mobile-friendly website built to explain your services and turn visitors into leads.",
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    copy: "Capture calls, answer questions, and qualify leads 24/7.",
  },
  {
    icon: Search,
    title: "Local SEO Foundation",
    copy: "A stronger local foundation that helps nearby customers find you when they search.",
  },
  {
    icon: FileText,
    title: "Website Copy That Builds Trust",
    copy: "Clear messaging that shows who you help and why customers should choose you.",
  },
  {
    icon: CalendarCheck,
    title: "Online Booking",
    copy: "Let customers request appointments or book service without unnecessary back-and-forth.",
  },
  {
    icon: Star,
    title: "Google Review Requests",
    copy: "Automated review prompts that help satisfied customers leave visible proof.",
  },
  {
    icon: MessageSquareText,
    title: "Follow-Up Automations",
    copy: "Automated follow-up via text and email so fewer leads slip through the cracks.",
  },
  {
    icon: PhoneCall,
    title: "Customer Reminders",
    copy: "Send appointment reminders, review requests, and re-engagement messages.",
  },
  {
    icon: BarChart3,
    title: "Lead Dashboard",
    copy: "Track leads, appointments, reviews, and performance in one simple dashboard.",
  },
] as const;

const processSteps = [
  {
    icon: Search,
    label: "01",
    title: "Attract",
    copy: "We help make ideal customers find you through your website, local SEO foundation, and community visibility.",
  },
  {
    icon: MousePointerClick,
    label: "02",
    title: "Capture",
    copy: "We capture inquiries from your website, forms, calls, chat, and booking so every lead goes into your system.",
  },
  {
    icon: Bot,
    label: "03",
    title: "Respond",
    copy: "AI reception and automations respond quickly and qualify leads — even after hours.",
  },
  {
    icon: MessageSquareText,
    label: "04",
    title: "Follow Up",
    copy: "We follow up with leads automatically by text and email so more inquiries turn into conversations.",
  },
  {
    icon: CalendarCheck,
    label: "05",
    title: "Book",
    copy: "We make it easy for customers to book appointments or request service at the right time.",
  },
  {
    icon: BarChart3,
    label: "06",
    title: "Review & Grow",
    copy: "We request reviews, track performance, and optimize every month to help you keep growing.",
  },
] as const;

const benefitCards = [
  {
    icon: PhoneCall,
    title: "More Leads",
    copy: "Capture more high-quality inquiries from the right customers.",
  },
  {
    icon: Zap,
    title: "Faster Response",
    copy: "Respond instantly and follow up while the lead is still interested.",
  },
  {
    icon: CalendarCheck,
    title: "More Bookings",
    copy: "Turn more conversations into booked jobs and scheduled work.",
  },
  {
    icon: Star,
    title: "Stronger Reputation",
    copy: "Collect more 5-star reviews and build trust in your community.",
  },
  {
    icon: Clock3,
    title: "More Time",
    copy: "Automations and AI take work off your plate.",
  },
  {
    icon: CircleDollarSign,
    title: "More Revenue",
    copy: "A better system leads to more customers, repeat jobs, and profit.",
  },
] as const;

const testimonials = [
  {
    quote:
      "The AI receptionist alone has helped us capture leads we used to miss every week.",
    name: "Mike R.",
    role: "HVAC Business Owner",
  },
  {
    quote:
      "Our new website and follow-up system made a huge difference. We get more booked jobs without chasing every lead.",
    name: "Sarah T.",
    role: "Cleaning Business Owner",
  },
  {
    quote:
      "Everything is in one place now. I know who called, who booked, and who needs follow-up.",
    name: "James L.",
    role: "Roofing Business Owner",
  },
] as const;

const pricingPlans = [
  {
    title: "Client Capture System",
    price: "$499",
    note: "Turn inquiries into booked jobs.",
    setup: "One-time setup from $750",
    popular: false,
    features: [
      "AI-optimized website",
      "AI receptionist",
      "Lead dashboard",
      "Follow-up automations",
      "Customer reminders",
      "Google review requests",
      "Online booking",
    ],
  },
  {
    title: "Complete Local Growth System",
    price: "$699",
    note: "Capture more leads and stay visible in your area.",
    setup: "One-time setup from $750",
    popular: true,
    features: [
      "Everything in Client Capture",
      "Local visibility foundation",
      "Neighborhood content",
      "Google Business posts",
      "Monthly optimization",
      "Priority support",
      "Growth recommendations",
    ],
  },
  {
    title: "Local Visibility & Outreach",
    price: "$299",
    note: "Stay visible in the communities you serve.",
    setup: "One-time setup from $500",
    popular: false,
    features: [
      "Google Business posts",
      "Local service-area content",
      "Seasonal campaigns",
      "Local offers & announcements",
      "Monthly visibility planning",
      "Reporting",
    ],
  },
] as const;

const faqs = [
  {
    question: "What is the one-time setup fee for?",
    answer:
      "The setup covers building or optimizing your website, connecting your systems, setting up automations, and configuring your dashboard.",
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer:
      "No. Our plans are month-to-month. You can cancel anytime.",
  },
  {
    question: "What businesses do you work with?",
    answer:
      "We work with local service businesses across home services, trades, cleaning, remodeling, landscaping, and more.",
  },
  {
    question: "How quickly can you get everything set up?",
    answer:
      "Most systems are completed within 7–14 business days, depending on scope and how quickly we receive content and approvals.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "We'll schedule your onboarding call, gather information about your business, and build your system. You'll have a dedicated team helping you every step.",
  },
] as const;

const footerServices = [
  "Client Capture System",
  "Local Visibility",
  "Complete Growth System",
  "Revenue Leak Audit",
  "Strategy Call",
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Backend Brilliance",
      url: siteUrl,
      logo: `${siteUrl}/backend-brilliance-logo.png`,
      description:
        "Backend Brilliance builds AI-powered business systems for lead capture, customer communication, follow-up, and growth.",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Backend Brilliance",
      url: siteUrl,
      image: `${siteUrl}/backend-brilliance-logo.png`,
      description:
        "AI-powered business systems for local service businesses and growth-focused companies.",
      areaServed: "United States",
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

function App() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Backend Brilliance home">
          <img src="/backend-brilliance-logo.png" alt="" />
          <span>
            <strong>Backend Brilliance</strong>
            <small>Client Acquisition Systems</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="button button-primary header-button" href={auditLink}>
          Take Your Audit
        </a>
      </header>

      <main>
        <section className="hero page-section section-shell" id="home">
          <motion.div className="hero-copy" {...reveal}>
            <p className="eyebrow">Smarter systems for local service businesses</p>
            <h1>
              Capture More Leads.
              <span>Book More Jobs.</span>
              Follow Up Faster.
            </h1>
            <p className="hero-lead">
              Every missed call, delayed response, outdated website, or forgotten
              follow-up gives a potential customer another reason to choose
              someone else.
            </p>
            <p className="hero-text">
              Backend Brilliance provides modern, connected systems that help
              customers find you, trust you, contact you, and receive a fast
              response before the opportunity goes cold.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={auditLink}>
                Take Your Revenue Leak Audit
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href={bookingLink}>
                Book a Free Strategy Call
              </a>
            </div>
            <p className="helper-text">
              Discover where leads may be slipping through your website,
              response process, reviews, booking, and follow-up.
            </p>
          </motion.div>

          <HeroVisual />
        </section>

        <motion.div className="alert-strip section-shell" {...reveal}>
          <Zap size={20} />
          <p>
            If people are finding you but not booking, your system may be{" "}
            <strong>leaking leads.</strong>
          </p>
        </motion.div>

        <Section
          eyebrow="What's included in your client acquisition system"
          id="included"
          title="Everything Your Business Needs To Capture And Convert Leads."
          centered
        >
          <div className="feature-grid">
            {includedItems.map(({ icon: Icon, title, copy }) => (
              <motion.article className="feature-card" key={title} {...reveal}>
                <Icon size={26} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <section className="difference-section section-shell" id="about">
          <motion.div className="difference-copy" {...reveal}>
            <p className="eyebrow">The Backend Brilliance Difference</p>
            <h2>We Fix What’s Broken In Your Lead Flow.</h2>
            <p>
              Getting attention is only the beginning. Many businesses lose
              leads due to slow responses, missed calls, weak follow-up, and
              scattered systems.
            </p>
            <p>
              We connect the pieces of your customer journey into one smarter
              system that helps you respond faster, stay organized, build trust,
              and convert more inquiries into booked jobs.
            </p>
          </motion.div>

          <div className="outcome-grid three">
            {[
              { title: "One Connected System", icon: ShieldCheck },
              { title: "Faster Response", icon: Clock3 },
              { title: "More Booked Jobs", icon: CalendarCheck },
            ].map(({ title, icon: Icon }) => (
              <motion.article className="outcome-card stat-card" key={title} {...reveal}>
                <Icon size={24} />
                <h3>{title}</h3>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="audit-cta-card section-shell" id="revenue-audit">
          <motion.div className="icon-badge" {...reveal}>
            <FileText size={30} />
          </motion.div>
          <motion.div {...reveal}>
            <h2>Stop Losing Customers In The Gaps.</h2>
            <p>
              Take the Revenue Leak Audit to see what’s working, what’s leaking,
              and what needs to be fixed next.
            </p>
          </motion.div>
          <motion.a className="button button-primary" href={auditLink} {...reveal}>
            Take Your Audit Now
            <ArrowRight size={18} />
          </motion.a>
        </section>

        <section className="process-section page-section" id="how-it-works">
          <div className="section-shell process-layout">
            <motion.div className="process-copy" {...reveal}>
              <p className="eyebrow">A simple process that gets results</p>
              <h2>How Our System Works For You.</h2>
              <p>
                We build, connect, and optimize every part of your client
                acquisition system — so you can focus on serving customers and
                growing your business.
              </p>
            </motion.div>

            <WorkflowIllustration />
          </div>

          <div className="section-shell process-timeline">
            {processSteps.map(({ icon: Icon, label, title, copy }) => (
              <motion.article className="process-step" key={title} {...reveal}>
                <div className="process-icon">
                  <Icon size={24} />
                </div>
                <div>
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <Section
          eyebrow="The results you can expect"
          id="benefits"
          title="A Smarter System. Better Results."
          centered
        >
          <div className="benefit-grid">
            {benefitCards.map(({ icon: Icon, title, copy }) => (
              <motion.article className="benefit-card" key={title} {...reveal}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="What our clients say"
          id="testimonials"
          title="Real Results. Real Businesses."
          centered
        >
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <motion.article className="testimonial-card" key={testimonial.name} {...reveal}>
                <p>“{testimonial.quote}”</p>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.role}</span>
                <div aria-label="Five star rating">★★★★★</div>
              </motion.article>
            ))}
          </div>
        </Section>

        <section className="ready-card section-shell">
          <motion.div className="icon-badge" {...reveal}>
            <FileText size={30} />
          </motion.div>
          <motion.div {...reveal}>
            <h2>Ready to See What You’re Missing?</h2>
            <p>
              Take the Revenue Leak Audit and see exactly where opportunities
              may be slipping through your system.
            </p>
          </motion.div>
          <motion.a className="button button-primary" href={auditLink} {...reveal}>
            Take Your Audit Now
            <ArrowRight size={18} />
          </motion.a>
        </section>

        <section className="pricing-section page-section" id="pricing">
          <div className="section-shell">
            <motion.div className="section-heading centered" {...reveal}>
              <p className="eyebrow">Choose the system that fits your goals</p>
              <h2>Simple Pricing. Powerful Results.</h2>
              <p>
                Transparent plans designed to help you capture more leads,
                respond faster, and grow your business.
              </p>
            </motion.div>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <motion.article
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                  key={plan.title}
                  {...reveal}
                >
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  <h3>{plan.title}</h3>
                  <p>{plan.note}</p>
                  <div className="price">
                    <span>From</span>
                    <strong>{plan.price}</strong>
                    <small>/month</small>
                  </div>
                  <p className="setup-note">{plan.setup}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a className="button button-primary" href={bookingLink}>
                    Get Started
                    <ArrowRight size={18} />
                  </a>
                </motion.article>
              ))}
            </div>

            <p className="pricing-note">
              Plans include setup, system access, support, and ongoing
              optimization. AI voice and messaging usage may have additional
              costs based on volume.
            </p>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <motion.div className="section-heading centered" {...reveal}>
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2>Questions Before You Start?</h2>
          </motion.div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <motion.details key={faq.question} {...reveal}>
                <summary>
                  {faq.question}
                  <span>+</span>
                </summary>
                <p>{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </section>

        <section className="final-cta section-shell" id="booking">
          <motion.div {...reveal}>
            <h2>Let’s Build Your Client Acquisition System.</h2>
            <p>
              Take the Revenue Leak Audit to get a custom report on what’s
              working, what’s leaking, and what to fix next.
            </p>
            <a className="button button-primary" href={auditLink}>
              Take Your Audit Now
              <ArrowRight size={18} />
            </a>
          </motion.div>
          <motion.div className="clipboard-visual" {...reveal}>
            <FileText size={96} />
          </motion.div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div>
          <a className="brand" href="#home" aria-label="Backend Brilliance home">
            <img src="/backend-brilliance-logo.png" alt="" />
            <span>
              <strong>Backend Brilliance</strong>
              <small>Client Acquisition Systems</small>
            </span>
          </a>
          <p>Smarter systems. Better results. More booked jobs.</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          {footerServices.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </footer>
    </>
  );
}

function Section({
  children,
  centered = false,
  eyebrow,
  id,
  title,
}: {
  children: ReactNode;
  centered?: boolean;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <section className="content-section section-shell" id={id}>
      <div className={`section-heading ${centered ? "centered" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const animation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 28 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.div className="hero-visual" {...animation}>
      <div className="mockup-glow" />
      <div className="dashboard-laptop">
        <div className="dashboard-screen">
          <div className="screen-header">
            <span />
            <span />
            <span />
            <strong>Lead Dashboard</strong>
          </div>
          <div className="dashboard-title-row">
            <div>
              <small>Pipeline overview</small>
              <strong>Customer Capture</strong>
            </div>
            <div className="live-pill">Live</div>
          </div>
          <div className="metric-grid">
            {[
              ["New Leads", "48", "+36%"],
              ["Booked Jobs", "21", "+20%"],
              ["Revenue", "$18,450", "+31%"],
            ].map(([label, value, lift]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{lift}</small>
              </div>
            ))}
          </div>
          <div className="dashboard-lower">
            <div className="pipeline">
              {[
                ["New Inquiry", 82],
                ["Contacted", 68],
                ["Qualified", 52],
                ["Proposal Sent", 41],
                ["Booked", 74],
              ].map(([label, width]) => (
                <div className="pipeline-row" key={label as string}>
                  <span>{label as string}</span>
                  <i style={{ width: `${width}%` }} />
                </div>
              ))}
            </div>
            <div className="dashboard-side-card">
              <Star size={20} />
              <strong>4.9</strong>
              <span>Review momentum</span>
            </div>
          </div>
        </div>
        <div className="laptop-base" />
      </div>

      <div className="phone-mockup">
        <div className="phone-notch" />
        <div className="phone-status">
          <span />
          <small>Now</small>
        </div>
        <p className="assistant-name">AI Receptionist</p>
        <div className="chat incoming">Hi! How can I help you today?</div>
        <div className="chat outgoing">I need a quote for service.</div>
        <div className="chat incoming">
          No problem. I can help with that. When is the best time?
        </div>
        <div className="phone-action">(123) 123-4567</div>
      </div>
    </motion.div>
  );
}

function WorkflowIllustration() {
  return (
    <motion.div
      className="workflow-visual"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65 }}
      aria-hidden="true"
    >
      <div className="platform">
        <div className="main-tile">
          <BarChart3 size={56} />
        </div>
        {[Globe2, Bot, Mail, Star, CalendarCheck].map((Icon, index) => (
          <div className={`orbit-tile orbit-${index + 1}`} key={index}>
            <Icon size={24} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default App;
