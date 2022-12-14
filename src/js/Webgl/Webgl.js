import * as THREE from 'three';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import { gsap } from 'gsap';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { HomeScene } from './Scenes/HomeScene';

import teleportationVertex from './Shaders/Teleportation/vertex.glsl';
import teleportationFragment from './Shaders/Teleportation/fragment.glsl';
import { TechsScene } from './Scenes/TechsScene';

export default class Webgl {
    constructor(options) {
        this.container = options.domElement;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.renderer = new THREE.WebGLRenderer({
            powerPreference: 'high-performance'
        });
        this.renderer.setClearColor(0x000000, 1);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setPixelRatio(window.devicePixelRatio * 0.5);

        this.clock = new THREE.Clock();
        this.textureLoader = new THREE.TextureLoader();
        this.modelLoader = new GLTFLoader();

        this.gui = new dat.GUI();
        this.gui.hide();
        this.gui.domElement.parentElement.style.zIndex = 10000;
        this.debug = true;

        this.pageChanging = false;

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

        const debugObj = {
            progress: 0
        }

        this.gui.add(debugObj, 'progress', 0, 1, 0.001).onChange(() => {
            this.renderMat.uniforms.progress.value = debugObj.progress;
        });

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }

    setScenes() {
        this.texturePrev = new THREE.WebGLRenderTarget(this.width, this.height);
        this.textureNext = new THREE.WebGLRenderTarget(this.width, this.height);

        this.finalScene = new THREE.Scene();
        this.finalCamera = new THREE.OrthographicCamera(-0.25, 0.25, 0.25, -0.25, 0, 5);
        this.renderMat = new THREE.ShaderMaterial({
            uniforms: {
                progress: { value: 0 },
                prevScene: { value: null },
                nextScene: { value: null }
            },
            vertexShader: teleportationVertex,
            fragmentShader: teleportationFragment
        });
        const renderGeo = new THREE.PlaneGeometry(0.5, 0.5);
        const renderMesh = new THREE.Mesh(renderGeo, this.renderMat);
        this.finalScene.add(renderMesh);

        this.home = new HomeScene(this.textureLoader, this.gui);
        this.techs = new TechsScene(this.modelLoader, this.gui);

        this.prevScene = this.home;
        this.nextScene = null;
    }

    changeScenes(scene, enterAnim = false) {
        let sceneToGo;

        switch (scene) {
            case 'home':
                sceneToGo = this.home;
                window.inHome = true;
                break;

            case 'techs':
                sceneToGo = this.techs;
                window.inHome = false;
                break;

            default:
                break;
        }

        this.nextScene = sceneToGo;

        gsap.to(this.renderMat.uniforms.progress, {
            value: 1, duration: 1.6, ease: 'power2.out', onStart: () => {
                this.pageChanging = true;
            },
            onComplete: () => {
                this.prevScene = sceneToGo;
                this.nextScene = null;
                this.renderMat.uniforms.progress.value = 0;

                this.pageChanging = false;

                if (enterAnim !== false) {
                    enterAnim();
                }
            }
        });
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
        if (this.stats) {
            this.stats.begin();
        }

        const delta = this.clock.getDelta();

        // if (this.prevScene === this.home || this.nextScene === this.home) {
        //     this.home.update(delta);
        // }

        this.renderer.setRenderTarget(this.texturePrev);
        this.renderer.render(this.prevScene.scene, this.prevScene.camera);
        this.renderMat.uniforms.prevScene.value = this.texturePrev.texture;

        if (this.pageChanging) {
            this.renderer.setRenderTarget(this.textureNext);
            this.renderer.render(this.nextScene.scene, this.nextScene.camera);
            this.renderMat.uniforms.nextScene.value = this.textureNext.texture;
        }

        this.renderer.setRenderTarget(null);
        this.renderer.render(this.finalScene, this.finalCamera);

        if (this.stats) {
            this.stats.end();
        }

        requestAnimationFrame(this.render.bind(this))
    }
}