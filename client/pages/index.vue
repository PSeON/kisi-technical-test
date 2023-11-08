<script setup lang="ts">
import { uploadImage } from '~/composables/articles';
import { delay } from 'shared';

// Some changes can't be performed during SSR, so using this variable to check if
// current component is "alive"
const isAlive = ref(false);

onMounted(() => {
  isAlive.value = true;
  if (articlesData.error.value) {
    articlesData.refresh();
  }
  watch(articlesData.status, async newValue => {
    if (isAlive && newValue === 'error') {
      await delay(1000);
      articlesData.refresh();
    }
  });
});

onUnmounted(() => {
  isAlive.value = false;
});

const showFullScreenLoader = ref(false);

const articlesData = await fetchArticles();

const loadedArticles = ref(articlesData.data.value?.articles);

watch(articlesData.data, newValue => {
  if (newValue) {
    loadedArticles.value = newValue.articles;
  }
});

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

const isUploadingImage = ref(false);
const uploadingImageProgress = ref(0);
const uploadingImageInfiniteProgress = ref(false);
const uploadingImageError = ref(false);

async function onFileSelected(formData: FormData) {
  if (isUploadingImage.value) {
    return;
  }
  isUploadingImage.value = true;
  try {
    await uploadImage(formData, progress => {
      if (progress === null) {
        uploadingImageProgress.value = 0;
        uploadingImageInfiniteProgress.value = true;
      } else {
        uploadingImageProgress.value = progress;
        uploadingImageInfiniteProgress.value = false;
      }
    });
    articlesData.refresh();
  } catch (e) {
    isUploadingImage.value = false;
    uploadingImageError.value = true;
    await delay(10000);
    uploadingImageError.value = false;
  } finally {
    isUploadingImage.value = false;
    await delay(500);
    uploadingImageProgress.value = 0;
  }
}
</script>

<template>
  <PopupsLayout
    :showFullScreenLoader="
      isAlive && !articlesData.error.value && (showFullScreenLoader || articlesData.pending.value)
    "
  >
    <template v-slot:topRight>
      <div v-if="isAlive" class="HomePage-popups">
        <TransitionGroup name="fadeBottom">
          <PopupFrame key="item1" v-if="articlesData.error.value">
            <div class="u-flex-row-center-center">
              <LoadingSpinner />
              &nbsp;Network error. Try to reconnect...
            </div>
          </PopupFrame>
          <PopupFrame key="item2" v-if="isUploadingImage">
            <div class="u-flex-col-stretch-start">
              Uploading image...
              <ProgressBar
                :infinite="uploadingImageInfiniteProgress"
                :value="uploadingImageProgress"
                :maxValue="1"
              />
            </div>
          </PopupFrame>
          <PopupFrame key="item3" v-if="uploadingImageError">
            Image upload failed. Please try again.
          </PopupFrame>
        </TransitionGroup>
      </div>
    </template>
    <div v-if="loadedArticles" class="HomePage-container">
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
        @uploadImage="onFileSelected"
      />
      <button type="button" @click="articlesData.refresh()">Reload</button>
    </div>
  </PopupsLayout>
</template>

<style scoped lang="scss">
@import '~/assets/css/core.scss';

.HomePage-popups {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 50vw;
  padding: 8px;
  gap: 8px;
}

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
