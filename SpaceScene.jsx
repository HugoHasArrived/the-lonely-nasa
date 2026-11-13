import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceScene() {
  const mount = useRef(null);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#07111f");
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 3.2, 9);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x9bb8d8, 1.5));
    const sun = new THREE.PointLight(0xffffff, 3.2);
    sun.position.set(5, 4, 5);
    scene.add(sun);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x1767a8, roughness: 0.82, metalness: 0.05 })
    );
    earth.position.set(-1.25, -1.1, -1.8);
    scene.add(earth);

    const cloud = new THREE.Mesh(
      new THREE.SphereGeometry(2.08, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x8bd5ff, transparent: true, opacity: 0.10, wireframe: true })
    );
    cloud.position.copy(earth.position);
    scene.add(cloud);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.012, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0x54c8ff, transparent: true, opacity: 0.8 })
    );
    orbit.position.copy(earth.position);
    orbit.rotation.x = 1.08;
    orbit.rotation.y = -0.24;
    scene.add(orbit);

    const satellite = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.34, 0.42),
      new THREE.MeshStandardMaterial({ color: 0xd8e5f2, metalness: 0.65, roughness: 0.35 })
    );
    satellite.add(body);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x1760a0, metalness: 0.45, roughness: 0.3 });
    [-1, 1].forEach(side => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.035, 0.38), panelMat);
      panel.position.x = side * 0.68;
      satellite.add(panel);
      for (let i = -2; i <= 2; i++) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.04, 0.38), new THREE.MeshBasicMaterial({ color: 0x80caff }));
        line.position.set(side * 0.68 + i * 0.15, 0.025, 0);
        satellite.add(line);
      }
    });
    satellite.position.set(2.2, 1.35, 0);
    scene.add(satellite);

    const starsGeo = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 900; i++) {
      positions.push((Math.random() - 0.5) * 45, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
    }
    starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xc7e4ff, size: 0.035 })));

    let frame;
    const resize = () => {
      const w = host.clientWidth || 600, h = host.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const animate = () => {
      frame = requestAnimationFrame(animate);
      earth.rotation.y += 0.0008;
      cloud.rotation.y += 0.001;
      satellite.position.x = 2.2 + Math.cos(Date.now() * 0.00022) * 0.45;
      satellite.position.y = 1.35 + Math.sin(Date.now() * 0.00022) * 0.22;
      satellite.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(m => m.dispose());
      });
    };
  }, []);
  return <div className="space-scene" ref={mount} aria-label="Animated 3D Earth and orbiting satellite" />;
}