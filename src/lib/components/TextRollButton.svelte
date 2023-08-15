<script lang="ts">
  import TextRoll from './TextRoll.svelte';

  export let text = 'start a project';
  export let tag = 'div';
  let active = false;
</script>

<svelte:element
  this={tag}
  class="{$$props.class || ''} flex items-center justify-center rounded-full border border-solid
        border-gray-200 px-[5vw] py-[2.5vw] text-center text-8xl uppercase
        transition duration-300 hover:scale-[1.025] hover:border-gray-700
        dark:border-gray-800 dark:hover:border-gray-50"
  role="button"
  tabindex="0"
  on:mouseenter={async () => {
    active = true;
  }}
  on:mouseleave={async () => {
    active = false;
  }}
>
  <TextRoll {active} {text} />
</svelte:element>
