import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import {
  Bike,
  Check,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  History,
  House,
  Menu,
  PackageCheck,
  Pencil,
  Plus,
  Save,
  Settings,
  ShoppingCart,
  Sparkles,
  Trash2,
  Wrench,
  X,
} from "lucide-react";

const initialParts = [
  { id: 1, name: "Parafuso do banco", category: "Banco", status: "trocar", price: 12.9, store: "Shopee", notes: "Substituir fixação do banco." },
  { id: 2, name: "Kit retentor bengala", category: "Suspensão dianteira", status: "trocar", price: 43.99, store: "Shopee", notes: "Confirmar medida da bengala antes da compra." },
  { id: 3, name: "Retrovisor mini", category: "Frente", status: "comprar", price: 27.98, store: "Shopee", notes: "Par de retrovisores." },
  { id: 4, name: "Kit frente 160", category: "Frente", status: "verificar", price: 152, store: "Shopee", notes: "Frente adaptada. Confirmar geração/modelo." },
  { id: 5, name: "Kit estribo completo", category: "Estribo", status: "comprar", price: 154.44, store: "Mercado Livre", notes: "" },
  { id: 6, name: "Kit seta", category: "Elétrica", status: "comprar", price: 44.99, store: "Shopee", notes: "" },
  { id: 7, name: "Kit carenagem", category: "Carenagem", status: "comprar", price: 189.89, store: "Shopee", notes: "" },
  { id: 8, name: "Óleo do motor", category: "Motor", status: "trocar", price: 39.99, store: "Shopee", notes: "Troca preventiva." },
  { id: 9, name: "Kit ferramentas", category: "Ferramentas", status: "comprar", price: 33.99, store: "Shopee", notes: "" },
];

const statusOptions = [
  ["ok", "OK"],
  ["verificar", "Verificar"],
  ["trocar", "Trocar"],
  ["comprar", "Comprar"],
  ["comprada", "Comprada"],
  ["instalada", "Instalada"],
];

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Wheel({ position, active, onClick }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]} onClick={onClick}>
      <mesh>
        <torusGeometry args={[0.62, 0.13, 16, 48]} />
        <meshStandardMaterial color={active ? "#d8d8d8" : "#080808"} roughness={0.85} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.42, 0.035, 12, 36]} />
        <meshStandardMaterial color="#777" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Motorcycle({ selectedCategory, onCategory }) {
  const color = (category, normal) => selectedCategory === category ? "#ededed" : normal;

  return (
    <group rotation={[0, -0.25, 0]} position={[0, -0.65, 0]}>
      <Wheel position={[-1.45, 0, 0]} active={selectedCategory === "Rodas"} onClick={() => onCategory("Rodas")} />
      <Wheel position={[1.45, 0, 0]} active={selectedCategory === "Rodas"} onClick={() => onCategory("Rodas")} />

      <mesh position={[0, 0.15, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[1.8, 0.16, 0.14]} />
        <meshStandardMaterial color="#242424" metalness={0.7} />
      </mesh>

      <mesh position={[-0.2, 0.62, 0]} rotation={[0, 0, -0.12]} onClick={() => onCategory("Carenagem")}>
        <boxGeometry args={[1.15, 0.55, 0.58]} />
        <meshStandardMaterial color={color("Carenagem", "#151515")} roughness={0.28} />
      </mesh>

      <mesh position={[-0.42, 0.97, 0]} onClick={() => onCategory("Banco")}>
        <boxGeometry args={[1.15, 0.18, 0.48]} />
        <meshStandardMaterial color={color("Banco", "#0d0d0d")} roughness={0.65} />
      </mesh>

      <mesh position={[0.38, 0.2, 0]} onClick={() => onCategory("Motor")}>
        <boxGeometry args={[0.72, 0.65, 0.56]} />
        <meshStandardMaterial color={color("Motor", "#5b5b5b")} metalness={0.65} roughness={0.35} />
      </mesh>

      <group onClick={() => onCategory("Suspensão dianteira")}>
        <mesh position={[1.05, 0.48, 0.22]} rotation={[0, 0, -0.18]}>
          <cylinderGeometry args={[0.045, 0.045, 1.25, 18]} />
          <meshStandardMaterial color={color("Suspensão dianteira", "#8a8a8a")} metalness={0.8} />
        </mesh>
        <mesh position={[1.05, 0.48, -0.22]} rotation={[0, 0, -0.18]}>
          <cylinderGeometry args={[0.045, 0.045, 1.25, 18]} />
          <meshStandardMaterial color={color("Suspensão dianteira", "#8a8a8a")} metalness={0.8} />
        </mesh>
      </group>

      <group onClick={() => onCategory("Frente")}>
        <mesh position={[0.93, 1.15, 0]}>
          <boxGeometry args={[0.48, 0.5, 0.52]} />
          <meshStandardMaterial color={color("Frente", "#bdbdbd")} roughness={0.25} />
        </mesh>
        <mesh position={[0.96, 1.17, 0.27]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#efefef" emissive="#333" />
        </mesh>
      </group>

      <mesh position={[0.75, 1.52, 0]} rotation={[0, 0, Math.PI / 2]} onClick={() => onCategory("Frente")}>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 16]} />
        <meshStandardMaterial color="#777" metalness={0.85} />
      </mesh>

      <mesh position={[-0.55, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={() => onCategory("Estribo")}>
        <cylinderGeometry args={[0.12, 0.12, 0.62, 18]} />
        <meshStandardMaterial color={color("Estribo", "#555")} metalness={0.8} />
      </mesh>
    </group>
  );
}

function BikeViewer({ selectedCategory, onCategory }) {
  return (
    <div className="viewer">
      <Canvas camera={{ position: [4.6, 2.7, 5.3], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 7, 5]} intensity={2.3} />
        <directionalLight position={[-4, 2, -4]} intensity={0.8} />
        <Motorcycle selectedCategory={selectedCategory} onCategory={onCategory} />
        <gridHelper args={[12, 24, "#242424", "#151515"]} position={[0, -1.3, 0]} />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={8} target={[0, 0.1, 0]} />
        <Environment preset="city" />
      </Canvas>
      <div className="viewer-badge"><Bike size={15} /> MODELO PROVISÓRIO</div>
      <div className="viewer-help">Arraste para girar <span>•</span> Scroll para zoom <span>•</span> Clique nas regiões</div>
    </div>
  );
}

function PartModal({ part, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(part);
  const update = (field, value) => setForm((old) => ({ ...old, [field]: value }));

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div><span>FICHA DA PEÇA</span><h2>{part.id ? "Editar componente" : "Nova peça"}</h2></div>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="form-grid">
          <label className="full">Nome da peça
            <input value={form.name} onChange={(e) => update("name", e.target.value)} />
          </label>
          <label>Categoria
            <input value={form.category} onChange={(e) => update("category", e.target.value)} />
          </label>
          <label>Status
            <select value={form.status} onChange={(e) => update("status", e.target.value)}>
              {statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label>Valor
            <input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} />
          </label>
          <label>Loja
            <input value={form.store} onChange={(e) => update("store", e.target.value)} />
          </label>
          <label className="full">Observações
            <textarea rows="4" value={form.notes || ""} onChange={(e) => update("notes", e.target.value)} />
          </label>
        </div>

        <div className="modal-actions">
          {part.id && <button className="danger" onClick={() => onDelete(part.id)}><Trash2 size={17} /> Excluir</button>}
          <button className="secondary" onClick={onClose}>Cancelar</button>
          <button className="primary" onClick={() => onSave({ ...form, price: Number(form.price) || 0 })}><Save size={17} /> Salvar</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("Visão geral");
  const [parts, setParts] = useState(initialParts);
  const [selectedId, setSelectedId] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState("Suspensão dianteira");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalPart, setModalPart] = useState(null);

  const selectedPart = parts.find((p) => p.id === selectedId) || parts[0];

  const total = useMemo(() => parts.reduce((sum, p) => sum + Number(p.price || 0), 0), [parts]);
  const spent = useMemo(() => parts.filter((p) => ["comprada", "instalada"].includes(p.status)).reduce((sum, p) => sum + Number(p.price || 0), 0), [parts]);
  const pending = total - spent;

  const choosePart = (part) => {
    setSelectedId(part.id);
    setSelectedCategory(part.category);
  };

  const chooseCategory = (category) => {
    setSelectedCategory(category);
    const found = parts.find((p) => p.category === category);
    if (found) setSelectedId(found.id);
  };

  const savePart = (part) => {
    if (!part.name.trim()) return;
    if (part.id) {
      setParts((old) => old.map((p) => p.id === part.id ? part : p));
      setSelectedId(part.id);
      setSelectedCategory(part.category);
    } else {
      const created = { ...part, id: Date.now() };
      setParts((old) => [...old, created]);
      setSelectedId(created.id);
      setSelectedCategory(created.category);
    }
    setModalPart(null);
  };

  const deletePart = (id) => {
    setParts((old) => old.filter((p) => p.id !== id));
    setModalPart(null);
    const next = parts.find((p) => p.id !== id);
    if (next) choosePart(next);
  };

  const createPart = () => setModalPart({
    id: null, name: "", category: "Outros", status: "verificar", price: 0, store: "", notes: ""
  });

  const nav = [
    ["Visão geral", House], ["Minha moto", Bike], ["Peças", Wrench],
    ["Compras", ShoppingCart], ["Histórico", History], ["Projeto final", Sparkles],
  ];

  const statusName = Object.fromEntries(statusOptions);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Bike size={24} /></div>
          <div><strong>MINHA MOTO</strong><span>3D GARAGE</span></div>
          <button className="close-menu" onClick={() => setMobileMenu(false)}><X size={20} /></button>
        </div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button key={label} className={active === label ? "active" : ""} onClick={() => { setActive(label); setMobileMenu(false); }}>
              <Icon size={19} /><span>{label}</span>{active === label && <ChevronRight size={16} className="nav-arrow" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button><Settings size={19} /><span>Configurações</span></button>
          <div className="garage-version">GARAGE SYSTEM • V2.0</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileMenu(true)}><Menu size={22} /></button>
          <div><p className="eyebrow">GARAGEM DIGITAL</p><h1>{active}</h1></div>
          <button className="add-button" onClick={createPart}><Plus size={17} /> Nova peça</button>
          <div className="vehicle-chip"><span className="vehicle-dot" /><div><strong>CG Fan 125</strong><small>2011 • Preta</small></div></div>
        </header>

        <section className="stats">
          <article><div className="stat-icon"><Wrench size={20} /></div><div><span>Peças cadastradas</span><strong>{parts.length}</strong></div></article>
          <article><div className="stat-icon"><PackageCheck size={20} /></div><div><span>Comprado/instalado</span><strong>{money.format(spent)}</strong></div></article>
          <article><div className="stat-icon"><ShoppingCart size={20} /></div><div><span>Falta investir</span><strong>{money.format(pending)}</strong></div></article>
          <article><div className="stat-icon"><CircleDollarSign size={20} /></div><div><span>Projeto total</span><strong>{money.format(total)}</strong></div></article>
        </section>

        <section className="workspace">
          <div className="viewer-card">
            <div className="section-heading"><div><span>VISUALIZADOR 3D</span><h2>Mapa da moto</h2></div><div className="live-label"><span /> INTERATIVO</div></div>
            <BikeViewer selectedCategory={selectedCategory} onCategory={chooseCategory} />
          </div>

          <aside className="details-card">
            <div className="section-heading"><div><span>COMPONENTE</span><h2>Peça selecionada</h2></div><button className="icon-button" onClick={() => setModalPart(selectedPart)}><Pencil size={17} /></button></div>
            {selectedPart ? <>
              <div className="part-hero"><div className="part-icon"><Wrench size={27} /></div><div><span>{selectedPart.category}</span><h3>{selectedPart.name}</h3></div></div>
              <div className="detail-row"><span>Status</span><strong className={`status ${selectedPart.status}`}>{statusName[selectedPart.status]}</strong></div>
              <div className="detail-row"><span>Valor</span><strong>{money.format(selectedPart.price)}</strong></div>
              <div className="detail-row"><span>Loja</span><strong>{selectedPart.store || "Não informada"}</strong></div>
              <div className="notes-box"><span>OBSERVAÇÕES</span><p>{selectedPart.notes || "Nenhuma observação cadastrada."}</p></div>
              <div className="notice"><Gauge size={18} /><p>O modelo atual é provisório. As regiões clicáveis já estão preparadas para receber o modelo real da sua moto futuramente.</p></div>
              <button className="primary-button" onClick={() => setModalPart(selectedPart)}><Pencil size={17} /> Editar peça</button>
            </> : <div className="empty">Cadastre uma peça para começar.</div>}
          </aside>
        </section>

        <section className="bottom-grid">
          <article className="panel">
            <div className="section-heading"><div><span>INVENTÁRIO</span><h2>Peças do projeto</h2></div><button className="text-button" onClick={createPart}>+ Adicionar</button></div>
            <div className="parts-list">
              {parts.map((part) => (
                <button key={part.id} className={`part-item ${selectedId === part.id ? "selected" : ""}`} onClick={() => choosePart(part)}>
                  <div className="part-mini-icon">{["comprada","instalada"].includes(part.status) ? <Check size={17}/> : <Wrench size={17}/>}</div>
                  <div className="part-copy"><strong>{part.name}</strong><span>{part.category} • {part.store || "Sem loja"}</span></div>
                  <div className="part-price"><strong>{money.format(part.price)}</strong><span className={`status-dot ${part.status}`} /></div>
                </button>
              ))}
            </div>
          </article>

          <article className="panel project-panel">
            <div className="section-heading"><div><span>PROJETO</span><h2>Resumo da garagem</h2></div></div>
            <div className="project-bike"><Bike size={58} strokeWidth={1.2} /></div>
            <h3>CG Fan 125 2011</h3>
            <p>Base da moto cadastrada. Frente adaptada será identificada com precisão quando adicionarmos as fotos reais.</p>
            <div className="summary-lines">
              <div><span>Itens</span><strong>{parts.length}</strong></div>
              <div><span>Investimento previsto</span><strong>{money.format(total)}</strong></div>
              <div><span>Concluído</span><strong>{parts.filter(p => p.status === "instalada").length}</strong></div>
            </div>
          </article>
        </section>
      </main>

      {modalPart && <PartModal part={modalPart} onClose={() => setModalPart(null)} onSave={savePart} onDelete={deletePart} />}
    </div>
  );
}

export default App;
