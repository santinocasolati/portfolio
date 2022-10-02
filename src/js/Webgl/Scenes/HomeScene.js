import * as THREE from 'three';

export class HomeScene {
    constructor(textureLoader, gui) {
        this.textureLoader = textureLoader;
        this.gui = gui;

        this.scene = new THREE.Scene();

        this.width = window.innerWidth;
        this.height = window.outerHeight;

        this.camera = new THREE.PerspectiveCamera(80, this.width / this.height, 1, 10000);
        this.camera.position.z = 1000;
        this.scene.add(this.camera);

        this.portalParticles = [];
        this.smokeParticles = [];

        this.init();
    }

    init() {
        this.addLights();

        this.particleSetup();

        this.setDebug();

        this.setupResize();
        this.resize();
    }

    setDebug() {
        const debugObject = {
            portalColor: "#062D89"
        }

        const portalSettings = this.gui.addFolder("Portal");

        portalSettings.addColor(debugObject, 'portalColor').onChange(() => {
            this.changeLightColor(debugObject.portalColor);
        });
    }

    addLights() {
        const sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
        sceneLight.position.set(0, 0, 1);
        this.scene.add(sceneLight);

        this.portalLight = new THREE.PointLight(0x062d89, 30, 350, 1.7);
        this.portalLight.position.set(0, 100, 250);
        this.scene.add(this.portalLight);
    }

    particleSetup() {
        this.textureLoader.load("static/textures/smoke.png", (texture) => {
            const portalGeo = new THREE.PlaneGeometry(350, 350);
            const portalMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true
            });

            const smokeGeo = new THREE.PlaneGeometry(1000, 1000);
            const smokeMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true
            });

            for (let i = 880; i > 250; i--) {
                const particle = new THREE.Mesh(portalGeo, portalMaterial);
                particle.position.set(
                    0.3 * i * Math.cos((4 * i * Math.PI) / 180),
                    0.3 * i * Math.sin((4 * i * Math.PI) / 180),
                    0.1 * i
                );
                particle.position.y += 100;
                particle.rotation.z = Math.random() * 360;
                this.portalParticles.push(particle);
                this.scene.add(particle);
            }

            for (let i = 0; i < 40; i++) {
                const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
                particle.position.set(
                    Math.random() * 250 - 125,
                    Math.random() * 200 - 100,
                    25
                );
                particle.position.y += 100;
                particle.rotation.z = Math.random() * 360;
                particle.material.opacity = 0.4;
                this.smokeParticles.push(particle);
                this.scene.add(particle);
            }
        });
    }

    changeLightColor(color) {
        this.portalLight.color = new THREE.Color(color);
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