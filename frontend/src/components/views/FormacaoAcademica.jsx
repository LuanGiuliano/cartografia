import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, ResponsiveContainer, LabelList, PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';
import { SimpleBarChart, SimplePieChart, ExpandableDiscursiveCard } from './ChartComponents';

export default function FormacaoAcademica({ data }) {
  if (!data) return null;
  const t = data.totalResponses;

  return (
    <div className="view-content">
      <div className="view-header">
        <h1>Formação Acadêmica</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Grau de escolaridade e áreas de formação</p>
      </div>
      <div className="dashboard-grid">
        <SimplePieChart data={data.escolaridadeChart} title="Grau de Escolaridade" subtitle="Indique sua escolaridade máxima:" colSpan={12} />
        
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <SimpleBarChart data={data.formacaoAreaChart?.slice(0, 15)} title="Áreas de Formação Mais Frequentes (Top 15)" subtitle="Sobre sua formação superior:" total={t} layout="vertical" height={450} yAxisWidth={200} />
        </div>
        
        <div className="col-span-12" style={{ display: 'grid', gridColumn: 'span 12' }}>
          <ExpandableDiscursiveCard data={data.outrosCursosChart} title="Outros Cursos Citados (Top 15 palavras — clique para ver todas as respostas)" subtitle="Caso não tenha o curso de sua formação superior entre os citados na questão anterior, escreva o nome do curso abaixo:" total={t} />
        </div>
      </div>
    </div>
  );
}
