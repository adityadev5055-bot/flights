import { WatchScrollAnimation } from './components/WatchScrollAnimation';
import './watch.css';

export default function WatchExperience() {
  return (
    <main className="watch-page">
      <header className="watch-nav">
        <a href="#top" className="watch-wordmark">ATELIER <span>HORLOGER</span></a>
        <a className="watch-nav-link" href="#craft">The collection <span>↗</span></a>
      </header>
      <section id="top" className="watch-intro">
        <p className="watch-eyebrow">A study in precision&nbsp; · &nbsp;No. 01</p>
        <h1>Time, in<br /><em>its purest form.</em></h1>
        <p className="watch-deck">An instrument shaped by patience.<br />A new perspective with every passing moment.</p>
        <a className="watch-cue" href="#animation"><span /> Scroll to discover</a>
      </section>
      <div id="animation">
        <WatchScrollAnimation />
      </div>
      <section id="craft" className="watch-outro">
        <p className="watch-eyebrow">Made to endure</p>
        <h2>Every detail.<br /><em>Considered.</em></h2>
        <p>Precision is not a moment. It is a thousand deliberate decisions, brought together in a form that feels inevitable.</p>
        <a href="#top" className="watch-cta">Discover the collection <span>↗</span></a>
        <footer>ATELIER HORLOGER <span>·</span> SWISS MADE</footer>
      </section>
    </main>
  );
}
