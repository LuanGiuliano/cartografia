import { X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="glass-panel" style={{
        backgroundColor: '#fdfbf7',
        padding: '2rem',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '90%',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)'
        }}>
          <X size={24} />
        </button>
        <h2 style={{ color: 'var(--petroleum-blue)', marginBottom: '1rem', borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem' }}>
          O que é a Cartografia de Saberes?
        </h2>
        <div style={{ color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '1.05rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            A <strong>Cartografia de Saberes</strong> é uma iniciativa estratégica voltada para o 
            mapeamento detalhado dos perfis, competências, habilidades e necessidades de formação 
            dos servidores da SAGEP / SEDUC-PA.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Este projeto visa criar um banco de talentos dinâmico, permitindo:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Identificar a diversidade de conhecimentos e formações acadêmicas.</li>
            <li>Reconhecer experiências profissionais anteriores que podem enriquecer a atuação no órgão.</li>
            <li>Avaliar o clima organizacional e a percepção institucional dos servidores.</li>
            <li>Direcionar ações de capacitação e desenvolvimento profissional de forma assertiva.</li>
          </ul>
          <p>
            Através deste painel, é possível visualizar de forma clara e interativa o potencial humano 
            disponível, auxiliando na gestão de talentos, na tomada de decisões e na valorização contínua dos profissionais.
          </p>
        </div>
      </div>
    </div>
  );
}
