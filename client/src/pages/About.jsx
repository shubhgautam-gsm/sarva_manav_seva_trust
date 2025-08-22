import React from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section.jsx";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useTranslation();

  // fetch structured JSON objects (returnObjects true)
  const page1 = t("about.body.0.page_1", { returnObjects: true }) || {};
  const page2 = t("about.body.0.page_2", { returnObjects: true }) || {};

  return (
    <Section id="about" title={t("about.heading")}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="about-wrap"
      >
        {/* top heading for the trust (large, decorative) */}
        <div className="about-hero">
          <h2 className="about-title">{page1.organization_info?.trust_name}</h2>
          <p className="about-sub">{page1.organization_info?.hospital_board}</p>
        </div>

        {/* grid: left card (contact / meta), right: long content */}
        <div className="about-grid">
          {/* Left Card */}
          <aside className="about-card">
            <div className="card-accent" />
            <div className="card-body">
              <h3 className="card-heading">Organization Info</h3>

              <p className="meta-line">
                <strong>Address:</strong>
                <br />
                {page1.organization_info?.address}
              </p>

              <p className="meta-line">
                <strong>Phone:</strong> {page1.organization_info?.phone}
              </p>
              <p className="meta-line">
                <strong>Email:</strong> {page1.organization_info?.email}
              </p>
              <p className="meta-line">
                <strong>PAN:</strong> {page1.organization_info?.pan}
              </p>
              <p className="meta-line">
                <strong>Trust Reg.:</strong> {page1.organization_info?.trust_reg}
              </p>
            </div>
          </aside>

          {/* Right content (long paragraphs) */}
          <article className="about-content">
            <section className="about-section">
              <h4 className="section-head">Services Summary</h4>
              <p className="body-text whitespace-pre-line">
                {page1.services_summary}
              </p>
            </section>

            <section className="about-section">
              <h4 className="section-head">Financials & Operations</h4>
              <p className="body-text whitespace-pre-line">
                {page2.financials_and_operations}
              </p>
            </section>
          </article>
        </div>
      </motion.div>
    </Section>
  );
}
