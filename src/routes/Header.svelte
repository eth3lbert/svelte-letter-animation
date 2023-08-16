<script lang="ts">
  import DarkModeButton from '$lib/components/DarkModeButton.svelte';
</script>

<header class="{$$props.class || ''} flex items-center justify-between px-6 py-3">
  <div class="prose dark:prose-invert">
    <h1
      class="m-0 text-[clamp(1.5rem,calc(1.5rem+((1vw-0.2rem)*1)),2.5rem)] capitalize leading-none"
    >
      svelte
    </h1>
    <h2
      class="mt-1 text-[clamp(1.25rem,calc(1.25rem+((1vw-0.2rem)*1)),2.25rem)] capitalize
            leading-none md:mt-0"
    >
      letter animation
    </h2>
  </div>
  <DarkModeButton class="-mr-4" />
</header>
