import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useProseHeadingEffect = () => {
  const root = ref<HTMLElement | null>(null);
  let ctx: gsap.Context;

  onMounted(() => {
    if (!process.client) return;

    ctx = gsap.context((self) => {
      if (!self || !self.selector) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          markers: false,
          trigger: root.value,
          start: "top 90%",
          end: "100 84%",
          scrub: ScrollTrigger.isTouch === 1 ? true : 2.8,
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "Expo.easeOut",
          duration: 1.2,
        },
      });

      tl.set(
        root.value,
        {
          visibility: "visible",
        },
        0,
      );

      tl.fromTo(
        self.selector('a[href^="#"]'),
        {
          opacity: 0,
          y: "100%",
        },
        {
          opacity: 1,
          y: "0%",
        },
        0,
      );
    }, root.value || undefined);
  });

  onUnmounted(() => {
    if (!process.client) return;
    ctx?.revert();
  });

  return {
    root,
  };
};
