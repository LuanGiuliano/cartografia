import { SimpleBarChart } from './ChartComponents';

export default function PercepcaoInstitucional({ data }) {
  if (!data || !data.percepcaoCharts) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>Percepção Institucional</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Visão Geral, Comunicação, Solução de Problemas, Proatividade e Planejamento (Escala 1 a 5)</p>
      </div>
      <div className="dashboard-grid">
        {data.percepcaoCharts.map((chart, index) => (
          <div key={index} className="col-span-6" style={{ display: 'grid', gridColumn: 'span 6' }}>
            <SimpleBarChart data={chart.data} title={chart.label} total={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
