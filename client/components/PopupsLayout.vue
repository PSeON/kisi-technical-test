<script setup lang="ts">
defineProps<{
  showFullScreenLoader?: boolean;
}>();
</script>

<template>
  <div class="MainLayout">
    <slot></slot>
    <div class="MainLayout-topLeft">
      <slot name="topLeft"></slot>
    </div>
    <div class="MainLayout-topRight">
      <slot name="topRight"></slot>
    </div>
    <div class="MainLayout-bottomLeft">
      <slot name="bottomLeft"></slot>
    </div>
    <div class="MainLayout-bottomRight">
      <slot name="bottomRight"></slot>
    </div>
    <Transition name="fade">
      <div v-if="showFullScreenLoader" class="MainLayout-fullScreenLoader">
        <LoadingSpinner />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.MainLayout {
  display: flex;
  flex-direction: column;
}

.MainLayout-topLeft {
  position: fixed;
  top: 0;
  left: 0;
}

.MainLayout-topRight {
  position: fixed;
  top: 0;
  right: 0;
}

.MainLayout-bottomLeft {
  position: fixed;
  bottom: 0;
  left: 0;
}

.MainLayout-bottomRight {
  position: fixed;
  bottom: 0;
  right: 0;
}

.MainLayout-fullScreenLoader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  background: rgba($neutralDarkColor, 0.4);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
</style>
