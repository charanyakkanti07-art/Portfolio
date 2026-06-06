import { useState, useEffect } from "react";
import { Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Projects", id: "project" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${!visible ? styles.hidden : ""}`}>
        <div className={styles.container}>
          {/* Left Navigation Links */}
          <nav className={styles.navLeft}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={styles.navLink}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Right Navigation Mail Option */}
          <div className={styles.navRight}>
            <a
              href="mailto:charanyakkanti.07@gmail.com"
              className={styles.mailBtn}
              aria-label="Email Charan"
            >
              <Mail size={16} />
              <span className={styles.mailText}>Mail</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileContainer}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={styles.mobileNavLink}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:charanyakkanti.07@gmail.com"
                className={styles.mobileMailBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={16} />
                <span>charanyakkanti.07@gmail.com</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
