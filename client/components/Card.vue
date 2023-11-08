<script setup lang="ts">
defineProps<{
  backgroundImage: string;
}>();

const slots = defineSlots<{
  default(props: { msg: string }): any;
}>();

const imageElement = ref(null);
const imageLoaded = ref(false);

onMounted(() => {
  if (imageElement.value) {
    const img = imageElement.value as HTMLImageElement;
    if (img.complete) {
      imageLoaded.value = true;
    } else {
      img.addEventListener('load', () => {
        imageLoaded.value = true;
      });
    }
  }
});
</script>

<template>
  <div class="Card">
    <img
      class="Card-imageSize u-imageLoader"
      data-imgload-parent=".Card"
      data-imgload-overlay=".Card-imageLoadingOverlay"
      :src="backgroundImage"
      ref="imageElement"
    />
    <div class="Card-image" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    <div :class="{ 'Card-imageLoadingOverlay': true, 'm-hidden': imageLoaded }"></div>
    <div class="Card-imageOverlay"></div>
    <div class="Card-content">
      <h3>
        <slot name="title"></slot>
      </h3>
      <div class="Card-description">
        <slot></slot>
      </div>
    </div>
    <div class="Card-arrow">&#10095;</div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.Card {
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: auto;
  grid-template-rows: auto;
  border-radius: 4px;

  &:hover {
    .Card-imageOverlay {
      background: $primaryColor;
    }

    .Card-description {
      transform: translateY(0);
      opacity: 1;
    }
  }

  > * {
    position: relative;
    grid-column: 1;
    grid-row: 1;
  }
}

.Card-imageSize {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.Card-image {
  background-repeat: no-repeat;
  background-size: cover;
}

.Card-imageLoadingOverlay {
  background: linear-gradient(
    to right,
    $neutralDarkColor,
    $primaryDarkColor 50vw,
    $neutralDarkColor 100vw
  );
  background-attachment: fixed;
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
  animation: CardLoading 1.2s linear infinite;

  &.m-hidden {
    visibility: hidden;
    opacity: 0;
  }
}

.Card-imageOverlay {
  background: rgba($primaryDarkColor, 0.4);
  transition: background-color 0.3s;
}

.Card-content {
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
}

.Card-description {
  margin-top: 26px;
  transform: translateY(20px);
  opacity: 0;
  transition:
    transform 0.3s,
    opacity 0.3s;

  // On touch screen devices we don't have "hover" gesture, show description always in this case
  @include mobile {
    transform: translateY(0);
    opacity: 1;
  }
}

.Card-arrow {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes CardLoading {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 100vw;
  }
}
</style>
