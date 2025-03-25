'use client';

import { Sun, Moon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  function toggleTheme() {
    const newTheme = isDarkMode ? 'cupcake' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <label className="swap swap-rotate">
      <input 
        type="checkbox" 
        className="theme-controller" 
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <Sun size={24} className="swap-off size-6 fill-current" />
      <Moon size={24} className="swap-on size-6 fill-current" />
    </label>
  );
}
