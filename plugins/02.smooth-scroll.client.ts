import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
  // Instantiate the Lenis object with specified properties
  const lenis = new Lenis({
    lerp: 0.1, // Lower values create a smoother scroll effect
    smoothWheel: true, // Enables smooth scrolling for mouse wheel events
    wrapper: document.getElementById('lenisTarget') || window, // The element that wraps the content
    content: document.getElementById('lenisContent') || document.body, // The element that contains the content
  });

  // Update ScrollTrigger each time the user scrolls
  lenis.on('scroll', () => {
    return ScrollTrigger.update();
  });

  /* // Define a function to run at each animation frame
  const scrollFn = (time: any) => {
    lenis.raf(time); // Run Lenis' requestAnimationFrame method
    requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
  };
  // Start the animation frame loop
  requestAnimationFrame(scrollFn); */

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return {
    provide: {
      lenisInstance: lenis,
    },
  };
});
