import React, { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================
   Viaja Fácil — Landing Page (React + TypeScript)
   Ficheiro único: componentes + estilos (sem dependências extra).
   Uso: import LandingPage from "./LandingPage"; <LandingPage />
   ============================================================ */

/* ---------- Tipos ---------- */
interface Destination {
  id: number;
  name: string;
  country: string;
  region: string;
  description: string;
  rating: number;
  days: number;
  price: number;
  image: string;
}

interface Stat {
  value: string;
  label: string;
}

/* ---------- Dados ---------- */
// Troque as imagens pelas suas (ex.: /img/paris.jpg) quando quiser.
const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Benguela",
    country: "Angola",
    region: "África",
    description:
      "Conheça Benguela, a cidade das acácias rubras, com belas praias e paisagens naturais.",
    rating: 4.9,
    days: 7,
    price: 4500,
    image:
      "https://welcometoangola.co.ao/wp-content/uploads/2021/01/Angola-20141218-195607-00322-HIRES-2-scaled.jpg",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japão",
    region: "Ásia",
    description:
      "Mistura perfeita de tradição e modernidade, com templos antigos e tecnologia de ponta.",
    rating: 4.8,
    days: 10,
    price: 6800,
    image:
      "https://welcometoangola.co.ao/wp-content/uploads/2021/01/luanda.jpg",
  },
  {
    id: 3,
    name: "Huíla",
    country: "Angola",
    region: "África",
    description:
      "Descubra as belas paisagens da Huíla, a Serra da Leba, o Cristo Rei e as maravilhas naturais do Lubango.",
    rating: 4.7,
    days: 5,
    price: 3300,
    image:
      "https://welcometoangola.co.ao/wp-content/uploads/2021/01/lubango4.jpg",
  },
  {
    id: 4,
    name: "Roma",
    country: "Itália",
    region: "Europa",
    description:
      "História viva em cada esquina: Coliseu, Vaticano e a melhor gastronomia italiana.",
    rating: 4.8,
    days: 6,
    price: 4100,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Dubai",
    country: "Emirados Árabes",
    region: "Ásia",
    description:
      "Arranha-céus futuristas, desertos dourados e compras de luxo num só destino.",
    rating: 4.6,
    days: 8,
    price: 5900,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Nova York",
    country: "Estados Unidos",
    region: "América",
    description:
      "A cidade que nunca dorme: Times Square, Central Park e a Broadway esperam por você.",
    rating: 4.7,
    days: 7,
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=80",
  },
];

const STATS: Stat[] = [
  { value: "10k+", label: "Viajantes felizes" },
  { value: "120+", label: "Destinos" },
  { value: "4.8", label: "Avaliação média" },
  { value: "24/7", label: "Suporte" },
];

const formatPrice = (value: number): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

/* ---------- Hook: quantos cards por vista ---------- */
const usePerView = (): number => {
  const calc = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  const [perView, setPerView] = useState<number>(calc);

  useEffect(() => {
    const onResize = () => setPerView(calc());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return perView;
};

/* ---------- Ícones simples ---------- */
const PlaneIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const StarIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#b91c1c" aria-hidden="true">
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ---------- Navbar ---------- */
const Navbar: React.FC = () => (
  <header className="vf-nav">
    <div className="vf-container vf-nav-inner">
      <a href="#inicio" className="vf-logo">
        <PlaneIcon /> Viaja Fácil
      </a>
      <nav className="vf-links" aria-label="Principal">
        <a href="#inicio">Início</a>
        <a href="#destinos">Destinos</a>
        <a href="#sobre">Sobre nós</a>
      </nav>
      <div className="vf-actions">
        <a href="#entrar" className="vf-link-plain">Entrar</a>
        <a href="#cadastrar" className="vf-btn vf-btn-primary vf-btn-sm">Cadastrar</a>
      </div>
    </div>
  </header>
);

/* ---------- Hero ---------- */
const Hero: React.FC = () => (
  <section id="inicio" className="vf-hero">
    <div className="vf-container vf-hero-inner">
      <h1>
        Descubra o Mundo
        <br />
        com a <span className="vf-accent">Viaja Fácil</span>
      </h1>
      <p>
        Reserve suas viagens dos sonhos com facilidade, segurança e os melhores
        preços do mercado
      </p>
      <div className="vf-hero-cta">
        <a href="#destinos" className="vf-btn vf-btn-primary">Explorar Destinos</a>
        <a href="#cadastrar" className="vf-btn vf-btn-outline">Criar Conta Grátis</a>
      </div>
    </div>
  </section>
);

/* ---------- Card de destino ---------- */
const DestinationCard: React.FC<{ item: Destination }> = ({ item }) => {
  const [failed, setFailed] = useState(false);

  return (
    <article className="vf-card">
      <div className="vf-card-media">
        {failed ? (
          <div className="vf-card-fallback" aria-hidden="true" />
        ) : (
          <img src={item.image} alt={`${item.name}, ${item.country}`} loading="lazy"
            onError={() => setFailed(true)} draggable={false} />
        )}
        <span className="vf-badge">{item.region}</span>
      </div>
      <div className="vf-card-body">
        <h3>{item.name}</h3>
        <p className="vf-country"><PinIcon /> {item.country}</p>
        <p className="vf-desc">{item.description}</p>
        <div className="vf-meta">
          <span className="vf-rating"><StarIcon /> {item.rating.toFixed(1)}</span>
          <span className="vf-days"><ClockIcon /> {item.days} dias</span>
        </div>
        <div className="vf-card-footer">
          <div>
            <small>A partir de</small>
            <strong>{formatPrice(item.price)}</strong>
          </div>
          <a href="#reservar" className="vf-btn vf-btn-primary vf-btn-sm">Reservar</a>
        </div>
      </div>
    </article>
  );
};

/* ---------- Carrossel de destinos ---------- */
const AUTOPLAY_MS = 4500;

const DestinationsCarousel: React.FC<{ items: Destination[] }> = ({ items }) => {
  const perView = usePerView();
  const maxIndex = Math.max(0, items.length - perView);
  const [index, setIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Mantém o índice válido quando o nº de cards por vista muda
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setIndex((i) => (i <= 0 ? maxIndex : i - 1)),
    [maxIndex]
  );

  // Autoplay (pausa ao passar o rato)
  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, next, maxIndex]);

  // Navegação por teclado
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Swipe em ecrãs tácteis
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const dots = Array.from({ length: maxIndex + 1 }, (_, i) => i);

  return (
    <div
      className="vf-carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destinos populares"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button className="vf-arrow vf-arrow-left" onClick={prev} aria-label="Destino anterior">
        ‹
      </button>

      <div className="vf-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="vf-track"
          style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
        >
          {items.map((item) => (
            <div
              className="vf-slide"
              key={item.id}
              style={{ flexBasis: `${100 / perView}%` }}
            >
              <DestinationCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <button className="vf-arrow vf-arrow-right" onClick={next} aria-label="Próximo destino">
        ›
      </button>

      <div className="vf-dots" role="tablist" aria-label="Escolher posição do carrossel">
        {dots.map((i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir para a posição ${i + 1}`}
            className={`vf-dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

/* ---------- Secção Destinos ---------- */
const Destinations: React.FC = () => (
  <section id="destinos" className="vf-section">
    <div className="vf-container">
      <div className="vf-section-head">
        <h2>Destinos Populares</h2>
        <p>Explore os destinos mais procurados e comece a planejar sua próxima aventura</p>
      </div>
      <DestinationsCarousel items={DESTINATIONS} />
    </div>
  </section>
);

/* ---------- Sobre nós ---------- */
const About: React.FC = () => (
  <section id="sobre" className="vf-section vf-about">
    <div className="vf-container vf-about-grid">
      <div className="vf-about-text">
        <span className="vf-eyebrow">Sobre nós</span>
        <h2>Viajar deve ser simples, seguro e inesquecível</h2>
        <p>
          A Viaja Fácil nasceu para tirar a complicação do planejamento de
          viagens. Reunimos os melhores destinos, preços transparentes e uma
          equipa pronta para ajudar em cada passo: da escolha do roteiro até ao
          regresso a casa.
        </p>
        <ul className="vf-checks">
          <li>Reservas rápidas e pagamentos seguros</li>
          <li>Roteiros selecionados por especialistas</li>
          <li>Atendimento humano, 24 horas por dia</li>
        </ul>
        <a href="#cadastrar" className="vf-btn vf-btn-primary">Começar agora</a>
      </div>

      <div className="vf-stats">
        {STATS.map((s) => (
          <div className="vf-stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- CTA + Footer ---------- */
const CallToAction: React.FC = () => (
  <section id="cadastrar" className="vf-cta">
    <div className="vf-container">
      <h2>Pronto para a sua próxima viagem?</h2>
      <p>Crie sua conta grátis e receba ofertas exclusivas nos melhores destinos.</p>
      <a href="#cadastrar" className="vf-btn vf-btn-light">Criar Conta Grátis</a>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="vf-footer">
    <div className="vf-container vf-footer-inner">
      <span className="vf-logo"><PlaneIcon /> Viaja Fácil</span>
      <small>© {new Date().getFullYear()} Viaja Fácil. Todos os direitos reservados.</small>
    </div>
  </footer>
);

/* ---------- Página ---------- */
const LandingPage: React.FC = () => (
  <>
    <style>{CSS}</style>
    <Navbar />
    <main>
      <Hero />
      <Destinations />
      <About />
      <CallToAction />
    </main>
    <Footer />
  </>
);

export default LandingPage;

/* ---------- Estilos ---------- */
const CSS = `
:root{
  --vf-blue:#0b6fe8; --vf-blue-dark:#0857ba; --vf-text:#0b0b0f;
  --vf-muted:#5f6470; --vf-border:#e5e7eb; --vf-bg:#ffffff;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--vf-text);background:var(--vf-bg)}
a{text-decoration:none;color:inherit}
.vf-container{width:100%;max-width:1250px;margin:0 auto;padding:0 24px}

/* Botões */
.vf-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 26px;border-radius:8px;font-weight:600;font-size:17px;border:1px solid transparent;cursor:pointer;transition:.2s}
.vf-btn-sm{padding:10px 16px;font-size:14px}
.vf-btn-primary{background:var(--vf-blue);color:#fff}
.vf-btn-primary:hover{background:var(--vf-blue-dark)}
.vf-btn-outline{background:#fff;border-color:var(--vf-border);color:var(--vf-text)}
.vf-btn-outline:hover{background:#f6f7f9}
.vf-btn-light{background:#fff;color:var(--vf-blue)}
.vf-btn-light:hover{background:#eef5ff}

/* Navbar */
.vf-nav{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid var(--vf-border)}
.vf-nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px}
.vf-logo{display:inline-flex;align-items:center;gap:10px;color:var(--vf-blue);font-weight:700;font-size:22px}
.vf-links{display:flex;gap:28px;font-weight:500;font-size:15px}
.vf-links a:hover{color:var(--vf-blue)}
.vf-actions{display:flex;align-items:center;gap:22px;font-weight:500;font-size:15px}

/* Hero */
.vf-hero{background:linear-gradient(135deg,#cfe6fb 0%,#ffffff 45%,#f3d9d3 100%);padding:130px 0 120px;text-align:center}
.vf-hero h1{font-size:clamp(40px,6vw,64px);line-height:1.15;margin:0 0 24px;font-weight:800;letter-spacing:-1px}
.vf-accent{color:var(--vf-blue)}
.vf-hero p{max-width:760px;margin:0 auto 36px;font-size:20px;line-height:1.6;color:var(--vf-muted)}
.vf-hero-cta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}

/* Secções */
.vf-section{padding:90px 0}
.vf-section-head{text-align:center;margin-bottom:56px}
.vf-section-head h2{font-size:clamp(30px,4vw,42px);margin:0 0 14px;font-weight:800}
.vf-section-head p{margin:0;color:var(--vf-muted);font-size:18px}

/* Carrossel */
.vf-carousel{position:relative;padding:0 28px 44px;outline:none}
.vf-carousel:focus-visible{box-shadow:0 0 0 3px rgba(11,111,232,.35);border-radius:16px}
.vf-viewport{overflow:hidden;margin:0 -12px}
.vf-track{display:flex;transition:transform .55s cubic-bezier(.22,.8,.3,1)}
.vf-slide{flex:0 0 auto;padding:0 12px}
.vf-arrow{position:absolute;top:42%;z-index:5;width:44px;height:44px;border-radius:50%;border:1px solid var(--vf-border);background:#fff;font-size:28px;line-height:1;color:var(--vf-text);cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.12);transition:.2s}
.vf-arrow:hover{background:var(--vf-blue);color:#fff;border-color:var(--vf-blue)}
.vf-arrow-left{left:-8px}.vf-arrow-right{right:-8px}
.vf-dots{position:absolute;bottom:6px;left:0;right:0;display:flex;justify-content:center;gap:8px}
.vf-dot{width:10px;height:10px;border-radius:999px;border:0;background:#cbd5e1;cursor:pointer;transition:.25s;padding:0}
.vf-dot.is-active{width:28px;background:var(--vf-blue)}

/* Card */
.vf-card{background:#fff;border:1px solid var(--vf-border);border-radius:20px;overflow:hidden;height:100%;display:flex;flex-direction:column;transition:.25s}
.vf-card:hover{box-shadow:0 16px 40px rgba(0,0,0,.1);transform:translateY(-4px)}
.vf-card-media{position:relative;height:190px;margin:22px 0 0;overflow:hidden}
.vf-card-media img,.vf-card-fallback{width:100%;height:100%;object-fit:cover;display:block}
.vf-card-fallback{background:linear-gradient(135deg,#0b6fe8,#f3a18f)}
.vf-badge{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.92);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600}
.vf-card-body{padding:22px 16px 20px;display:flex;flex-direction:column;flex:1}
.vf-card-body h3{margin:0 0 6px;font-size:22px}
.vf-country{display:flex;align-items:center;gap:6px;margin:0 0 14px;color:var(--vf-muted);font-size:15px}
.vf-desc{margin:0 0 18px;color:var(--vf-muted);font-size:15px;line-height:1.6;flex:1}
.vf-meta{display:flex;justify-content:space-between;color:var(--vf-muted);font-size:15px;margin-bottom:22px}
.vf-rating,.vf-days{display:inline-flex;align-items:center;gap:6px}
.vf-rating{color:var(--vf-text);font-weight:600}
.vf-card-footer{display:flex;align-items:flex-end;justify-content:space-between}
.vf-card-footer small{display:block;color:var(--vf-muted);font-size:13px}
.vf-card-footer strong{font-size:26px;color:var(--vf-blue)}

/* Sobre nós */
.vf-about{background:#f7f9fc}
.vf-about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:center}
.vf-eyebrow{display:inline-block;color:var(--vf-blue);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:13px;margin-bottom:12px}
.vf-about h2{font-size:clamp(28px,3.6vw,38px);line-height:1.2;margin:0 0 18px;font-weight:800}
.vf-about p{color:var(--vf-muted);line-height:1.7;font-size:17px;margin:0 0 20px}
.vf-checks{list-style:none;padding:0;margin:0 0 28px;display:grid;gap:10px}
.vf-checks li{padding-left:30px;position:relative;font-weight:500}
.vf-checks li::before{content:"✓";position:absolute;left:0;top:0;width:20px;height:20px;border-radius:50%;background:var(--vf-blue);color:#fff;font-size:12px;display:grid;place-items:center}
.vf-stats{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.vf-stat{background:#fff;border:1px solid var(--vf-border);border-radius:16px;padding:28px 20px;text-align:center}
.vf-stat strong{display:block;font-size:36px;color:var(--vf-blue);margin-bottom:6px}
.vf-stat span{color:var(--vf-muted);font-size:15px}

/* CTA e rodapé */
.vf-cta{background:linear-gradient(135deg,var(--vf-blue),#3b9bff);color:#fff;text-align:center;padding:80px 0}
.vf-cta h2{font-size:clamp(28px,4vw,40px);margin:0 0 12px}
.vf-cta p{margin:0 0 30px;font-size:18px;opacity:.92}
.vf-footer{border-top:1px solid var(--vf-border);padding:28px 0}
.vf-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.vf-footer small{color:var(--vf-muted)}

/* Responsivo */
@media (max-width:900px){
  .vf-links{display:none}
  .vf-about-grid{grid-template-columns:1fr}
}
@media (max-width:640px){
  .vf-hero{padding:90px 0 80px}
  .vf-carousel{padding:0 0 44px}
  .vf-arrow-left{left:4px}.vf-arrow-right{right:4px}
  .vf-link-plain{display:none}
}
@media (prefers-reduced-motion:reduce){
  .vf-track{transition:none}
  html{scroll-behavior:auto}
}
`;