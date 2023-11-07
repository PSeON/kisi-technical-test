<template>
  <div class="HeroLayout-container">
    <div class="HeroLayout-column1">
      <slot name="column1"></slot>
    </div>
    <div class="HeroLayout-column2">
      <slot name="column2"></slot>
    </div>
    <div class="HeroLayout-column3"></div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.HeroLayout-container {
  display: flex;
  flex-direction: row;
  gap: 21px;
  min-height: 391px;

  @include mobile {
    flex-direction: column;
  }

  > * {
    display: flex;
    flex-direction: column;

    > :deep(*) {
      flex-grow: 1;
    }
  }
}

.HeroLayout-column1 {
  width: 0;
  flex: 404;

  @include tablet {
    flex: 50;
  }

  @include mobile {
    width: 100%;
  }
}

.HeroLayout-column2 {
  width: 0;
  flex: 545;

  @include tablet {
    flex: 50;
  }

  @include mobile {
    width: 100%;
    min-height: 100px;
  }
}

.HeroLayout-column3 {
  width: 0;
  flex: 307;

  @include tablet {
    display: none;
  }

  @include mobile {
    display: none;
  }
}
</style>
