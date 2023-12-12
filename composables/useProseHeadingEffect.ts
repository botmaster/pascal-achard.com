import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProseHeadingEffect() {
  const root = ref<HTMLElement | null>(null);
  const splitMe = ref<HTMLElement | null>(null);
  let ctx: gsap.Context;

  onMounted(() => {
    if (!process.client)
      return;

    ctx = gsap.context(async (self) => {
      if (!self || !self.selector || !splitMe.value)
        return;

      // Split the heading into characters
      const { $Splitting: Splitting } = useNuxtApp();

      await nextTick();
      Splitting({
        target: splitMe.value,
        by: 'words',
      });

      // Animate the characters
      const tl = gsap.timeline({
        scrollTrigger: {
          markers: false,
          trigger: root.value,
          start: 'top 90%',
          end: 'top 44%',
          scrub: ScrollTrigger.isTouch === 1 ? true : 2.8,
          toggleActions: 'play none none reverse',
        },
        defaults: {
          ease: 'power2.out',
          duration: 1.2,
        },
      });

      tl.set(
        root.value,
        {
          visibility: 'visible',
        },
        0,
      );

      tl.set(
        self.selector('.word'),
        {
          transformOrigin: 'left left',
        },
        0,
      );

      tl.fromTo(
        self.selector('.word'),
        {
          opacity: 0,
          x: 150,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
        },
        0,
      );
    }, root.value || undefined);
  });

  onUnmounted(() => {
    if (!process.client)
      return;
    ctx?.revert();
  });

  return {
    root,
    splitMe,
  };
}
