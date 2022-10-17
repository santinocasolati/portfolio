import * as THREE from 'three';
import { gsap } from 'gsap';

export class TechsScene {
    constructor(modelLoader, gui) {
        this.modelLoader = modelLoader;
        this.gui = gui;

        this.scene = new THREE.Scene();

        this.width = window.innerWidth;
        this.height = window.outerHeight;

        this.camera = new THREE.PerspectiveCamera(80, this.width / this.height, 1, 100);
        this.camera.position.z = 5;
        this.camera.position.y = 2.5;
        this.scene.add(this.camera);

        this.init();
    }

    init() {
        this.setDebug();

        this.addLights();

        this.addFloor();
        this.addModel();

        this.setupResize();
        this.resize();
    }

    setDebug() {
        const debugObj = {
            camera: {
                pos: {
                    x: 0,
                    y: 2.5,
                    z: 5
                },
                rot: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
            anims: {
                start: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 0, z: 0, duration: 0.5 }, 0);
                    tl.to(this.camera.position, { x: 0, y: 2.5, z: 5, duration: 0.5 }, 0);

                    debugObj.camera.pos.x = 0;
                    debugObj.camera.pos.y = 2.5;
                    debugObj.camera.pos.z = 5;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 0;
                    debugObj.camera.rot.z = 0;
                },
                screen1: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 1.3, z: 0, duration: 0.5 }, 0);
                    tl.to(this.camera.position, { x: -1.3, y: 3.5, z: 2.125, duration: 0.5 }, 0);

                    debugObj.camera.pos.x = -1.3;
                    debugObj.camera.pos.y = 3.5;
                    debugObj.camera.pos.z = 2.125;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 1.3;
                    debugObj.camera.rot.z = 0;
                },
                screen2: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 1.08, z: 0, duration: 0.5 }, 0);
                    tl.to(this.camera.position, { x: -1, y: 0.9, z: 0.3, duration: 0.5 }, 0);

                    debugObj.camera.pos.x = -1;
                    debugObj.camera.pos.y = 0.9;
                    debugObj.camera.pos.z = 0.3;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 1.08;
                    debugObj.camera.rot.z = 0;
                }
            }
        }

        const techSettings = this.gui.addFolder("Technologies");

        const camSettings = techSettings.addFolder("Camera");
        const posSettings = camSettings.addFolder("Position");
        posSettings.add(debugObj.camera.pos, "x", -10, 10, 0.001).onChange(() => this.camera.position.x = debugObj.camera.pos.x);
        posSettings.add(debugObj.camera.pos, "y", -10, 10, 0.001).onChange(() => this.camera.position.y = debugObj.camera.pos.y);
        posSettings.add(debugObj.camera.pos, "z", -10, 10, 0.001).onChange(() => this.camera.position.z = debugObj.camera.pos.z);
        const rotSettings = camSettings.addFolder("Rotation");
        rotSettings.add(debugObj.camera.rot, "x", 0, 2, 0.001).onChange(() => this.camera.rotation.x = debugObj.camera.rot.x);
        rotSettings.add(debugObj.camera.rot, "y", 0, 2, 0.001).onChange(() => this.camera.rotation.y = debugObj.camera.rot.y);
        rotSettings.add(debugObj.camera.rot, "z", 0, 2, 0.001).onChange(() => this.camera.rotation.z = debugObj.camera.rot.z);

        const animSettings = techSettings.addFolder("Animations");
        animSettings.add(debugObj.anims, "start");
        animSettings.add(debugObj.anims, "screen1");
        animSettings.add(debugObj.anims, "screen2");
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight('#FFF', 1);
        this.scene.add(ambientLight)
    }

    addFloor() {
        const floorGeo = new THREE.PlaneGeometry(1, 1, 1, 1);

        const floorMat = new THREE.MeshStandardMaterial({
            metalness: 1,
            roughness: 0.186,
            color: '#CCC'
        });

        const floor = new THREE.Mesh(floorGeo, floorMat);
        this.scene.add(floor);

        floor.scale.set(50, 50);
        floor.rotation.x = -90 * (Math.PI / 180);
        floor.position.set(0, 0, 0);
    }

    addModel() {
        this.modelLoader.load("static/models/computers.glb", (model) => {
            this.scene.add(model.scene);
        });
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
}