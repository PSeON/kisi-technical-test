<script setup lang="ts">
useSeoMeta({
  title: 'Kisi Technical Test',
  ogTitle: 'Kisi Technical Test',
  description: 'Kisi Technical Test',
  ogDescription: 'Kisi Technical Test',
});

// I would like to show loading background while images are loading and hide it when image is
// loaded. But with SSR, images are loaded faster than scripts, which means that I can't remove
// loading background in time.
// Here I use inline script to make sure, that I can hide loading background when image is loaded,
// even if app scipts are still loading.
useHead({
  script: [
    {
      innerHTML: `
(()=>{
  const images = document.querySelectorAll('.u-imageLoader');
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    function finishLoading() {
      const parent = img.closest(img.getAttribute('data-imgload-parent'));
      if (parent) {
        const overlay = parent.querySelector(img.getAttribute('data-imgload-overlay'));
        if (overlay) {
          overlay.style.visibility = 'hidden';
          overlay.style.opacity = 0;
        }
      }
    }
    if (img.complete) {
      finishLoading();
    } else {
      img.addEventListener('load', () => {
        finishLoading();
      });
    }
  }
})();
`,
      tagPosition: 'bodyClose',
    },
  ],
});
</script>

<template>
  <NuxtPage />
</template>
