import '../scss/app.scss';

import gsap from "gsap";
import LocomotiveScroll from 'locomotive-scroll';

import BowserSetUp from "./BowserSetup/BowserSetup";

import ReactSetup from "./ReactSetup/ReactSetup.jsx";
import Webgl from "./Webgl/Webgl";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/all";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

history.pushState(null, 'Santino Casolati - Web Developer', '/');

export default class Site {
  constructor(options) {
    window.activeVideos = 0;

    function loadAnimation() {
      const tl = gsap.timeline({
        onStart: () => {
          document.querySelector('.introduction').style.pointerEvents = 'all';
          document.querySelector('.page').style.display = 'block';
          document.querySelector('.page').style.opacity = 1;
          document.querySelector('.home-menu').style.opacity = 0;
          document.querySelector('.home-menu-mobile').style.opacity = 0;
        }
      });
      tl.to('.loader', { opacity: 0, display: 'none', duration: 0.8 }, 0);
      tl.fromTo('.intro-title', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.7);
      tl.fromTo('.intro-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2);
      tl.fromTo('.intro-btn', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.3);
    }

    function checkIntro() {
      if (document.querySelector('.introduction')) {
        loadAnimation();
      } else {
        setTimeout(() => {
          checkIntro();
        }, 500);
      }
    }

    checkIntro();

    new BowserSetUp();
    this.setReact();
    this.setWebgl();
    this.resize();
    this.setResize();
  }

  setReact() {
    new ReactSetup();
  }

  setWebgl() {
    window.webgl = new Webgl({
      domElement: document.querySelector('#webgl-container')
    });
  }

  resize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setResize() {
    window.addEventListener("resize", () => {
      this.resize();
    });
  }
}

window.site = new Site({
  dom: document.getElementById("container"),
});

var links = document.querySelectorAll("a[href]");
var cbk = function (e) {
  if (e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
};

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", cbk);
}
