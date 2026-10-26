# Juan Pedro Suñer — Interactive Web Portfolio

> **Portfolio web interactivo, de alto impacto visual y estéticamente refinado para Juan Pedro Suñer**, desarrollador de software y estudiante avanzado de Licenciatura / Ingeniería en Sistemas en la **Universidad Nacional de La Plata (UNLP)**.

---

## 🚀 Tecnologías y Arquitectura

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) configurado con modo oscuro profundo nativo (`#090a0f`, bordes sutiles y acentos cósmicos).
- **Internacionalización (i18n):** Soporte bilingüe completo (Español / Inglés) sin recargar la página, gestionado a través de `LanguageContext` y diccionarios modulares `locales/es.json` y `locales/en.json`.
- **Canvas & Partículas Celestes:** Motor en `HTML5 Canvas` optimizado con `requestAnimationFrame` que simula un campo estelar 3D interactivo con el cursor, reflejando el proyecto insignia astronómico **AetherScope**.
- **Developer HUD & Terminal:** Terminal interactiva estilo Raycast/Linear que admite comandos (`help`, `info`, `stack`, `contact`, `ping`, `unlp`, `astronomy`).
- **Simulador Interactivo de Proyectos:** Sandboxes en vivo integrados para explorar los flujos de:
  - **AetherScope / FlareField:** Visualización celeste y alertas solares consumiendo NASA DONKI / NOAA.
  - **RescueSync / DSSD:** Orquestación BPM con Bonita Engine y bloqueo concurrente de recursos.
  - **Alquilando & Backend Tools:** Benchmarking de consultas en PostgreSQL y prevención de colisión de reservas.
- **Gestión Oficial de CV:** Visor y descargador directo de los PDFs oficiales en Español e Inglés (`Juan_Pedro_Suner_CV_ES.pdf` y `Juan_Pedro_Suner_CV_EN.pdf`).

---

## 🛠️ Comandos de Desarrollo

### 1. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 2. Compilar para producción
```bash
npm run build
```

### 3. Previsualizar compilación
```bash
npm run preview
```

---

## 📁 Estructura del Proyecto

```text
├── public/
│   ├── favicon.svg                   # Monograma JP vectorizado
│   ├── Juan_Pedro_Suner_CV_ES.pdf    # Currículum Vitae oficial en Español
│   └── Juan_Pedro_Suner_CV_EN.pdf    # Official Resume in English
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Header fijo con selector i18n y botón CV
│   │   ├── Hero.tsx                  # Hero section con status badge y Terminal HUD
│   │   ├── TerminalHUD.tsx           # Terminal interactiva con telemetría y comandos
│   │   ├── StarfieldCanvas.tsx       # Motor de partículas estelares interactivas
│   │   ├── Projects.tsx              # Grid con spotlight hover y badges técnicos
│   │   ├── ProjectInteractiveModal.tsx # Sandboxes de simulación de arquitectura
│   │   ├── TechStack.tsx             # Competencias categorizadas y buscador reactivo
│   │   ├── ExperienceTimeline.tsx    # Línea de tiempo (UNLP, Freelance, Farmacia Napoli)
│   │   ├── Education.tsx             # Formación académica UNLP e idiomas
│   │   ├── Contact.tsx               # Formulario, copia de email con confetti y redes
│   │   ├── CvModal.tsx               # Modal bilingüe con visor y descarga de PDF
│   │   ├── GithubIcon.tsx            # Logo SVG optimizado
│   │   └── Footer.tsx                # Pie de página y scroll-to-top
│   ├── context/
│   │   └── LanguageContext.tsx       # Provider y hook de traducción instantánea
│   ├── locales/
│   │   ├── es.json                   # Textos completos en Español
│   │   └── en.json                   # Full English translations
│   ├── types/
│   │   └── index.ts                  # Interfaces y tipos TypeScript
│   ├── App.tsx                       # Ensamblado principal de la aplicación
│   ├── index.css                     # Tailwind utilities, scrollbar y glow effects
│   └── main.tsx                      # Punto de entrada de React
├── tailwind.config.js                # Paleta developer-tool, bordes y keyframes
└── vite.config.ts                    # Configuración de compilación Vite
```

---

## 👨‍💻 Autor

**Juan Pedro Suñer**
- **Email:** [sunerjuan240@gmail.com](mailto:sunerjuan240@gmail.com)
- **GitHub:** [github.com/N3GRON](https://github.com/N3GRON)
- **Teléfono / WhatsApp:** [+54 9 2281 301944](https://wa.me/5492281301944)
- **Ubicación:** La Plata, Buenos Aires, Argentina
- **Institución:** Facultad de Informática — Universidad Nacional de La Plata (UNLP)
