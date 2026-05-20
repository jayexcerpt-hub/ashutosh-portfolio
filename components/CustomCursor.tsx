'use client';
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };
    loop();

    const hoverEls = document.querySelectorAll('a, button, .tilt-card, .tag-item, .pub-item');
    const addHover = () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = '#d4ff7d'; };
    const removeHover = () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(212,255,125,0.5)'; };
    hoverEls.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover); });

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div id="cursorDot" className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block" style={{ background: '#d4ff7d', mixBlendMode: 'difference', transform: 'translate(-50%,-50%)', transition: 'transform .1s' }} />
      <div id="cursorRing" className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] hidden md:block" style={{ border: '1px solid rgba(212,255,125,0.5)', transform: 'translate(-50%,-50%)', transition: 'width .3s, height .3s, border-color .3s' }} />
    </>
  );
}
