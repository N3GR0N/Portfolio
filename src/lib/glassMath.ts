import * as THREE from 'three';

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Insets a simple convex/mildly concave polygon by an offset (positive insets towards center)
 */
export function insetPolygon(points: Point2D[], offset: number): Point2D[] {
  const n = points.length;
  if (n < 3) return points;

  // Compute centroid
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i++) {
    cx += points[i].x;
    cy += points[i].y;
  }
  cx /= n;
  cy /= n;

  // Inset towards centroid by proportional distance
  return points.map((p) => {
    const dx = cx - p.x;
    const dy = cy - p.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 1e-4) return { x: p.x, y: p.y };
    const step = Math.min(offset, dist * 0.4);
    return {
      x: p.x + (dx / dist) * step,
      y: p.y + (dy / dist) * step,
    };
  });
}

/**
 * Creates a THREE.Shape from a series of 2D points with rounded corners
 */
export function createRoundedPolygonShape(
  points: Point2D[],
  radius: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const n = points.length;
  if (n < 3) return shape;

  for (let i = 0; i < n; i++) {
    const pPrev = points[(i - 1 + n) % n];
    const pCurr = points[i];
    const pNext = points[(i + 1) % n];

    // Vectors to prev and next
    const vPrev = { x: pPrev.x - pCurr.x, y: pPrev.y - pCurr.y };
    const vNext = { x: pNext.x - pCurr.x, y: pNext.y - pCurr.y };

    const lenPrev = Math.hypot(vPrev.x, vPrev.y);
    const lenNext = Math.hypot(vNext.x, vNext.y);

    const actualRadius = Math.min(radius, lenPrev * 0.4, lenNext * 0.4);

    const start = {
      x: pCurr.x + (vPrev.x / lenPrev) * actualRadius,
      y: pCurr.y + (vPrev.y / lenPrev) * actualRadius,
    };

    const end = {
      x: pCurr.x + (vNext.x / lenNext) * actualRadius,
      y: pCurr.y + (vNext.y / lenNext) * actualRadius,
    };

    if (i === 0) {
      shape.moveTo(start.x, start.y);
    } else {
      shape.lineTo(start.x, start.y);
    }
    shape.quadraticCurveTo(pCurr.x, pCurr.y, end.x, end.y);
  }

  shape.closePath();
  return shape;
}

/**
 * Custom Spring physics simulator for smooth realistic glass movement
 */
export class Spring {
  pos = 0;
  vel = 0;
  target = 0;
  k = 170; // stiffness
  c = 19;  // damping

  constructor(initial = 0, k = 170, c = 19) {
    this.pos = initial;
    this.target = initial;
    this.k = k;
    this.c = c;
  }

  update(dt: number) {
    const clampedDt = Math.min(dt, 0.05);
    const force = -this.k * (this.pos - this.target) - this.c * this.vel;
    this.vel += force * clampedDt;
    this.pos += this.vel * clampedDt;
    return this.pos;
  }
}
