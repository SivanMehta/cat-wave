import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import Animation from './animation.js';

const resolution = new THREE.Vector2(
  window.innerWidth,
  window.innerHeight
);

class Grayness {
  constructor(id) {
    // scene renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
    document.getElementById(id).appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.plane_geometry = new THREE.PlaneGeometry(2, 1.2);
    
    // animation variables
    this.start = Date.now() / 1000;
    
    // image loader
    this.loader = new THREE.TextureLoader();
  }

  async init() {
    const fragmentShader = await fetch('./shaders/graynessShader.glsl').then(res => res.text());
    const texture = await new THREE.TextureLoader()
      .loadAsync('https://sivanmehta.github.io/taco/taco-on-the-perch.png');

    this.cat_material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1 },
        resolution: { value: resolution },
        u_texture: { value: texture },
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

class Grayness2 extends Animation {
  async preInit() {
    const fragmentShader = await fetch('./shaders/graynessShader.glsl')
      .then(res => res.text());
    const texture = await new THREE.TextureLoader()
      .loadAsync('https://sivanmehta.github.io/taco/taco-on-the-perch.png');

    this.cat_material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1 },
        resolution: { value: resolution },
        u_texture: { value: texture },
      },
      fragmentShader
    });
    const cat_mesh = new THREE.Mesh(this.plane_geometry, this.cat_material);
    cat_mesh.position.set(0,0,0);
    this.scene.add(cat_mesh);
  }

  tick() {
    const now = Date.now() / 1000 - this.start;
    this.cat_material.uniforms.time.value = now;
  }
}

class Blur {
  constructor(id) {
    // scene renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
    document.getElementById(id).appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.plane_geometry = new THREE.PlaneGeometry(2, 1.2);
    
    // animation variables
    this.start = Date.now() / 1000;
    
    // image loader
    this.loader = new THREE.TextureLoader();
  }

  async init() {
    const fragmentShader = await fetch('./shaders/blurShader.glsl').then(res => res.text());
    const texture = await new THREE.TextureLoader()
      .loadAsync('https://sivanmehta.github.io/taco/taco-on-the-perch.png');

    this.cat_material = new THREE.ShaderMaterial({
      uniforms: {
        resolution: { value: resolution },
        u_texture: { value: texture },
        blurRadius: { value: 0.0 }
      },
      fragmentShader
    });
    const cat_mesh = new THREE.Mesh(this.plane_geometry, this.cat_material);
    cat_mesh.position.set(0,0,0);
    this.scene.add(cat_mesh);
    
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);

    document.getElementById('blur-slider')
      .addEventListener('input', this.updateSlider.bind(this));

    this.renderer.render(this.scene, this.camera);
  }

  tick() { }

  updateSlider(event) {
    const { value } = event.target;
    this.blurRadius = value;
    document.getElementById('blur-value').innerHTML = value;
    this.cat_material.uniforms.blurRadius.value = value;
    this.renderer.render(this.scene, this.camera);
  }
}

class Rotation extends Animation {
  async postInit() {
    const fragmentShader = await fetch('./shaders/rotationShader.glsl')
      .then(res => res.text());
    const texture = await new THREE.TextureLoader()
      .loadAsync('https://sivanmehta.github.io/taco/taco-on-the-perch.png');

    this.cat_material = new THREE.ShaderMaterial({
      uniforms: {
        resolution: { value: resolution },
        u_texture: { value: texture },
        u_angle: { value: 0.0 }
      },
      fragmentShader
    });
    const cat_mesh = new THREE.Mesh(this.plane_geometry, this.cat_material);
    cat_mesh.position.set(0,0,0);
    this.scene.add(cat_mesh);

    this.u_angle = 0.0;

    document.getElementById('rotation-slider')
      .addEventListener('input', this.updateSlider.bind(this));
  }

  updateSlider(event) {
    const { value } = event.target;
    this.u_angle = value;
    document.getElementById('rotation-value').innerHTML = value;
    this.cat_material.uniforms.u_angle.value = value;
  }
}

const animations = [{
  id: 'grayness',
  animation: Grayness
}, {
  id: 'blur',
  animation: Blur
}]

async function start() {
  // const renders = animations.map(({ id, animation }) => new animation(id));
  // await Promise.all(renders.map(render => render.init()));
  // renders.forEach(render => render.tick());

  const animations = [
    new Grayness2({
      target: document.getElementById('grayness'),
    }),
    new Rotation({
      target: document.getElementById('rotation'),
    })
  ];

  await Promise.all(animations.map(animation => animation.start()));
}

start();