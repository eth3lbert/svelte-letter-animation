<script lang="ts">
  import TextSlideUp from '$lib/components/TextSlideUp.svelte';
  import { onMount } from 'svelte';

  let active = false;
  let slideText = "let's talk today.\nwe start tomorrow.";

  onMount(() => {
    active = true;
  });
</script>

<main class="{$$props.class || ''} flex flex-col items-center justify-start px-6 py-3">
  <div class="dark:text-gray-50">
    <TextSlideUp {active} text={slideText} />
  </div>
</main>
