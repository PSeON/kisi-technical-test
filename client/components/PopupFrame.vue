<template>
  <div class="PopupFrame">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.PopupFrame {
  padding: 8px 16px;
  border-radius: 4px;
  background: $primaryDarkColor;
  box-shadow: 0 0 8px rgba(#000, 0.3);
}
</style>
