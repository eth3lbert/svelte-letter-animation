import { writable } from 'svelte/store';

type App = {
  theme: 'dark' | 'light';
};

const createStore = () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC

  let theme: App['theme'] = 'dark';
  const store = writable<App>({ theme });
  if (typeof Storage === 'undefined') {
    return store;
  }

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  store.subscribe((state) => {
    const { theme } = state;
    document.documentElement.dataset.mode = theme;
    return (localStorage.theme = theme);
  });
  store.set({ ...store, theme });
  return store;
};

const store = createStore();
export default store;
