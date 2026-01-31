// ========== src/hooks/useIntersectionObserver.js (Corrigé) ==========
import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasIntersected, options]);

  return { targetRef, isIntersecting, hasIntersected };
};

// Hook pour animations échelonnées
export const useStaggeredIntersectionObserver = (itemCount, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Révéler les éléments avec un délai échelonné
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * delay);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [itemCount, delay]);

  return { targetRef, visibleItems };
};