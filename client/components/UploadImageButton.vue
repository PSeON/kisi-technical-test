<script setup lang="ts">
const emit = defineEmits<{
  (e: 'uploadImage', value: FormData): void;
}>();

const uploadForm = ref(null);

function onFileSelected() {
  if (!uploadForm.value) {
    return;
  }
  const form = uploadForm.value as HTMLFormElement;
  emit('uploadImage', new FormData(form));
  form.reset();
}
</script>

<template>
  <form method="post" action="/uploadImage" ref="uploadForm">
    <label class="ButtonTheme">
      <input
        class="UploadImageButton-uploadImageInput"
        type="file"
        accept="image/*"
        name="image"
        @change="onFileSelected"
      />
      Upload
    </label>
  </form>
</template>

<style scoped lang="scss">
.UploadImageButton-uploadImageInput {
  display: none;
}
</style>
