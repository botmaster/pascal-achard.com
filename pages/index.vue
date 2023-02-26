<script setup lang="ts">
onMounted(() => {
  console.log("mounted");
  resizeHandler();
  // We listen to the resize event
  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  console.log("unmounted");
  window.removeEventListener("resize", resizeHandler);
});

const resizeHandler = () => {
  console.log("resize");
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
</script>

<template>
  <main class="page-index">
    <div class="page-index__cover">
      <cover-component
        title="Titre"
        subtitle="Subtitle"
        info=""
      ></cover-component>
    </div>
    <div class="page-index__content">
      <div class="container mx-auto mt-8">
        <div class="w-10/12">
          <p>
            <span
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab
              accusantium ad adipisci cupiditate eaque eius exercitationem
              explicabo illum modi nulla officia perferendis possimus, quae, quo
              reprehenderit rerum sint tenetur?</span
            ><span
              >Autem, blanditiis culpa cupiditate dignissimos earum eos est
              facere fuga hic iure laudantium modi molestiae nam natus odit
              optio pariatur porro quo ratione saepe similique sint ut
              voluptatum! Officiis, totam?</span
            ><span
              >Adipisci alias, aperiam ex, fugit illum, impedit in natus numquam
              possimus quo ratione recusandae similique soluta veritatis
              voluptate. Accusantium cum debitis quibusdam quo similique
              voluptatibus. Cum eaque quidem reiciendis tempora.</span
            ><span
              >Aliquam cupiditate dignissimos nesciunt? Delectus harum iusto
              labore pariatur rem sed tenetur! Accusantium amet, animi at,
              dolorum est eveniet explicabo minima necessitatibus perferendis
              repellendus reprehenderit sint tempora, temporibus tenetur
              voluptates!</span
            ><span
              >Ab accusantium aliquid animi ea ex illo iste magni molestias,
              nesciunt nostrum quam, quod repellat rerum! Ad adipisci aperiam
              consectetur consequatur eaque hic, id ipsam minus, modi nemo
              pariatur repudiandae?</span
            ><span
              >Alias aliquid asperiores atque consequatur, consequuntur debitis
              delectus doloribus earum eos est explicabo illo ipsam iusto
              laudantium maiores necessitatibus nisi odit porro quis quod
              recusandae repellat sint veniam voluptas voluptate!</span
            ><span
              >A adipisci aliquid architecto, asperiores, consequatur deleniti
              doloremque exercitationem facilis harum id laboriosam laborum
              laudantium libero nisi nulla odit possimus quis quisquam quo quos
              reprehenderit sequi sunt veniam vero vitae.</span
            ><span
              >Architecto aspernatur consequuntur dolorem in labore nemo
              officiis perspiciatis quas repudiandae unde velit, vitae!
              Accusamus adipisci blanditiis, consectetur cum cupiditate pariatur
              similique? Earum, quasi veritatis? Aliquid aperiam magni sequi
              veritatis.</span
            ><span
              >Aspernatur consequatur consequuntur earum eius, incidunt
              inventore iste laboriosam magnam maiores nam provident quaerat
              quas, recusandae reiciendis repellat totam ut! Architecto culpa
              ipsam maxime minima numquam officiis possimus sapiente
              voluptatibus?</span
            ><span
              >Ab accusamus at, atque cum distinctio ducimus ex harum illum iure
              minima nobis obcaecati optio pariatur placeat quae quod repellat,
              suscipit, ut veniam vitae. Aperiam id perferendis quas reiciendis
              ullam!</span
            >
          </p>
          <p>
            <span
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab
              accusantium ad adipisci cupiditate eaque eius exercitationem
              explicabo illum modi nulla officia perferendis possimus, quae, quo
              reprehenderit rerum sint tenetur?</span
            ><span
              >Autem, blanditiis culpa cupiditate dignissimos earum eos est
              facere fuga hic iure laudantium modi molestiae nam natus odit
              optio pariatur porro quo ratione saepe similique sint ut
              voluptatum! Officiis, totam?</span
            ><span
              >Adipisci alias, aperiam ex, fugit illum, impedit in natus numquam
              possimus quo ratione recusandae similique soluta veritatis
              voluptate. Accusantium cum debitis quibusdam quo similique
              voluptatibus. Cum eaque quidem reiciendis tempora.</span
            ><span
              >Aliquam cupiditate dignissimos nesciunt? Delectus harum iusto
              labore pariatur rem sed tenetur! Accusantium amet, animi at,
              dolorum est eveniet explicabo minima necessitatibus perferendis
              repellendus reprehenderit sint tempora, temporibus tenetur
              voluptates!</span
            ><span
              >Ab accusantium aliquid animi ea ex illo iste magni molestias,
              nesciunt nostrum quam, quod repellat rerum! Ad adipisci aperiam
              consectetur consequatur eaque hic, id ipsam minus, modi nemo
              pariatur repudiandae?</span
            ><span
              >Alias aliquid asperiores atque consequatur, consequuntur debitis
              delectus doloribus earum eos est explicabo illo ipsam iusto
              laudantium maiores necessitatibus nisi odit porro quis quod
              recusandae repellat sint veniam voluptas voluptate!</span
            ><span
              >A adipisci aliquid architecto, asperiores, consequatur deleniti
              doloremque exercitationem facilis harum id laboriosam laborum
              laudantium libero nisi nulla odit possimus quis quisquam quo quos
              reprehenderit sequi sunt veniam vero vitae.</span
            ><span
              >Architecto aspernatur consequuntur dolorem in labore nemo
              officiis perspiciatis quas repudiandae unde velit, vitae!
              Accusamus adipisci blanditiis, consectetur cum cupiditate pariatur
              similique? Earum, quasi veritatis? Aliquid aperiam magni sequi
              veritatis.</span
            ><span
              >Aspernatur consequatur consequuntur earum eius, incidunt
              inventore iste laboriosam magnam maiores nam provident quaerat
              quas, recusandae reiciendis repellat totam ut! Architecto culpa
              ipsam maxime minima numquam officiis possimus sapiente
              voluptatibus?</span
            ><span
              >Ab accusamus at, atque cum distinctio ducimus ex harum illum iure
              minima nobis obcaecati optio pariatur placeat quae quod repellat,
              suscipit, ut veniam vitae. Aperiam id perferendis quas reiciendis
              ullam!</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page-index {
  &__cover {
    transition: all 1s;

    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    min-height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
    min-height: calc(var(--vh, 1vh) * 100);

    @apply flex flex-col;

    > * {
      flex-grow: 1;
    }
  }

  &__content {
    @apply py-16 md:py-24;
  }
}
</style>
