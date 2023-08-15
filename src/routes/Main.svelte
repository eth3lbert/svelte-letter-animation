<script lang="ts">
  import TextRollButton from '$lib/components/TextRollButton.svelte';
  import TextSlideUp from '$lib/components/TextSlideUp.svelte';
  import appStore from '$lib/stores/app';
  import { onMount } from 'svelte';

  let active = false;
  let slideText = "let's talk today.\nwe start tomorrow.";
  let timer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    active = true;
  });

  async function toggle() {
    active = false;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      active = true;
    }, 750);
  }
  $: $appStore.theme && toggle();
</script>

<main class="{$$props.class || ''} flex flex-col items-center justify-start px-6 py-3">
  <div
    class="mb-36 flex h-full flex-col items-center justify-center text-gray-900 dark:text-gray-50"
  >
    <TextSlideUp
      class="mb-8 text-center font-semibold {!active ? 'invisible' : ''}"
      {active}
      text={slideText}
    />
    <TextRollButton />
  </div>
</main>
