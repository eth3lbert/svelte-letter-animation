<script lang="ts">
  import DarkModeButton from '$lib/components/DarkModeButton.svelte';
</script>

<header class="{$$props.class || ''} flex items-center justify-between px-6 py-3">
  <div class="prose dark:prose-invert">
    <h1 class="m-0 capitalize leading-none">svelte</h1>
    <h2 class="m-0 capitalize leading-none">letter animation</h2>
  </div>
  <DarkModeButton class="-mr-4" />
</header>
