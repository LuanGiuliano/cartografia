import { SimpleBarChart, ExpandableDiscursiveCard } from './ChartComponents';

export default function ClimaOrganizacional({ data }) {
  if (!data) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>Clima Organizacional</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Avaliação do ambiente de trabalho e relacionamentos (Escala 1 a 5)</p>
      </div>
      <div className="dashboard-grid">
        <SimpleBarChart data={data.climaComunicacaoChart} title="Comunicação Interna Clara e Objetiva" subtitle="Avalie na sua área de atuação a: Comunicação interna clara e objetiva." total={t} />
        <SimpleBarChart data={data.climaClarezaChart} title="Clareza das Atribuições" subtitle="Avalie na sua área de atuação a: Clareza das atribuições repassadas." total={t} />
        <SimpleBarChart data={data.climaEmpatiaChart} title="Empatia e Cooperação entre Pares" subtitle="Avalie na sua área de atuação a: Empatia e cooperação entre os pares." total={t} />
        
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <ExpandableDiscursiveCard data={data.desafiosClimaChart} title="Principais Desafios Citados (Top 15 palavras — clique para ver todas as respostas)" total={t} />
        </div>
      </div>
    </div>
  );
}
