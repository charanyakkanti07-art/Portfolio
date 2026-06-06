import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Mail, MessageCircle, Linkedin, Github, Check, Send } from "lucide-react";
import Magnet from "./Magnet";
import styles from "./ContactSection.module.css";

const CONTACTS = [
  {
    label: "Email",
    value: "yakkanticharanreddy@gmail.com",
    href: "mailto:yakkanticharanreddy@gmail.com",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: "Chat directly",
    href: "https://wa.me/910000000000",
    icon: MessageCircle,
  },
  {
    label: "LinkedIn",
    value: "Charan Reddy Yakkanti",
    href: "https://www.linkedin.com/in/charan-reddy-yakkanti",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "charanyakkanti07-art",
    href: "https://github.com/charanyakkanti07-art",
    icon: Github,
  },
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.section} id="contact">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <span className={styles.eyebrow}>Get In Touch</span>
        <h2 className={styles.heading}>Let's build something</h2>
        <p className={styles.sub}>
          Have a project, role, or idea in mind? Drop a message or reach me on
          any of these channels.
        </p>
      </motion.div>

      <div className={styles.hub}>
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className={styles.input}
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              maxLength={255}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={handleChange}
              maxLength={1000}
            />
            {errors.message && (
              <span className={styles.error}>{errors.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submit}>
            <Send size={16} style={{ marginRight: 8, verticalAlign: "-2px" }} />
            Send Message
          </button>

          {sent && (
            <span className={styles.sent}>
              <Check size={16} /> Thanks! Your message is ready to send.
            </span>
          )}
        </motion.form>

        <div className={styles.links}>
          {CONTACTS.map((c) => {
            const Icon = c.icon;
            return (
              <Magnet key={c.label} strength={14}>
                <a
                  className={styles.link}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.linkIcon}>
                    <Icon size={20} />
                  </span>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>{c.label}</span>
                    <span className={styles.linkValue}>{c.value}</span>
                  </span>
                </a>
              </Magnet>
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerName}>Charan Reddy Yakkanti</p>
        <p className={styles.footerMeta}>
          AI &amp; Data Science · Andhra Pradesh, India
        </p>
      </footer>
    </section>
  );
}
