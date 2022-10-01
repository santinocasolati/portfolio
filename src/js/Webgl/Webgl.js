import * as THREE from 'three';
import * as dat from 'dat.gui';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { HomeScene } from './Scenes/HomeScene';

export default class Webgl {
    constructor(options) {
        this.container = options.domElement;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000, 1);
        this.container.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.textureLoader = new THREE.TextureLoader();

        this.gui = new dat.GUI();
        this.gui.hide();
        this.debug = true;

        this.init();
    }

    init() {
        this.setScenes();

        this.resize();
        this.setupResize();
        this.render();

        if (this.debug) {
            this.setDebug();
        }
    }

    setDebug() {
        let hidden = true;

        document.addEventListener("keypress", (e) => {
            const key = e.key.toLowerCase();

            if (key === 's') {
                if (hidden) {
                    this.gui.show();
                    hidden = false;
                } else {
                    this.gui.hide();
                    hidden = true;
                }
            }
        });
    }

    setScenes() {
        this.home = new HomeScene(this.textureLoader, this.gui);
    }

    resize() {
        setTimeout(() => {
            this.width = window.innerWidth;
            this.height = window.outerHeight;

            this.renderer.setSize(this.width, this.height);
        }, 300);
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    render() {
        const delta = this.clock.getDelta();

        this.home.update(delta);
        this.renderer.render(this.home.scene, this.home.camera);

        requestAnimationFrame(this.render.bind(this))
    }
}