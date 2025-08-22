// Media.jsx  (framer-motion variant - recommended)
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section.jsx";
import { motion, AnimatePresence } from "framer-motion";

/*
  NOTE: install framer-motion if you haven't:
    npm i framer-motion
  If you prefer not to install, use the CSS fallback component below.
*/

import news1 from "../imgs/news1.jpg"; // add more images as needed

export default function Media() {
  const { t } = useTranslation();
  // image list: extend this with your imports
  const images = [
    { id: 1, src: news1, alt: t("media.alt.news1", "News image 1"), caption: t("media.caption.news1", "Jaysiyaram - event photo") },
    // add: { id:2, src: news2, alt: "...", caption:"..." }
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  // keyboard nav
  useEffect(() => {
    function onKey(e) {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex(i => Math.min(images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setOpenIndex(i => Math.max(0, i - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  // prevent page scroll when modal open
  useEffect(() => {
    document.documentElement.style.overflow = openIndex !== null ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [openIndex]);

  // touch swipe handlers for modal
  const touch = useRef({ startX: 0, endX: 0 });
  function onTouchStart(e) { touch.current.startX = e.touches[0].clientX; }
  function onTouchMove(e) { touch.current.endX = e.touches[0].clientX; }
  function onTouchEnd() {
    const dx = touch.current.endX - touch.current.startX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setOpenIndex(i => Math.min(images.length - 1, i + 1));
    if (dx > 0) setOpenIndex(i => Math.max(0, i - 1));
  }

  // neat progressive preloading: preload next image
  useEffect(() => {
    if (openIndex === null) return;
    const next = images[openIndex + 1];
    if (next) {
      const img = new Image();
      img.src = next.src;
    }
  }, [openIndex, images]);

  return (
    <Section id="gallery" title={t("media.heading", "Media Gallery")}>
      <div className="media-master">
        <div className="media-grid" ref={containerRef} role="list">
          {images.map((img, idx) => (
            <article key={img.id} className="media-card" role="listitem">
              <button
                className="media-thumb-btn"
                onClick={() => setOpenIndex(idx)}
                aria-label={t("media.openImage", "Open image")}
              >
                <div className="media-thumb">
                  <img src={img.src} alt={img.alt} loading="lazy" width="640" height="420" />
                </div>
                <div className="media-thumb-meta">
                  <div className="media-caption">{img.caption}</div>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Lightbox with AnimatePresence */}
        <AnimatePresence>
          {openIndex !== null && (
            <motion.aside
              className="media-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="lightbox"
              onClick={(e) => {
                if (e.target.classList.contains("media-lightbox")) setOpenIndex(null);
              }}
            >
              <motion.div
                className="media-modal"
                initial={{ y: 20, scale: 0.98 }}
                animate={{ y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } }}
                exit={{ y: 20, opacity: 0 }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                role="dialog"
                aria-modal="true"
                aria-label={images[openIndex].caption || "Image preview"}
              >
                <button className="modal-close" onClick={() => setOpenIndex(null)} aria-label={t("media.close", "Close")}>✕</button>

                <button
                  className="modal-nav prev"
                  onClick={() => setOpenIndex(i => Math.max(0, i - 1))}
                  disabled={openIndex === 0}
                  aria-label={t("media.prev", "Previous")}
                >
                  ‹
                </button>

                <figure className="modal-figure">
                  <motion.img
                    key={images[openIndex].src}
                    src={images[openIndex].src}
                    alt={images[openIndex].alt}
                    className="modal-img"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  />
                  {images[openIndex].caption && <figcaption className="modal-caption">{images[openIndex].caption}</figcaption>}
                </figure>

                <button
                  className="modal-nav next"
                  onClick={() => setOpenIndex(i => Math.min(images.length - 1, i + 1))}
                  disabled={openIndex === images.length - 1}
                  aria-label={t("media.next", "Next")}
                >
                  ›
                </button>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
