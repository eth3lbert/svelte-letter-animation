<script lang="ts">
  import { tweened, type Readable, type Tweened } from 'svelte/motion';
  import { derived } from 'svelte/store';
  import { quintOut } from 'svelte/easing';

  export let text = '';
  export let duration = 450;
  export let active = false;
  export let tag = 'div';

  let isActive = false;
  let delay = 45;
  let lastIdx = 0;

  $: words = text
    .split(' ')
    .flatMap((s) => s.match(/\S+|\s/g) as string[])
    .filter((s) => !!s);

  const identity = <T,>(v: T) => v;
  let letterLayers: Tweened<number>[][] = [];
  let layer1: Readable<number[]>, layer2: Readable<number[]>;
  let timers: (ReturnType<typeof setTimeout> | undefined)[] = [];
  let offsets: number[] = [];

  $: if (words) {
    const letters = Array.from(words.join(''));
    letterLayers = [
      letters.map(() => tweened(1, { duration, easing: quintOut })),
      letters.map(() => tweened(0, { duration, easing: quintOut }))
    ];
    layer1 = derived(letterLayers[0], identity);
    layer2 = derived(letterLayers[1], identity);
    timers = letters.map(() => undefined);
    offsets = [''].concat(words).map(
      (
        (offset) => (s) =>
          (offset += s.length)
      )(0)
    );
  }

  $: if (active !== isActive) {
    isActive = active;
    if (active) {
      const len = letterLayers[0].length;
      // reset
      for (let i = len - 1; i >= 0; i--) {
        clearTimeout(timers[i]);
        letterLayers[0][i].set(1, { duration: 0 });
        letterLayers[1][i].set(0, { duration: 0 });
      }
      for (let i = 0; i < len; i++) {
        timers[i] = setTimeout(
          () => {
            if (active !== true) return;
            lastIdx = i;
            letterLayers[0][i].set(0);
            letterLayers[1][i].set(1, { duration: duration - 50 });
          },
          (i + 1) * delay
        );
      }
    } else {
      const len = letterLayers[0].length;
      for (let i = len - 1; i >= 0; i--) {
        clearTimeout(timers[i]);
        timers[i] = setTimeout(
          () => {
            if (active !== false) return;
            letterLayers[0][i].set(1, { duration: duration - 50 });
            letterLayers[1][i].set(0);
          },
          (lastIdx - i + 1) * delay
        );
      }
    }
  }
</script>

<!-- use scale to simulate rolling (rotateX(-90/90) -->
<svelte:element this={tag} class="text-roll-wrapper relative flex">
  <span class="text-roll w-full">
    {#each words as word, i}
      {#if word === '\n'}
        <br />
      {:else}
        <span class="text-roll__word">
          {#each Array.from(word) as char, j}
            <span class="text-roll__letter is-1" style:--scale-letter={$layer1[offsets[i] + j]}>
              {#if i > 0 && j === 0}&nbsp{/if}{char}
            </span>
          {/each}
        </span>
      {/if}
    {/each}
  </span>
  <span class="text-roll absolute bottom-0 left-0 right-0 top-0">
    {#each words as word, i}
      {#if word === '\n'}
        <br />
      {:else}
        <span class="text-roll__word">
          {#each Array.from(word) as char, j}
            <span class="text-roll__letter is-2" style:--scale-letter={$layer2[offsets[i] + j]}>
              {#if i > 0 && j === 0}&nbsp{/if}{char}
            </span>
          {/each}
        </span>
      {/if}
    {/each}
  </span>
</svelte:element>

<style lang="postcss">
  .text-roll,
  .text-roll__word,
  .text-roll__letter {
    @apply inline-block;
  }
  .text-roll__letter {
    @apply scale-y-[var(--scale-letter,0)];
    &.is-1 {
      @apply origin-top;
    }
    &.is-2 {
      @apply origin-bottom;
    }
  }
</style>
