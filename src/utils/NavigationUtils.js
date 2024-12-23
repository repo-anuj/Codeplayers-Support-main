// src/utils/navigationUtils.js

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useScrollNavigation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  const navigateAndScroll = (path, hash) => {
    const isLandingPage = path === '/Landing' || path === '/';
    const fullPath = `${path}${hash}`;

    navigate(fullPath);

    if (isLandingPage) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash.substring(1));
        }
      }, 100);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'features', 'plans', 'reviews', 'team', 'contact'];
      let current = '';

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 50 && rect.bottom >= 50) {
            current = section;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { navigateAndScroll, activeSection };
};