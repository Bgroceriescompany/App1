import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return <div className="page">
    <header><a className="brand" href="./" aria-label="B’groceries home">B<span>’</span>GROCERIES<small>HYPERSTORE</small></a><span className="header-note">A little freshness. A whole lot of goodness.</span></header>
    <main>
      <div className="intro"><span className="dot"/> SOMETHING FRESH IS ON ITS WAY</div>
      <div className="logo-wrap"><img src="/logo.jpg" alt="B’groceries Hyperstore" /></div>
      <h1>Good things.<br/><em>Coming soon.</em></h1>
      <p>We’re getting things ready for you.<br/>Your everyday essentials, a little closer to home.</p>
      <div className="status"><span className="sprout">✳</span><span>A fresh beginning is growing.<small>We can’t wait to welcome you.</small></span></div>
    </main>
    <div className="watermark" aria-hidden="true">fresh starts here.</div>
    <footer><span>© {new Date().getFullYear()} B’groceries Hyperstore</span><span>EVERYDAY GOODNESS, COMING YOUR WAY <span className="arrow">↗</span></span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
