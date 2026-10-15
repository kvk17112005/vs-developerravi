import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CONTACT, type PlotCell, type PlotStatus } from "../../data/site";
import { cn } from "../../utils/cn";
import { EASE, Icon, WhatsAppGlyph } from "../ui";

/* ------------------------------------------------------------------ */
/*  Realistic 3D Plot-Layout Architectural Viewer                      */
/* ------------------------------------------------------------------ */

const STATUS_COLOR: Record<PlotStatus, string> = {
  available: "#2E7D4F",
  corner: "#C9A15A",
  reserved: "#5FA777",
  sold: "#7A828A",
};

const STATUS_LABEL: Record<PlotStatus, string> = {
  available: "Available Plot",
  corner: "Premium Corner Plot",
  reserved: "Reserved Plot",
  sold: "Constructed Villa (Sold)",
};

/* ----------------- miniature villa for sold plots ----------------- */

function MiniVilla({ w, d }: { w: number; d: number }) {
  const scale = Math.min(w, d) / 1.35;
  return (
    <group position={[0, 0.16, 0]} scale={[scale, scale, scale]}>
      {/* Ground floor main house */}
      <mesh position={[0, 0.22, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.78, 0.44, 0.72]} />
        <meshStandardMaterial color="#F5F2EB" roughness={0.45} />
      </mesh>

      {/* First floor / cantilever section */}
      <mesh position={[0.06, 0.54, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.72, 0.32, 0.64]} />
        <meshStandardMaterial color="#3A4048" roughness={0.35} />
      </mesh>

      {/* Modern wood accent wall panel */}
      <mesh position={[-0.3, 0.22, 0.32]} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.04]} />
        <meshStandardMaterial color="#965D34" roughness={0.6} />
      </mesh>

      {/* Modern flat/pitched roof with overhang */}
      <mesh position={[0.06, 0.72, -0.02]} castShadow>
        <boxGeometry args={[0.82, 0.05, 0.74]} />
        <meshStandardMaterial color="#22262B" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Dark tinted glass windows */}
      <mesh position={[0.18, 0.54, 0.31]}>
        <boxGeometry args={[0.34, 0.18, 0.02]} />
        <meshStandardMaterial color="#111827" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.22, 0.32]}>
        <boxGeometry args={[0.38, 0.22, 0.02]} />
        <meshStandardMaterial color="#111827" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Front entrance door */}
      <mesh position={[-0.14, 0.16, 0.32]}>
        <boxGeometry args={[0.14, 0.32, 0.02]} />
        <meshStandardMaterial color="#543319" roughness={0.5} />
      </mesh>

      {/* Entrance porch canopy */}
      <mesh position={[-0.14, 0.34, 0.42]} castShadow>
        <boxGeometry args={[0.24, 0.03, 0.18]} />
        <meshStandardMaterial color="#3A4048" roughness={0.3} />
      </mesh>

      {/* Paved driveway & miniature parked car */}
      <mesh position={[-0.34, -0.07, 0.24]} receiveShadow>
        <planeGeometry args={[0.34, 0.58]} />
        <meshStandardMaterial color="#D1D5DB" roughness={0.9} />
      </mesh>
      <group position={[-0.34, 0.08, 0.24]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.12, 0.38]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.09, -0.02]} castShadow>
          <boxGeometry args={[0.18, 0.08, 0.22]} />
          <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Small manicured garden bushes */}
      <mesh position={[0.34, 0.07, 0.36]} castShadow>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#3E8E41" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, 0.06, 0.4]} castShadow>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ---------------- surveyor boundary corner stones ----------------- */

function CornerStones({ w, d }: { w: number; d: number }) {
  const hw = (w / 2) * 0.94;
  const hd = (d / 2) * 0.94;
  const positions: [number, number][] = [
    [-hw, -hd],
    [hw, -hd],
    [-hw, hd],
    [hw, hd],
  ];

  return (
    <group position={[0, 0.16, 0]}>
      {positions.map(([cx, cz], i) => (
        <group key={i} position={[cx, 0.07, cz]}>
          {/* White concrete pillar */}
          <mesh castShadow>
            <cylinderGeometry args={[0.024, 0.028, 0.14, 8]} />
            <meshStandardMaterial color="#FAFAFA" roughness={0.4} />
          </mesh>
          {/* Red surveyor top marker */}
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.026, 0.026, 0.03, 8]} />
            <meshStandardMaterial color="#DC2626" roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- plot number signpost ---------------------------- */

function PlotSignboard({ label, status }: { label: string; status: PlotStatus }) {
  const isCorner = status === "corner";
  return (
    <group position={[0, 0.18, 0.38]}>
      {/* Wooden post */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.22, 6]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.8} />
      </mesh>
      {/* Sign board */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.3, 0.14, 0.02]} />
        <meshStandardMaterial color={isCorner ? "#D97706" : "#1B4332"} roughness={0.4} />
      </mesh>
      <Html position={[0, 0.22, 0.02]} center style={{ pointerEvents: "none" }}>
        <div className="select-none text-[8px] font-black tracking-wider text-white">
          P-{label}
        </div>
      </Html>
    </group>
  );
}

/* ---------------- interactive realistic plot ---------------------- */

function RealisticPlot({
  plot,
  selected,
  onSelect,
}: {
  plot: PlotCell;
  selected: boolean;
  onSelect: (p: PlotCell) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isSold = plot.status === "sold";
  const isCorner = plot.status === "corner";
  const isAvailable = plot.status === "available";

  const baseY = 0;

  useFrame((_, dt) => {
    const targetY = selected ? 0.45 : hovered ? 0.2 : baseY;
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetY,
        12,
        dt,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[plot.x, baseY, plot.z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(plot);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Concrete kerb border foundation */}
      <mesh position={[0, 0.07, 0]} receiveShadow castShadow>
        <boxGeometry args={[plot.w, 0.14, plot.d]} />
        <meshStandardMaterial
          color={hovered || selected ? "#15803D" : "#D4D8DD"}
          roughness={0.7}
          emissive={hovered || selected ? "#166534" : "#000000"}
          emissiveIntensity={hovered || selected ? 0.35 : 0}
        />
      </mesh>

      {/* Top landscaped grass plot bed */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[plot.w - 0.06, 0.04, plot.d - 0.06]} />
        <meshStandardMaterial
          color={
            isSold
              ? "#6B7280"
              : isCorner
                ? "#4ADE80"
                : isAvailable
                  ? "#22C55E"
                  : "#86EFAC"
          }
          roughness={0.85}
        />
      </mesh>

      {/* Surveyor boundary markers at 4 corners */}
      <CornerStones w={plot.w} d={plot.d} />

      {/* Constructed villa for sold plots OR plot signposts for vacant land */}
      {isSold ? (
        <MiniVilla w={plot.w} d={plot.d} />
      ) : (
        <>
          <PlotSignboard label={plot.label} status={plot.status} />
          {/* Decorative flowering corner shrubs on premium corner plots */}
          {isCorner && (
            <group position={[(plot.w / 2) * 0.7, 0.18, (-plot.d / 2) * 0.7]}>
              <mesh castShadow>
                <sphereGeometry args={[0.13, 8, 8]} />
                <meshStandardMaterial color="#F472B6" roughness={0.7} />
              </mesh>
              <mesh position={[0.1, -0.02, 0.08]} castShadow>
                <sphereGeometry args={[0.09, 8, 8]} />
                <meshStandardMaterial color="#FBBF24" roughness={0.7} />
              </mesh>
            </group>
          )}
        </>
      )}

      {/* Floating 3D Tooltip */}
      {hovered && (
        <Html
          position={[0, isSold ? 1.4 : 1.15, 0]}
          center
          zIndexRange={[50, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="flex -translate-y-2 flex-col items-center">
            <div className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-forest-950/95 px-3.5 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: STATUS_COLOR[plot.status] }}
              />
              <span className="font-bold">Plot {plot.label}</span>
              <span className="text-white/40">|</span>
              <span className="text-mint-200">{plot.sqft} sq.ft</span>
              <span className="text-white/40">|</span>
              <span
                className={cn(
                  "font-bold",
                  isSold
                    ? "text-gray-300"
                    : isCorner
                      ? "text-gold-300"
                      : "text-mint-300",
                )}
              >
                {STATUS_LABEL[plot.status]}
              </span>
            </div>
            {/* Tooltip triangle indicator */}
            <div className="h-2 w-2 rotate-45 bg-forest-950/95" />
          </div>
        </Html>
      )}
    </group>
  );
}

/* ---------------- realistic central park -------------------------- */

function RealisticPark({ x, z }: { x: number; z: number }) {
  const treeOffsets: [number, number, string, number][] = useMemo(
    () => [
      [-0.45, -0.4, "#15803D", 0.9],
      [0.45, -0.38, "#F472B6", 0.75], // Pink Tabebuia tree
      [-0.48, 0.35, "#166534", 1.0],
      [0.46, 0.38, "#22C55E", 0.85],
      [0, -0.5, "#FBBF24", 0.7], // Golden Tabebuia tree
    ],
    [],
  );

  return (
    <group position={[x, 0, z]}>
      {/* Landscaped park mound base */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.55, 0.16, 32]} />
        <meshStandardMaterial color="#4ADE80" roughness={0.8} />
      </mesh>

      {/* Circular paved jogging / walking track around the park */}
      <mesh position={[0, 0.165, 0]} receiveShadow>
        <ringGeometry args={[1.15, 1.42, 32]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Central Pergola / Gazebo */}
      <group position={[0, 0.16, 0]}>
        {/* Gazebo floor */}
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <cylinderGeometry args={[0.42, 0.45, 0.06, 8]} />
          <meshStandardMaterial color="#9CA3AF" roughness={0.7} />
        </mesh>
        {/* Gazebo 4 pillars */}
        {[
          [-0.22, -0.22],
          [0.22, -0.22],
          [-0.22, 0.22],
          [0.22, 0.22],
        ].map(([px, pz], i) => (
          <mesh key={i} position={[px, 0.3, pz]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.54, 6]} />
            <meshStandardMaterial color="#FAFAFA" roughness={0.3} />
          </mesh>
        ))}
        {/* Gazebo conical cedar wood roof */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <coneGeometry args={[0.5, 0.28, 8]} />
          <meshStandardMaterial color="#B45309" roughness={0.5} />
        </mesh>
      </group>

      {/* Park Benches */}
      <group position={[0, 0.18, 0.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.08, 0.12]} />
          <meshStandardMaterial color="#78350F" roughness={0.7} />
        </mesh>
      </group>
      <group position={[0, 0.18, -0.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.08, 0.12]} />
          <meshStandardMaterial color="#78350F" roughness={0.7} />
        </mesh>
      </group>

      {/* Park trees */}
      {treeOffsets.map(([tx, tz, color, hScale], i) => (
        <group key={i} position={[tx, 0.16, tz]}>
          {/* Trunk */}
          <mesh position={[0, 0.22 * hScale, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.05, 0.44 * hScale, 6]} />
            <meshStandardMaterial color="#5C3A21" roughness={0.9} />
          </mesh>
          {/* Organic double-layer tree foliage */}
          <mesh position={[0, 0.52 * hScale, 0]} castShadow>
            <sphereGeometry args={[0.26 * hScale, 10, 10]} />
            <meshStandardMaterial color={color} roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.68 * hScale, 0]} castShadow>
            <sphereGeometry args={[0.18 * hScale, 8, 8]} />
            <meshStandardMaterial color={color} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Park 3D Label Pin */}
      <Html position={[0, 1.2, 0]} center style={{ pointerEvents: "none" }}>
        <div className="flex items-center gap-1.5 rounded-full border border-forest-600/30 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-forest-800 shadow-lg backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Central Park
        </div>
      </Html>
    </group>
  );
}

/* ---------------- street light fixture ---------------------------- */

function StreetLight({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Light pole */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 1.1, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Curved arm */}
      <mesh position={[0.08, 1.08, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.22, 6]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Warm lamp bulb fixture */}
      <mesh position={[0.16, 1.05, 0]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial
          color="#FEF08A"
          emissive="#FEF08A"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/* ---------------- avenue tree ------------------------------------- */

function AvenueTree({ x, z, pink }: { x: number; z: number; pink?: boolean }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.05, 0.52, 6]} />
        <meshStandardMaterial color="#4A2E18" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.28, 8, 8]} />
        <meshStandardMaterial color={pink ? "#F472B6" : "#15803D"} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ---------------- layout infrastructure & environment -------------- */

function LayoutEnvironment({
  bounds,
}: {
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
}) {
  const pad = 4.5;
  const w = bounds.maxX - bounds.minX + pad * 2;
  const d = bounds.maxZ - bounds.minZ + pad * 2;
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cz = (bounds.minZ + bounds.maxZ) / 2;

  // Road lane markers generator
  const roadStripes = useMemo(() => {
    const list: [number, number, number, number][] = [];
    // Horizontal central avenue
    for (let x = bounds.minX - 2; x <= bounds.maxX + 2; x += 1.2) {
      list.push([x, cz, 0.6, 0.08]);
    }
    // Vertical central avenue
    for (let z = bounds.minZ - 2; z <= bounds.maxZ + 2; z += 1.2) {
      list.push([cx, z, 0.08, 0.6]);
    }
    return list;
  }, [bounds, cx, cz]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Surrounding lush green terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#D1E7D1" roughness={0.95} />
      </mesh>

      {/* 2. Asphalt Road Network Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0.005, cz]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#2B303A" roughness={0.9} />
      </mesh>

      {/* 3. White dashed center lane road markings */}
      {roadStripes.map(([sx, sz, sw, sd], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[sx, 0.012, sz]}>
          <planeGeometry args={[sw, sd]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* 4. Grand Entrance Gate & Security Cabin */}
      <group position={[cx, 0, bounds.maxZ + pad - 0.4]}>
        {/* Left Stone Pillar */}
        <mesh position={[-1.4, 0.7, 0]} castShadow>
          <boxGeometry args={[0.34, 1.4, 0.34]} />
          <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
        </mesh>
        {/* Right Stone Pillar */}
        <mesh position={[1.4, 0.7, 0]} castShadow>
          <boxGeometry args={[0.34, 1.4, 0.34]} />
          <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
        </mesh>
        {/* Overhead Arch Beam */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <boxGeometry args={[3.2, 0.22, 0.38]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.4} />
        </mesh>
        {/* Gate Nameplate Text */}
        <Html position={[0, 1.46, 0.22]} center style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded bg-forest-900 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gold-400 shadow-md">
            VS DEVELOPERS
          </div>
        </Html>
        {/* Security Guard Cabin */}
        <mesh position={[1.9, 0.45, -0.2]} castShadow>
          <boxGeometry args={[0.65, 0.9, 0.65]} />
          <meshStandardMaterial color="#FAFAFA" roughness={0.4} />
        </mesh>
        <mesh position={[1.9, 0.92, -0.2]} castShadow>
          <boxGeometry args={[0.75, 0.06, 0.75]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Avenue Trees along perimeter roads */}
      <AvenueTree x={bounds.minX - 1.2} z={cz} />
      <AvenueTree x={bounds.maxX + 1.2} z={cz} pink />
      <AvenueTree x={cx} z={bounds.minZ - 1.2} />
      <AvenueTree x={bounds.minX - 1.2} z={bounds.minZ + 1} pink />
      <AvenueTree x={bounds.maxX + 1.2} z={bounds.minZ + 1} />

      {/* 6. Avenue Streetlights */}
      <StreetLight x={bounds.minX - 0.7} z={cz + 1.8} />
      <StreetLight x={bounds.maxX + 0.7} z={cz - 1.8} />
      <StreetLight x={cx + 1.8} z={bounds.maxZ + 0.7} />
      <StreetLight x={cx - 1.8} z={bounds.minZ - 0.7} />
    </group>
  );
}

/* ---------------- 3d scene master --------------------------------- */

function Scene({
  plots,
  parks,
  selectedId,
  onSelect,
}: {
  plots: PlotCell[];
  parks: PlotCell[];
  selectedId: string | null;
  onSelect: (p: PlotCell) => void;
}) {
  // Compute spatial bounding coordinates
  const bounds = useMemo(() => {
    let minX = 0;
    let maxX = 0;
    let minZ = 0;
    let maxZ = 0;
    plots.forEach((p) => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    });
    return { minX, maxX, minZ, maxZ };
  }, [plots]);

  return (
    <>
      {/* Daylight & Sun Illumination */}
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#E0F2FE", "#DCFCE7", 0.65]} />
      <directionalLight
        position={[18, 24, 14]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-14, 10, -12]} intensity={0.5} color="#E0F2FE" />

      {/* Realistic Environment & Infrastructure */}
      <LayoutEnvironment bounds={bounds} />

      {/* Realistic Plots */}
      {plots.map((p) => (
        <RealisticPlot
          key={p.id}
          plot={p}
          selected={selectedId === p.id}
          onSelect={onSelect}
        />
      ))}

      {/* Realistic Parks */}
      {parks.map((p) => (
        <RealisticPark key={p.id} x={p.x} z={p.z} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={7}
        maxDistance={28}
        minPolarAngle={0.2}
        maxPolarAngle={1.22}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.07}
      />
    </>
  );
}

/* ---------------- main exported viewer component ------------------- */

// const FILTERS: { key: "all" | PlotStatus; label: string }[] = [
//   { key: "all", label: "All Units" },
//   { key: "available", label: "Available Plots" },
//   { key: "corner", label: "Corner Plots" },
//   { key: "reserved", label: "Reserved" },
//   { key: "sold", label: "Constructed Villas" },
// ];

export default function PlotViewer({
  plots,
  parks,
  name,
}: {
  plots: PlotCell[];
  parks: PlotCell[];
  name: string;
}) {
  const [selected, setSelected] = useState<PlotCell | null>(null);
  const [filter] = useState<"all" | PlotStatus>("all");

  const shown = useMemo(
    () => (filter === "all" ? plots : plots.filter((p) => p.status === filter)),
    [plots, filter],
  );

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-forest-600/10 bg-gradient-to-b from-[#EBF4EE] via-[#E2EFE7] to-[#D5E6DC] card-shadow">
        <div className="h-[460px] sm:h-[580px]">
          <Canvas
            shadows
            dpr={[1, 1.8]}
            camera={{ position: [11, 13, 14], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene
              plots={shown}
              parks={parks}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </Canvas>
        </div>

        {/* Legend Badges */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 sm:left-5 sm:top-5">
          <span className="flex items-center gap-1.5 rounded-full border border-forest-600/15 bg-white/95 px-3 py-1.5 text-[10px] font-bold text-forest-800 shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1E4D2B] ring-2 ring-white" />
            100% Sold Out & Delivered
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-forest-600/15 bg-white/95 px-3 py-1.5 text-[10px] font-bold text-forest-800 shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7A828A] ring-2 ring-white" />
            Constructed Villas Handed Over
          </span>
        </div>

        <p className="absolute right-4 top-4 hidden rounded-full border border-forest-600/15 bg-white/95 px-3.5 py-1.5 text-[10px] font-bold text-forest-800/80 shadow-sm backdrop-blur sm:block sm:right-5 sm:top-5">
          🖱️ Drag to rotate · Scroll to zoom · Click villa to inspect
        </p>

        {/* Selected Plot Detail Card Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute bottom-4 left-4 right-4 rounded-2xl border border-forest-600/15 bg-white/98 p-5 shadow-2xl backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto sm:w-88"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1E4D2B]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-600">
                      {name} · Unit {selected.label}
                    </p>
                  </div>
                  <p className="mt-1.5 font-display text-xl font-semibold text-forest-900">
                    {selected.sqft.toLocaleString("en-IN")} sq.ft · {STATUS_LABEL[selected.status]}
                  </p>
                  <p className="mt-1 text-xs text-forest-900/65 leading-relaxed">
                    {selected.status === "sold"
                      ? "Custom villa constructed and handed over to proud owner. 100% of this layout is delivered. Register now for VIP early access to our next upcoming launch."
                      : selected.status === "corner"
                        ? "Premium corner plot with dual road frontage and enhanced vaastu flexibility. Final availability is confirmed on request."
                        : selected.status === "reserved"
                          ? "Currently reserved for an existing customer while paperwork completes. Ask us about similar openings."
                          : "A vaastu-compliant plot, levelled and surveyor-marked, ready for registration and construction."}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-100 text-forest-700 transition hover:bg-mint-200"
                  aria-label="Close"
                >
                  <Icon name="close" className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 flex gap-2.5">
                <a
                  href={CONTACT.whatsapp(
                    `Hello! I see ${name} is 100% sold out. Please share details and early access for your upcoming / next project launches.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-105"
                >
                  <WhatsAppGlyph className="h-4 w-4" /> Enquire for Next Launch
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-forest-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-forest-800"
                >
                  <Icon name="phone" className="h-4 w-4" /> Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-3 text-center text-[11px] text-forest-900/55">
        Interactive 3D master plan layout. Showing constructed villas, asphalt avenues, and central landscaped parks — 100% delivered.
      </p>
    </div>
  );
}
