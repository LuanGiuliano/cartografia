import { SimpleBarChart, SimplePieChart } from './ChartComponents';

export default function NecessidadeFormacao({ data }) {
  if (!data) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>Necessidade de Formação</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Interesse em capacitações, áreas prioritárias e perfis de cursos</p>
      </div>
      <div className="dashboard-grid">
        <SimplePieChart data={data.novosCursosChart} title="Pretende Participar de Novos Cursos?" />
        <SimplePieChart data={data.perfilCursosChart} title="Perfil de Cursos que Pretende Participar" />
        <SimpleBarChart data={data.areasPrioritariasChart?.slice(0, 10)} title="Top 10 Áreas Prioritárias para Formação" total={t} layout="vertical" />
      </div>
    </div>
  );
}
