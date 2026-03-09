import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.12 },
    );
    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

// ─── Static data ─────────────────────────────────────────────────────────────
const signatureDishes = [
  {
    name: "Buttermilk Fried Chicken",
    desc: "Heritage-breed chicken, buttermilk brine, hot honey glaze",
    img: "/assets/Screenshot_20260310_041031.jpg",
    position: "center 35%",
  },
  {
    name: "Honey Glazed Biscuits",
    desc: "Warm, flaky biscuits with cinnamon butter and pimento cheese",
    img: "/assets/Screenshot_20260310_041026.jpg",
    position: "center 30%",
  },
  {
    name: "New Orleans BBQ Shrimp",
    desc: "Gulf shrimp in rich bourbon butter sauce, crusty bread",
    img: "/assets/Screenshot_20260310_041035.jpg",
    position: "center 35%",
  },
  {
    name: "Fried Chicken Sliders",
    desc: "Crispy fried chicken on brioche buns with house sauce",
    img: "/assets/Screenshot_20260310_041024.jpg",
    position: "center 30%",
  },
  {
    name: "Fresh Beignets",
    desc: "Light-as-air, dusted with powdered sugar, Café Du Monde style",
    img: "/assets/Screenshot_20260310_040957.jpg",
    position: "center 30%",
  },
];

const menuCategories = [
  {
    id: "biscuits",
    label: "Biscuits",
    items: [{ name: "Warm Honey Glazed Biscuits", price: "$16" }],
  },
  {
    id: "tapas",
    label: "Tapas",
    items: [
      { name: "Chili Grilled Broccoli", price: "$12" },
      { name: "Braised Lamb Stuffed Shells", price: "$17" },
      { name: "Marinated Tenderloin Steak Tips", price: "$19" },
      { name: "Charred Octopus", price: "$17" },
      { name: "Louisiana Crawfish Arancini", price: "$13" },
      { name: "Pan Seared Redfish", price: "$16" },
    ],
  },
  {
    id: "chicken",
    label: "Fried Chicken",
    items: [
      { name: "Chicken Wings", price: "$14" },
      { name: "Boneless Fried Chicken Thighs", price: "$16" },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    items: [
      { name: "New Orleans BBQ Shrimp", price: "$15" },
      { name: "Steamed Mussels", price: "$14" },
      { name: "Cajun Grilled Swordfish", price: "$15" },
    ],
  },
  {
    id: "sliders",
    label: "Sliders",
    items: [
      { name: "Wagyu Burger Sliders", price: "$13" },
      { name: "Fried Chicken Sliders", price: "$14" },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    items: [
      { name: "Baby Arugula & Blackberry Salad", price: "$12" },
      { name: "Roasted Carrot Salad", price: "$12" },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    items: [
      { name: "Rosemary French Fries", price: "$7" },
      { name: "Creamy Cheddar Grits", price: "$6" },
      { name: "Wilted Garlic Spinach", price: "$8" },
      { name: "Grilled Focaccia Toast", price: "$4" },
      { name: "Apple Slaw", price: "$6" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Fresh Fried Beignets", price: "$10" },
      { name: "Apple Crumble Bread Pudding", price: "$13" },
      { name: "Blueberry Shortcake", price: "$12" },
      { name: "Soft Serve Ice Cream", price: "$5" },
    ],
  },
];

// Gallery — 10 real photos, some spanning 2 columns for visual rhythm
const galleryImages = [
  {
    src: "/assets/Screenshot_20260310_041003.jpg",
    label: "Commonwealth Ave",
    span: "col-span-2",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041007.jpg",
    label: "Chicken Wings",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041019.jpg",
    label: "Signature Cocktail",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041021.jpg",
    label: "Fresh Beignets",
    span: "",
    position: "center 30%",
  },
  {
    src: "/assets/Screenshot_20260310_041005.jpg",
    label: "Nashville Hot Chicken Sliders",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041015.jpg",
    label: "Chicken & Waffle",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041029.jpg",
    label: "Crispy Alligator Fries",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041009.jpg",
    label: "Grilled Fish with Black Beans",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041013.jpg",
    label: "Chicken over Cheddar Grits",
    span: "",
    position: "center 35%",
  },
  {
    src: "/assets/Screenshot_20260310_041001.jpg",
    label: "Baby Arugula & Blackberry Salad",
    span: "col-span-2",
    position: "center 35%",
  },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", id: "about", ocid: undefined },
    { label: "Menu", id: "menu", ocid: "nav.menu_link" },
    { label: "Gallery", id: "gallery", ocid: undefined },
    {
      label: "Reservations",
      id: "reservations",
      ocid: "nav.reservations_link",
    },
    { label: "Location", id: "location", ocid: undefined },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.10_0.008_45/0.97)] backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full border border-[oklch(0.72_0.14_68)] flex items-center justify-center bg-[oklch(0.16_0.01_45)]">
            <span className="font-display text-sm font-bold text-gold">
              B&amp;B
            </span>
          </div>
          <span className="font-display text-lg tracking-wide text-cream hidden sm:block">
            Buttermilk &amp; Bourbon
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              data-ocid={link.ocid}
              onClick={() => scrollTo(link.id)}
              className="font-body text-sm tracking-widest uppercase text-cream-muted hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-cream p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-cream transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-cream transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.12_0.008_45/0.97)] backdrop-blur-md border-t border-[oklch(0.25_0.015_55)]">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="px-6 py-3 text-left font-body text-sm tracking-widest uppercase text-cream-muted hover:text-gold hover:bg-[oklch(0.18_0.01_45)] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background — generated cinematic hero */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.008_45/0.55)] via-[oklch(0.08_0.008_45/0.72)] to-[oklch(0.08_0.008_45/0.93)]" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-[oklch(0.72_0.14_68/0.5)] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="font-body text-xs tracking-[0.25em] uppercase text-gold">
            160 Commonwealth Ave, Boston
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-none mb-4">
          Buttermilk
          <span className="block italic text-gold">&amp; Bourbon</span>
        </h1>

        <p className="font-body text-base md:text-xl tracking-[0.15em] uppercase text-cream-muted mb-2">
          Southern Comfort Food &amp; Bourbon Bar
        </p>

        <div className="gold-divider mx-auto my-6" />

        <p className="font-body text-cream-muted text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
          A culinary journey through the heart of New Orleans, brought to
          Boston&apos;s Back Bay by celebrity chef Jason Santos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            data-ocid="hero.view_menu_button"
            onClick={() => scrollTo("menu")}
            className="bg-gold text-[oklch(0.12_0.008_45)] hover:bg-[oklch(0.82_0.12_80)] font-body text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto rounded-none font-semibold transition-all duration-300"
          >
            View Menu
          </Button>
          <Button
            data-ocid="hero.reserve_button"
            onClick={() => scrollTo("reservations")}
            variant="outline"
            className="border-cream text-cream hover:bg-cream hover:text-[oklch(0.12_0.008_45)] font-body text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto rounded-none bg-transparent transition-all duration-300"
          >
            Reserve a Table
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-muted hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[oklch(0.14_0.009_45)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — generated interior photo */}
          <div className="reveal relative">
            <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src="/assets/generated/restaurant-interior.dim_1200x800.jpg"
                alt="Buttermilk & Bourbon dining room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: "center center" }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-[oklch(0.72_0.14_68/0.3)] -z-10 hidden lg:block" />
            <div className="absolute -top-4 -left-4 bg-[oklch(0.16_0.01_45)] border border-[oklch(0.72_0.14_68/0.5)] px-4 py-3 shadow-xl">
              <p className="font-display text-gold text-xs italic">Est. 2014</p>
              <p className="font-body text-cream text-xs tracking-widest uppercase mt-0.5">
                Boston, MA
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-6">
              Where Southern Soul
              <span className="block italic text-gold">
                Meets Boston Refinement
              </span>
            </h2>
            <div className="gold-divider mb-8" />
            <p className="font-body text-cream-muted leading-relaxed mb-6">
              Celebrity chef Jason Santos brings New Orleans-inspired southern
              comfort cuisine to Boston&apos;s Back Bay. Drawing from the soul
              of Louisiana cooking, Buttermilk &amp; Bourbon celebrates bold
              flavors, heritage recipes, and the warmth of Southern hospitality.
            </p>
            <p className="font-body text-cream-muted leading-relaxed mb-8">
              From hand-crafted buttermilk fried chicken to decadent beignets,
              every dish tells a story rooted in tradition, elevated with the
              finest New England ingredients.
            </p>
            <div className="border-l-2 border-[oklch(0.72_0.14_68)] pl-6">
              <p className="font-display text-xl italic text-cream mb-2">
                &ldquo;Southern food is love made edible — bold, generous, and
                unforgettable.&rdquo;
              </p>
              <p className="font-body text-sm text-gold tracking-widest uppercase">
                — Chef Jason Santos
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-[oklch(0.25_0.015_55)]">
              {[
                { num: "10+", label: "Years" },
                { num: "4.8★", label: "Rating" },
                { num: "40+", label: "Bourbons" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-gold">
                    {s.num}
                  </p>
                  <p className="font-body text-xs text-cream-muted tracking-widest uppercase mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Signature Dishes ─────────────────────────────────────────────────────────
function SignatureDishes() {
  return (
    <section id="dishes" className="py-24 md:py-32 bg-espresso overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Chef&apos;s Selection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Signature Dishes
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {signatureDishes.map((dish, i) => (
            <div
              key={dish.name}
              className={`reveal reveal-delay-${(i % 4) + 1} group relative overflow-hidden cursor-default`}
            >
              {/* Fixed-height container — crops phone chrome via object-fit */}
              <div className="h-64 overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: dish.position }}
                />
              </div>
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.008_45/0.95)] via-[oklch(0.08_0.008_45/0.25)] to-transparent" />
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-base font-bold text-cream leading-tight mb-1">
                  {dish.name}
                </h3>
                <p className="font-body text-xs text-cream-muted leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dish.desc}
                </p>
              </div>
              {/* Corner accents on hover */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.72_0.14_68)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[oklch(0.72_0.14_68)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
function MenuSection() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-[oklch(0.14_0.009_45)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Our Menu
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="reveal reveal-delay-1">
          <Tabs defaultValue="biscuits">
            <TabsList className="flex flex-wrap gap-1 bg-[oklch(0.12_0.008_45)] border border-[oklch(0.25_0.015_55)] p-2 rounded-none mb-8 h-auto justify-start">
              {menuCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  data-ocid="menu.tab"
                  className="font-body text-xs tracking-widest uppercase px-4 py-2 rounded-none text-cream-muted data-[state=active]:bg-gold data-[state=active]:text-[oklch(0.12_0.008_45)] data-[state=active]:shadow-none hover:text-cream transition-colors"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="bg-[oklch(0.12_0.008_45)] border border-[oklch(0.25_0.015_55)] p-6 md:p-10">
                  <h3 className="font-display text-2xl font-bold text-gold mb-8 pb-4 border-b border-[oklch(0.25_0.015_55)]">
                    {cat.label}
                  </h3>
                  <div className="space-y-5">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-end">
                        <span className="font-body text-cream text-base">
                          {item.name}
                        </span>
                        <span className="menu-dots" />
                        <span className="font-display text-gold font-semibold text-base whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-espresso">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Visual Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Experience Buttermilk &amp; Bourbon
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 reveal reveal-delay-1">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className={`group relative overflow-hidden ${img.span}`}
            >
              {/* Fixed height — crops phone chrome top & bottom */}
              <div className="h-56 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: img.position }}
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[oklch(0.08_0.008_45/0.70)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="font-display text-cream text-sm italic text-center px-4">
                  {img.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reservation ──────────────────────────────────────────────────────────────
function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reservations"
      className="py-24 md:py-32 bg-[oklch(0.14_0.009_45)]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Join Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Reserve Your Table
          </h2>
          <p className="font-body text-cream-muted mt-4 max-w-md mx-auto">
            Join us for an unforgettable Southern dining experience
          </p>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="reveal reveal-delay-1 bg-[oklch(0.12_0.008_45)] border border-[oklch(0.72_0.14_68/0.4)] p-8 md:p-12 relative">
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[oklch(0.72_0.14_68)]" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[oklch(0.72_0.14_68)]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[oklch(0.72_0.14_68)]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[oklch(0.72_0.14_68)]" />

          {submitted ? (
            <div
              data-ocid="reservation.success_state"
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[oklch(0.72_0.14_68)] mx-auto mb-6 flex items-center justify-center">
                <span className="text-gold text-2xl">✓</span>
              </div>
              <h3 className="font-display text-3xl font-bold text-cream mb-3">
                Thank You!
              </h3>
              <p className="font-body text-cream-muted">
                We&apos;ll confirm your reservation shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 font-body text-xs tracking-widest uppercase text-gold hover:text-[oklch(0.82_0.12_80)] transition-colors border-b border-[oklch(0.55_0.10_68)] pb-0.5"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-body text-xs tracking-widest uppercase text-gold mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    data-ocid="reservation.name_input"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] text-cream placeholder:text-[oklch(0.40_0.01_60)] focus:border-[oklch(0.72_0.14_68)] rounded-none h-12 font-body"
                  />
                </div>
                <div>
                  <Label className="font-body text-xs tracking-widest uppercase text-gold mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    data-ocid="reservation.phone_input"
                    type="tel"
                    placeholder="(617) 000-0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                    className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] text-cream placeholder:text-[oklch(0.40_0.01_60)] focus:border-[oklch(0.72_0.14_68)] rounded-none h-12 font-body"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="font-body text-xs tracking-widest uppercase text-gold mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    data-ocid="reservation.email_input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] text-cream placeholder:text-[oklch(0.40_0.01_60)] focus:border-[oklch(0.72_0.14_68)] rounded-none h-12 font-body"
                  />
                </div>
                <div>
                  <Label className="font-body text-xs tracking-widest uppercase text-gold mb-2 block">
                    Date
                  </Label>
                  <Input
                    data-ocid="reservation.date_input"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] text-cream focus:border-[oklch(0.72_0.14_68)] rounded-none h-12 font-body [color-scheme:dark]"
                  />
                </div>
                <div>
                  <Label className="font-body text-xs tracking-widest uppercase text-gold mb-2 block">
                    Time
                  </Label>
                  <Select
                    value={form.time}
                    onValueChange={(v) => setForm({ ...form, time: v })}
                    required
                  >
                    <SelectTrigger
                      data-ocid="reservation.time_select"
                      className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] text-cream rounded-none h-12 font-body"
                    >
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] rounded-none">
                      {[
                        "5:00 PM",
                        "5:30 PM",
                        "6:00 PM",
                        "6:30 PM",
                        "7:00 PM",
                        "7:30 PM",
                        "8:00 PM",
                        "8:30 PM",
                        "9:00 PM",
                      ].map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="text-cream font-body focus:bg-[oklch(0.22_0.012_45)] focus:text-gold"
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="font-body text-xs tracking-widest uppercase text-gold mb-2 block">
                    Number of Guests
                  </Label>
                  <Select
                    value={form.guests}
                    onValueChange={(v) => setForm({ ...form, guests: v })}
                    required
                  >
                    <SelectTrigger
                      data-ocid="reservation.guests_select"
                      className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] text-cream rounded-none h-12 font-body"
                    >
                      <SelectValue placeholder="Select party size" />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.16_0.01_45)] border-[oklch(0.30_0.02_60)] rounded-none">
                      {[
                        "1–2 Guests",
                        "3–4 Guests",
                        "5–6 Guests",
                        "7–8 Guests",
                        "Large Party (9+)",
                      ].map((g) => (
                        <SelectItem
                          key={g}
                          value={g}
                          className="text-cream font-body focus:bg-[oklch(0.22_0.012_45)] focus:text-gold"
                        >
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  data-ocid="reservation.submit_button"
                  type="submit"
                  className="w-full bg-gold text-[oklch(0.12_0.008_45)] hover:bg-[oklch(0.82_0.12_80)] font-body text-sm tracking-[0.2em] uppercase h-14 rounded-none font-semibold transition-all duration-300"
                >
                  Request Reservation
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section id="location" className="py-24 md:py-32 bg-espresso">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Directions
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Find Us
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal reveal-delay-1">
          <div
            className="overflow-hidden border border-[oklch(0.25_0.015_55)]"
            style={{ aspectRatio: "4/3" }}
          >
            <iframe
              data-ocid="location.map_marker"
              src="https://maps.google.com/maps?q=160+Commonwealth+Ave,+Boston,+MA&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Buttermilk & Bourbon location"
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-gold mb-1">
                  Address
                </p>
                <p className="font-body text-cream">160 Commonwealth Ave</p>
                <p className="font-body text-cream">Boston, MA 02116</p>
                <p className="font-body text-cream-muted text-sm mt-1">
                  Back Bay Neighborhood
                </p>
              </div>
            </div>

            <div className="border-t border-[oklch(0.25_0.015_55)] pt-8 flex items-start gap-4">
              <Clock className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-gold mb-3">
                  Hours
                </p>
                <div className="space-y-2">
                  {[
                    { day: "Mon – Thu", hours: "5:00 PM – 10:00 PM" },
                    { day: "Fri – Sat", hours: "5:00 PM – 11:00 PM" },
                    { day: "Sunday", hours: "4:00 PM – 9:00 PM" },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between gap-8">
                      <span className="font-body text-cream-muted text-sm">
                        {h.day}
                      </span>
                      <span className="font-body text-cream text-sm">
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[oklch(0.25_0.015_55)] pt-8 space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="tel:+16172661122"
                  className="font-body text-cream hover:text-gold transition-colors"
                >
                  (617) 266-1122
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@buttermilkandbourbon.com"
                  className="font-body text-cream hover:text-gold transition-colors text-sm"
                >
                  info@buttermilkandbourbon.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-[oklch(0.09_0.007_45)] border-t border-[oklch(0.20_0.012_55)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[oklch(0.72_0.14_68)] flex items-center justify-center">
                <span className="font-display text-sm font-bold text-gold">
                  B&amp;B
                </span>
              </div>
              <span className="font-display text-lg text-cream">
                Buttermilk &amp; Bourbon
              </span>
            </div>
            <p className="font-body text-cream-muted text-sm leading-relaxed">
              Southern Comfort Food &amp; Bourbon Bar
              <br />
              160 Commonwealth Ave, Boston, MA
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 border border-[oklch(0.30_0.02_60)] flex items-center justify-center text-cream-muted hover:text-gold hover:border-[oklch(0.72_0.14_68)] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-gold mb-6">
              Quick Links
            </p>
            <ul className="space-y-3">
              {[
                { label: "About Us", id: "about" },
                { label: "Our Menu", id: "menu" },
                { label: "Gallery", id: "gallery" },
                { label: "Reservations", id: "reservations" },
                { label: "Location", id: "location" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="font-body text-cream-muted hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs tracking-widest uppercase text-gold mb-6">
              Contact
            </p>
            <div className="space-y-3">
              <p className="font-body text-cream-muted text-sm">
                160 Commonwealth Ave
                <br />
                Boston, MA 02116
              </p>
              <a
                href="tel:+16172661122"
                className="block font-body text-cream-muted hover:text-gold transition-colors text-sm"
              >
                (617) 266-1122
              </a>
              <a
                href="mailto:info@buttermilkandbourbon.com"
                className="block font-body text-cream-muted hover:text-gold transition-colors text-sm break-all"
              >
                info@buttermilkandbourbon.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[oklch(0.20_0.012_55)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-cream-muted text-xs">
            © {year} Buttermilk &amp; Bourbon. All Rights Reserved.
          </p>
          <p className="font-body text-cream-muted text-xs">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-[oklch(0.82_0.12_80)] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();
  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SignatureDishes />
        <MenuSection />
        <Gallery />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
