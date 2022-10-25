import * as THREE from 'three';
import { gsap } from 'gsap';

import portalVertex from "../Shaders/Portal/vertex.glsl";
import portalFragment from "../Shaders/Portal/fragment.glsl";

export class HomeScene {
    constructor(textureLoader, gui) {
        this.textureLoader = textureLoader;
        this.gui = gui;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#0f0f0f");

        this.width = window.innerWidth;
        this.height = window.outerHeight;

        this.camera = new THREE.PerspectiveCamera(80, this.width / this.height, 100, 1000);
        this.camera.position.z = 1000;
        this.scene.add(this.camera);

        this.portalParticles = [];
        this.smokeParticles = [];

        this.init();
    }

    init() {
        this.particleSetup();

        this.setupResize();
        this.resize();
    }

    particleSetup() {
        this.textureLoader.load("static/textures/smoke.png", (texture) => {
            const portalGeo = new THREE.PlaneGeometry(1, 1);
            this.portalMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uText: { value: texture },
                    colorR: { value: 6.0 },
                    colorG: { value: 45.0 },
                    colorB: { value: 137.0 }
                },
                vertexShader: portalVertex,
                fragmentShader: portalFragment,
                transparent: true
            });

            for (let i = 880; i > 250; i--) {
                const particle = new THREE.Mesh(portalGeo, this.portalMaterial);
                particle.position.set(
                    0.3 * i * Math.cos((4 * i * Math.PI) / 180),
                    0.3 * i * Math.sin((4 * i * Math.PI) / 180),
                    0.1 * i
                );
                particle.position.y += 100;
                particle.scale.set(350, 350);
                particle.rotation.z = Math.random() * 360;
                this.portalParticles.push(particle);
                this.scene.add(particle);
            }

            for (let i = 0; i < 40; i++) {
                const particle = new THREE.Mesh(portalGeo, this.portalMaterial);
                particle.position.set(
                    Math.random() * 250 - 125,
                    Math.random() * 200 - 100,
                    25
                );
                particle.position.y += 100;
                particle.rotation.z = Math.random() * 360;
                particle.scale.set(1000, 1000);
                this.smokeParticles.push(particle);
                this.scene.add(particle);
            }
        });
    }

    hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    changeLightColor(color) {
        const col = this.hexToRgb(color);

        const tl = gsap.timeline();
        tl.to(this.portalMaterial.uniforms.colorR, { value: col.r, duration: 0.8 }, 0);
        tl.to(this.portalMaterial.uniforms.colorG, { value: col.g, duration: 0.8 }, 0);
        tl.to(this.portalMaterial.uniforms.colorB, { value: col.b, duration: 0.8 }, 0);
    }

    resize() {
        setTimeout(() => {
            this.width = window.innerWidth;
            this.height = window.outerHeight;

            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
        }, 300);
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    update(delta) {
        this.portalParticles.forEach(p => {
            p.rotation.z -= delta * 1.5;
        });

        this.smokeParticles.forEach(p => {
            p.rotation.z -= delta * 0.2;
        });
    }
}