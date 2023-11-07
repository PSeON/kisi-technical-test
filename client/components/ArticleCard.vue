<script setup lang="ts">
import { type ImagesApiResponse } from 'shared';

defineProps<{
  article: ImagesApiResponse['articles'][number];
}>();
</script>

<template>
  <Card :backgroundImage="article.image">
    <template v-if="article.article" v-slot:title>
      {{ article.article?.title }}
    </template>
    <div v-if="article.article">{{ article.article.description }}</div>
  </Card>
</template>
