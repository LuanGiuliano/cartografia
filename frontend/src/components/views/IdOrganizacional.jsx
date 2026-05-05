import { SimpleBarChart, SimplePieChart } from './ChartComponents';

export default function IdOrganizacional({ data }) {
  if (!data) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>ID Organizacional</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Distribuição dos servidores por setor e unidade</p>
      </div>
      <div className="dashboard-grid">
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <SimpleBarChart data={data.diretoriaChart?.slice(0, 15)} title="Setor/Diretoria (Top 15)" subtitle="Selecione o setor/diretoria em que está vinculado:" total={t} layout="vertical" yAxisWidth={250} />
        </div>
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <SimpleBarChart data={data.coordenacaoChart?.slice(0, 15)} title="Coordenação (Top 15)" subtitle="Selecione a coordenação a que está vinculado:" total={t} layout="vertical" height={500} yAxisWidth={250} />
        </div>
        
        <SimpleBarChart data={data.tempoAtuacaoChart} title="Tempo Médio de Atuação" subtitle="Indique o tempo médio de atuação na SEDUC:" total={t} />
        
        <SimplePieChart data={data.vinculoChart} title="Vínculo Funcional" subtitle="Indique o seu tipo de vínculo funcional:" />
        <SimplePieChart data={data.jornadaChart} title="Jornada de Trabalho Mensal" subtitle="Selecione sua jornada de trabalho mensal:" />
        
        <SimplePieChart data={data.cargoComissionadoChart} title="Exerce Cargo Comissionado ou Função Gratificada?" subtitle="Exerce cargo comissionado ou função gratificada?" />
        <SimplePieChart data={data.grupoFuncionalChart} title="Grupo Funcional a que Pertence" subtitle="Selecione o grupo funcional a que pertence:" />
      </div>
    </div>
  );
}
