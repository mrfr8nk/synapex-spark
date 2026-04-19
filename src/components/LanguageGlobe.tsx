import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Billboard } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const LANGUAGES = [
  "TypeScript", "JavaScript", "React", "Node.js", "Python",
  "MongoDB", "PostgreSQL", "Tailwind", "Next.js", "Supabase",
  "Docker", "Redis", "FastAPI", "GraphQL", "HTML5",
  "CSS3", "Vite", "Bash", "Linux", "Git",
  "Cloudflare", "Vercel", "Render", "Heroku", "AWS",
  "OpenAI", "Gemini", "DeepSeek", "Framer", "Express",
];

// Fibonacci sphere distribution for even spacing
const fibonacciSphere = (samples: number, radius: number) => {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
};

const Sphere = ({ autoRotate }: { autoRotate: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(LANGUAGES.length, 2.4), []);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Transparent inner sphere wireframe */}
      <mesh>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
      {/* Subtle outer glow sphere */}
      <mesh>
        <sphereGeometry args={[2.42, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {LANGUAGES.map((label, i) => {
        const [x, y, z] = positions[i];
        return (
          <Billboard key={label} position={[x, y, z]}>
            <Text
              fontSize={0.18}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.005}
              outlineColor="#000000"
            >
              {label}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
};

const LanguageGlobe = () => {
  const [interacting, setInteracting] = useState(false);

  return (
    <section id="globe" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">
            // tech universe
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Stack, In Orbit</h2>
          <div className="w-12 h-px bg-foreground/20" />
          <p className="text-muted-foreground text-sm mt-4 max-w-xl">
            A living sphere of every language, framework and platform I build with. Drag to rotate, scroll to zoom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[420px] md:h-[520px] rounded-2xl border border-border bg-gradient-to-b from-card/30 to-transparent overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={0.8} />
              <Sphere autoRotate={!interacting} />
              <OrbitControls
                enablePan={false}
                enableZoom
                minDistance={4}
                maxDistance={10}
                onStart={() => setInteracting(true)}
                onEnd={() => setTimeout(() => setInteracting(false), 2000)}
              />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-3 left-4 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest pointer-events-none">
            drag · scroll · explore
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguageGlobe;