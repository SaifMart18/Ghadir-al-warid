/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  Menu, 
  X, 
  Flower2, 
  Gift, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Clock,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

// --- Constants & Types ---

const COLORS = {
  primary: '#ff4d6d',
  secondary: '#f8f5f2',
  accent: '#ffb3c1',
  dark: '#2d232e',
};

const WHATSAPP_LINK = "https://wa.me/966530030751";
const PHONE_NUMBER = "+966530030751";

type Page = 'home' | 'services' | 'contact';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'الخدمات' },
    { id: 'testimonials', label: 'الآراء' },
    { id: 'contact', label: 'التواصل' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => scrollToSection('home')}
        >
          <Flower2 className="text-primary w-8 h-8" />
          <h1 className="text-2xl font-display font-bold text-dark">غدير الورد</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-lg font-medium transition-colors hover:text-primary text-dark/80"
            >
              {item.label}
            </button>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            اطلب الآن
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-secondary shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-right text-xl font-medium p-2 rounded-lg text-dark/80 hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white p-3 rounded-xl font-bold text-center mt-2"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-black text-dark mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-dark/60 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full opacity-20"></div>
  </div>
);

const MAP_LINK = "https://maps.app.goo.gl/L1j17xoiUSJVqXWj9";

const Footer = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FlowerShop",
    "name": "غدير الورد",
    "description": "أرقى تنسيقات الورود الطبيعية وتغليف الهدايا الفاخر وكوش الأفراح في السعودية.",
    "telephone": PHONE_NUMBER,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA"
    },
    "openingHours": "Mo-Su 15:30-00:30",
    "url": "https://ghadeer-flowers.com"
  };

  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="container mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Flower2 className="text-primary w-10 h-10" />
            <h2 className="text-3xl font-display font-bold">غدير الورد</h2>
          </div>
          <p className="text-white/60 leading-relaxed font-medium">
            نحن نؤمن بأن كل وردة تحكي قصة، وكل تنسيق هو تعبير عن مشاعر صادقة. غدير الورد وجهتك للفخامة والجمال في عالم الزهور.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href={WHATSAPP_LINK} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-r-4 border-primary pr-3">روابط سريعة</h3>
          <ul className="space-y-4">
            {['home', 'about', 'services', 'testimonials', 'contact'].map((id) => (
              <li key={id}>
                <button 
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/60 hover:text-primary transition-colors font-medium flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-[2px] bg-primary transition-all"></span>
                  {id === 'home' && 'الرئيسية'}
                  {id === 'about' && 'من نحن'}
                  {id === 'services' && 'الخدمات'}
                  {id === 'testimonials' && 'آراء العملاء'}
                  {id === 'contact' && 'اتصل بنا'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Working Hours */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-r-4 border-primary pr-3">ساعات العمل</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white/60 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Clock className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-white font-bold">مفتوح يومياً</div>
                <div className="text-sm">من ٣:٣٠ عصراً إلى ١٢:٣٠ صباحاً</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-r-4 border-primary pr-3">معلومات التواصل</h3>
          <div className="space-y-4">
            <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="text-primary" size={20} />
              </div>
              <div dir="ltr">{PHONE_NUMBER}</div>
            </a>
            <a 
              href={MAP_LINK} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-white font-bold">الموقع على الخريطة</div>
                <div className="text-sm underline underline-offset-4">اضغط للذهاب إلى جوجل مابس</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/5 text-center text-white/40 text-sm font-medium">
        جميع الحقوق محفوظة © {new Date().getFullYear()} غدير الورد | تم التصميم بكل حب ❤️
      </div>
    </div>
  </footer>
  );
};

// --- Page Content ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative px-0 md:px-10 md:pt-24 pt-20">
        <div className="relative h-[60vh] md:h-[500px] overflow-hidden rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1920"
              alt="Flower Shop Hero"
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30 bg-gradient-to-l from-dark/40 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-10 relative z-10 text-white h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-right md:mr-auto md:ml-0"
            >
              <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-4">
                غدير الورد
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl font-medium">
                لمسة جمال لكل مناسبة.. تنسيقات ورد وهدايا فاخرة
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary hover:bg-primary/90 text-white text-base font-bold px-8 py-3 rounded-full transition-transform active:scale-95 flex items-center gap-2"
                >
                  اطلب الآن عبر واتساب
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="container mx-auto px-10">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase flex items-center gap-2">
                <span className="w-10 h-[1px] bg-primary"></span>
                حكايتنا مع الجمال
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-dark leading-tight">
                غدير الورد.. حيث تلتقي <br />
                <span className="text-primary">الفخامة بالطبيعة</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-[#555] opacity-90 leading-loose font-medium">
              نحن في <span className="text-primary font-bold">غدير الورد</span> لا نكتفي ببيع الزهور، بل نصمم تجارب عاطفية فريدة تليق بمناسباتكم الغالية. قصتنا بدأت بشغف تحويل اللحظات العادية إلى ذكريات مخلدة.
            </p>

            <div className="space-y-6 pt-4">
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  { title: "تصاميم حصرية مبتكرة", desc: "نبتكر تنسيقات فريدة لا تتكرر، مصممة خصيصاً لتعبر عن شخصيتكم." },
                  { title: "نضارة فائقة ومستدامة", desc: "نستورد أزهارنا من أفضل مزارع العالم لنضمن بقاءها ناضرة لأطول فترة." },
                  { title: "دقة متناهية في المواعيد", desc: "نقدر قيمة وقتكم، ولذلك نلتزم بأعلى معايير السرعة في التوصيل." },
                  { title: "خدمة عملاء ملكية", desc: "فريقنا المتخصص يرافقكم من مرحلة الاختيار حتى اللحظة الأخيرة للإبهار." },
                ].map((point, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <CheckCircle2 size={14} className="text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{point.title}</h4>
                      <p className="text-sm text-[#777] leading-relaxed">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-primary/5">
              <div className="space-y-1">
                <div className="text-4xl font-black text-primary">١٠٠٪</div>
                <div className="text-[10px] font-bold text-dark/40 uppercase tracking-[0.2em]">ضمان الجودة والنضارة</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black text-primary">١٠+</div>
                <div className="text-[10px] font-bold text-dark/40 uppercase tracking-[0.2em]">سنوات من التميز</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://drive.google.com/thumbnail?id=1LS3IstCRT36lo3NLfUS8g_0nry3TedcT&sz=w1000" 
                className="w-full h-[450px] object-cover rounded-[2rem] shadow-2xl translate-y-12" 
                referrerPolicy="no-referrer"
                alt="Rose Arrangement"
              />
              <img 
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-[450px] object-cover rounded-[2rem] shadow-2xl -translate-y-12" 
                referrerPolicy="no-referrer"
                alt="Flower Boutique"
              />
            </div>
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -z-10 scale-110 blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Why Us Sections Removed - Consolidated in About Us like the theme */}

      {/* Consolidating Testimonials into Section elsewhere */}
    </div>
  );
};

const ServicesPage = () => {
  const services = [
    { 
      title: "تنسيق الورد الاحترافي", 
      icon: "💐", 
      image: "https://drive.google.com/thumbnail?id=17oKtVmRDna3NUfB52bUijIoyn-Z6ZaOI&sz=w1000", 
      desc: "نحول الطبيعة إلى سيمفونية بصرية تتراقص فيها الألوان والروائح بانسجام تام. نبتكر تصاميم أزهار فنية تتخطى التوقعات، حيث تحمل كل بتلة لمسة من الفخامة التي تعيد تعريف الجمال في مساحاتكم الخاصة ومناسباتكم الكبرى."
    },
    { 
      title: "تغليف الهدايا الفاخر", 
      icon: "🎁", 
      image: "https://drive.google.com/thumbnail?id=1fHtRSmeXpmuC5S_KtaB3yCGeyfTuSDj3&sz=w1000", 
      desc: "نؤمن بأن الانطباع الأول هو نبض الهدية. ننسج من الأقمشة المخملية والأشرطة الحريرية غلافاً يليق بقيمة هداياكم، مكللاً بلمسات من الورد النادر الذي يحول العطاء إلى تجربة حسية فريدة تجسد أبهى صور الذوق الرفيع."
    },
    { 
      title: "باقات ورد حصرية", 
      icon: "🎀", 
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1200", 
      desc: "مجموعة منتقاة من بساتين العالم الأكثر ندرة، منسقة بأيادي خبراء يعشقون التفاصيل. باقاتنا ليست مجرد ورود، بل هي رسائل فخامة مطرزة بالعبير، صُممت لتكون الرفيق الأنيق في لحظاتكم الأكثر حميمية وأهمية."
    },
    { 
      title: "كوش أفراح ملكية", 
      icon: "💒", 
      image: "https://drive.google.com/thumbnail?id=1VU8ygagkFjLz84D_3CojuHKTAhN4swcI&sz=w1000", 
      desc: "صناعة الأحلام الوردية التي تخلد في الذاكرة. نصمم منصات زفاف مهيبة تتوجها تيجان الزهور الطبيعية الفاخرة، ونمزج بين الإضاءة الدرامية والتناغم العطري لخلق فضاء رومانسي ساحر يليق بليلة العمر."
    },
    { 
      title: "تشريع المداخل والممرات", 
      icon: "🏺", 
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200", 
      desc: "بوابة العبور إلى عالم من الفخامة. ننسق مداخل مناسباتكم بأقواس من الزهور المتدفقة وسجاد من الطبيعة، لنضمن لضيوفكم استقبالاً ملكياً يثير الانبهار من الخطوة الأولى ويضع بصمة من الرقي لا تمحى."
    },
    { 
      title: "تزيين سيارات الزفاف", 
      icon: "🚗", 
      image: "https://drive.google.com/thumbnail?id=1S9_V0ZWRmD7nrLvKmAm5fWez304gXZtY&sz=w1000", 
      desc: "موكب من الجمال يجوب الطرقات. نضفي لمسات دراماتيكية وأنيقة على سيارة الزفاف باستخدام تقنيات تنسيق عالمية، لتكون بداية رحلتكم الجديدة مليئة بالحفاوة والبهاء الذي تستحقه هذه اللحظة التاريخية."
    }
  ];

  return (
    <div className="pt-32 pb-32 container mx-auto px-10">
      <div className="max-w-4xl mb-20 border-r-8 border-primary pr-8">
        <h2 className="text-4xl md:text-5xl font-display font-black text-dark mb-4">خدماتنا المتميزة</h2>
        <p className="text-xl text-dark/60 leading-relaxed font-medium">في غدير الورد، نحول المناسبات العادية إلى ذكريات استثنائية من خلال باقة متكاملة من الخدمات الفنية.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:col-span-2 lg:col-span-3"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}
              className="group"
            >
              <article className="card-minimal overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-primary/10">
                <div className="relative h-72 overflow-hidden bg-secondary/20">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522673607200-164883547998?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white bg-primary px-4 py-1 rounded-full text-sm font-bold">اكتشف المزيد</span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl bg-secondary w-12 h-12 flex items-center justify-center rounded-xl" aria-hidden="true">{service.icon}</span>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-sm md:text-base text-[#555] leading-relaxed mb-8 flex-grow">
                    {service.desc}
                  </p>
                  <div className="pt-6 border-t border-primary/5">
                    <a 
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`طلب خدمة ${service.title} عبر واتساب`}
                      className="flex items-center justify-between group/btn text-primary font-bold hover:text-primary/80 transition-colors"
                    >
                      <span>طلب الخدمة</span>
                      <ArrowLeft size={18} className="translate-x-0 group-hover/btn:-translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-32 pb-32 container mx-auto px-10">
      <div className="max-w-4xl mx-auto">
        <div className="card-minimal overflow-hidden">
           <div className="grid md:grid-cols-12">
              <div className="md:col-span-12 p-10 text-center border-b border-primary/5">
                <h2 className="text-3xl font-display font-black text-primary mb-4">تواصل معنا مباشرة</h2>
                <p className="text-[#555] max-w-xl mx-auto">يسعدنا الرد على استفساراتكم لتنسيق أجمل الهدايا لمناسباتكم</p>
              </div>
              
              <div className="md:col-span-12 bg-primary text-white p-10 text-center">
                 <div className="text-lg font-bold mb-2">+966 53 003 0751</div>
                 <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer" 
                  className="text-xl underline font-black hover:opacity-80 transition-opacity"
                 >
                   راسلنا الآن عبر واتساب
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar currentPage="home" setPage={() => {}} />
      
      <main className="flex-grow">
        <section id="home">
          <HomePage setPage={() => {}} />
        </section>

        <section id="about" className="scroll-mt-20">
          {/* Internal About Content can be here or integrated in HomePage */}
        </section>
        
        <section id="services" className="scroll-mt-20 bg-white">
          <ServicesPage />
        </section>

        <div id="testimonials" className="bg-secondary/30 py-32 scroll-mt-20">
          <div className="container mx-auto px-10">
            <h2 className="text-xl font-bold text-primary mb-8 px-4 border-r-4 border-primary/20 italic">آراء العملاء</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { text: "الخدمة ممتازة والتنسيق أكثر من رائع!", name: "أمل العتيبي" },
                { text: "أفضل محل ورد تعاملت وياه 🌹", name: "محمد الحارثي" },
                { text: "التوصيل سريع والتغليف فخم جداً", name: "سارة خالد" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="testimonial-minimal"
                >
                  <p className="italic mb-3">"{item.text}"</p>
                  <div className="font-bold text-xs opacity-70 mb-1">{item.name}</div>
                  <div className="flex text-primary gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </motion.div>
              ))}
              <div className="md:col-span-3 lg:col-span-1">
                 <div className="bg-primary text-white p-6 rounded-2xl text-center flex flex-col justify-center h-full">
                    <h3 className="text-sm font-bold mb-2">تواصل معنا مباشرة</h3>
                    <p className="text-[11px] opacity-80 mb-3">+966 53 003 0751</p>
                    <a href={WHATSAPP_LINK} className="text-xs underline font-bold">راسلنا الآن عبر واتساب</a>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <section id="contact" className="scroll-mt-20">
          <ContactPage />
        </section>
      </main>
      
      <Footer />

      {/* Floating WhatsApp FAB */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
