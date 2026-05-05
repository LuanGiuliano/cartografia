import { useState, useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete, isLoading }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    // The animation takes about 1.5s. We call onComplete slightly before or exactly at the end
    // to unmount the splash screen and let the user interact with the dashboard.
    setTimeout(() => {
      onComplete();
    }, 1500); 
  };

  return (
    <div className={`splash-container ${isAnimating ? 'animating' : ''}`}>
      <div className="splash-content">
        <button 
          className={`splash-button ${isAnimating ? 'fade-out' : ''}`} 
          onClick={!isLoading ? handleStart : undefined}
          style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Carregando Dados...' : 'Iniciar'}
        </button>
      </div>
      <div className={`splash-footer ${isAnimating ? 'fade-out' : ''}`}>
        <img src="/seduc-logo.png" alt="Secretaria de Educação do Pará" className="splash-seduc-logo" />
        <div className="splash-copyright" style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
          <span>© 2026 SAGEP - Secretaria Adjunta de Gestão de Pessoas</span>
          <span style={{ fontSize: '0.85em', opacity: 0.8, fontWeight: 'normal', textTransform: 'none' }}>Desenvolvido por Luan Giuliano</span>
        </div>
      </div>
    </div>
  );
}
