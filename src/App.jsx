import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import {
  Bike,
  Box,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  History,
  House,
  Menu,
  PackageCheck,
  Settings,
  ShoppingCart,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

const parts = [
  { id: 1, name: "Parafuso do banco", category: "Banco", status: "trocar", price: 12.9, store: "Shopee" },
  { id: 2, name: "Kit retentor bengala", category: "Suspensão dianteira", status: "trocar", price: 43.99, store: "Shopee" },
  { id: 3, name: "Retrovisor mini", category: "Frente", status: "comprar", price: 27.98, store: "Shopee" },
  { id: 4, name: "Kit frente 160", category: "Frente", status: "verificar", price: 152, store: "Shopee" },
  { id: 5, name: "Kit estribo completo", category: "Estribo", status: "comprar", price: 154.44, store: "Mercado Livre" },
  { id: 6, name: "Kit seta", category: "Elétrica", status: "comprar", price: 44.99, store: "Shopee" },
  { id: 7, name: "Kit carenagem", category: "Carenagem", status: "comprar", price: 189.89, store: "Shopee" },
  { id: 8, name: "Óleo do motor", category: "Motor", status: "trocar", price: 39.99, store: "Shopee" },
  { id: 9, name: "Kit ferramentas", category: "Ferramentas", status: "comprar", price: 33.99, store: "Shopee" },
];

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const statusLabel = {
  ok: "OK",
  verificar: "Verificar",
  trocar: "Trocar",
  comprar: "Comprar",
  comprada: "Comprada",
  instalada: "Instalada",
};

function Wheel({ position }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.62, 0.13, 16, 48]} />
        <meshStandardMaterial color="#080808" roughness={0.85} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.42, 0.035, 12, 36]} />
        <meshStandardMaterial color="#777" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

function TemporaryBike({ selectedPart, onSelect }) {
  const selected = selectedPart?.category;
  const highlight = (category, normal = "#252525") =>
    selected === category ? "#d7d7d7" : normal;

  return (
    <group rotation={[0, -0.25, 0]} position={[0, -0.65, 0]}>
      <Wheel position={[-1.45, 0, 0]} />
      <Wheel position={[1.45, 0, 0]} />

      <mesh position={[0, 0.15, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[1.8, 0.16, 0.14]} />
        <meshStandardMaterial color="#252525" metalness={0.7} />
      </mesh>

      <mesh
        position={[-0.2, 0.62, 0]}
        rotation={[0, 0, -0.12]}
        onClick={() => onSelect(parts.find((p) => p.category === "Carenagem"))}
      >
        <boxGeometry args={[1.15, 0.55, 0.58]} />
        <meshStandardMaterial color={highlight("Carenagem", "#171717")} roughness={0.28} />
      </mesh>

      <mesh
        position={[-0.42, 0.97, 0]}
        onClick={() => onSelect(parts.find((p) => p.category === "Banco"))}
      >
        <boxGeometry args={[1.15, 0.18, 0.48]} />
        <meshStandardMaterial color={highlight("Banco", "#101010")} roughness={0.65} />
      </mesh>

      <mesh
        position={[0.38, 0.2, 0]}
        onClick={() => onSelect(parts.find((p) => p.category === "Motor"))}
      >
        <boxGeometry args={[0.72, 0.65, 0.56]} />
        <meshStandardMaterial color={highlight("Motor", "#5b5b5b")} metalness={0.65} roughness={0.35} />
      </mesh>

      <group onClick={() => onSelect(parts.find((p) => p.category === "Suspensão dianteira"))}>
        <mesh position={[1.05, 0.48, 0.22]} rotation={[0, 0, -0.18]}>
          <cylinderGeometry args={[0.045, 0.045, 1.25, 18]} />
          <meshStandardMaterial color={highlight("Suspensão dianteira", "#8a8a8a")} metalness={0.8} />
        </mesh>
        <mesh position={[1.05, 0.48, -0.22]} rotation={[0, 0, -0.18]}>
          <cylinderGeometry args={[0.045, 0.045, 1.25, 18]} />
          <meshStandardMaterial color={highlight("Suspensão dianteira", "#8a8a8a")} metalness={0.8} />
        </mesh>
      </group>

      <group onClick={() => onSelect(parts.find((p) => p.category === "Frente"))}>
        <mesh position={[0.93, 1.15, 0]}>
          <boxGeometry args={[0.48, 0.5, 0.52]} />
          <meshStandardMaterial color={highlight("Frente", "#c1c1c1")} roughness={0.25} />
        </mesh>
        <mesh position={[0.96, 1.17, 0.27]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#efefef" emissive="#333" />
        </mesh>
      </group>

      <mesh position={[0.75, 1.52, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 16]} />
        <meshStandardMaterial color="#777" metalness={0.85} />
      </mesh>

      <mesh position={[-0.55, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.62, 18]} />
        <meshStandardMaterial color="#555" metalness={0.8} />
      </mesh>
    </group>
  );
}

function BikeViewer({ selectedPart, onSelect }) {
  return (
    <div className="viewer">
      <Canvas camera={{ position: [4.6, 2.7, 5.3], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 7, 5]} intensity={2.3} />
        <directionalLight position={[-4, 2, -4]} intensity={0.8} />
        <TemporaryBike selectedPart={selectedPart} onSelect={onSelect} />
        <gridHelper args={[12, 24, "#242424", "#151515"]} position={[0, -1.3, 0]} />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={8} target={[0, 0.1, 0]} />
        <Environment preset="city" />
      </Canvas>

      <div className="viewer-badge">
        <Box size={15} />
        MODELO PROVISÓRIO
      </div>

      <div className="viewer-help">
        Arraste para girar <span>•</span> Scroll para zoom <span>•</span> Clique nas peças
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("Visão geral");
  const [selectedPart, setSelectedPart] = useState(parts[1]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const total = useMemo(() => parts.reduce((sum, part) => sum + part.price, 0), []);

  const nav = [
    ["Visão geral", House],
    ["Minha moto", Bike],
    ["Peças", Wrench],
    ["Compras", ShoppingCart],
    ["Histórico", History],
    ["Projeto final", Sparkles],
  ];

  const trocar = parts.filter((p) => p.status === "trocar").length;
  const verificar = parts.filter((p) => p.status === "verificar").length;
  const comprar = parts.filter((p) => p.status === "comprar").length;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Bike size={24} /></div>
          <div>
            <strong>MINHA MOTO</strong>
            <span>3D GARAGE</span>
          </div>
          <button className="close-menu" onClick={() => setMobileMenu(false)}><X size={20} /></button>
        </div>

        <nav>
          {nav.map(([label, Icon]) => (
            <button
              key={label}
              className={active === label ? "active" : ""}
              onClick={() => {
                setActive(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
              {active === label && <ChevronRight size={16} className="nav-arrow" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button>
            <Settings size={19} />
            <span>Configurações</span>
          </button>
          <div className="garage-version">GARAGE SYSTEM • V1.0</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileMenu(true)}>
            <Menu size={22} />
          </button>
          <div>
            <p className="eyebrow">GARAGEM DIGITAL</p>
            <h1>{active}</h1>
          </div>
          <div className="vehicle-chip">
            <span className="vehicle-dot" />
            <div>
              <strong>CG Fan 125</strong>
              <small>2011 • Preta</small>
            </div>
          </div>
        </header>

        <section className="stats">
          <article>
            <div className="stat-icon"><Wrench size={20} /></div>
            <div><span>Trocar</span><strong>{trocar}</strong></div>
          </article>
          <article>
            <div className="stat-icon"><PackageCheck size={20} /></div>
            <div><span>Verificar</span><strong>{verificar}</strong></div>
          </article>
          <article>
            <div className="stat-icon"><ShoppingCart size={20} /></div>
            <div><span>Na lista</span><strong>{comprar}</strong></div>
          </article>
          <article>
            <div className="stat-icon"><CircleDollarSign size={20} /></div>
            <div><span>Planejado</span><strong className="money">{money.format(total)}</strong></div>
          </article>
        </section>

        <section className="workspace">
          <div className="viewer-card">
            <div className="section-heading">
              <div>
                <span>VISUALIZADOR</span>
                <h2>Sua moto</h2>
              </div>
              <div className="live-label"><span /> INTERATIVO</div>
            </div>
            <BikeViewer selectedPart={selectedPart} onSelect={setSelectedPart} />
          </div>

          <aside className="details-card">
            <div className="section-heading">
              <div>
                <span>COMPONENTE</span>
                <h2>Peça selecionada</h2>
              </div>
            </div>

            <div className="part-hero">
              <div className="part-icon"><Wrench size={27} /></div>
              <div>
                <span>{selectedPart.category}</span>
                <h3>{selectedPart.name}</h3>
              </div>
            </div>

            <div className="detail-row">
              <span>Status</span>
              <strong className={`status ${selectedPart.status}`}>{statusLabel[selectedPart.status]}</strong>
            </div>
            <div className="detail-row">
              <span>Valor previsto</span>
              <strong>{money.format(selectedPart.price)}</strong>
            </div>
            <div className="detail-row">
              <span>Loja</span>
              <strong>{selectedPart.store}</strong>
            </div>

            <div className="notice">
              <Gauge size={18} />
              <p>
                O modelo 3D atual é provisório. Quando tivermos as fotos da sua moto,
                vamos substituir pela representação correta sem perder os dados.
              </p>
            </div>

            <button className="primary-button">
              <Wrench size={18} />
              Gerenciar peça
            </button>
          </aside>
        </section>

        <section className="bottom-grid">
          <article className="panel">
            <div className="section-heading">
              <div>
                <span>MANUTENÇÃO</span>
                <h2>Próximas peças</h2>
              </div>
              <button className="text-button">Ver todas</button>
            </div>

            <div className="parts-list">
              {parts.slice(0, 5).map((part) => (
                <button
                  key={part.id}
                  className={`part-item ${selectedPart.id === part.id ? "selected" : ""}`}
                  onClick={() => setSelectedPart(part)}
                >
                  <div className="part-mini-icon"><Wrench size={17} /></div>
                  <div className="part-copy">
                    <strong>{part.name}</strong>
                    <span>{part.category} • {part.store}</span>
                  </div>
                  <div className="part-price">
                    <strong>{money.format(part.price)}</strong>
                    <span className={`status-dot ${part.status}`} />
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article className="panel project-panel">
            <div className="section-heading">
              <div>
                <span>EVOLUÇÃO</span>
                <h2>Projeto da moto</h2>
              </div>
            </div>
            <div className="project-bike"><Bike size={55} strokeWidth={1.2} /></div>
            <h3>CG Fan 125 2011</h3>
            <p>Base original com projeto de frente adaptada da linha CG/Fan 160.</p>
            <div className="project-progress">
              <div className="progress-copy">
                <span>Cadastro do projeto</span>
                <strong>25%</strong>
              </div>
              <div className="progress-track"><span style={{ width: "25%" }} /></div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
