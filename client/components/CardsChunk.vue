<script setup lang="ts">
import { type ImagesApiResponse } from 'shared';

const props = defineProps<{
  chunk: ImagesApiResponse['articles'];
  showUploadButton?: boolean;
}>();

const emit = defineEmits<{
  (e: 'uploadImage', value: FormData): void;
}>();
</script>

<template>
  <CardsLayout :numArticles="chunk.length">
    <!-- Vue doesn't like dynamic slots inside loops, have to repeat the code  -->
    <template v-if="chunk[0]" v-slot:item1>
      <div class="CardsChunk-item">
        <ArticleCard :article="chunk[0]" />
        <div v-if="showUploadButton && chunk.length === 1" class="CardsChunk-uploadButtonBlock">
          <UploadImageButton @uploadImage="emit('uploadImage', $event)" />
        </div>
      </div>
    </template>
    <template v-if="chunk[1]" v-slot:item2>
      <div class="CardsChunk-item">
        <ArticleCard :article="chunk[1]" />
        <div v-if="showUploadButton && chunk.length === 2" class="CardsChunk-uploadButtonBlock">
          <UploadImageButton @uploadImage="emit('uploadImage', $event)" />
        </div>
      </div>
    </template>
    <template v-if="chunk[2]" v-slot:item3>
      <div class="CardsChunk-item">
        <ArticleCard :article="chunk[2]" />
        <div v-if="showUploadButton && chunk.length === 3" class="CardsChunk-uploadButtonBlock">
          <UploadImageButton @uploadImage="emit('uploadImage', $event)" />
        </div>
      </div>
    </template>
    <template v-if="chunk[3]" v-slot:item4>
      <div class="CardsChunk-item">
        <ArticleCard :article="chunk[3]" />
        <div v-if="showUploadButton && chunk.length === 4" class="CardsChunk-uploadButtonBlock">
          <UploadImageButton @uploadImage="emit('uploadImage', $event)" />
        </div>
      </div>
    </template>
    <template v-if="chunk[4]" v-slot:item5>
      <div class="CardsChunk-item">
        <ArticleCard :article="chunk[4]" />
        <div v-if="showUploadButton && chunk.length === 5" class="CardsChunk-uploadButtonBlock">
          <UploadImageButton @uploadImage="emit('uploadImage', $event)" />
        </div>
      </div>
    </template>
  </CardsLayout>
</template>

<style scoped lang="scss">
.CardsChunk-item {
  display: flex;
  flex-direction: column;

  > :first-child {
    flex-grow: 1;
  }
}

.CardsChunk-uploadButtonBlock {
  padding: 32px 0px;
}
</style>
