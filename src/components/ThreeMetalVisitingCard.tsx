import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RefreshCw } from 'lucide-react';

interface ThreeMetalVisitingCardProps {
  shopName?: string;
  ownerName?: string;
  phoneNumbers?: string;
  email?: string;
  address?: string;
  logoUrl?: string;
}

export const ThreeMetalVisitingCard: React.FC<ThreeMetalVisitingCardProps> = ({
  shopName = 'HayaGraphics',
  ownerName = 'Niraj Vora',
  phoneNumbers = '+91 73838 55862 / +91 98258 97010',
  email = 'hayagraphics18@gmail.com',
  address = 'Commercial Printing Hub, Near Relief Road, Ahmedabad',
  logoUrl,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cardMeshRef = useRef<THREE.Mesh | null>(null);

  // Helper to draw brushed metal background on a 2D canvas
  const drawBrushedMetalTexture = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Base dark obsidian / gunmetal gradient with brighter reflective highlights
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#262d37');
    grad.addColorStop(0.35, '#384351');
    grad.addColorStop(0.65, '#28313d');
    grad.addColorStop(1, '#1b222c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle brushed metal streaks with bright sheen
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 3) {
      ctx.beginPath();
      ctx.moveTo(0, y + (Math.sin(y * 0.1) * 2));
      ctx.lineTo(w, y + (Math.cos(y * 0.1) * 2));
      ctx.stroke();
    }
    ctx.restore();

    // Metallic specular vignette with warm golden brilliance
    const radial = ctx.createRadialGradient(w * 0.45, h * 0.35, 30, w * 0.5, h * 0.5, w * 0.7);
    radial.addColorStop(0, 'rgba(255, 235, 170, 0.22)');
    radial.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
    radial.addColorStop(1, 'rgba(10, 14, 20, 0.3)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);
  };

  // Helper to create the HG Gold Monogram Crest
  const drawHGCrest = (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) => {
    ctx.save();

    // Outer gold double ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    const goldGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
    goldGrad.addColorStop(0, '#f9e79f');
    goldGrad.addColorStop(0.3, '#d4af37');
    goldGrad.addColorStop(0.6, '#aa7c11');
    goldGrad.addColorStop(0.85, '#f5d76e');
    goldGrad.addColorStop(1, '#b8860b');
    ctx.strokeStyle = goldGrad;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius - 6, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(249, 231, 159, 0.5)';
    ctx.stroke();

    // Subtle dark badge fill
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 12, 15, 0.7)';
    ctx.fill();

    // "HG" Monogram Text
    ctx.font = 'bold 36px "Playfair Display", "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = goldGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('HG', cx, cy - 2);

    // Mini star beneath
    ctx.font = '10px sans-serif';
    ctx.fillText('★ ★ ★', cx, cy + 22);

    ctx.restore();
  };

  // Generate Front Canvas Texture
  const createFrontCanvas = (imgLogo?: HTMLImageElement): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    drawBrushedMetalTexture(ctx, canvas.width, canvas.height);

    // Metallic Gold Border with corner chamfers
    ctx.save();
    const borderGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    borderGrad.addColorStop(0, '#d4af37');
    borderGrad.addColorStop(0.5, '#fef5d1');
    borderGrad.addColorStop(1, '#aa7c11');

    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 3;
    const pad = 30;
    ctx.strokeRect(pad, pad, canvas.width - pad * 2, canvas.height - pad * 2);

    // Corner laser engravings
    const cornerSize = 18;
    const drawCorner = (x: number, y: number, dx: number, dy: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + dy * cornerSize);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * cornerSize, y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f9e79f';
      ctx.stroke();
    };
    drawCorner(pad - 6, pad - 6, 1, 1);
    drawCorner(canvas.width - pad + 6, pad - 6, -1, 1);
    drawCorner(pad - 6, canvas.height - pad + 6, 1, -1);
    drawCorner(canvas.width - pad + 6, canvas.height - pad + 6, -1, -1);
    ctx.restore();

    // Top Section: HG Logo Badge
    const logoX = pad + 60;
    const logoY = pad + 60;
    if (imgLogo && imgLogo.complete && imgLogo.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX, logoY, 44, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(imgLogo, logoX - 44, logoY - 44, 88, 88);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(logoX, logoY, 44, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = borderGrad;
      ctx.stroke();
    } else {
      drawHGCrest(ctx, logoX, logoY, 44);
    }

    // Top Brand Name: "HayaGraphics"
    ctx.save();
    ctx.textAlign = 'left';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.fillStyle = borderGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('HayaGraphics', logoX + 60, logoY - 8);

    ctx.font = '600 13px sans-serif';
    ctx.fillStyle = '#c5a059';
    ctx.letterSpacing = '2px';
    ctx.fillText('COMMERCIAL PRINTING & LUXURY METAL CARDS', logoX + 60, logoY + 16);
    ctx.restore();

    // Smart Metal IC / Chip Mockup
    ctx.save();
    const chipX = canvas.width - pad - 120;
    const chipY = pad + 35;
    const chipW = 75;
    const chipH = 55;
    const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, '#f5d76e');
    chipGrad.addColorStop(0.5, '#d4af37');
    chipGrad.addColorStop(1, '#996515');
    ctx.fillStyle = chipGrad;
    ctx.roundRect(chipX, chipY, chipW, chipH, 8);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#332200';
    ctx.stroke();

    // Chip internal circuit lines
    ctx.strokeStyle = 'rgba(30, 20, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(chipX + 10, chipY + 8, chipW - 20, chipH - 16);
    ctx.beginPath();
    ctx.moveTo(chipX + chipW / 2, chipY + 8);
    ctx.lineTo(chipX + chipW / 2, chipY + chipH - 8);
    ctx.moveTo(chipX + 10, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW - 10, chipY + chipH / 2);
    ctx.stroke();
    ctx.restore();

    // Middle Section: Person Name "Niraj Vora" (Replacing Rajesh Batra)
    ctx.save();
    ctx.textAlign = 'left';
    ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#fbf7ee';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fillText(ownerName, pad + 40, 280);

    ctx.font = '500 16px sans-serif';
    ctx.fillStyle = '#d4af37';
    ctx.fillText('Founder & Managing Director', pad + 42, 312);

    // Decorative divider line
    ctx.beginPath();
    ctx.moveTo(pad + 40, 335);
    ctx.lineTo(pad + 380, 335);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Bottom Contact Details (Phone, Address, Email)
    ctx.save();
    ctx.textAlign = 'left';

    // Phone Row
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#f5e5b8';
    ctx.fillText('📞  ' + phoneNumbers, pad + 42, 410);

    // Email Row
    ctx.font = '15px sans-serif';
    ctx.fillStyle = '#e0d8cc';
    ctx.fillText('✉️  ' + email, pad + 42, 450);

    // Address Row
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#c0b8ac';
    ctx.fillText('📍  ' + address, pad + 42, 488);

    // Bottom Right: Metal Badge Specs
    ctx.textAlign = 'right';
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#d4af37';
    ctx.fillText('0.8mm ANODIZED BLACK METAL', canvas.width - pad - 35, 475);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#999080';
    ctx.fillText('LASER ETCHED • MATTE LUXE', canvas.width - pad - 35, 495);

    ctx.restore();

    return canvas;
  };

  // Generate Back Canvas Texture
  const createBackCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    drawBrushedMetalTexture(ctx, canvas.width, canvas.height);

    // Border
    ctx.save();
    const borderGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    borderGrad.addColorStop(0, '#aa7c11');
    borderGrad.addColorStop(0.5, '#f9e79f');
    borderGrad.addColorStop(1, '#d4af37');

    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2.5;
    const pad = 30;
    ctx.strokeRect(pad, pad, canvas.width - pad * 2, canvas.height - pad * 2);
    ctx.restore();

    // Center Large HG Crest
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 25;
    drawHGCrest(ctx, cx, cy, 75);

    // Brand Name Under Crest
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'bold 38px "Playfair Display", Georgia, serif';
    ctx.fillStyle = borderGrad;
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText(shopName, cx, cy + 120);

    ctx.font = '600 13px sans-serif';
    ctx.fillStyle = '#d4af37';
    ctx.letterSpacing = '4px';
    ctx.fillText('COMMERCIAL PRINTING & PACKAGING', cx, cy + 148);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#a89880';
    ctx.fillText('Ahmedabad, Gujarat • Factory Direct Rates', cx, cy + 172);

    // Magnetic Stripe representation
    ctx.fillStyle = '#05070a';
    ctx.fillRect(pad, 40, canvas.width - pad * 2, 70);
    ctx.strokeStyle = 'rgba(212,175,55,0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(pad, 40, canvas.width - pad * 2, 70);

    ctx.font = '11px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.textAlign = 'right';
    ctx.fillText('HG-METAL-AUTH-SECURE-2026', canvas.width - pad - 20, 80);

    ctx.restore();

    return canvas;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 260;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.1;
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls for 360 interactive rotation - continuously spinning
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 7.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.2;
    controlsRef.current = controls;

    // High Brightness Studio Lighting setup for gleaming metallic finish
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Direct Front Bright White Light
    const frontBrightLight = new THREE.DirectionalLight(0xffffff, 3.2);
    frontBrightLight.position.set(0, 1, 6);
    scene.add(frontBrightLight);

    // Warm Key Light (Golden sheen)
    const keyLight = new THREE.DirectionalLight(0xfff6dd, 3.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Cool Rim Light for metallic edges
    const rimLight = new THREE.DirectionalLight(0xddeeff, 2.4);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    // Top studio soft light
    const topLight = new THREE.PointLight(0xfffae6, 3.0, 15);
    topLight.position.set(0, 3.5, 3);
    scene.add(topLight);

    // Create textures
    const frontCanvas = createFrontCanvas();
    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.anisotropy = 8;

    // Load actual logo image if provided and re-paint front canvas
    if (logoUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const updatedCanvas = createFrontCanvas(img);
        frontTexture.image = updatedCanvas;
        frontTexture.needsUpdate = true;
      };
      img.src = logoUrl;
    }

    const backCanvas = createBackCanvas();
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.anisotropy = 8;

    // Card Geometry: 3.5" x 2.0" ratio ~ (3.5 x 2.1 x 0.04)
    const cardWidth = 3.5;
    const cardHeight = 2.15;
    const cardDepth = 0.04; // realistic metal sheet thickness
    const geometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth, 32, 32, 2);

    // Edge material: Polished Gold Mirror
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.18,
    });

    // Front & Back materials
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      metalness: 0.88,
      roughness: 0.25,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.88,
      roughness: 0.25,
    });

    // Box materials order: [+x, -x, +y, -y, +z (front), -z (back)]
    const materials = [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];

    const cardMesh = new THREE.Mesh(geometry, materials);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;
    scene.add(cardMesh);
    cardMeshRef.current = cardMesh;

    // Initial subtle tilt for dramatic perspective
    cardMesh.rotation.y = -0.25;
    cardMesh.rotation.x = 0.15;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      // Subtle dynamic specular point light following camera
      topLight.position.x = Math.sin(Date.now() * 0.001) * 2;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      frontTexture.dispose();
      backTexture.dispose();
    };
  }, [shopName, ownerName, phoneNumbers, email, address, logoUrl]);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.autoRotate = true;
    }
  };

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-neutral-950 border border-[#DECFC0] shadow-xl group">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Brand Pill: Logo & Shop Name */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-amber-400/40 shadow-md">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shrink-0">
          <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-[10px] font-bold text-amber-300 font-serif">
            HG
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-amber-200 leading-tight">
            {shopName}
          </p>
          <p className="text-[10px] text-neutral-300 leading-tight font-mono">
            3D Metal Card Simulator
          </p>
        </div>
      </div>

      {/* Top Right Live Controls - Reset button only */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
        <button
          onClick={handleReset}
          className="p-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-amber-300 rounded-lg border border-neutral-700 transition-all active:scale-95"
          title="Reset Camera View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint Bar */}
      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none text-[10px]">
        <span className="bg-neutral-900/85 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10 text-neutral-300">
          👆 Drag to rotate 360° • Scroll / Pinch to zoom
        </span>
        <span className="bg-amber-500/15 backdrop-blur-xs px-2.5 py-1 rounded-md border border-amber-400/30 text-amber-300 font-mono font-medium">
          0.8mm Black Metal
        </span>
      </div>
    </div>
  );
};
