<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    infinite?: boolean;
    value?: number;
    maxValue?: number;
  }>(),
  {
    value: 0,
    maxValue: 100,
  },
);

const barWidth = computed(() =>
  props.infinite ? '30%' : `${Math.round((props.value / props.maxValue) * 100)}%`,
);
</script>

<template>
  <div class="ProgressBar">
    <div
      :class="{ 'ProgressBar-bar': true, 'm-infinite': infinite }"
      :style="{ width: barWidth }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.ProgressBar {
  contain: strict;
  display: inline-block;
  position: relative;
  overflow: hidden;
  min-height: 4px;
  border-radius: 4px;
  background: $neutralDarkColor;
}

.ProgressBar-bar {
  position: relative;
  min-height: 4px;
  height: 100%;
  border-radius: 4px;
  background: $successColor;
  background: repeating-linear-gradient(
    45deg,
    darken($successColor, 5),
    darken($successColor, 5) 10px,
    lighten($successColor, 1) 10px,
    lighten($successColor, 1) 20px
  );
  transition: width 0.3s linear;

  &.m-infinite {
    animation: ProgressBar 1.2s linear infinite;
  }
}

@keyframes ProgressBar {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
