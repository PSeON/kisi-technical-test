<script setup lang="ts">
const props = defineProps<{
  numArticles: number;
}>();

const visibleNumArticles = computed(() => Math.min(props.numArticles, 5));
</script>

<template>
  <div :class="`CardsLayout m-numArticles${visibleNumArticles}`">
    <div :class="`CardsLayout-item m-item1 m-numArticles${visibleNumArticles}`">
      <slot name="item1"></slot>
    </div>
    <div
      v-if="visibleNumArticles > 1"
      :class="`CardsLayout-item m-item2 m-numArticles${visibleNumArticles}`"
    >
      <slot name="item2"></slot>
    </div>
    <div
      v-if="visibleNumArticles > 2"
      :class="`CardsLayout-item m-item3 m-numArticles${visibleNumArticles}`"
    >
      <slot name="item3"></slot>
    </div>
    <div
      v-if="visibleNumArticles > 3"
      :class="`CardsLayout-item m-item4 m-numArticles${visibleNumArticles}`"
    >
      <slot name="item4"></slot>
    </div>
    <div
      v-if="visibleNumArticles > 4"
      :class="`CardsLayout-item m-item5 m-numArticles${visibleNumArticles}`"
    >
      <slot name="item5"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.CardsLayout {
  display: grid;
  gap: 21px;

  @include desktop {
    &.m-numArticles1 {
      grid-template-columns: auto;
      grid-template-rows: auto;
    }

    &.m-numArticles2 {
      grid-template-columns: 45fr 55fr;
      grid-template-rows: auto;
    }

    &.m-numArticles3 {
      grid-template-columns: auto auto auto;
      grid-template-rows: auto;
    }

    &.m-numArticles4 {
      grid-template-columns: 270fr 270fr 420fr 310fr;
      grid-template-rows: auto;
    }

    &.m-numArticles5 {
      grid-template-columns: 312fr 200fr 420fr 310fr;
      grid-template-rows: auto auto;

      @include tablet {
        grid-template-columns: 270fr 270fr 420fr 310fr;
      }
    }
  }

  @include tablet {
    &.m-numArticles1 {
      grid-template-columns: auto;
      grid-template-rows: auto;
    }

    &.m-numArticles2 {
      grid-template-columns: 45fr 55fr;
      grid-template-rows: auto;
    }

    &.m-numArticles3 {
      grid-template-columns: 55fr 45fr;
      grid-template-rows: auto auto;
    }

    &.m-numArticles4 {
      grid-template-columns: 45fr 55fr;
      grid-template-rows: auto auto;
    }

    &.m-numArticles5 {
      grid-template-columns: 270fr 270fr 420fr;
      grid-template-rows: auto auto;
    }
  }

  @include mobile {
    grid-template-columns: auto;
  }

  > * {
    display: flex;
    flex-direction: column;

    > :deep(*) {
      flex-grow: 1;
    }
  }
}

.CardsLayout-item {
  min-height: 100px;

  &.m-numArticles1 {
    justify-self: center;
  }

  @include desktop {
    &.m-numArticles5 {
      &.m-item1 {
        grid-column: 1;
        grid-row: 1;
      }

      &.m-item2 {
        grid-column: 2;
        grid-row: 1;
      }

      &.m-item3 {
        grid-column: 1 / 3;
        grid-row: 2;
        width: 59%;
        justify-self: end;
      }

      &.m-item4 {
        grid-column: 3;
        grid-row: 1 / 3;
      }

      &.m-item5 {
        grid-column: 4;
        grid-row: 1 / 3;
      }
    }
  }

  @include tablet {
    &.m-numArticles3 {
      &.m-item1 {
        grid-column: 1;
        grid-row: 1;
        min-height: 100px;
      }

      &.m-item2 {
        grid-column: 1;
        grid-row: 2;
        width: 59%;
        justify-self: end;
        min-height: 100px;
      }

      &.m-item3 {
        grid-column: 2;
        grid-row: 1 / 3;
      }
    }

    &.m-numArticles5 {
      &.m-item1 {
        grid-column: 1;
        grid-row: 1;
      }

      &.m-item2 {
        grid-column: 2;
        grid-row: 1;
      }

      &.m-item3 {
        grid-column: 1 / 3;
        grid-row: 2;
        width: 59%;
        justify-self: end;
      }

      &.m-item4 {
        grid-column: 3;
        grid-row: 1;
      }

      &.m-item5 {
        grid-column: 3;
        grid-row: 2;
      }
    }
  }
}
</style>
