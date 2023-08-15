<script lang="ts">
  export let text = '';
  export let active = false;
  export let tag = 'div';

  $: letters = Array.from(text).flatMap((s) => s.match(/\S+|\s/g) as string[]);
</script>

<svelte:element
  this={tag}
  class="{$$props.class || ''} c-wrapper relative px-[5vw] py-[2.5vw] text-5xl uppercase
    transition duration-150"
  class:active
  style:--len-text={letters.length}
  style:--delay-letter="15ms"
>
  <span class="text-slide-up w-full">
    {#each letters as letter, i}
      {#if letter === '\n'}
        <br />
      {:else if letter === ' '}
        &nbsp;
      {:else}
        <span class="text-slide-up__letter" style:--index-letter={i}>
          {letter}
        </span>
      {/if}
    {/each}
  </span>
</svelte:element>

<style lang="postcss">
  .text-slide-up__letter {
    @apply inline-block origin-bottom translate-y-1/2 opacity-0 transition;
    @apply delay-[calc((var(--len-text,0)-var(--index-letter,0))*var(--delay-letter))];
    @apply duration-200 ease-in-out;

    .c-wrapper.active & {
      @apply translate-y-0 opacity-100 delay-[calc(var(--index-letter,0)*var(--delay-letter))];
    }
  }
</style>
