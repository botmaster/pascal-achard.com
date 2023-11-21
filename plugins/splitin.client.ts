import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Splitting,
    },
  };
});
