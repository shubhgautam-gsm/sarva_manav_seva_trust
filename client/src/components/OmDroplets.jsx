import React, { useEffect, useRef } from 'react';

export default function OmDroplets(){
  const omLayerRef = useRef(null);

  useEffect(() => {
    const OM_LAYER = omLayerRef.current;
    if (!OM_LAYER) return;

    const createDropletAt = (xPct = null) => {
      const d = document.createElement('div');
      d.className = 'droplet';
      d.textContent = 'ૐ';
      const left = (typeof xPct === 'number') ? xPct : Math.random() * 100;
      d.style.left = left + '%';
      const size = (Math.random() * 1.2 + 0.8).toFixed(2);
      d.style.fontSize = size + 'rem';
      const dur = (Math.random() * 5 + 6).toFixed(2);
      d.style.animationDuration = dur + 's';
      d.style.transform = `translateY(-6vh) rotate(${(Math.random() * 40 - 20).toFixed(2)}deg)`;
      OM_LAYER.appendChild(d);
      d.addEventListener('animationend', () => d.remove());
    };

    let dropletInterval = setInterval(createDropletAt, 300);

    const spawnCluster = (clientX) => {
      const vw = window.innerWidth;
      const xPct = (clientX / vw) * 100;
      const count = Math.floor(Math.random() * 6) + 4;
      for (let i = 0; i < count; i++) {
        createDropletAt(xPct + (Math.random() * 8 - 4));
      }
    };

    const handleClick = (ev) => {
      const tag = ev.target.tagName.toLowerCase();
      if (tag === 'button' || ev.target.closest('nav')) return;
      spawnCluster(ev.clientX);
    };

    document.addEventListener('click', handleClick);

    return () => {
      clearInterval(dropletInterval);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <div className="om-layer" ref={omLayerRef} aria-hidden="true"></div>;
}