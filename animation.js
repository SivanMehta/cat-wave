import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

/*
type opts = {
  width: number,
  height: number,
  ratio: number,
  target: HTMLElement,
  fragmentShaders: file path,
}
*/

export default class Animation {
  constructor(opts) {
    this.resolution = new THREE.Vector2(
      opts.width || window.innerWidth,
      opts.height || window.innerHeight
    );

    const pixelRatio = opts.ratio || window.devicePixelRatio;

    // scene renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.resolution[0], this.resolution[1], pixelRatio);
    opts.target.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.plane_geometry = new THREE.PlaneGeometry(2, 1.2);
    
    // animation variables
    this.startTime = Date.now() / 1000;
    
    // image loader
    this.loader = new THREE.TextureLoader();

    this.opts = opts;
  }

  checkOverrides() {
    // in theory, we should do some validation here to assert that the user
    // has overridden the necessary functions, and has not overridden any internal functions
    // basically everything prefix with a _ is private, and everything without is overrideable 
  }

  async preInit() {
    // left empty so that subclasses can override
  }

  async _init() {
    this.checkOverrides();
    await this.preInit();
    this.camera = new THREE.PerspectiveCamera(45, this.resolution[0] / this.resolution[1], 0.001, 1000);
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);
    await this.postInit();
  }

  async postInit() {
    // left empty so that subclasses can override
  }

  async tick() {
    // left empty so that subclasses can override
  }
  
  async _tick() {
    await this.tick();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._tick.bind(this))
  }

  // this function SHOULD NOT be overridden
  async start() {
    await this._init();
    this._tick();
  }
}