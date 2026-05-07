import { Filter, Printer } from 'lucide-react';
import './GlobalFilters.css';

export default function GlobalFilters({ 
  diretorias, 
  coordenacoes, 
  selectedDiretoria, 
  setSelectedDiretoria, 
  selectedCoordenacao, 
  setSelectedCoordenacao,
  handlePrint
}) {
  return (
    <div className="global-filters-container print-hide">
      <div className="filters-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--accent-color)" />
          <h3>Filtros Globais</h3>
        </div>
        <button 
          onClick={() => handlePrint && handlePrint()}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: 'var(--accent-color)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: '500', 
            fontSize: '0.9rem',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          title="Gerar PDF da aba atual"
        >
          <Printer size={16} />
          Gerar PDF
        </button>
      </div>
      
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="diretoria">Diretoria</label>
          <select 
            id="diretoria"
            value={selectedDiretoria}
            onChange={(e) => setSelectedDiretoria(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas as Diretorias</option>
            {diretorias.map(dir => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="coordenacao">Coordenação</label>
          <select 
            id="coordenacao"
            value={selectedCoordenacao}
            onChange={(e) => setSelectedCoordenacao(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas as Coordenações</option>
            {coordenacoes.map(coord => (
              <option key={coord} value={coord}>{coord}</option>
            ))}
          </select>
        </div>
        
        {(selectedDiretoria || selectedCoordenacao) && (
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSelectedDiretoria('');
              setSelectedCoordenacao('');
            }}
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}
