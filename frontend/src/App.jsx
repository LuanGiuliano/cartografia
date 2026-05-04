import { useEffect, useState } from 'react';
import { fetchDashboardData, processData } from './services/dataService';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake,
  Lightbulb,
  Award,
  BookOpen,
  LayoutDashboard
} from 'lucide-react';
import './App.css';

// Components
import SplashScreen from './components/SplashScreen';
import MarajoaraHeader from './components/MarajoaraHeader';
import GlobalFilters from './components/GlobalFilters';

// Views
import IdOrganizacional from './components/views/IdOrganizacional';
import FormacaoAcademica from './components/views/FormacaoAcademica';
import ExperienciaProfissional from './components/views/ExperienciaProfissional';
import ClimaOrganizacional from './components/views/ClimaOrganizacional';
import PercepcaoInstitucional from './components/views/PercepcaoInstitucional';
import CompetenciasHabilidades from './components/views/CompetenciasHabilidades';
import NecessidadeFormacao from './components/views/NecessidadeFormacao';

const VIEWS = [
  { id: 'id-organizacional', label: 'ID Organizacional', icon: <Building2 size={20} />, component: IdOrganizacional },
  { id: 'formacao', label: 'Formação Acadêmica', icon: <GraduationCap size={20} />, component: FormacaoAcademica },
  { id: 'experiencia', label: 'Experiência Profissional', icon: <Briefcase size={20} />, component: ExperienciaProfissional },
  { id: 'clima', label: 'Clima Organizacional', icon: <HeartHandshake size={20} />, component: ClimaOrganizacional },
  { id: 'percepcao', label: 'Percepção Institucional', icon: <Lightbulb size={20} />, component: PercepcaoInstitucional },
  { id: 'competencias', label: 'Competências e Habilidades', icon: <Award size={20} />, component: CompetenciasHabilidades },
  { id: 'necessidade', label: 'Necessidade de Formação', icon: <BookOpen size={20} />, component: NecessidadeFormacao },
];

function App() {
  const [rawDataset, setRawDataset] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(VIEWS[0].id);
  const [showSplash, setShowSplash] = useState(true);

  // Filter states
  const [selectedDiretoria, setSelectedDiretoria] = useState('');
  const [selectedCoordenacao, setSelectedCoordenacao] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData();
        setRawDataset(dashboardData.rawData);
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Recalculate data when filters change
  useEffect(() => {
    if (rawDataset.length > 0) {
      let filteredRows = [...rawDataset];

      if (selectedDiretoria) {
        filteredRows = filteredRows.filter(row => row['Diretoria'] === selectedDiretoria);
      }
      
      if (selectedCoordenacao) {
        filteredRows = filteredRows.filter(row => row['Coordenação'] === selectedCoordenacao);
      }

      setData(processData(filteredRows));
    }
  }, [selectedDiretoria, selectedCoordenacao, rawDataset]);

  // Dynamic filter options
  const diretorias = [...new Set(rawDataset.map(row => row['Diretoria']))].filter(Boolean).sort();
  const coordenacoes = [...new Set(rawDataset.map(row => row['Coordenação']))].filter(Boolean).sort();

  if (loading || showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} isLoading={loading} />;
  }

  const ActiveComponent = VIEWS.find(v => v.id === activeTab)?.component || IdOrganizacional;

  return (
    <>
      <MarajoaraHeader />
      <div className="app-layout" style={{ height: 'calc(100vh - 28px)', minHeight: 'calc(100vh - 28px)' }}>
        {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <img src="/brasao.png" alt="Brasão do Estado do Pará" style={{ height: '32px', objectFit: 'contain' }} />
            <h2 className="text-gradient" style={{ fontSize: '1.2rem', margin: 0 }}>SAGEP-SEDUC</h2>
          </div>
          <p style={{ fontWeight: '500', fontSize: '1rem', color: 'var(--petroleum-blue)', fontFamily: 'Georgia, serif', fontStyle: 'italic', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            Cartografia de Saberes
          </p>
          <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <p style={{ color: 'var(--success-color)', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' }}>
              {data?.totalResponses || 0} Respostas Recebidas
            </p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {VIEWS.map((view) => (
            <div 
              key={view.id}
              className={`nav-item ${activeTab === view.id ? 'active' : ''}`}
              onClick={() => setActiveTab(view.id)}
            >
              {view.icon}
              <span>{view.label}</span>
            </div>
          ))}
        </nav>
      </aside>

        {/* Main Content Area */}
        <main className="main-content">
          
          <GlobalFilters 
            diretorias={diretorias}
            coordenacoes={coordenacoes}
            selectedDiretoria={selectedDiretoria}
            setSelectedDiretoria={setSelectedDiretoria}
            selectedCoordenacao={selectedCoordenacao}
            setSelectedCoordenacao={setSelectedCoordenacao}
          />
          <ActiveComponent data={data} />
        </main>
      </div>
    </>
  );
}

export default App;
