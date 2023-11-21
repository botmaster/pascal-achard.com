import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useProseHeadingEffect = () => {
  const root = ref<HTMLElement | null>(null);
  const splitMe = ref<HTMLElement | null>(null);
  let ctx: gsap.Context;

  onMounted(() => {
    if (!process.client) return;

    ctx = gsap.context(async (self) => {
      if (!self || !self.selector) return;

      // Split the heading into characters
      const { $Splitting: Splitting } = useNuxtApp();

      await nextTick();
      Splitting({
        target: splitMe.value || undefined,
        by: "chars",
      });

      // Animate the characters
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
        self.selector(".char"),
        {
          opacity: 0,
          x: "-100%",
          scaleX: 0,
        },
        {
          opacity: 1,
          x: "0%",
          scaleX: 1,
          stagger: 0.2,
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
    splitMe,
  };
};
