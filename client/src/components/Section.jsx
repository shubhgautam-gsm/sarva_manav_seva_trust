import React from 'react';

export default function Section({ title, children, id }){
  return (
    <section id={id}>
      <div className="card">
        {title && <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}