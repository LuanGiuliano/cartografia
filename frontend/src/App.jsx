import { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { fetchDashboardData, processData } from './services/dataService';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake,
  Lightbulb,
  Award,
  BookOpen,
  LayoutDashboard,
  Info,
  Printer
} from 'lucide-react';
import './App.css';

// Components
import SplashScreen from './components/SplashScreen';
import GlobalFilters from './components/GlobalFilters';
import InfoModal from './components/InfoModal';

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
  const [showInfoModal, setShowInfoModal] = useState(false);

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Relatorio_${activeTab}`,
  });

  const fullReportRef = useRef(null);
  const handlePrintFull = useReactToPrint({
    contentRef: fullReportRef,
    documentTitle: `Relatorio_Completo_Cartografia_Saberes`,
  });

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
      <div className="app-layout" style={{ height: '100vh', minHeight: '100vh' }}>
        {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <img src="/brasao.png" alt="Brasão do Estado do Pará" style={{ height: '32px', objectFit: 'contain' }} />
            <h2 className="text-gradient" style={{ fontSize: '1.2rem', margin: 0 }}>SAGEP-SEDUC</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <p style={{ fontWeight: '500', fontSize: '1rem', color: 'var(--petroleum-blue)', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: 0 }}>
              Cartografia de Saberes
            </p>
            <div 
              title="Mapeamento e Análise dos Perfis e Competências dos Servidores da SAGEP / SEDUC-PA" 
              style={{ cursor: 'pointer', color: 'var(--petroleum-blue)', display: 'flex' }}
              onClick={() => setShowInfoModal(true)}
            >
              <Info size={18} />
            </div>
          </div>
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
        
        <div style={{ padding: '0 1.5rem', marginTop: '1rem' }}>
          <button 
            onClick={handlePrintFull}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--petroleum-blue)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'opacity 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Printer size={18} />
            Relatório Completo
          </button>
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '4px' }}>© 2026 SAGEP - Secretaria Adjunta de Gestão de Pessoas</div>
          <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Desenvolvido por Luan Giuliano</div>
        </div>
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
            handlePrint={handlePrint}
          />
          <div ref={contentRef} className="print-content-wrapper">
            {/* Cabecalho de Impressao (Oculto na tela, visivel no PDF) */}
            <div className="print-only print-header" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src="/seduc-logo.png" alt="Logo Seduc" style={{ height: '45px', objectFit: 'contain' }} />
                <div>
                  <h1 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '26px', margin: 0, color: '#1a365d' }}>
                    Cartografia de Saberes
                  </h1>
                  <h2 style={{ fontSize: '18px', margin: 0, marginTop: '4px', color: '#4a5568', fontWeight: '500' }}>
                    {VIEWS.find(v => v.id === activeTab)?.label}
                  </h2>
                </div>
              </div>
              <div style={{ width: '100%', height: '3px', backgroundColor: '#10b981', marginTop: '15px', borderRadius: '2px' }}></div>
            </div>

            <ActiveComponent data={data} />

            {/* Rodape de Impressao (Oculto na tela, visivel no PDF) */}
            <div className="print-only print-footer" style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
              <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px', color: '#4a5568', textTransform: 'uppercase' }}>
                {
                  selectedDiretoria && selectedCoordenacao 
                    ? `${selectedDiretoria} > ${selectedCoordenacao}`
                    : selectedDiretoria || selectedCoordenacao || "Visão Geral (Nenhum filtro aplicado)"
                }
              </p>
              <p style={{ fontSize: '12px', color: '#718096', margin: 0, fontWeight: '500' }}>
                Secretaria de Educação do Estado do Pará - SEDUC/PA
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Relatório Completo (Oculto na tela, visível apenas via ref) */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1040px', opacity: 0, overflow: 'hidden' }}>
        <div ref={fullReportRef}>
          {VIEWS.map((view, index) => (
            <div key={view.id} style={{ pageBreakBefore: index > 0 ? 'always' : 'auto', marginBottom: '2rem' }}>
              {/* Cabecalho de Impressao do Relatorio Completo */}
              <div className="print-header" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src="/seduc-logo.png" alt="Logo Seduc" style={{ height: '45px', objectFit: 'contain' }} />
                  <div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '26px', margin: 0, color: '#1a365d' }}>
                      Cartografia de Saberes
                    </h1>
                    <h2 style={{ fontSize: '18px', margin: 0, marginTop: '4px', color: '#4a5568', fontWeight: '500' }}>
                      {view.label}
                    </h2>
                  </div>
                </div>
                <div style={{ width: '100%', height: '3px', backgroundColor: '#10b981', marginTop: '15px', borderRadius: '2px' }}></div>
              </div>

              <view.component data={data} />

              {/* Rodape de Impressao do Relatorio Completo */}
              <div className="print-footer" style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #e2e8f0' }}>
                <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px', color: '#4a5568', textTransform: 'uppercase' }}>
                  {
                    selectedDiretoria && selectedCoordenacao 
                      ? `${selectedDiretoria} > ${selectedCoordenacao}`
                      : selectedDiretoria || selectedCoordenacao || "Visão Geral (Nenhum filtro aplicado)"
                  }
                </p>
                <p style={{ fontSize: '12px', color: '#718096', margin: 0, fontWeight: '500' }}>
                  Secretaria de Educação do Estado do Pará - SEDUC/PA
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </>
  );
}

export default App;
