import { gsap } from 'gsap';

interface BubblesOptions {
  bubbleCount?: number
  bubbleSizeMin?: number
  bubbleSizeMax?: number
  bubbleColors?: string[]
}

export function useBubblesEffect(refRoot: Ref<HTMLElement | null>, refBubbles: Ref<HTMLElement | null>, options: BubblesOptions = {}) {
  onMounted(() => {
    if (!process.client)
      return;
    const {
      bubbleCount = 20,
      bubbleSizeMin = 300,
      bubbleSizeMax = 800,
      bubbleColors = [
        'hsl(var(--color-body-background)/100)',
        'hsl(var(--color-body-background)/80)',
        'hsl(var(--color-body-background)/60)',
      ],
    } = options;

    const createBubble = () => {
      const size = gsap.utils.random(bubbleSizeMin, bubbleSizeMax);
      const bubble = document.createElement('span');
      bubble.dataset.size = `${size}`;
      bubble.classList.add('bubble');
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      bubble.style.left = `${gsap.utils.random(-15, 100)}%`;
      return bubble;
    };

    const animateBubble = (bubble: HTMLElement) => {
      gsap.to(bubble, {
        force3D: true,
        duration: gsap.utils.random(3, 10),
        opacity: 0,
        scale: gsap.utils.random(0.5, 0.8),
        y: refRoot.value?.clientHeight ? refRoot.value.clientHeight * 0.5 * -1 + (bubble.clientHeight / 2) : 0,
        ease: 'linear',
        repeat: -1,
        delay: gsap.utils.random(0, 30) * -1,
        startAt: { y: bubble.clientHeight, opacity: 1.3 },
        onRepeat: (self) => {
          gsap.set(self, { left: `${gsap.utils.random(-15, 100)}%` });
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
  });

  return {

  };
}
