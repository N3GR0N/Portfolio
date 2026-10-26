import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useLanguage } from '../context/LanguageContext';
import { createRoundedPolygonShape, insetPolygon, Spring, type Point2D } from '../lib/glassMath';
import { renderPanelCanvas, renderNavCanvas } from '../lib/renderGlassContent';

interface SmokedGlassHeroProps {
  onOpenCv: () => void;
  onExploreProjects: () => void;
  onShatterChange?: (shattered: boolean) => void;
}

interface ShardData {
  mesh: THREE.Mesh;
  capMesh: THREE.Mesh;
  originalPos: THREE.Vector3;
  originalRot: THREE.Euler;
  targetZ: number;
  currentZ: number;
  rotX: number;
  rotY: number;
  springZ: Spring;
  springRotX: Spring;
  springRotY: Spring;
  iridescence: number;
  envMapIntensity: number;
  // Shatter physics
  velocity: THREE.Vector3;
  rotVelocity: THREE.Vector3;
  shatterRot: THREE.Vector3;
  staggerDelay: number;
  isNav?: boolean;
}

export const SmokedGlassHero: React.FC<SmokedGlassHeroProps> = ({
  onOpenCv,
  onExploreProjects,
  onShatterChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { language, toggleLanguage } = useLanguage();

  const [isShattered, setIsShattered] = useState(false);
  const isShatteredRef = useRef(false);

  // Sync ref
  useEffect(() => {
    isShatteredRef.current = isShattered;
    if (onShatterChange) onShatterChange(isShattered);
  }, [isShattered, onShatterChange]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050507);

    const fov = 30;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000);
    // Camera distance so 1 world unit = 1 CSS pixel at z = 0
    const cameraDistance = (height / 2) / Math.tan(THREE.MathUtils.degToRad(fov / 2));
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // PMREM Room Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv).texture;
    scene.environment = envTexture;

    // Soft white-blue key light from top-left
    const keyLight = new THREE.DirectionalLight(0xdbeafe, 1.4);
    keyLight.position.set(-width * 0.4, height * 0.5, 600);
    scene.add(keyLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 2. Global Block & Scale Calculations
    const isMobile = width < 768;
    const marginX = isMobile ? 16 : width * 0.055;
    const marginY = isMobile ? 16 : height * 0.085;

    const blockWidth = width - marginX * 2;
    const blockHeight = height - marginY * 2;
    const S = blockWidth / 1730;

    const navHeight = blockHeight * 0.108;
    const gap = 14;
    const panelHeight = blockHeight - navHeight - gap;

    // Global Slab Pivot Group
    const slabGroup = new THREE.Group();
    scene.add(slabGroup);

    // Uniforms for cursor lavender glow in glass shader
    const glowUniforms = {
      uPointerWorld: { value: new THREE.Vector3(0, 0, 0) },
      uGlowIntensity: { value: 0.0 },
      uScaleS: { value: S },
    };

    // Shared Base Glass Material
    const createGlassMaterial = () => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x17171b),
        roughness: 0.36,
        clearcoat: 0.7,
        clearcoatRoughness: 0.12,
        specularIntensity: 0.7,
        iridescence: 0.55,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [250, 650],
        envMapIntensity: 1.0,
      });

      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uPointerWorld = glowUniforms.uPointerWorld;
        shader.uniforms.uGlowIntensity = glowUniforms.uGlowIntensity;
        shader.uniforms.uScaleS = glowUniforms.uScaleS;

        shader.fragmentShader = `
          uniform vec3 uPointerWorld;
          uniform float uGlowIntensity;
          uniform float uScaleS;
          varying vec3 vWorldPosition;
          ${shader.fragmentShader}
        `;

        shader.vertexShader = `
          varying vec3 vWorldPosition;
          ${shader.vertexShader}
        `.replace(
          '#include <worldpos_vertex>',
          `
          #include <worldpos_vertex>
          vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;
          `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `
          #include <dithering_fragment>
          float d = distance(vWorldPosition, uPointerWorld);
          float rad = 300.0 * max(uScaleS, 0.4);
          float glowFactor = exp(-1.6 * pow(d / rad, 2.0));
          vec3 lavender = vec3(0.42, 0.37, 0.62) * 0.18 * glowFactor * uGlowIntensity;
          gl_FragColor.rgb += lavender;
          `
        );
      };

      return mat;
    };

    // 3. Render Printed Textures
    const offscreenPanelCanvas = document.createElement('canvas');
    renderPanelCanvas(offscreenPanelCanvas, {
      width: blockWidth,
      height: panelHeight,
      scaleS: S,
      language,
    });
    const panelTexture = new THREE.CanvasTexture(offscreenPanelCanvas);
    panelTexture.colorSpace = THREE.SRGBColorSpace;
    panelTexture.generateMipmaps = true;

    const offscreenNavCanvas = document.createElement('canvas');
    renderNavCanvas(offscreenNavCanvas, {
      width: blockWidth,
      height: navHeight,
      scaleS: S,
      language,
    });
    const navTexture = new THREE.CanvasTexture(offscreenNavCanvas);
    navTexture.colorSpace = THREE.SRGBColorSpace;
    navTexture.generateMipmaps = true;

    // 4. Build Nav Slab
    const navY = blockHeight / 2 - navHeight / 2;
    const navRadius = Math.max(8, 16 * S);
    const navPoints: Point2D[] = [
      { x: -blockWidth / 2, y: -navHeight / 2 },
      { x: blockWidth / 2, y: -navHeight / 2 },
      { x: blockWidth / 2, y: navHeight / 2 },
      { x: -blockWidth / 2, y: navHeight / 2 },
    ];
    const navShape = createRoundedPolygonShape(navPoints, navRadius);
    const navExtrude = new THREE.ExtrudeGeometry(navShape, {
      depth: 13 * S,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 2.6 * S,
      bevelThickness: 2.6 * S,
    });
    navExtrude.center();

    const navMat = createGlassMaterial();
    const navMesh = new THREE.Mesh(navExtrude, navMat);
    navMesh.position.set(0, navY, 0);

    // Cap with printed texture for nav
    const navCapGeo = new THREE.ShapeGeometry(navShape);
    navCapGeo.center();
    // Map UVs (0 to 1)
    const navPosAttr = navCapGeo.attributes.position;
    const navUvs = new Float32Array(navPosAttr.count * 2);
    for (let i = 0; i < navPosAttr.count; i++) {
      navUvs[i * 2] = (navPosAttr.getX(i) + blockWidth / 2) / blockWidth;
      navUvs[i * 2 + 1] = (navPosAttr.getY(i) + navHeight / 2) / navHeight;
    }
    navCapGeo.setAttribute('uv', new THREE.BufferAttribute(navUvs, 2));

    const navCapMat = new THREE.MeshBasicMaterial({
      map: navTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const navCapMesh = new THREE.Mesh(navCapGeo, navCapMat);
    navCapMesh.position.set(0, 0, (13 * S) / 2 + 2.6 * S + 0.1);
    navMesh.add(navCapMesh);

    slabGroup.add(navMesh);

    // 5. Build Five Shard Cells for the Panel
    // Edge & Junction Normalized points
    const baseEdgePoints = {
      TL: { x: 0, y: 0 },
      TR: { x: 1, y: 0 },
      BL: { x: 0, y: 1 },
      BR: { x: 1, y: 1 },
      tAB: { x: 0.22, y: 0 },
      tBC: { x: 0.515, y: 0 },
      tCE: { x: 0.84, y: 0 },
      bAD: { x: 0.34, y: 1 },
      bDE: { x: 0.865, y: 1 },
      J0: { x: 0.385, y: 0.72 },
      J1: { x: 0.48, y: 0.62 },
      J2: { x: 0.716, y: 0.49 },
    };

    const cellDefs = [
      // A (Hero cell: TL · tAB · J0 · bAD · BL)
      ['TL', 'tAB', 'J0', 'bAD', 'BL'],
      // B (tAB · tBC · J1 · J0)
      ['tAB', 'tBC', 'J1', 'J0'],
      // C (tBC · tCE · J2 · J1)
      ['tBC', 'tCE', 'J2', 'J1'],
      // D (J0 · J1 · J2 · bDE · bAD)
      ['J0', 'J1', 'J2', 'bDE', 'bAD'],
      // E (tCE · TR · BR · bDE · J2)
      ['tCE', 'TR', 'BR', 'bDE', 'J2'],
    ];

    const shards: ShardData[] = [];
    const panelY = -blockHeight / 2 + panelHeight / 2;

    cellDefs.forEach((def, cellIndex) => {
      const rawPoints: Point2D[] = def.map((key) => {
        const pt = baseEdgePoints[key as keyof typeof baseEdgePoints];
        // Convert to panel local coordinates (centered at panelY)
        return {
          x: pt.x * blockWidth - blockWidth / 2,
          y: (1 - pt.y) * panelHeight - panelHeight / 2, // Flip Y for Three.js
        };
      });

      // Inset outline by half gap (7 * S)
      const insetPts = insetPolygon(rawPoints, 7 * S);
      const shardShape = createRoundedPolygonShape(insetPts, 20 * S);

      const shardExtrude = new THREE.ExtrudeGeometry(shardShape, {
        depth: 13 * S,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 2.6 * S,
        bevelThickness: 2.6 * S,
      });

      // Calculate centroid of this shard
      let cx = 0;
      let cy = 0;
      insetPts.forEach((p) => {
        cx += p.x;
        cy += p.y;
      });
      cx /= insetPts.length;
      cy /= insetPts.length;

      // Center geometry around its local centroid so it tilts naturally around its center
      shardExtrude.translate(-cx, -cy, -(13 * S) / 2);

      const shardMat = createGlassMaterial();
      const shardMesh = new THREE.Mesh(shardExtrude, shardMat);
      shardMesh.position.set(cx, panelY + cy, 0);

      // Printed Cap Mesh mapped to its original panel UV position
      const capGeo = new THREE.ShapeGeometry(shardShape);
      capGeo.translate(-cx, -cy, 0);

      const capPosAttr = capGeo.attributes.position;
      const capUvs = new Float32Array(capPosAttr.count * 2);
      for (let i = 0; i < capPosAttr.count; i++) {
        const worldX = capPosAttr.getX(i) + cx;
        const worldY = capPosAttr.getY(i) + cy;
        capUvs[i * 2] = (worldX + blockWidth / 2) / blockWidth;
        capUvs[i * 2 + 1] = (worldY + panelHeight / 2) / panelHeight;
      }
      capGeo.setAttribute('uv', new THREE.BufferAttribute(capUvs, 2));

      const capMat = new THREE.MeshBasicMaterial({
        map: panelTexture,
        transparent: true,
        opacity: 0.96,
        depthWrite: false,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.set(0, 0, (13 * S) / 2 + 2.6 * S + 0.1);
      shardMesh.add(capMesh);

      slabGroup.add(shardMesh);

      // Add physics and animation tracking data
      shards.push({
        mesh: shardMesh,
        capMesh,
        originalPos: shardMesh.position.clone(),
        originalRot: new THREE.Euler(0, 0, 0),
        targetZ: 0,
        currentZ: 0,
        rotX: 0,
        rotY: 0,
        springZ: new Spring(0, 170, 19),
        springRotX: new Spring(0, 170, 19),
        springRotY: new Spring(0, 170, 19),
        iridescence: 0.55,
        envMapIntensity: 1.0,
        velocity: new THREE.Vector3(
          (cx / (blockWidth / 2)) * 600 * S,
          -450 * S - Math.random() * 200 * S,
          (420 + Math.random() * 380) * S
        ),
        rotVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 4.5,
          (Math.random() - 0.5) * 4.5,
          (Math.random() - 0.5) * 4.5
        ),
        shatterRot: new THREE.Vector3(),
        staggerDelay: cellIndex * 0.03,
      });
    });

    // Add nav slab to shards list for hover and shatter interaction
    shards.unshift({
      mesh: navMesh,
      capMesh: navCapMesh,
      originalPos: navMesh.position.clone(),
      originalRot: new THREE.Euler(0, 0, 0),
      targetZ: 0,
      currentZ: 0,
      rotX: 0,
      rotY: 0,
      springZ: new Spring(0, 170, 19),
      springRotX: new Spring(0, 170, 19),
      springRotY: new Spring(0, 170, 19),
      iridescence: 0.55,
      envMapIntensity: 1.0,
      velocity: new THREE.Vector3(0, 500 * S, 650 * S),
      rotVelocity: new THREE.Vector3(1.2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
      shatterRot: new THREE.Vector3(),
      staggerDelay: 0,
      isNav: true,
    });

    // 6. Build the 3D "← Back" Slivers
    // Outline: viewport fractions (.147,.243) (.252,.169) (.287,.277) (.151,.258), with bright bevel
    const kFactor = width / 1918;
    const sliverPoints: Point2D[] = [
      { x: (0.147 - 0.5) * width, y: (0.5 - 0.243) * height },
      { x: (0.252 - 0.5) * width, y: (0.5 - 0.169) * height },
      { x: (0.287 - 0.5) * width, y: (0.5 - 0.277) * height },
      { x: (0.151 - 0.5) * width, y: (0.5 - 0.258) * height },
    ];
    const sliverShape = createRoundedPolygonShape(sliverPoints, 12 * kFactor);
    const sliverExtrude = new THREE.ExtrudeGeometry(sliverShape, {
      depth: 11 * kFactor,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 2 * kFactor,
      bevelThickness: 2 * kFactor,
    });
    sliverExtrude.center();

    const sliverMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x17171b),
      roughness: 0.36,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      specularIntensity: 0.7,
      iridescence: 0.35,
      envMapIntensity: 1.1,
    });
    const sliverMesh = new THREE.Mesh(sliverExtrude, sliverMat);
    sliverMesh.position.set(-width * 0.28, height * 0.26, 100);
    sliverMesh.rotation.set(0.08, -0.16, 0);
    sliverMesh.scale.set(0.001, 0.001, 0.001); // starts invisible
    scene.add(sliverMesh);

    // 7. Mouse & Raycasting Setup
    const pointer = new THREE.Vector2(-9999, -9999);
    const raycaster = new THREE.Raycaster();
    let hoveredShard: ShardData | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized Device Coordinates (-1 to 1)
      pointer.x = (x / width) * 2 - 1;
      pointer.y = -(y / height) * 2 + 1;

      // Project pointer into 3D world at z = 0
      const vec = new THREE.Vector3(pointer.x, pointer.y, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distToZ0 = -camera.position.z / vec.z;
      const worldPos = camera.position.clone().add(vec.multiplyScalar(distToZ0));

      glowUniforms.uPointerWorld.value.copy(worldPos);
      glowUniforms.uGlowIntensity.value = 1.0;
    };

    const handlePointerLeave = () => {
      pointer.set(-9999, -9999);
      glowUniforms.uGlowIntensity.value = 0.0;
      hoveredShard = null;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);

    // Click handling on 3D objects
    const handleClick = () => {
      if (isShatteredRef.current) {
        // Check if clicked sliver mesh
        raycaster.setFromCamera(pointer, camera);
        const sliverHits = raycaster.intersectObject(sliverMesh, true);
        if (sliverHits.length > 0) {
          setIsShattered(false);
          return;
        }
      } else {
        // If clicked on shard or link
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(
          shards.map((s) => s.mesh),
          true
        );
        if (hits.length > 0) {
          // Check position for buttons
          const hit = hits[0];
          const localX = hit.point.x;

          // If clicked in nav slab
          if (hit.object === navMesh || hit.object === navCapMesh) {
            if (localX > blockWidth * 0.3) {
              onOpenCv();
              return;
            }
          }

          // Trigger Shatter
          setIsShattered(true);
        }
      }
    };

    canvas.addEventListener('click', handleClick);

    // 8. Animation & Physics Loop
    let animId: number;
    let prevTime = performance.now();
    let shatterTime = 0;

    // Smooth global tilt variables
    let currentTiltX = 0;
    let currentTiltY = 0;

    const animate = (timeNow: number) => {
      const dt = Math.min((timeNow - prevTime) / 1000, 0.05);
      prevTime = timeNow;

      // 8a. Global Slab Tilt toward Pointer
      if (!isShatteredRef.current && pointer.x > -900) {
        const targetRotY = pointer.x * THREE.MathUtils.degToRad(7) - THREE.MathUtils.degToRad(1.2);
        const targetRotX = -pointer.y * THREE.MathUtils.degToRad(5.5) + THREE.MathUtils.degToRad(0.8);
        currentTiltX += (targetRotX - currentTiltX) * 0.08;
        currentTiltY += (targetRotY - currentTiltY) * 0.08;
      } else {
        currentTiltX += (0 - currentTiltX) * 0.05;
        currentTiltY += (0 - currentTiltY) * 0.05;
      }
      slabGroup.rotation.x = currentTiltX;
      slabGroup.rotation.y = currentTiltY;

      // 8b. Shard Hover Raycasting
      if (!isShatteredRef.current && pointer.x > -900) {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(
          shards.map((s) => s.mesh),
          true
        );

        let activeHitShard: ShardData | null = null;
        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          activeHitShard =
            shards.find((s) => s.mesh === hitObj || s.capMesh === hitObj) || null;
        }

        hoveredShard = activeHitShard;
      } else {
        hoveredShard = null;
      }

      // 8c. Shatter Progress State
      if (isShatteredRef.current) {
        shatterTime = Math.min(1.0, shatterTime + dt / 0.72);
      } else {
        shatterTime = Math.max(0.0, shatterTime - dt / 0.72);
      }

      // 8d. Update Each Shard
      shards.forEach((shard) => {
        const isHovered = hoveredShard === shard;

        // Hover lift and tip
        const liftDist = shard.isNav ? 32 * S : 50 * S;
        shard.springZ.target = isHovered ? liftDist : 0;

        if (isHovered && pointer.x > -900) {
          // Tip away from cursor
          shard.springRotX.target = -pointer.y * 0.18;
          shard.springRotY.target = pointer.x * 0.18;
          shard.iridescence = THREE.MathUtils.lerp(shard.iridescence, 1.0, 0.1);
          shard.envMapIntensity = THREE.MathUtils.lerp(shard.envMapIntensity, 1.9, 0.1);
        } else {
          shard.springRotX.target = 0;
          shard.springRotY.target = 0;
          shard.iridescence = THREE.MathUtils.lerp(shard.iridescence, 0.55, 0.1);
          shard.envMapIntensity = THREE.MathUtils.lerp(shard.envMapIntensity, 1.0, 0.1);
        }

        const zOffset = shard.springZ.update(dt);
        const rx = shard.springRotX.update(dt);
        const ry = shard.springRotY.update(dt);

        const mat = shard.mesh.material as THREE.MeshPhysicalMaterial;
        mat.iridescence = shard.iridescence;
        mat.envMapIntensity = shard.envMapIntensity;

        // Shatter flight calculation (ease-in cubic)
        if (shatterTime > 0) {
          const tRel = Math.max(0, (shatterTime - shard.staggerDelay) / (1 - shard.staggerDelay));
          const easeIn = tRel * tRel * tRel;

          // Flying outward + gravity
          const flyX = shard.originalPos.x + shard.velocity.x * easeIn;
          const flyY = shard.originalPos.y + shard.velocity.y * easeIn - 300 * easeIn * easeIn;
          const flyZ = shard.originalPos.z + shard.velocity.z * easeIn + zOffset;

          shard.mesh.position.set(flyX, flyY, flyZ);

          shard.mesh.rotation.x = rx + shard.rotVelocity.x * easeIn;
          shard.mesh.rotation.y = ry + shard.rotVelocity.y * easeIn;
          shard.mesh.rotation.z = shard.rotVelocity.z * easeIn;

          // Fade out slightly when far
          mat.opacity = Math.max(0, 1 - easeIn * 0.85);
          (shard.capMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.95 - easeIn * 0.9);
        } else {
          // Sitting on the slab
          shard.mesh.position.set(shard.originalPos.x, shard.originalPos.y, shard.originalPos.z + zOffset);
          shard.mesh.rotation.set(rx, ry, 0);
          mat.opacity = 1.0;
          (shard.capMesh.material as THREE.MeshBasicMaterial).opacity = 0.96;
        }
      });

      // 8e. "← Back" Slivers in Shattered Mode
      if (shatterTime > 0.3) {
        const sliverProgress = (shatterTime - 0.3) / 0.7;
        const sliverScale = THREE.MathUtils.lerp(0.001, 1.0, sliverProgress);
        sliverMesh.scale.set(sliverScale, sliverScale, sliverScale);

        // Idle wobble
        const wobble = Math.sin(timeNow * 0.003) * 0.035;
        sliverMesh.rotation.z = wobble;
      } else {
        sliverMesh.scale.set(0.001, 0.001, 0.001);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      const newDist = (height / 2) / Math.tan(THREE.MathUtils.degToRad(fov / 2));
      camera.position.z = newDist;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('click', handleClick);

      pmremGenerator.dispose();
      roomEnv.dispose();
      renderer.dispose();
    };
  }, [language, onOpenCv]);

  return (
    <section className="relative w-full h-[98vh] min-h-[640px] bg-[#050507] overflow-hidden select-none">
      {/* Three.js WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
      </div>

      {/* Accessible Floating Controls Overlay */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsShattered(!isShattered)}
            className="px-4 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-white text-xs font-mono transition-all shadow-xl"
          >
            {isShattered
              ? language === 'es'
                ? '← Reensamblar Cristal'
                : '← Reassemble Glass'
              : language === 'es'
              ? 'Fragmentar Cristal (Shatter) →'
              : 'Shatter Glass →'}
          </button>

          <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 text-amber-300 text-xs font-mono transition-all shadow-xl"
          >
            {language.toUpperCase()}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onExploreProjects}
            className="px-4 py-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-mono transition-all"
          >
            {language === 'es' ? 'Explorar Dossier Completo ↓' : 'Explore Full Dossier ↓'}
          </button>
        </div>
      </div>
    </section>
  );
};
