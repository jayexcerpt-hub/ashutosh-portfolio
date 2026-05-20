"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useAdmin } from "./AdminContext";
import LoginModal from "./LoginModal";
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const { isAdmin, logout } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    gsap.to(window, {
      scrollTo: { y: el, offsetY: 80 },
      duration: 1.2,
      ease: "power3.inOut",
    });
    setMenuOpen(false);
  };

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Research" },
    { href: "#publications", label: "Publications" },
    { href: "#conferences", label: "Events" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4 },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  } as const;

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.3 },
    }),
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#081c15]/95 backdrop-blur-xl border-b border-[#52b788]/20 shadow-2xl"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          className="font-black tracking-[0.15em] text-lg no-underline text-[#d4ff7d] font-['Syne'] cursor-pointer"
        >
          A·DEY
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 list-none m-0 p-0">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                onClick={() => scrollTo(l.href)}
                className="text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-300 text-[#b7e4c7]/70 hover:text-[#d4ff7d] hover:opacity-100 font-['DM_Mono'] cursor-pointer bg-transparent border-none"
              >
                {l.label}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-4 py-2 rounded-lg text-[0.65rem] font-mono tracking-widest uppercase flex items-center gap-2 bg-[#52b788]/20 border border-[#52b788]/50 text-[#52b788] transition-all duration-300 cursor-pointer"
            >
              <FiLogOut size={12} /> Logout
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 rounded-lg text-[0.65rem] font-mono tracking-widest uppercase flex items-center gap-2 bg-[#d4ff7d]/10 border border-[#d4ff7d]/30 text-[#d4ff7d] transition-all duration-300 cursor-pointer"
            >
              <FiLogIn size={12} /> Login
            </motion.button>
          )}

          {/* Mobile Menu Button - Fixed icon visibility */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex lg:hidden items-center justify-center w-8 h-8 relative cursor-pointer bg-transparent border-none rounded-lg hover:bg-white/10 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FiX className="text-[#d4ff7d] w-5 h-5" />
            ) : (
              <FiMenu className="text-[#d4ff7d] w-5 h-5" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center gap-8 bg-[#081c15]/98 backdrop-blur-2xl"
          >
            {/* Close button inside menu for better UX */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#d4ff7d]/10 border border-[#d4ff7d]/30 hover:bg-[#d4ff7d]/20 transition-all duration-200 cursor-pointer"
              aria-label="Close menu"
            >
              <FiX className="text-[#d4ff7d] w-5 h-5" />
            </motion.button>

            {/* Decorative Firefly */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-6 left-6 text-3xl text-[#d4ff7d]/30"
            >
              🪲
            </motion.div>

            {/* Mobile Links */}
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                custom={i}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.1, color: "#d4ff7d" }}
                onClick={() => scrollTo(l.href)}
                className="text-base tracking-[0.2em] uppercase transition-all duration-300 text-[#b7e4c7] hover:text-[#d4ff7d] font-['DM_Mono'] cursor-pointer bg-transparent border-none py-2 px-4"
              >
                {l.label}
              </motion.button>
            ))}

            {/* Mobile Auth Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              {isAdmin ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="px-6 py-2 rounded-lg text-xs font-mono tracking-widest uppercase flex items-center gap-2 bg-[#52b788]/20 border border-[#52b788]/50 text-[#52b788]"
                >
                  <FiLogOut size={12} /> Logout
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                  className="px-6 py-2 rounded-lg text-xs font-mono tracking-widest uppercase flex items-center gap-2 bg-[#d4ff7d]/10 border border-[#d4ff7d]/30 text-[#d4ff7d]"
                >
                  <FiLogIn size={12} /> Login
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && !isAdmin && (
          <LoginModal onClose={() => setShowLogin(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
