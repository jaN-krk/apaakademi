'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

/** React Bits: public assets under public/lanyard */
const cardGLB = '/lanyard/card.glb';
const lanyardDefault = '/lanyard/lanyard.png';
const logoAPA = '/brand/academy/apa-logo.png';

extend({ MeshLineGeometry, MeshLineMaterial } as never);

declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meshLineGeometry: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meshLineMaterial: any;
  }
}

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Measured from card.glb's face UVs; the rest of the atlas stays charcoal.
const FRONT_UV_RECT = { x: 0.012, y: 0.015, w: 0.476, h: 0.728 };
const BACK_UV_RECT = { x: 0.513, y: 0.015, w: 0.476, h: 0.73 };

export interface LanyardProps {
  onReady?: () => void;
  compact?: boolean;
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  /** APA / brand logo drawn on the front face */
  brandLogo?: string | null;
  /** Person name printed on the front face */
  name?: string | null;
  /** Optional line under name (role) */
  caption?: string | null;
}

useGLTF.preload(cardGLB);

/**
 * React Bits Lanyard — https://reactbits.dev/components/lanyard
 * Front: person photo + APA logo + name. Back: APA brand. Band: lanyard texture.
 */
export default function Lanyard({
  onReady,
  compact = false,
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 18,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1.25,
  brandLogo = logoAPA,
  name = null,
  caption = null
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 h-full w-full touch-none">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, compact ? 1.5 : isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      >
        <CardCamera compact={compact} />
        <ambientLight intensity={1.15} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              onReady={onReady}
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              brandLogo={brandLogo}
              name={name}
              caption={caption}
            />
          </Physics>
          <Environment blur={0.6}>
            <Lightformer
              intensity={1.2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={1.4}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={1.4}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3.5}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function CardCamera({ compact }: { compact: boolean }) {
  const { camera, size } = useThree()
  useEffect(() => {
    if (!compact || !(camera instanceof THREE.PerspectiveCamera)) return
    // Keep the portrait large, but leave space for its swing on narrow grids.
    const height = Math.max(4.55, 2.85 / (size.width / size.height))
    camera.position.set(0, 1, height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))))
    camera.rotation.set(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, compact])
  return null
}

interface BandProps {
  onReady?: () => void;
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  brandLogo?: string | null;
  name?: string | null;
  caption?: string | null;
}

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

function Band({
  onReady,
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  brandLogo = logoAPA,
  name = null,
  caption = null
}: BandProps) {
  const canvasSize = useThree(state => state.size);
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<LanyardRigidBody>(null!);
  const j2 = useRef<LanyardRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const scratch = useRef({ vec: new THREE.Vector3(), ang: new THREE.Vector3(), rot: new THREE.Vector3(), dir: new THREE.Vector3(), clipLocal: new THREE.Vector3(), clipQuat: new THREE.Quaternion() });
  // Rigid-body local point that matches the metal clip eye on card.glb
  // (with mesh group scale 2.4 / position y -1.22)
  const CLIP_LOCAL_Y = 1.52;

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: false,
    colliders: false,
    angularDamping: 6,
    linearDamping: 5
  };

  const getLerped = (body: LanyardRigidBody): THREE.Vector3 => {
    if (!body.lerped) {
      body.lerped = new THREE.Vector3().copy(body.translation());
    }
    return body.lerped;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF(cardGLB) as any;

  const texture = useTexture(lanyardImage || lanyardDefault);
  const strapTexture = useMemo(() => {
    const copy = texture.clone();
    copy.wrapS = copy.wrapT = THREE.RepeatWrapping;
    copy.needsUpdate = true;
    return copy;
  }, [texture]);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);
  const logoTex = useTexture(brandLogo || BLANK_PIXEL);

  useEffect(() => {
    const frame = requestAnimationFrame(() => onReady?.());
    return () => cancelAnimationFrame(frame);
  }, [onReady]);

  // Ensure photo textures sample correctly when painted onto the card atlas
  useEffect(() => {
    ;[frontTex, backTex, logoTex].forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
  }, [frontTex, backTex, logoTex]);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    if (!frontImage && !backImage && !name && !brandLogo) return baseMap;

    const baseImg = baseMap.image as HTMLImageElement | ImageBitmap | undefined;
    if (!baseImg || !('width' in baseImg)) return baseMap;

    const W = Number(baseImg.width);
    const H = Number(baseImg.height);
    if (!W || !H) return baseMap;

    const canvas = document.createElement('canvas');
    // Keep native atlas resolution for sharp portraits on the mesh
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#161616';
    ctx.fillRect(0, 0, W, H);

    const sourceSize = (
      img: CanvasImageSource
    ): { w: number; h: number } | null => {
      if (img instanceof HTMLImageElement || img instanceof ImageBitmap) {
        const w = Number(img.width);
        const h = Number(img.height);
        return w > 0 && h > 0 ? { w, h } : null;
      }
      if (img instanceof HTMLCanvasElement) {
        return img.width > 0 && img.height > 0
          ? { w: img.width, h: img.height }
          : null;
      }
      return null;
    };

    const drawFitted = (
      img: CanvasImageSource,
      rect: typeof FRONT_UV_RECT,
      fit: 'cover' | 'contain' = imageFit,
      /** Bias cover crop toward face (0 = bottom, 0.5 = center, 1 = top). */
      focusY = 0.62
    ) => {
      const size = sourceSize(img);
      if (!size) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const { w: iw, h: ih } = size;
      const pick = fit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / iw, rh / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      // Center horizontally; vertically prefer faces / upper body
      const dx = rx + (rw - dw) / 2;
      let dy: number;
      if (fit === 'cover' && dh > rh + 0.5) {
        const maxDy = ry; // show top of photo
        const minDy = ry + rh - dh; // show bottom
        dy = maxDy + (minDy - maxDy) * (1 - focusY);
      } else {
        dy = ry + (rh - dh) / 2;
      }
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.fillStyle = '#111111';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    // —— FRONT —— photo plate + APA + name
    const frx = FRONT_UV_RECT.x * W;
    const fry = FRONT_UV_RECT.y * H;
    const frw = FRONT_UV_RECT.w * W;
    const frh = FRONT_UV_RECT.h * H;

    // Soft frame under photo
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(frx, fry, frw, frh);

    if (frontImage && frontTex.image) {
      // Portrait window: leave room for logo strip + name strip
      const logoBand = frh * 0.11;
      const nameBand = frh * 0.24;
      const photoRect = {
        x: FRONT_UV_RECT.x,
        y: FRONT_UV_RECT.y + (logoBand * 0.55) / H,
        w: FRONT_UV_RECT.w,
        h: FRONT_UV_RECT.h - (logoBand * 0.55 + nameBand * 0.35) / H
      };
      drawFitted(
        frontTex.image as CanvasImageSource,
        photoRect,
        'cover',
        0.58
      );
    }

    // Top APA plate
    if (brandLogo && logoTex.image) {
      const logoImg = logoTex.image as CanvasImageSource;
      const size = sourceSize(logoImg);
      if (size) {
        const barH = frh * 0.11;
        ctx.save();
        ctx.beginPath();
        ctx.rect(frx, fry, frw, frh);
        ctx.clip();
        ctx.fillStyle = 'rgba(255,255,255,0.98)';
        ctx.fillRect(frx, fry, frw, barH);
        const logoH = barH * 0.95;
        const logoW = Math.min(frw * 0.42, size.w * (logoH / size.h));
        ctx.drawImage(
          logoImg,
          frx + (frw - logoW) / 2,
          fry + (barH - logoH) / 2,
          logoW,
          logoH
        );
        ctx.restore();
      }
    }

    // Name strip at bottom of front face
    if (name) {
      const stripH = frh * 0.24;
      const stripY = fry + frh - stripH;
      ctx.save();
      ctx.beginPath();
      ctx.rect(frx, fry, frw, frh);
      ctx.clip();
      const grad = ctx.createLinearGradient(0, stripY - stripH * 0.6, 0, fry + frh);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.35, 'rgba(0,0,0,0.45)');
      grad.addColorStop(1, 'rgba(0,0,0,0.92)');
      ctx.fillStyle = grad;
      ctx.fillRect(frx, stripY - stripH * 0.55, frw, stripH * 1.55);

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = frw * 0.083;
      ctx.font = `600 ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      const nameY = caption ? stripY + stripH * 0.36 : stripY + stripH * 0.5;
      wrapText(ctx, name, frx + frw / 2, nameY, frw * 0.88, fontSize * 1.15);

      if (caption) {
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        const capSize = fontSize * 0.43;
        ctx.font = `500 ${capSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
        ctx.fillText(
          caption.toLocaleUpperCase('tr-TR'),
          frx + frw / 2,
          stripY + stripH * 0.85,
          frw * 0.88
        );
      }
      ctx.restore();
    }

    // —— BACK —— APA brand
    if (backImage && backTex.image) {
      const brx = BACK_UV_RECT.x * W;
      const bry = BACK_UV_RECT.y * H;
      const brw = BACK_UV_RECT.w * W;
      const brh = BACK_UV_RECT.h * H;
      ctx.save();
      ctx.beginPath();
      ctx.rect(brx, bry, brw, brh);
      ctx.clip();
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(brx, bry, brw, brh);
      ctx.restore();
      drawFitted(backTex.image as CanvasImageSource, BACK_UV_RECT, 'contain', 0.5);
    } else if (brandLogo && logoTex.image) {
      const brx = BACK_UV_RECT.x * W;
      const bry = BACK_UV_RECT.y * H;
      const brw = BACK_UV_RECT.w * W;
      const brh = BACK_UV_RECT.h * H;
      ctx.save();
      ctx.beginPath();
      ctx.rect(brx, bry, brw, brh);
      ctx.clip();
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(brx, bry, brw, brh);
      ctx.restore();
      drawFitted(logoTex.image as CanvasImageSource, BACK_UV_RECT, 'contain', 0.5);
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.minFilter = THREE.LinearMipmapLinearFilter;
    composite.magFilter = THREE.LinearFilter;
    composite.generateMipmaps = true;
    composite.needsUpdate = true;
    return composite;
  }, [
    frontImage,
    backImage,
    brandLogo,
    name,
    caption,
    imageFit,
    frontTex,
    backTex,
    logoTex,
    materials.base.map
  ]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ], false, "chordal")
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.68]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.68]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.68]);
  // j3 anchors into the metal snap-hook eye on the card
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CLIP_LOCAL_Y, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const { vec, ang, rot, dir, clipLocal, clipQuat } = scratch.current;
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      // Intersect the pointer ray with the original grab plane, avoiding a jump
      // toward the camera when the card becomes kinematic.
      const distance = (dragged.z - state.camera.position.z) / dir.z;
      vec.copy(state.camera.position).add(dir.multiplyScalar(distance)).sub(dragged);
      const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);
      const horizontalLimit = Math.max(.3, viewport.width / 2 - .92);
      vec.x = THREE.MathUtils.clamp(vec.x, -horizontalLimit, horizontalLimit);
      vec.y = THREE.MathUtils.clamp(vec.y, state.camera.position.y - viewport.height / 2 + 1.3, state.camera.position.y + viewport.height / 2 - 1.75);
      vec.z = 0;
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x,
        y: vec.y,
        z: vec.z
      });
    }
    if (fixed.current && card.current) {
      const t = card.current.translation();
      if (t.y < -6 || Math.abs(t.x) > 8 || Math.abs(t.z) > 6) {
        card.current.setTranslation({ x: 0.45, y: 2.1, z: 0 }, true);
        card.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        card.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        j1.current?.setTranslation({ x: 0.12, y: 3.55, z: 0 }, true);
        j2.current?.setTranslation({ x: 0.22, y: 3.1, z: 0 }, true);
        j3.current?.setTranslation({ x: 0.32, y: 2.65, z: 0 }, true);
      }

      [j1, j2].forEach((ref) => {
        const lerped = getLerped(ref.current);
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, lerped.distanceTo(ref.current.translation()))
        );
        lerped.lerp(
          ref.current.translation(),
          1 - Math.exp(-delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
        );
      });

      // Band must end in the metal clip, not float above it
      const cardT = card.current.translation();
      const cardR = card.current.rotation();
      clipQuat.set(cardR.x, cardR.y, cardR.z, cardR.w);
      clipLocal.set(0, CLIP_LOCAL_Y, 0).applyQuaternion(clipQuat);
      curve.points[0].set(
        cardT.x + clipLocal.x,
        cardT.y + clipLocal.y,
        cardT.z + clipLocal.z
      );
      curve.points[1].copy(getLerped(j2.current));
      curve.points[2].copy(getLerped(j1.current));
      curve.points[3].copy(fixed.current.translation());
      // meshline geometry
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(band.current.geometry as any).setPoints(
        curve.getPoints(isMobile ? 20 : 40)
      )
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  useEffect(() => () => strapTexture.dispose(), [strapTexture]);
  useEffect(() => () => { if (cardMap !== materials.base.map) cardMap.dispose(); }, [cardMap, materials.base.map]);

  return (
    <>
      <group position={[0, 4.2, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.1, -0.38, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.18, -0.82, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.26, -1.28, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0.32, -1.85, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.12, 0.01]} />
          <group
            scale={2.4}
            position={[0, -1.25, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerCancel={() => drag(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(new THREE.Vector3().copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                // Paper / plastic ID card — high metalness turned portraits metallic/broken
                clearcoat={isMobile ? 0.05 : 0.25}
                clearcoatRoughness={0.55}
                roughness={0.62}
                metalness={0.04}
                envMapIntensity={0.45}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[canvasSize.width, canvasSize.height]}
          useMap={1}
          map={strapTexture}
          repeat={[-3, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(/\s+/);
  if (words.length <= 2 && ctx.measureText(text).width <= maxWidth) {
    ctx.fillText(text, x, y);
    return;
  }
  // Prefer wrapping Turkish full names into two lines (first / last)
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(' ');
    const line2 = words.slice(mid).join(' ');
    ctx.fillText(line1, x, y - lineHeight * 0.4, maxWidth);
    ctx.fillText(line2, x, y + lineHeight * 0.45, maxWidth);
    return;
  }
  ctx.fillText(text, x, y, maxWidth);
}
