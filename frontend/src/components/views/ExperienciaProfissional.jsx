import { SimplePieChart, SimpleBarChart, ExpandableDiscursiveCard } from './ChartComponents';

export default function ExperienciaProfissional({ data }) {
  if (!data) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>Experiência Profissional</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Alinhamento entre qualificação e atividades desenvolvidas</p>
      </div>
      <div className="dashboard-grid">
        <SimplePieChart data={data.atividadesCorrespondemChart} title="Atividades Atuais Correspondem à Qualificação?" />
        <SimplePieChart data={data.atuouOutrasAreasChart} title="Já Atuou em Outras Áreas da SEDUC?" />
        
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <ExpandableDiscursiveCard data={data.outrasAreasChart} title="Outras Áreas Citadas (Top 15 palavras — clique para ver todas as respostas)" total={t} />
        </div>
      </div>
    </div>
  );
}
