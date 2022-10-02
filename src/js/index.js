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

export default class Site {
  constructor(options) {
    new BowserSetUp();
    // this.initLocomotive();
    this.setReact();
    this.setWebgl();
    this.resize();
  }

  initLocomotive() {
    if (window.scroller) window.scroller.destroy();
    window.scroller = new LocomotiveScroll({
      el: document.querySelector(".o-scroll"),
      smooth: true,
      getSpeed: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    window.scroller.on("scroll", ScrollTrigger.update);
    window.scroller.on("scroll", (e) => {
      this.scroll = e;
    });

    ScrollTrigger.scrollerProxy(".o-scroll", {
      scrollTop(value) {
        return arguments.length
          ? window.scroller.scrollTo(value, 0, 0)
          : window.scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector(".o-scroll").style.transform
        ? "transform"
        : "fixed",
    });

    window.refreshPositions = function () {
      window.scroller.update();
      ScrollTrigger.refresh();
    };
  }

  setReact() {
    new ReactSetup();

    // setTimeout(() => {
    //   window.refreshPositions();
    // }, 500);
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
