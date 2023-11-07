<script setup lang="ts">
const articlesData = await useArticles();

const loadedArticles = computed(() => articlesData.data.value?.articles);

const firstArticle = computed(() => loadedArticles.value && loadedArticles.value[0]);
const secondArticle = computed(() => loadedArticles.value && loadedArticles.value[1]);

const chunkLengths = [5, 3, 4];
const articleChunks = computed(() => {
  if (!loadedArticles.value || loadedArticles.value.length < 3) {
    return [];
  }
  let articlesList = [...loadedArticles.value];
  articlesList.splice(0, 2);
  const result = [];
  let chunkLength = chunkLengths[0];
  while (articlesList.length > chunkLength) {
    result.push(articlesList.splice(0, chunkLength));
    chunkLength = chunkLengths[result.length % chunkLengths.length];
  }
  if (articlesList.length > 0) {
    result.push(articlesList);
  }
  return result;
});

const uploadForm = ref(null);
const inputFieldId = ref(`id${Math.round(Math.random() * 10000)}`);

function onFileSelected(formData: FormData) {
  // if (!uploadForm.value) {
  //   return;
  // }
  // const form = uploadForm.value as HTMLFormElement;
  // const formData = new FormData(form);
  const request = new XMLHttpRequest();
  request.addEventListener('error', () => {
    console.log('readyState', request.readyState);
    alert('error');
  });
  request.addEventListener('load', () => {
    console.log('readyState', request.readyState);
    console.log('status', request.status);
    articlesData.refresh();
  });
  request.upload.addEventListener('progress', event => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      console.log('Upload', percentComplete);
    }
  });
  request.open('POST', '/uploadImage');
  request.send(formData);
  // form.reset();
}
</script>

<template>
  <div class="HomePage-container">
    <template v-if="!loadedArticles">Loading data...</template>
    <template v-else>
      <HeroLayout>
        <template v-slot:column1>
          <h1 class="HomePage-hero-title">Connect people & spaces</h1>
          <ArticleCard v-if="firstArticle" :article="firstArticle" />
        </template>
        <template v-slot:column2>
          <ArticleCard v-if="secondArticle" :article="secondArticle" />
        </template>
      </HeroLayout>
      <CardsChunk
        v-for="(chunk, index) in articleChunks"
        :chunk="chunk"
        :showUploadButton="index === articleChunks.length - 1"
        :uploadButtonId="inputFieldId"
        @uploadImage="onFileSelected"
      />
      <button type="button" @click="() => articlesData.refresh()">Reload</button>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.HomePage-container {
  display: flex;
  flex-direction: column;
  gap: 21px;
  max-width: 1298px;
  padding: 100px 35px;
  margin: 0 auto;

  @include tablet {
    padding: 70px 35px;
  }

  @include mobile {
    padding: 0px 20px 20px;
  }
}

.HomePage-hero-title {
  margin: 0;
  padding: 65px 0px 30px;
  font-size: 32px;
}

.HomePage-uploadImageForm {
  position: fixed;
  display: none;
}
</style>
