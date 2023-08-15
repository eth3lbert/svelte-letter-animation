<script lang="ts">
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Main from './Main.svelte';
</script>

<div class="wrapper min-h-[100dvh] bg-svelte-50 dark:bg-black dark:text-gray-300">
  <Header />
  <Main />
  <Footer />
</div>

<style lang="postcss">
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main'
      'footer';
    grid-gap: 1rem;
  }
</style>
