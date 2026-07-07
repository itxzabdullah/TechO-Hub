"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">
            Karachi<span className="logo-accent">Tech</span>
          </span>
        </Link>

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          <li>
            <a href="#events" onClick={() => setMenuOpen(false)}>
              Events
            </a>
          </li>
          <li>
            <a href="#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
          </li>
          <li>
            <a href="#submit" onClick={() => setMenuOpen(false)}>
              Submit
            </a>
          </li>
        </ul>

        <button className="btn btn-primary btn-sm nav-cta" type="button">
          Get Updates
        </button>

        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
