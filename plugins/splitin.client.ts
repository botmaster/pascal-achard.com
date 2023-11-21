import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

export default defineNuxtPlugin((nuxtApp) => {
  /* if (process.client) {
    gsap.registerPlugin(Splitting);
  } */

  return {
    provide: {
      Splitting,
    },
  };
});
