export default function MarajoaraHeader() {
  return (
    <div style={{ width: '100%', height: '28px', display: 'block', overflow: 'hidden', backgroundColor: '#fff', borderBottom: '1px solid var(--glass-border)' }}>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern id="marajo-pattern" x="0" y="0" width="80" height="28" patternUnits="userSpaceOnUse">
            {/* Fundo Branco/Bege */}
            <rect width="80" height="28" fill="var(--bg-color-secondary)" />
            
            {/* Bordas superior e inferior */}
            <rect x="0" y="0" width="80" height="3" fill="#a05d40" />
            <rect x="0" y="25" width="80" height="3" fill="#47545a" />
            
            {/* Padrão geométrico - Losangos e zigue-zague */}
            <path d="M0,14 L20,4 L40,14 L20,24 Z" fill="none" stroke="#47545a" strokeWidth="2" strokeLinejoin="miter" />
            <path d="M40,14 L60,4 L80,14 L60,24 Z" fill="none" stroke="#a05d40" strokeWidth="2" strokeLinejoin="miter" />
            
            {/* Detalhes internos (espirais/pontos simplificados) */}
            <circle cx="20" cy="14" r="2.5" fill="#a05d40" />
            <circle cx="60" cy="14" r="2.5" fill="#47545a" />
            
            {/* Linhas conectoras horizontais */}
            <path d="M-10,14 L10,14" stroke="#47545a" strokeWidth="1.5" />
            <path d="M30,14 L50,14" stroke="#a05d40" strokeWidth="1.5" />
            <path d="M70,14 L90,14" stroke="#47545a" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#marajo-pattern)" />
      </svg>
    </div>
  );
}
