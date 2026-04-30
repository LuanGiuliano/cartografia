import { Filter } from 'lucide-react';
import './GlobalFilters.css';

export default function GlobalFilters({ 
  diretorias, 
  coordenacoes, 
  selectedDiretoria, 
  setSelectedDiretoria, 
  selectedCoordenacao, 
  setSelectedCoordenacao 
}) {
  return (
    <div className="global-filters-container">
      <div className="filters-header">
        <Filter size={18} color="var(--accent-color)" />
        <h3>Filtros Globais</h3>
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
