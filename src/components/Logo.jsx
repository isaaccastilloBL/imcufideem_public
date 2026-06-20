/**
 * Logo institucional IMCUFIDEEM (portal público).
 *
 * Soporta dos orientaciones:
 *   - 'horizontal' (default): el logo se extiende a lo ancho (aspecto ≈ 3:1).
 *                             Para sidebar, encabezados, footers.
 *                             Archivo esperado: /logo-horizontal.jpg
 *   - 'vertical':              el logo se apila vertical (aspecto ≈ 1:1.4).
 *                             Para login, splash, secciones centradas grandes.
 *                             Archivo esperado: /logo-vertical.jpg
 *
 * Cada orientación intenta cargar primero `/logo-{orientation}.jpg`, luego
 * `/logo-{orientation}.png`. Si ninguno carga, muestra una caja vino
 * institucional con las siglas como fallback.
 *
 * Prop `size`: dimensión principal en px.
 *   - horizontal → altura (ancho ≈ size × 3)
 *   - vertical   → ancho  (alto  ≈ size × 1.4)
 */
import { useEffect, useState } from 'react';

export default function Logo({ size = 48, orientation = 'horizontal', className = '', dark = false }) {
  // Dimensiones según orientación
  const dims =
    orientation === 'vertical'
      ? { w: size, h: Math.round(size * 1.4) }
      : { w: Math.round(size * 3), h: size };

  // Cadena de archivos a intentar
  const candidates = [
    `/logo-${orientation}.jpg`,
    `/logo-${orientation}.png`,
  ];

  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  // Reset cuando cambia la orientación
  useEffect(() => {
    setSrcIndex(0);
    setFailed(false);
  }, [orientation]);

  const handleError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((i) => i + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return <SiglasFallback orientation={orientation} w={dims.w} h={dims.h} className={className} dark={dark} />;
  }

  return (
    <img
      src={candidates[srcIndex]}
      alt="IMCUFIDEEM"
      width={dims.w}
      height={dims.h}
      onError={handleError}
      className={className}
      style={{
        width: dims.w,
        height: dims.h,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}

/**
 * Caja siglas estilo "tarjetón institucional".
 *   - horizontal: muestra "IMCUFIDEEM" completo
 *   - vertical:   muestra "IM" grande arriba + "IMCUFIDEEM" pequeño abajo
 */
function SiglasFallback({ orientation, w, h, className, dark }) {
  const isVertical = orientation === 'vertical';

  const gradient = dark
    ? 'linear-gradient(135deg, #FFFFFF22 0%, #FFFFFF11 100%)'
    : 'linear-gradient(135deg, #B73154 0%, #9E2343 100%)';

  return (
    <div
      className={`inline-flex items-center justify-center font-bold ${className}`}
      style={{
        width: w,
        height: h,
        background: gradient,
        color: dark ? '#FFFFFF' : '#FFFFFF',
        borderRadius: Math.max(6, Math.min(w, h) * 0.12),
        padding: '4px 12px',
        textAlign: 'center',
        flexDirection: isVertical ? 'column' : 'row',
        gap: isVertical ? 4 : 8,
        boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
        letterSpacing: '0.04em',
      }}
      aria-label="IMCUFIDEEM"
    >
      {isVertical ? (
        <>
          <span style={{ fontSize: w * 0.34, lineHeight: 1 }}>IM</span>
          <span style={{ fontSize: w * 0.13, letterSpacing: '0.18em', opacity: 0.85 }}>
            IMCUFIDEEM
          </span>
        </>
      ) : (
        <>
          <span
            style={{
              fontSize: h * 0.46,
              lineHeight: 1,
              opacity: 0.85,
              letterSpacing: '0.1em',
            }}
          >
            IM
          </span>
          <span style={{ width: 1, height: h * 0.5, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: h * 0.34, letterSpacing: '0.06em' }}>IMCUFIDEEM</span>
        </>
      )}
    </div>
  );
}
