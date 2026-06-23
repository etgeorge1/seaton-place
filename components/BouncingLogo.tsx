'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function BouncingLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const [bouncing, setBouncing] = useState(false);

  // Center the logo on mount, then start bouncing after 3s
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cx = (window.innerWidth - el.offsetWidth) / 2;
    const cy = 24;
    el.style.transform = `translate(${cx}px, ${cy}px)`;

    const timer = setTimeout(() => setBouncing(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Begin bounce loop once triggered
  useEffect(() => {
    const el = ref.current;
    if (!el || !bouncing) return;

    let x = (window.innerWidth - el.offsetWidth) / 2;
    let y = 24;
    let dx = 1.7;
    let dy = 1.3;
    let rafId: number;

    const tick = () => {
      const maxX = window.innerWidth - el.offsetWidth;
      const maxY = window.innerHeight - el.offsetHeight;

      x += dx;
      y += dy;

      if (x <= 0) { x = 0; dx = Math.abs(dx); }
      if (x >= maxX) { x = maxX; dx = -Math.abs(dx); }
      if (y <= 0) { y = 0; dy = Math.abs(dy); }
      if (y >= maxY) { y = maxY; dy = -Math.abs(dy); }

      el.style.transform = `translate(${x}px, ${y}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [bouncing]);

  return (
    <div ref={ref} className="fixed top-0 left-0 z-50 pointer-events-none w-48 h-48">
      <Image
        src="/logo.svg"
        alt="Seaton Place"
        width={192}
        height={192}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
