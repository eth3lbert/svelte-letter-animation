<script lang="ts">
  export let text = '';
  export let active = false;
  export let tag = 'div';

  $: words = text
    .split(' ')
    .flatMap((s) => s.match(/\S+|\s/g) as string[])
    .filter((s) => !!s);
  $: totalLen = words.reduce((a, b) => a + b.length, 0);
  $: offsets = [''].concat(words).map(
    (
      (offset) => (s) =>
        (offset += s.length)
    )(0)
  );
</script>

<svelte:element
  this={tag}
  class="{$$props.class || ''} c-wrapper relative px-[5vw] py-[2.5vw] text-5xl uppercase
    transition duration-150"
  class:active
  style:--len-text={totalLen}
  style:--delay-letter="15ms"
>
  <span class="text-slide-up w-full">
    {#each words as word, i}
      {#if word === '\n'}
        <br />
      {:else}
        <span class="text-slide-up__word">
          {#each Array.from(word) as char, j}
            <span class="text-slide-up__letter" style:--index-letter={offsets[i] + j}>
              {#if i > 0 && j === 0}&nbsp{/if}{char}
            </span>
          {/each}
        </span>
      {/if}
    {/each}
  </span>
</svelte:element>

<style lang="postcss">
  .text-slide-up__word,
  .text-slide-up__letter {
    @apply inline-block;
  }
  .text-slide-up__letter {
    @apply origin-bottom translate-y-1/2 opacity-0 transition;
    @apply delay-[calc((var(--len-text,0)-var(--index-letter,0))*var(--delay-letter))];
    @apply duration-200 ease-in-out;

    .c-wrapper.active & {
      @apply translate-y-0 opacity-100 delay-[calc(var(--index-letter,0)*var(--delay-letter))];
    }
  }
</style>
