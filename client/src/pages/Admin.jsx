import React, { useState } from 'react';
import Section from '../components/Section.jsx';

export default function Admin(){
  const [token,setToken] = useState(localStorage.getItem('token'));

  return (
    <Section id="admin" title="Admin Dashboard">
      <div className="card">
        <p>Admin functionality will be here.</p>
        {!token && <p>Please login to access admin features.</p>}
      </div>
    </Section>
  );
}