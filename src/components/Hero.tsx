import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, FileText } from 'lucide-react';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // WebGL Liquid Iridescence Shader:
  // Large, tranquil blurred luminous orbs (Sage Green, Molten Amber, Deep Oxblood)
  // drifting and softly merging over obsidian black — calm on the eyes, highly sophisticated.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      // 2D Canvas Fallback
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let animId: number;
      let time = 0;
      const render2D = () => {
        time += 0.008;
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        const gAmber = ctx.createRadialGradient(
          w * (0.5 + Math.sin(time * 0.4) * 0.15),
          h * (0.45 + Math.cos(time * 0.3) * 0.12),
          10,
          w * 0.5,
          h * 0.45,
          w * 0.4
        );
        gAmber.addColorStop(0, 'rgba(255, 172, 46, 0.35)');
        gAmber.addColorStop(0.6, 'rgba(165, 45, 37, 0.22)');
        gAmber.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gAmber;
        ctx.fillRect(0, 0, w, h);

        const gSage = ctx.createRadialGradient(
          w * (0.4 + Math.cos(time * 0.35) * 0.18),
          h * (0.55 + Math.sin(time * 0.28) * 0.15),
          10,
          w * 0.4,
          h * 0.55,
          w * 0.38
        );
        gSage.addColorStop(0, 'rgba(160, 224, 171, 0.30)');
        gSage.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gSage;
        ctx.fillRect(0, 0, w, h);

        animId = requestAnimationFrame(render2D);
      };
      render2D();
      return () => cancelAnimationFrame(animId);
    }

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = (st - 0.5) * vec2(aspect, 1.0);

        // Very calm, gentle time progression
        float t = u_time * 0.16;

        // Subtle cursor parallax
        vec2 mouseOffset = (u_mouse - 0.5) * 0.08;
        vec2 p = uv - mouseOffset;

        // Soft, low-frequency organic warp to prevent static circles
        float warp = snoise(p * 0.75 + vec2(t * 0.12, -t * 0.10)) * 0.09;
        vec2 wp = p + vec2(warp, -warp);

        // 1. Large Orb: Molten Amber (rgb 255, 172, 46) - Center / Upper drift
        vec2 posAmber = vec2(sin(t * 0.32) * 0.28, cos(t * 0.26) * 0.18 + 0.02);
        float distAmber = length(wp - posAmber);
        float amber = pow(smoothstep(0.98, 0.04, distAmber), 1.75);

        // 2. Large Orb: Soft Sage Green (rgb 160, 224, 171) - Left drift
        vec2 posSage = vec2(cos(t * 0.22 + 1.2) * 0.36 - 0.08, sin(t * 0.30 + 0.9) * 0.22);
        float distSage = length(wp - posSage);
        float sage = pow(smoothstep(0.88, 0.05, distSage), 1.85);

        // 3. Large Orb: Deep Oxblood (rgb 165, 45, 37) - Right / Lower drift
        vec2 posOxblood = vec2(sin(t * 0.20 + 2.8) * 0.34 + 0.12, cos(t * 0.28 + 2.0) * 0.22 - 0.04);
        float distOxblood = length(wp - posOxblood);
        float oxblood = pow(smoothstep(0.92, 0.06, distOxblood), 1.70);

        // 4. Subtle Core Luminous Glow
        vec2 posCore = vec2(cos(t * 0.36 + 4.2) * 0.16, sin(t * 0.22 + 3.1) * 0.14);
        float distCore = length(wp - posCore);
        float core = pow(smoothstep(0.70, 0.02, distCore), 2.1);

        // Exact Monopo Saigon Palette Tokens
        vec3 c_sage = vec3(160.0/255.0, 224.0/255.0, 171.0/255.0);
        vec3 c_amber = vec3(255.0/255.0, 172.0/255.0, 46.0/255.0);
        vec3 c_oxblood = vec3(165.0/255.0, 45.0/255.0, 37.0/255.0);
        vec3 c_obsidian = vec3(0.0, 0.0, 0.0);

        // Soft, quiet luminous blending — calm on the eyes, rich in tone
        vec3 fluid = vec3(0.0);
        fluid += c_oxblood * (oxblood * 0.50);
        fluid += c_amber * (amber * 0.55);
        fluid += c_sage * (sage * 0.45);
        fluid += mix(c_amber, c_sage, 0.45) * (core * 0.30);

        // Organic edge vignette dissolving cleanly into obsidian black
        float edgeDist = length(uv);
        float vignette = smoothstep(1.30, 0.35, edgeDist);
        vec3 finalColor = mix(c_obsidian, fluid, vignette * 0.88);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let animId: number;
    let startTime = performance.now();
    let currentMouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const handlePointerMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.04;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.04;

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(mouseLoc, currentMouse.x, currentMouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] max-h-[1080px] w-full bg-obsidian text-paper flex flex-col justify-between pt-[66px] pb-5 sm:pb-8 px-6 sm:px-10 overflow-hidden select-none"
    >
      {/* 
        Full-Viewport Atmospheric Liquid Iridescence Shader
        Large, softly-blurred drifting luminous orbs on obsidian black.
      */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      {/* Deep obsidian contrast shield for calm visual comfort */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/20"
        aria-hidden="true"
      />

      {/* Hero Content Shell: Guaranteed full viewport fit without vertical cutoff */}
      <div className="relative z-10 max-w-[1078px] w-full mx-auto h-full flex flex-col justify-between">
        {/* Top Annotation Bar (11px Roobert/Inter, quiet Felt Gray) */}
        <div className="pt-3 sm:pt-5 flex items-center justify-between text-[11px] font-mono tracking-widest text-felt-gray uppercase shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-paper rounded-full animate-pulse" />
            <span className="text-paper/90 font-normal">JUAN PEDRO SUÑER</span>
            <span className="hidden sm:inline text-felt-gray/70">· SOFTWARE ENGINEER</span>
          </div>

          <div className="tracking-widest hidden xs:block text-felt-gray">
            34° 55′ S, 57° 57′ W // LA PLATA, AR
          </div>
        </div>

        {/* 
          Hero Display Headline:
          Display scale, breathing comfortably against fluid light, perfectly proportioned.
        */}
        <div className="my-auto py-2 sm:py-4 text-center flex flex-col items-center justify-center shrink-0">
          <h1 className="text-[44px] xs:text-[58px] sm:text-[76px] md:text-[98px] lg:text-[124px] xl:text-[142px] font-normal leading-[0.92] text-paper tracking-[-0.03em] uppercase select-none transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <span className="whitespace-nowrap">JUAN PEDRO</span>
            <br />
            <span>SUÑER</span>
          </h1>

          <div className="mt-3 sm:mt-5 text-[11px] sm:text-[12px] font-mono tracking-[0.25em] text-paper/70 uppercase">
            SOFTWARE ENGINEER & LICENCIATURA EN SISTEMAS (UNLP)
          </div>
        </div>

        {/* 
          Bottom Row: 100% visible within the viewport, no clipping.
          - Left: Rotating Scroll Indicator
          - Right: Ghost Pill Buttons
        */}
        <div className="pt-3 sm:pt-4 pb-1 border-t border-white/15 flex flex-row items-end justify-between gap-4 shrink-0">
          {/* Rotating Typography Scroll Badge */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
              <svg
                className="w-full h-full animate-spin-slow text-felt-gray"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="circlePathHero"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[7.5px] font-mono uppercase tracking-[0.24em] fill-current">
                  <textPath href="#circlePathHero" startOffset="0%">
                    SCROLL DOWN · EXPLORE ARCHIVE · 
                  </textPath>
                </text>
              </svg>
              <span className="absolute w-1.5 h-1.5 bg-paper rounded-full" />
            </div>

            <div className="hidden md:block text-[10px] font-mono text-felt-gray uppercase leading-relaxed">
              <div>DISTRIBUTED ARCHITECTURES & WEBGL</div>
              <div className="text-paper/60">AUTONOMOUS & TEAM PRACTICE</div>
            </div>
          </div>

          {/* Ghost Pill Buttons (Dark Surface — 75px full pill, guaranteed visible) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap justify-end">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 sm:px-[30px] py-2 sm:py-[10px] text-[13px] sm:text-[15px] font-normal text-paper border border-white/30 pill-btn hover:border-paper hover:bg-white/10 transition-all duration-700"
            >
              <span>{t('hero.ctaProjects')}</span>
              <ArrowDown className="w-3.5 h-3.5 text-paper/80" />
            </a>

            <button
              onClick={onOpenCv}
              className="inline-flex items-center gap-2 px-5 sm:px-[30px] py-2 sm:py-[10px] text-[13px] sm:text-[15px] font-normal text-paper/80 border border-white/20 pill-btn hover:border-paper hover:text-paper hover:bg-white/10 transition-all duration-700"
            >
              <FileText className="w-3.5 h-3.5 text-felt-gray" />
              <span>{t('hero.ctaCv')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
