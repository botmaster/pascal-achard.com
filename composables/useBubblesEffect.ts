import { gsap } from 'gsap';

interface BubblesOptions {
  bubbleCount?: number
  bubbleSizeMin?: number
  bubbleSizeMax?: number
  bubbleColors?: string[]
}

export function useBubblesEffect(refRoot: Ref<HTMLElement | null>, refBubbles: Ref<HTMLElement | null>, options: BubblesOptions = {}) {
  let ctx: gsap.Context;

  onMounted(() => {
    if (!process.client)
      return;

    ctx = gsap.context((self) => {
      if (!self || !self.selector)
        return;

      // Get viewport width and height.
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      // % of the viewport width.
      const vwPercent = vw * 0.4;

      const {
        bubbleCount = 10,
        bubbleSizeMin = vwPercent * 0.35,
        bubbleSizeMax = vwPercent,
        bubbleColors = [
          'hsl(var(--color-body-background)/100)',
          'hsl(var(--color-body-background)/80)',
          'hsl(var(--color-body-background)/60)',
        ],
      } = options;

      const spawnBubbleX = (buubleWidth: number) => {
        return gsap.utils.random(-buubleWidth, (refBubbles.value?.clientWidth || 0) - buubleWidth / 2);
      };

      const createBubble = () => {
        const size = gsap.utils.random(bubbleSizeMin, bubbleSizeMax);
        const bubble = document.createElement('span');
        bubble.dataset.size = `${size}`;
        bubble.classList.add('bubble');
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        bubble.style.transform = `translate(${spawnBubbleX(size)}px, ${size}px)`;
        return bubble;
      };

      const animateBubble = (bubble: HTMLElement) => {
        gsap.to(bubble, {
          force3D: true,
          duration: gsap.utils.random(5, 15),
          opacity: 0,
          scale: gsap.utils.random(0.5, 0.8),
          y: refRoot.value?.clientHeight ? refRoot.value.clientHeight * 0.5 * -1 + (bubble.clientHeight / 2) : 0,
          ease: 'linear',
          repeat: -1,
          delay: gsap.utils.random(0, 30) * -1,
          startAt: { opacity: 1.3 },
          onRepeat: (self) => {
            gsap.set(self, { x: `${spawnBubbleX(self.clientWidth)}px` });
          },
          onRepeatParams: [bubble],
        });
      };

      const createBubbles = () => {
        const list = [];
        for (let i = 0; i < bubbleCount; i++) {
          const bubble = createBubble();
          refBubbles.value?.appendChild(bubble);
          list.push(bubble);
        }
        return list;
      };

      const bubbleList = createBubbles();
      bubbleList.forEach((bubble) => {
        animateBubble(bubble);
      });
    }, refRoot.value || undefined); // <- Scope!
  });

  onUnmounted(() => {
    ctx.revert(); // <- Easy Cleanup!
  });
}
