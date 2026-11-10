import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import WindFabric from './WindFabric';

function App() {
  const [reveal, setReveal] = React.useState(0);
  return <div className="page">
    <header><a className="brand" href="./" aria-label="B’groceries home">B<span>’</span>GROCERIES<small>HYPERSTORE</small></a><span className="header-note">A little freshness. A whole lot of goodness.</span></header>
    <main>
      <div className="intro"><span className="dot"/> A NEW CHAPTER IN EVERYDAY GOODNESS</div><h1>Something fresh.<br/><em>Coming soon.</em></h1><div className="logo-wrap"><img src="/logo.jpg" alt="B’groceries Hyperstore" /></div>
      <section className="opening" aria-label="A preview of our upcoming store">
        <div className="store-stage" key={reveal}>
          <img className="storefront" src="/storefront.png" alt="B’groceries Hyperstore storefront" />
          <WindFabric />
          <div className="opening-label">A FRESH BEGINNING <span>Opening soon</span></div>
        </div>
        <button className="replay" onClick={() => setReveal(value => value + 1)}>↻ Replay the reveal</button>
      </section>
      <p>We’re getting things ready for you.<br/>Your everyday essentials, a little closer to home.</p>
      <div className="status"><span className="sprout">✳</span><span>A fresh beginning is growing.<small>We can’t wait to welcome you.</small></span></div>
    </main>
    <div className="watermark" aria-hidden="true">fresh starts here.</div>
    <footer><span>© {new Date().getFullYear()} B’groceries Hyperstore</span><span>EVERYDAY GOODNESS, COMING YOUR WAY <span className="arrow">↗</span></span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);


