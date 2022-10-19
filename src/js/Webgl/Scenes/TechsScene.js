import * as THREE from 'three';
import { gsap } from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class TechsScene {
    constructor(modelLoader, gui) {
        this.modelLoader = modelLoader;
        this.gui = gui;

        this.scene = new THREE.Scene();

        this.width = window.innerWidth;
        this.height = window.outerHeight;

        this.camera = new THREE.PerspectiveCamera(80, this.width / this.height, 1, 100);
        this.scene.add(this.camera);

        this.init();
    }

    init() {
        this.setDebug();

        this.addLights();

        this.addFloor();
        this.addModel();

        // this.setAnimation();

        this.setupResize();
        this.resize();
    }

    setDebug() {
        const debugObj = {
            camera: {
                pos: {
                    x: 1.111,
                    y: 2.5,
                    z: 5
                },
                rot: {
                    x: 0,
                    y: 0.131,
                    z: 0
                }
            },
            anims: {
                duration: 0.8,
                start: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 0.131, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: 1.111, y: 2.5, z: 5, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = 1.111;
                    debugObj.camera.pos.y = 2.5;
                    debugObj.camera.pos.z = 5;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 0.131;
                    debugObj.camera.rot.z = 0;
                },
                screen1: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 1.3, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: -1.3, y: 3.5, z: 2.125, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = -1.3;
                    debugObj.camera.pos.y = 3.5;
                    debugObj.camera.pos.z = 2.125;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 1.3;
                    debugObj.camera.rot.z = 0;
                },
                screen2: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 1.08, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: -1, y: 0.9, z: 0.3, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = -1;
                    debugObj.camera.pos.y = 0.9;
                    debugObj.camera.pos.z = 0.3;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 1.08;
                    debugObj.camera.rot.z = 0;
                },
                screen3: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 0.56, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: -2.775, y: 4.768, z: -1.175, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = -2.775;
                    debugObj.camera.pos.y = 4.768;
                    debugObj.camera.pos.z = -1.175;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 0.56;
                    debugObj.camera.rot.z = 0;
                },
                screen4: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 1.091, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: -0.261, y: 3.168, z: -0.718, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = -0.261;
                    debugObj.camera.pos.y = 3.168;
                    debugObj.camera.pos.z = -0.718;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 1.091;
                    debugObj.camera.rot.z = 0;
                },
                screen5: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 0, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: 0.196, y: 2.025, z: -0.261, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = 1.339;
                    debugObj.camera.pos.y = 2.025;
                    debugObj.camera.pos.z = -0.261;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 0;
                    debugObj.camera.rot.z = 0;
                },
                screen6: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: 0, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: 0.882, y: 4.768, z: -2.089, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = 0.882;
                    debugObj.camera.pos.y = 4.768;
                    debugObj.camera.pos.z = -2.089;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = 0;
                    debugObj.camera.rot.z = 0;
                },
                screen7: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: -0.326, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: 0.654, y: 0.658, z: 0.196, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = 0.654;
                    debugObj.camera.pos.y = 0.658;
                    debugObj.camera.pos.z = 0.196;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = -0.326;
                    debugObj.camera.rot.z = 0;
                },
                screen8: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: -0.692, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: 1.339, y: 2.482, z: 0.882, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = 1.339;
                    debugObj.camera.pos.y = 2.482;
                    debugObj.camera.pos.z = 0.882;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = -0.692;
                    debugObj.camera.rot.z = 0;
                },
                screen9: () => {
                    const tl = gsap.timeline();
                    tl.to(this.camera.rotation, { x: 0, y: -1.058, z: 0, duration: debugObj.anims.duration }, 0);
                    tl.to(this.camera.position, { x: 2.254, y: 4.539, z: -0.718, duration: debugObj.anims.duration }, 0);

                    debugObj.camera.pos.x = 2.254;
                    debugObj.camera.pos.y = 4.539;
                    debugObj.camera.pos.z = -0.718;

                    debugObj.camera.rot.x = 0;
                    debugObj.camera.rot.y = -1.058;
                    debugObj.camera.rot.z = 0;
                }
            }
        }

        this.camera.position.set(debugObj.camera.pos.x, debugObj.camera.pos.y, debugObj.camera.pos.z);
        this.camera.rotation.set(debugObj.camera.rot.x, debugObj.camera.rot.y, debugObj.camera.rot.z);

        const techSettings = this.gui.addFolder("Technologies");

        const camSettings = techSettings.addFolder("Camera");
        const posSettings = camSettings.addFolder("Position");
        posSettings.add(debugObj.camera.pos, "x", -10, 10, 0.001).onChange(() => this.camera.position.x = debugObj.camera.pos.x);
        posSettings.add(debugObj.camera.pos, "y", -10, 10, 0.001).onChange(() => this.camera.position.y = debugObj.camera.pos.y);
        posSettings.add(debugObj.camera.pos, "z", -10, 10, 0.001).onChange(() => this.camera.position.z = debugObj.camera.pos.z);
        const rotSettings = camSettings.addFolder("Rotation");
        rotSettings.add(debugObj.camera.rot, "x", 0, 2, 0.001).onChange(() => this.camera.rotation.x = debugObj.camera.rot.x);
        rotSettings.add(debugObj.camera.rot, "y", -2, 2, 0.001).onChange(() => this.camera.rotation.y = debugObj.camera.rot.y);
        rotSettings.add(debugObj.camera.rot, "z", 0, 2, 0.001).onChange(() => this.camera.rotation.z = debugObj.camera.rot.z);

        const animSettings = techSettings.addFolder("Animations");
        animSettings.add(debugObj.anims, "duration", 0, 10, 0.001);
        animSettings.add(debugObj.anims, "start");
        animSettings.add(debugObj.anims, "screen1");
        animSettings.add(debugObj.anims, "screen2");
        animSettings.add(debugObj.anims, "screen3");
        animSettings.add(debugObj.anims, "screen4");
        animSettings.add(debugObj.anims, "screen5");
        animSettings.add(debugObj.anims, "screen6");
        animSettings.add(debugObj.anims, "screen7");
        animSettings.add(debugObj.anims, "screen8");
        animSettings.add(debugObj.anims, "screen9");
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

    setAnimation() {
        const duration = 0.8;

        const tl = gsap.timeline({
            scrollTrigger: {
                start: 'top top',
                end: '+=1000vh',
                trigger: '.page',
                markers: true
            }
        });
        // Start
        tl.to(this.camera.rotation, { x: 0, y: 0.131, z: 0, duration: duration }, 0);
        tl.to(this.camera.position, { x: 1.111, y: 2.5, z: 5, duration: duration }, 0);
        // Screen 1
        tl.to(this.camera.rotation, { x: 0, y: 1.3, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: -1.3, y: 3.5, z: 2.125, duration: duration }, '<');
        // Screen 2
        tl.to(this.camera.rotation, { x: 0, y: 1.08, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: -1, y: 0.9, z: 0.3, duration: duration }, '<');
        // Screen 3
        tl.to(this.camera.rotation, { x: 0, y: 0.56, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: -2.775, y: 4.768, z: -1.175, duration: duration }, '<');
        // Screen 4
        tl.to(this.camera.rotation, { x: 0, y: 1.091, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: -0.261, y: 3.168, z: -0.718, duration: duration }, '<');
        // Screen 5
        tl.to(this.camera.rotation, { x: 0, y: 0, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: 0.196, y: 2.025, z: -0.261, duration: duration }, '<');
        // Screen 6
        tl.to(this.camera.rotation, { x: 0, y: 0, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: 0.882, y: 4.768, z: -2.089, duration: duration }, '<');
        // Screen 7
        tl.to(this.camera.rotation, { x: 0, y: -0.326, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: 0.654, y: 0.658, z: 0.196, duration: duration }, '<');
        // Screen 8
        tl.to(this.camera.rotation, { x: 0, y: -0.692, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: 1.339, y: 2.482, z: 0.882, duration: duration }, '<');
        // Screen 9
        tl.to(this.camera.rotation, { x: 0, y: -1.058, z: 0, duration: duration }, '>');
        tl.to(this.camera.position, { x: 2.254, y: 4.539, z: -0.718, duration: duration }, '<');
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