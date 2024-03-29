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

    const route = useRoute();
    const routeName = String(route.name) || '';

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

      // Animate the words.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.value,
          start: routeName.includes('index') ? 'top 75%' : 'top bottom', // Start when the heading is 75% in the viewport on the index page, otherwise start when the heading is at the bottom of the viewport.
          end: ScrollTrigger.isTouch === 1 ? 'top 30%' : 'top 24%', // End when the heading is 30% in the viewport on touch devices, otherwise end when the heading is 24% in the viewport.
          /* scrub: ScrollTrigger.isTouch === 1 ? true : 2.8, */
          scrub: false,
          /* toggleActions: 'play none none reverse', */
        },
        defaults: {
          ease: 'expo.out',
          duration: 1.5,
          force3D: true,
        },
      });

      tl.set(
        root.value,
        {
          opacity: 1,
        },
        0,
      );

      tl.fromTo(
        root.value,
        {
          y: 30,
        },
        {
          y: 0,
        },
        0,
      );

      tl.fromTo(
        self.selector('.word'),
        {
          y: 60,
        },
        {
          y: 0,
          stagger: 0.08,
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
