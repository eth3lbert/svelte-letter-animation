<script lang="ts">
  import TextRollButton from '$lib/components/TextRollButton.svelte';
  import TextSlideUp from '$lib/components/TextSlideUp.svelte';
  import appStore from '$lib/stores/app';
  import { onMount, tick } from 'svelte';

  let active = false;
  let slideText = "let's talk today.\nwe start tomorrow.";
  let timer: ReturnType<typeof setTimeout> | undefined;

  onMount(async () => {
    await tick();
    toggle();
  });

  async function toggle(ms?: number) {
    active = false;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      active = true;
    }, ms);
  }
  $: $appStore.theme && toggle(750);
</script>

<main class="{$$props.class || ''} flex flex-col items-center justify-start px-6 py-3">
  <div
    class="mb-36 flex h-full flex-col items-center justify-center text-gray-900 dark:text-gray-50"
  >
    <TextSlideUp
      class="mb-8 text-center text-[clamp(2rem,calc(2rem+((1vw-0.2rem)*2)),4rem)] font-semibold
            {!active ? 'invisible' : ''}"
      {active}
      text={slideText}
    />
    <TextRollButton class="text-[clamp(1.75rem,calc(1.75rem+((1vw-0.2rem)*6)),7.75rem)]" />
  </div>
</main>
