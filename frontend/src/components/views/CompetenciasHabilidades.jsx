import { SimpleBarChart } from './ChartComponents';

export default function CompetenciasHabilidades({ data }) {
  if (!data) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>Competências e Habilidades</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Mapeamento de Habilidades dos Servidores (Respostas &gt;= 4)</p>
      </div>
      <div className="dashboard-grid">
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <SimpleBarChart data={data.allSkillsChart} title="Competências Declaradas" subtitle="Servidores que avaliaram seu domínio com nota 4 ou 5 nas seguintes habilidades:" total={t} layout="vertical" height={800} />
        </div>
      </div>
    </div>
  );
}
