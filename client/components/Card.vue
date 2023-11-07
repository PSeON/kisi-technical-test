<script setup lang="ts">
defineProps<{
  backgroundImage: string;
}>();

const slots = defineSlots<{
  default(props: { msg: string }): any;
}>();
</script>

<template>
  <div class="Card">
    <!-- <img class="Card-imageSize" :src="props.backgroundImage" /> -->
    <div class="Card-image" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
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
    grid-column: 1;
    grid-row: 1;
  }
}

.Card-imageSize {
  max-width: 100%;
}

.Card-image {
  background-repeat: no-repeat;
  background-size: cover;
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
</style>
