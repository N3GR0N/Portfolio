import type { Language } from '../types';

export interface DrawOptions {
  width: number;
  height: number;
  scaleS: number;
  language: Language;
  hoverButton?: boolean;
  hoverLink?: boolean;
}

/**
 * Renders the shard panel content onto an offscreen canvas
 */
export function renderPanelCanvas(
  canvas: HTMLCanvasElement,
  options: DrawOptions
): CanvasImageSource {
  const { width, height, scaleS, language, hoverButton, hoverLink } = options;
  const dpr = Math.max(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  // Subtle dark glass background
  ctx.fillStyle = '#17171b';
  ctx.fillRect(0, 0, width, height);

  // Subtle inner noise or studio gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const S = scaleS;
  const padLeft = 46 * S;

  // 1. Eyebrow
  const eyebrowY = height * 0.135;
  const eyebrowSize = Math.max(10, 11 * S);
  ctx.font = `600 ${eyebrowSize}px "JetBrains Mono", monospace`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
  ctx.letterSpacing = '0.2em';
  const eyebrowText =
    language === 'es'
      ? 'INGENIERÍA EN SISTEMAS // UNLP OBS'
      : 'REAL-TIME MATERIAL & SYSTEMS STUDIO';
  ctx.fillText(eyebrowText, padLeft, eyebrowY);

  // 2. Headline
  const headlineSize = Math.max(28, Math.min(width * 0.078, height * 0.19));
  ctx.font = `500 ${headlineSize}px "Plus Jakarta Sans", "Inter", sans-serif`;
  ctx.letterSpacing = '-0.045em';

  const headlineGrad = ctx.createLinearGradient(0, eyebrowY + 20 * S, 0, eyebrowY + 20 * S + headlineSize * 2);
  headlineGrad.addColorStop(0, '#f0f0f4');
  headlineGrad.addColorStop(1, '#a6a6af');
  ctx.fillStyle = headlineGrad;

  const line1 = language === 'es' ? 'Diseñado' : 'Designed';
  const line2 = language === 'es' ? 'en cristal.' : 'in glass.';
  const headlineY1 = eyebrowY + headlineSize * 0.95;
  const headlineY2 = headlineY1 + headlineSize * 0.97;

  ctx.fillText(line1, padLeft, headlineY1);
  ctx.fillText(line2, padLeft, headlineY2);

  // 3. Subtitle (Two lines, 55% white)
  const subSize = Math.max(11, 14 * S);
  ctx.font = `400 ${subSize}px "Plus Jakarta Sans", "Inter", sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.letterSpacing = '-0.01em';

  const subLine1 =
    language === 'es'
      ? 'Sistemas distribuidos, espacio profundo y arquitectura de software.'
      : 'Author dispersion, transmission, and distributed systems in code.';
  const subLine2 =
    language === 'es'
      ? 'Visualización multi-espectral en vivo, resiliencia y WebGL2.'
      : 'Live previews, real astronomical data, and high-performance backend.';

  const subY1 = headlineY2 + subSize * 2.2;
  const subY2 = subY1 + subSize * 1.45;
  ctx.fillText(subLine1, padLeft, subY1);
  ctx.fillText(subLine2, padLeft, subY2);

  // 4. Action Buttons
  const btnY = subY2 + 28 * S;
  const btnWidth = Math.max(110, 126 * S);
  const btnHeight = Math.max(34, 40 * S);
  const btnRadius = 6 * S;

  // Primary light pill: "Open studio" / "Ver Proyectos" -> turns green #36d67e on hover!
  ctx.fillStyle = hoverButton ? '#36d67e' : 'rgba(245, 245, 247, 0.94)';
  ctx.beginPath();
  ctx.roundRect(padLeft, btnY, btnWidth, btnHeight, btnRadius);
  ctx.fill();

  ctx.font = `600 ${Math.max(11, 12.5 * S)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = '#0a0a0d';
  ctx.letterSpacing = '-0.01em';
  const btnText = language === 'es' ? 'Ver Proyectos' : 'Open studio';
  const btnTextMetrics = ctx.measureText(btnText);
  ctx.fillText(
    btnText,
    padLeft + (btnWidth - btnTextMetrics.width) / 2,
    btnY + btnHeight / 2 + 4.5 * S
  );

  // Secondary link: "Shatter paper →" / "Ver Trayectoria →"
  const linkX = padLeft + btnWidth + 24 * S;
  const linkText =
    language === 'es' ? 'Ver Trayectoria (Shatter) →' : 'Read paper →';
  ctx.font = `500 ${Math.max(11, 13 * S)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = hoverLink ? '#ffffff' : 'rgba(255, 255, 255, 0.82)';
  ctx.fillText(linkText, linkX, btnY + btnHeight / 2 + 4.5 * S);

  if (hoverLink) {
    const linkWidth = ctx.measureText(linkText).width;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(linkX, btnY + btnHeight / 2 + 8 * S);
    ctx.lineTo(linkX + linkWidth, btnY + btnHeight / 2 + 8 * S);
    ctx.stroke();
  }

  // 5. Bottom Metadata
  const footerY = height - 20 * S;
  ctx.font = `500 ${Math.max(9, 11 * S)}px "JetBrains Mono", monospace`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.36)';
  ctx.letterSpacing = '0.05em';

  ctx.fillText('© JUAN PEDRO SUÑER · UNLP', padLeft, footerY);

  const rightMeta = 'AETHERSCOPE // WEBGL2';
  const rightWidth = ctx.measureText(rightMeta).width;
  ctx.fillText(rightMeta, width - padLeft - rightWidth, footerY);

  return canvas;
}

/**
 * Renders the Nav Slab content onto an offscreen canvas
 */
export function renderNavCanvas(
  canvas: HTMLCanvasElement,
  options: DrawOptions
): CanvasImageSource {
  const { width, height, scaleS, language } = options;
  const dpr = Math.max(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#17171b';
  ctx.fillRect(0, 0, width, height);

  const S = scaleS;
  const centerY = height / 2 + 4 * S;
  const padLeft = 32 * S;

  // Mark
  ctx.fillStyle = '#dcdce0';
  ctx.fillRect(padLeft, height / 2 - 8 * S, 16 * S, 16 * S);

  ctx.font = `600 ${Math.max(11, 14 * S)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Juan Pedro Suñer', padLeft + 26 * S, centerY);

  // Center navigation links
  const links =
    language === 'es'
      ? ['Proyectos', 'Trayectoria', 'Stack', 'Educación']
      : ['Projects', 'Experience', 'Stack', 'Education'];

  ctx.font = `500 ${Math.max(10, 12 * S)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';

  const startCenterX = width * 0.42;
  let currentX = startCenterX;
  links.forEach((link) => {
    ctx.fillText(link, currentX, centerY);
    currentX += ctx.measureText(link).width + 24 * S;
  });

  // Right action: Lang switch + CV
  ctx.font = `600 ${Math.max(9, 11 * S)}px "JetBrains Mono", monospace`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  const rightText = language.toUpperCase() + ' // CV PDF';
  const rightW = ctx.measureText(rightText).width;
  ctx.fillText(rightText, width - padLeft - rightW, centerY);

  return canvas;
}
