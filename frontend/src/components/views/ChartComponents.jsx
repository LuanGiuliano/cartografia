import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, ResponsiveContainer, LabelList, PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';

export const ExpandableDiscursiveCard = ({ data, title, total, layout = "vertical", height = 300, yAxisWidth = 190 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return null;
  // Suporte a ambos os formatos: objeto { wordFrequency, rawResponses } ou array legado
  const wordFrequency = Array.isArray(data) ? data : (data.wordFrequency || []);
  const rawResponses = Array.isArray(data) ? [] : (data.rawResponses || []);

  if (wordFrequency.length === 0) return null;

  return (
    <div className="glass-panel chart-card col-span-12" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '14px', margin: 0 }}>{title}</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            padding: '6px 12px',
            backgroundColor: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {isExpanded ? 'Ocultar Respostas' : 'Ver Todas as Respostas'}
        </button>
      </div>

      <div style={{ height: `${height}px`, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={wordFrequency} layout={layout} margin={{ top: 20, right: 40, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={yAxisWidth} tick={{ fontSize: 11 }} />
            <BarTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--bg-color-secondary)', borderRadius: '8px' }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {wordFrequency?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList dataKey="value" position="right" formatter={(val) => `${val} (${((val / (total || 1)) * 100).toFixed(1)}%)`} style={{ fill: 'var(--text-primary)', fontSize: 11 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {isExpanded && (
        <div style={{ 
          marginTop: '15px', 
          maxHeight: '300px', 
          overflowY: 'auto', 
          padding: '10px', 
          backgroundColor: 'rgba(0,0,0,0.02)', 
          borderTop: '1px solid var(--glass-border)',
          borderRadius: '4px'
        }}>
          <h4 style={{ fontSize: '13px', marginBottom: '10px', color: 'var(--text-secondary)' }}>
            {rawResponses.length} resposta(s) encontrada(s):
          </h4>
          {rawResponses.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Nenhuma resposta discursiva encontrada para este campo.
            </p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--text-primary)' }}>
              {rawResponses.map((resp, idx) => (
                <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.4' }}>{resp}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

const getFillColor = (name, index) => {
  if (!name) return COLORS[index % COLORS.length];
  const n = String(name).trim().toUpperCase();
  
  // Positivos (Verdes)
  if (['SIM', '5', '4', 'POSITIVO', 'SEMPRE', 'TOTALMENTE'].includes(n)) return '#4CAF50'; 
  
  // Medianos (Amarelos/Laranjas)
  if (['TALVEZ', 'PARCIALMENTE', '3', 'MEDIANO', 'ÀS VEZES'].includes(n)) return '#FFC107';
  
  // Negativos (Vermelhos)
  if (['NÃO', '1', '2', 'NEGATIVO', 'NUNCA', 'NENHUMA'].includes(n)) return '#F44336';
  
  // Nulos (Cinza)
  if (['NÃO INFORMADO', 'NÃO TENHO'].includes(n)) return '#9E9E9E';
  
  return COLORS[index % COLORS.length];
};

export const SimpleBarChart = ({ data, title, total, layout = "horizontal", height = 300, yAxisWidth = 190 }) => {
  const truncateLabel = (text) => typeof text === 'string' && text.length > 25 ? text.substring(0, 25) + '...' : text;

  return (
  <div className={`glass-panel chart-card ${layout === 'vertical' ? 'col-span-6' : 'col-span-12'}`}>
    <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>{title}</h3>
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout={layout} margin={{ top: 20, right: 40, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
            </>
          ) : (
            <>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={yAxisWidth} tickFormatter={truncateLabel} tick={{ fontSize: 11 }} />
            </>
          )}
          <BarTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--bg-color-secondary)', borderRadius: '8px' }} />
          <Bar dataKey="value" radius={layout === 'horizontal' ? [4, 4, 0, 0] : [0, 4, 4, 0]}>
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getFillColor(entry.name, index)} />
            ))}
            <LabelList dataKey="value" position={layout === 'horizontal' ? "top" : "right"} formatter={(val) => `${val} (${((val / (total || 1)) * 100).toFixed(1)}%)`} style={{ fill: 'var(--text-primary)', fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const SimplePieChart = ({ data, title, colSpan = 6 }) => (
  <div className={`glass-panel chart-card col-span-${colSpan}`}>
    <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>{title}</h3>
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} fill="#8884d8" dataKey="value">
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getFillColor(entry.name, index)} />
            ))}
          </Pie>
          <PieTooltip contentStyle={{ backgroundColor: 'var(--bg-color-secondary)', borderRadius: '8px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);
