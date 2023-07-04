import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

const resolution = new THREE.Vector2(
  window.innerWidth,
  window.innerHeight
);

class Animation {
  constructor() {
    // scene renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.plane_geometry = new THREE.PlaneGeometry(2, 1.2);

    // animation variables
    this.start = Date.now() / 1000;

    // image loader
    this.loader = new THREE.TextureLoader();
  }

  async init() {
    const fragmentShader = await fetch('./fragmentShader.glsl').then(res => res.text());
    const texture = await new THREE.TextureLoader()
      .loadAsync('https://sivanmehta.github.io/taco/taco-on-the-perch.png');

    this.cat_material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1 },
        resolution: { value: resolution },
        u_texture: { value: texture }
      },
      fragmentShader
    });
    const cat_mesh = new THREE.Mesh(this.plane_geometry, this.cat_material);
    cat_mesh.position.set(0,0,0);
    this.scene.add(cat_mesh);
    
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);
  }

  tick() {
    const now = Date.now() /1000 - this.start;
    this.cat_material.uniforms.time.value = now;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.tick.bind(this));
  }
}

async function start() {
  const animation = new Animation();
  await animation.init();
  animation.tick();
}

start();