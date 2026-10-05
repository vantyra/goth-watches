import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import heroPhoto from '@assets/1788453573662_1788464873513.jpg';
import abyssCrownPhoto from '@assets/hf_20260315_180540_599b442f-d790-48ff-b8da-1af1236f28a1_1_1788465442762.jpg';
import eclipseVoidPhoto from '@assets/umbra_noctis_1788465442846.jpg';
import mementoFangPhoto from '@assets/1780966084686_1788465442884.jpg';
import nocturneBladePhoto from '@assets/1780966370006_1788465442914.png';
import obsidianVeilPhoto from '@assets/1780966294915_1788465442955.png';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const clapperProfileLink = 'https://i.clapper.life/jump/profile?op=profile&opid=kPMA7B5zP9&pid=kPMA7B5zP9&id=kPMA7B5zP9';

type WatchVariant = 'root-red' | 'thorn' | 'iris-blue' | 'reaper' | 'root-black' | 'iris-green';

const watchDetails: Record<WatchVariant, { label: string; dial: string; accent: string; face: string; shape: 'round' | 'thorn' }> = {
  'root-red': { label: 'Vantyra Root watch, red dial, organic cage bezel', dial: '#671c20', accent: '#b49368', face: '#b93d3d', shape: 'thorn' },
  thorn: { label: 'Vantyra Thorn watch', dial: '#2c1918', accent: '#b49368', face: '#9b7970', shape: 'thorn' },
  'iris-blue': { label: 'Vantyra Iris watch, blue', dial: '#273b4b', accent: '#b8d0d3', face: '#7097ad', shape: 'round' },
  reaper: { label: 'Vantyra Reaper watch', dial: '#111315', accent: '#8b857c', face: '#4d5050', shape: 'round' },
  'root-black': { label: 'Vantyra Root watch, black', dial: '#191b1d', accent: '#9d856c', face: '#7b675a', shape: 'thorn' },
  'iris-green': { label: 'Vantyra Iris watch, green', dial: '#35443c', accent: '#c2a477', face: '#8b9e83', shape: 'round' },
};

function WatchArt({ variant = 'root-red', large = false }: { variant?: WatchVariant; large?: boolean }) {
  const detail = watchDetails[variant];
  const isThorn = detail.shape === 'thorn';
  const cx = large ? 520 : 180;
  const cy = large ? 230 : 180;
  const scale = large ? 1.22 : 0.88;
  const id = variant.replace('-', '');
  return (
    <svg
      className="watch-art"
      viewBox={large ? '0 0 1000 460' : '0 0 360 360'}
      role="img"
      aria-label={detail.label}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="35%">
          <stop offset="0" stopColor={detail.dial} stopOpacity=".7" />
          <stop offset="1" stopColor="#171415" />
        </radialGradient>
        <radialGradient id={`metal-${id}`} cx="30%" cy="20%">
          <stop offset="0" stopColor="#dac1a0" />
          <stop offset=".32" stopColor={detail.accent} />
          <stop offset=".72" stopColor="#4b3d34" />
          <stop offset="1" stopColor="#211d1d" />
        </radialGradient>
        <linearGradient id={`dial-${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={detail.face} />
          <stop offset=".55" stopColor={detail.dial} />
          <stop offset="1" stopColor="#0f1011" />
        </linearGradient>
        <filter id={`shadow-${id}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#bg-${id})`} />
      <g opacity=".15" stroke={detail.accent} fill="none">
        <circle cx={cx} cy={cy} r={large ? 180 : 140} strokeDasharray="1 11" />
        <circle cx={cx} cy={cy} r={large ? 205 : 158} strokeDasharray="1 20" />
        <path d={large ? 'M52 380 H952' : 'M25 310 H335'} strokeDasharray="2 14" />
      </g>
      <ellipse cx={cx} cy={cy + 125 * scale} rx={large ? 177 : 125} ry="20" fill="#050506" opacity=".8" filter={`url(#shadow-${id})`} />
      <g className="watch-body" transform={`translate(${cx - 180 * scale} ${cy - 180 * scale}) scale(${scale})`}>
        <path d="M180 2 C158 56 157 75 157 102 L203 102 C203 75 202 55 180 2Z" fill="#252021" stroke={detail.accent} strokeOpacity=".55" strokeWidth="2" />
        <path d="M180 358 C158 304 157 286 157 258 L203 258 C203 286 202 305 180 358Z" fill="#252021" stroke={detail.accent} strokeOpacity=".55" strokeWidth="2" />
        <rect x="153" y="84" width="54" height="190" rx="22" fill={`url(#metal-${id})`} stroke="#d0b48b" strokeOpacity=".38" strokeWidth="2" />
        {isThorn && (
          <path d="M180 52 L204 96 L242 83 L218 122 L257 143 L215 148 L227 190 L195 166 L180 204 L165 166 L133 190 L145 148 L103 143 L142 122 L118 83 L156 96Z" fill={`url(#metal-${id})`} stroke="#d0b48b" strokeOpacity=".5" strokeWidth="2" />
        )}
        <circle cx="180" cy="180" r="105" fill={`url(#metal-${id})`} stroke="#ddc69e" strokeOpacity=".57" strokeWidth="3" />
        <circle cx="180" cy="180" r="88" fill={`url(#dial-${id})`} stroke="#201b1b" strokeWidth="5" />
        <circle cx="180" cy="180" r="80" fill="none" stroke={detail.accent} strokeOpacity=".25" strokeDasharray="1 7" />
        <g stroke={detail.accent} strokeWidth="2" strokeLinecap="round" opacity=".75">
          <path d="M180 101 V111 M259 180 H249 M180 259 V249 M101 180 H111" />
          <path d="M220 111 L214 119 M249 140 L241 146 M249 220 L241 214 M220 249 L214 241 M140 249 L146 241 M111 220 L119 214 M111 140 L119 146 M140 111 L146 119" />
        </g>
        <g stroke="#eadac0" strokeLinecap="round">
          <path d="M180 180 L157 129" strokeWidth="4" />
          <path d="M180 180 L213 194" strokeWidth="3" />
          <circle cx="180" cy="180" r="6" fill={detail.accent} stroke="none" />
        </g>
        <text x="180" y="163" fill="#e8e1d5" opacity=".88" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" letterSpacing="2">VANTYRA</text>
        <text x="180" y="211" fill={detail.accent} opacity=".8" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="1">ONE / ONE</text>
        <path className="glint" d="M111 127 A84 84 0 0 1 150 99" fill="none" stroke="#fff0d3" strokeWidth="4" strokeLinecap="round" opacity=".25" />
      </g>
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className={`site-nav${open ? ' menu-open' : ''}`} aria-label="Primary navigation">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" onClick={close}>Vantyra<span className="brand-mark">◦</span></a>
        <div className="nav-links" id="mobile-navigation">
          <a href="#gallery" onClick={close}>Builds</a>
          <a href="#process" onClick={close}>Process</a>
          <a href="#configure" onClick={close}>Configure</a>
          <a href="#policies" onClick={close}>Details</a>
        </div>
        <a className="nav-cta" href={clapperProfileLink} target="_blank" rel="noopener noreferrer" onClick={close}>DM to order</a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
    </nav>
  );
}

function Home() {
  const [openPolicy, setOpenPolicy] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedPhoto]);

  const policies = [
    {
      title: 'Build Time',
      body: 'Builds must be completed within 1–2 weeks from confirmed payment to shipment.',
    },
    {
      title: 'Shipping',
      body: 'Worldwide shipping is tracked and insured. Tracking information is provided in your DM.',
    },
    {
      title: 'Payment',
      body: 'Full payment is required upfront to begin your build.',
    },
    {
      title: 'Changes & Cancellations',
      body: 'We confirm every choice before the build starts; all orders begin processing immediately after purchase. For this reason, orders cannot be canceled or modified once placed.',
    },
    {
      title: 'Refund and Return Policy',
      body: (
        <>
          <p>We want you to be confident in your purchase from VANTYRA. If there is any issue with your order, we are here to help.</p>
          <h4>Returns &amp; Refunds</h4>
          <p>We accept returns and refunds only if the item arrives damaged, defective, or incorrect.</p>
          <p>If your order arrives with:</p>
          <ul>
            <li>visible damage</li>
            <li>a manufacturing defect</li>
            <li>the wrong item</li>
          </ul>
          <p>Please contact us within 7 days of delivery with a clear photo of the issue.</p>
          <p>Once approved, you may return the item to us. After we receive and inspect the returned product, a refund will be issued.</p>
          <h4>Refund Amounts</h4>
          <p>Approved refunds will be issued for the product price only.<br />Shipping costs are non-refundable.<br />Refunds are processed to the original payment method.</p>
          <h4>Regions Covered</h4>
          <p>This policy applies to customers from all over the world.</p>
        </>
      ),
    },
  ];

  return (
    <div className="site-shell" id="top">
      <Nav />
      <header className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <div className="hero-eyebrow">Custom watches — built one at a time</div>
            <h1>Made to order.<br />Never <em>off the shelf.</em></h1>
            <p className="hero-sub">
              Vantyra builds one-of-one watches by hand. Every piece starts
              with a conversation — your type, your metal, your wrist — and ends with
              something made specifically for you. Nothing here is pre-made or in stock.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href={clapperProfileLink} target="_blank" rel="noopener noreferrer">Start your build on Clapper</a>
              <a className="btn-ghost" href="#process">See how it works</a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="watch-stage">
              <img
                className="hero-image"
                src={heroPhoto}
                alt="Vantyra watchmaker hand-building a custom watch"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="philosophy">
        <div className="wrap">
          <div className="section-label">The approach</div>
          <p>
            Vantyra is for the person who wants the strange detail to stay.
            “Goth” here means atmosphere, contrast, and a point of view — a
            watch built by hand, in conversation, instead of chosen from a shelf.
          </p>
        </div>
      </section>

      <section id="gallery">
        <div className="wrap">
          <div className="section-label">Recent builds</div>
          <h2 className="section-head">A few pieces I've made for past clients</h2>
          <p className="section-intro">
            Each of these was designed with the client, start to finish — shown here
            as examples of what's possible, not as items for sale.
          </p>
          <div className="gallery-grid">
            <div className="g-item g1">
              <button className="gallery-trigger" type="button" aria-label="View Memento Fang full size" onClick={() => setSelectedPhoto({ src: mementoFangPhoto, alt: 'Memento Fang, the blue-eye fang watch' })}>
                <img className="gallery-photo" src={mementoFangPhoto} alt="Memento Fang, the blue-eye fang watch" />
                <span className="gallery-info">
                  <span className="gallery-name">Memento Fang</span>
                  <span className="gallery-description">the blue-eye fang watch</span>
                </span>
              </button>
            </div>
            <div className="g-item g2">
              <button className="gallery-trigger" type="button" aria-label="View Eclipse Void full size" onClick={() => setSelectedPhoto({ src: eclipseVoidPhoto, alt: 'Eclipse Void, the all-black skull watch' })}>
                <img className="gallery-photo" src={eclipseVoidPhoto} alt="Eclipse Void, the all-black skull watch" />
                <span className="gallery-info">
                  <span className="gallery-name">Eclipse Void</span>
                  <span className="gallery-description">the all-black skull watch</span>
                </span>
              </button>
            </div>
            <div className="g-item g3">
              <button className="gallery-trigger" type="button" aria-label="View Nocturne Blade full size" onClick={() => setSelectedPhoto({ src: nocturneBladePhoto, alt: 'Nocturne Blade, the red organic-web watch' })}>
                <img className="gallery-photo" src={nocturneBladePhoto} alt="Nocturne Blade, the red organic-web watch" />
                <span className="gallery-info">
                  <span className="gallery-name">Nocturne Blade</span>
                  <span className="gallery-description">the red organic-web watch</span>
                </span>
              </button>
            </div>
            <div className="g-item g4">
              <button className="gallery-trigger" type="button" aria-label="View Abyss Crown full size" onClick={() => setSelectedPhoto({ src: abyssCrownPhoto, alt: 'Abyss Crown, the liquid-spike silver watch' })}>
                <img className="gallery-photo" src={abyssCrownPhoto} alt="Abyss Crown, the liquid-spike silver watch" />
                <span className="gallery-info">
                  <span className="gallery-name">Abyss Crown</span>
                  <span className="gallery-description">the liquid-spike silver watch</span>
                </span>
              </button>
            </div>
            <div className="g-item g5">
              <button className="gallery-trigger" type="button" aria-label="View Obsidian Veil full size" onClick={() => setSelectedPhoto({ src: obsidianVeilPhoto, alt: 'Obsidian Veil, the black organic-web watch' })}>
                <img className="gallery-photo" src={obsidianVeilPhoto} alt="Obsidian Veil, the black organic-web watch" />
                <span className="gallery-info">
                  <span className="gallery-name">Obsidian Veil</span>
                  <span className="gallery-description">the black organic-web watch</span>
                </span>
              </button>
            </div>
            <div className="g-item g6">
              <div className="next-build"><span>[ Room for your next build ]</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <div className="section-label">How ordering works</div>
          <h2 className="section-head">Five steps, start to finish</h2>
          <div className="steps">
            <div className="step"><div className="step-num">01</div><div><div className="step-title">Message me on Clapper</div><div className="step-desc">DM @goth.watches to start. Tell me you'd like a custom build.</div></div></div>
            <div className="step"><div className="step-num">02</div><div><div className="step-title">Choose your specs</div><div className="step-desc">Watch type, style, metal, and wrist length — I'll walk you through each option.</div></div></div>
            <div className="step"><div className="step-num">03</div><div><div className="step-title">Confirm price &amp; timeline</div><div className="step-desc">I'll quote your build and give you an expected completion date.</div></div></div>
            <div className="step"><div className="step-num">04</div><div><div className="step-title">Full payment secures your order</div><div className="step-desc">Cash App, Venmo, or USDT — pick whichever you're most comfortable with.</div></div></div>
            <div className="step"><div className="step-num">05</div><div><div className="step-title">I build it, then it ships</div><div className="step-desc">Built by hand and shipped in [1–2 weeks] — you'll get updates along the way.</div></div></div>
          </div>
        </div>
      </section>

      <section id="configure">
        <div className="wrap">
          <div className="section-label">What you'll choose</div>
          <h2 className="section-head">Every build is configured to you</h2>
          <div className="options-grid">
            <div className="opt"><div className="opt-kicker">Watch type</div><div className="opt-value">Memento Fang, Eclipse Void, Nocturne Blade, Abyss Crown, or Obsidian Veil</div></div>
            <div className="opt"><div className="opt-kicker">Colorway</div><div className="opt-value">Ocean Blue, Verdant, Crimson, Onyx, Obsidian</div></div>
            <div className="opt">
              <div className="opt-kicker">Precious Metal</div>
              <div className="opt-value metal-options">
                <span>Sterling Silver</span>
                <span>Gold 14 Karat (+$1,535.00)</span>
                <span>Gold 18 Karat (+$2,345.00)</span>
              </div>
            </div>
            <div className="opt"><div className="opt-kicker">Wrist length</div><div className="opt-value">Your measurement, inches or cm</div></div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="wrap">
          <div className="section-label">What clients say</div>
          <div className="testi-grid">
            <div className="testi">
              <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p>“Wore the Memento Fang to a gallery opening. Three people asked where I got it. Said nothing. Just pointed at the dial.”</p>
              <div className="testi-name">— Marcus R., Berlin</div>
            </div>
            <div className="testi">
              <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p>“The packaging alone made me feel like I ordered something cursed in the best possible way.”</p>
              <div className="testi-name">— Sofia T., Amsterdam</div>
            </div>
            <div className="testi">
              <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p>“This is not a watch. It's a statement I wear every single day.”</p>
              <div className="testi-name">— Liam K., London</div>
            </div>
          </div>
        </div>
      </section>

      <section id="policies">
        <div className="wrap">
          <div className="section-label">Good to know</div>
          <div className="policy-grid">
            {policies.map((policy, index) => {
              const isOpen = openPolicy === index;
              return (
                <div className={`policy-item${isOpen ? ' is-open' : ''}`} key={policy.title}>
                  <button
                    className="policy-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`policy-detail-${index}`}
                    onClick={() => setOpenPolicy(isOpen ? null : index)}
                  >
                    <span className="policy-title">{policy.title}</span>
                    <span className="policy-plus" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="policy-body" id={`policy-detail-${index}`} hidden={!isOpen}>
                    {policy.body}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-cta" id="order">
        <div className="wrap">
          <div className="section-label">Ready when you are</div>
          <h2>Let's build yours.</h2>
          <p className="hero-sub">DM me on Clapper to start — no forms, no waiting room, just a conversation about what you want made.</p>
          <div className="hero-actions"><a className="btn-primary" href={clapperProfileLink} target="_blank" rel="noopener noreferrer">DM @goth.watches on Clapper</a></div>
        </div>
      </section>

      <footer>
        <div className="wrap footer-inner">
          <div>© 2026 Vantyra. All watches made to order.</div>
          <div><a href={clapperProfileLink} target="_blank" rel="noopener noreferrer">Clapper @goth.watches</a></div>
        </div>
      </footer>
      {selectedPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Full-size view of ${selectedPhoto.alt}`} onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" aria-label="Close full-size photo" onClick={() => setSelectedPhoto(null)}>Close</button>
            <img className="lightbox-image" src={selectedPhoto.src} alt={selectedPhoto.alt} />
          </div>
        </div>
      )}
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;