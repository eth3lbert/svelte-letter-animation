<script lang="ts">
  import appStore from '$lib/stores/app';
  let theme = $appStore.theme;

  export let tag = 'div';

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
    $appStore.theme = theme;
  }
</script>

<svelte:element
  this={tag}
  class="{$$props.class || ''} inline-flex rounded-md p-4 text-2xl text-gray-400
        hover:!text-current active:!text-current dark:text-gray-400 xl:dark:text-gray-700"
  role="button"
  tabindex="0"
  on:click={toggle}
>
  {#if theme === 'dark'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-[1em] w-[1em]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-[1em] w-[1em]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  {/if}
</svelte:element>
