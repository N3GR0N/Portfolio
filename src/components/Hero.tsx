import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, FileText } from 'lucide-react';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // WebGL Liquid Iridescence Shader Backdrop
  // Soft sage green (rgb 160,224,171) -> molten amber (rgb 255,172,46) -> deep oxblood (rgb 165,45,37)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      // Fallback for environments without WebGL: 2D fluid simulation
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let animId: number;
      let time = 0;
      const render2D = () => {
        time += 0.01;
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);
        const grad = ctx.createRadialGradient(
          w * (0.5 + Math.sin(time * 0.4) * 0.15),
          h * (0.5 + Math.cos(time * 0.3) * 0.15),
          w * 0.1,
          w * 0.5,
          h * 0.5,
          w * 0.6
        );
        grad.addColorStop(0, 'rgba(160, 224, 171, 0.45)');
        grad.addColorStop(0.45, 'rgba(255, 172, 46, 0.38)');
        grad.addColorStop(0.85, 'rgba(165, 45, 37, 0.3)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        animId = requestAnimationFrame(render2D);
      };
      render2D();
      return () => cancelAnimationFrame(animId);
    }

    // Vertex shader: Fullscreen quad
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Organic domain-warped liquid iridescence
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

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * snoise(p);
          p = rot * p * 2.0 + vec2(100.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = (st - 0.5) * vec2(aspect, 1.0);

        vec2 mouseOffset = (u_mouse - 0.5) * 0.12;
        vec2 p = uv * 1.6 - mouseOffset;
        float t = u_time * 0.07;

        // Domain warping for organic liquid motion
        vec2 q = vec2(fbm(p + vec2(t * 0.5, t * 0.35)), fbm(p + vec2(1.7, 4.3) - t * 0.4));
        vec2 r = vec2(fbm(p + 2.4 * q + vec2(2.1, 1.7) + t * 0.3), fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.25));
        float f = fbm(p + 2.8 * r + t * 0.15);
        f = clamp((f + 0.9) * 0.58, 0.0, 1.0);

        // Exact Monopo Saigon Palette Tokens:
        // Soft Sage Green: rgb(160, 224, 171)
        // Molten Amber: rgb(255, 172, 46)
        // Deep Oxblood: rgb(165, 45, 37)
        // Obsidian background: rgb(0, 0, 0)
        vec3 c_sage = vec3(160.0/255.0, 224.0/255.0, 171.0/255.0);
        vec3 c_amber = vec3(255.0/255.0, 172.0/255.0, 46.0/255.0);
        vec3 c_oxblood = vec3(165.0/255.0, 45.0/255.0, 37.0/255.0);
        vec3 c_obsidian = vec3(0.0, 0.0, 0.0);

        // Fluid gradient transitions
        vec3 color = mix(c_oxblood, c_amber, smoothstep(0.12, 0.52, f));
        color = mix(color, c_sage, smoothstep(0.46, 0.82, f + q.x * 0.25));

        // Iridescent sheen highlight
        float sheen = pow(smoothstep(0.68, 0.96, f), 2.2);
        color += c_sage * sheen * 0.38;

        // Cinematic soft vignette merging into obsidian edges
        float dist = length(uv);
        float vignette = smoothstep(1.35, 0.32, dist);
        vec3 finalColor = mix(c_obsidian, color * 0.68, vignette * 0.88);

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

    // Fullscreen quad buffer
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

      // Smooth mouse interpolation
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

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
      className="relative min-h-screen w-full bg-obsidian text-paper flex flex-col justify-between pt-[74px] pb-8 sm:pb-12 px-6 sm:px-10 overflow-hidden select-none"
    >
      {/* 
        Full-Viewport Atmospheric Liquid Iridescence Shader Media
        Soft sage green (rgb 160,224,171) dissolving through molten amber (rgb 255,172,46) into deep oxblood (rgb 165,45,37).
        Never a flat gradient — organic, shader-driven fluid motion.
      */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      {/* Subtle obsidian grain overlay to ground the fluid light into the editorial gallery */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/25 backdrop-contrast-[1.05]"
        aria-hidden="true"
      />

      {/* Hero Content Layer (Max-width 1078px contained, centered) */}
      <div className="relative z-10 max-w-[1078px] w-full mx-auto flex-1 flex flex-col justify-between">
        {/* Top Annotation Bar (11px Roobert/Inter, quiet Felt Gray) */}
        <div className="pt-6 sm:pt-10 flex items-center justify-between text-[11px] font-mono tracking-widest text-felt-gray uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-paper rounded-full animate-pulse" />
            <span className="text-paper/80 font-normal">JUAN PEDRO SUÑER</span>
            <span className="hidden sm:inline text-felt-gray/70">· SOFTWARE ENGINEER</span>
          </div>

          <div className="tracking-widest hidden xs:block text-felt-gray">
            34° 55′ S, 57° 57′ W // LA PLATA, AR
          </div>
        </div>

        {/* 
          Hero Display Headline:
          Roobert 225px weight 400, line-height 1.25, #ffffff over iridescent dark media.
          Letter-spacing normal. The headline is the hero — one monumental phrase centered in the viewport breathing against fluid light.
        */}
        <div className="my-auto py-10 sm:py-16 text-center flex flex-col items-center justify-center">
          <h1 className="text-[52px] xs:text-[68px] sm:text-[104px] md:text-[144px] lg:text-[188px] xl:text-[225px] font-normal leading-[0.92] text-paper tracking-[-0.03em] uppercase select-none transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]">
            JUAN PEDRO
            <br />
            SUÑER
          </h1>

          <div className="mt-6 sm:mt-8 text-[12px] sm:text-[13px] font-mono tracking-[0.28em] text-paper/70 uppercase">
            SOFTWARE ENGINEER & LICENCIATURA EN SISTEMAS (UNLP)
          </div>
        </div>

        {/* 
          Bottom Row:
          - Left: Rotating Scroll Indicator (Circular SVG badge rotating continuously at slow tempo at bottom-left)
          - Right: Ghost Pill Buttons (Dark Surface: 1px solid rgba(255,255,255,0.3), #ffffff text, 75px radius, 11px vert, 33px horiz)
        */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          {/* Rotating Typography Scroll Badge (0,0 bottom-left with small offset) */}
          <div className="flex items-center gap-4 self-start sm:self-auto">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
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
              <span className="absolute w-2 h-2 bg-paper rounded-full" />
            </div>

            <div className="hidden md:block text-[11px] font-mono text-felt-gray uppercase leading-relaxed">
              <div>DISTRIBUTED ARCHITECTURES & WEBGL</div>
              <div className="text-paper/60">AUTONOMOUS & TEAM PRACTICE</div>
            </div>
          </div>

          {/* Ghost Pill Buttons (Dark Surface — 75px full pill, 11px vert, 33px horiz) */}
          <div className="flex items-center gap-3.5 self-end sm:self-auto flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-[33px] py-[11px] text-[15px] sm:text-[16px] font-normal text-paper border border-white/30 pill-btn hover:border-paper hover:bg-white/10 transition-all duration-700"
            >
              <span>{t('hero.ctaProjects')}</span>
              <ArrowDown className="w-4 h-4 text-paper/80" />
            </a>

            <button
              onClick={onOpenCv}
              className="inline-flex items-center gap-2.5 px-[33px] py-[11px] text-[15px] sm:text-[16px] font-normal text-paper/80 border border-white/20 pill-btn hover:border-paper hover:text-paper hover:bg-white/10 transition-all duration-700"
            >
              <FileText className="w-4 h-4 text-felt-gray" />
              <span>{t('hero.ctaCv')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
