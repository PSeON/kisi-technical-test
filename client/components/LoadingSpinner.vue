<template>
  <div class="LoadingSpinner"></div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.LoadingSpinner {
  $size: 1em;
  display: inline-flex;
  overflow: hidden;
  width: $size;
  height: $size;

  &:after {
    $borderSize: 0.1em;
    content: ' ';
    display: block;
    width: calc($size - $borderSize * 2);
    height: calc($size - $borderSize * 2);
    border-radius: 50%;
    border: $borderSize solid $neutralLightColor;
    border-color: $neutralLightColor transparent $neutralLightColor transparent;
    animation: LoadingSpinner 1.2s linear infinite;
  }
}

@keyframes LoadingSpinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
