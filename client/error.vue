<script setup lang="ts">
const props = defineProps<{
  error: {
    url: string;
    statusCode: number;
    statusMessage: string;
    message: string;
    description: string;
    data: any;
  };
}>();

const showDetails = ref(false);
</script>

<template>
  <div class="Error">
    <template v-if="error.statusCode === 404">
      <h1>Page not found :(</h1>
      <h3>Try starting from the home page.</h3>
      <a class="ButtonTheme" href="/">Home page</a>
    </template>
    <template v-else>
      <h1>Oops... Something went wrong :(</h1>
      <h3>Please try refreshing the page. Maybe it will help.</h3>
      <template v-if="!showDetails">
        <div>
          <a class="ButtonTheme" href="/">Return to home page</a>
          &nbsp;
          <button @click="showDetails = true">Show details</button>
        </div>
      </template>
      <template v-else>
        <div>
          <a class="ButtonTheme" href="/">Return to home page</a>
          &nbsp;
          <button @click="showDetails = false">Hide details</button>
        </div>
        <h2>{{ error.statusCode }}</h2>
        <h3>{{ error.message }}</h3>
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.Error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 1280px;
  margin: 200px auto;
}
</style>
