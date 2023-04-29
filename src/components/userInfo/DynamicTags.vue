<template>
  <n-dynamic-tags
      ref="dynamicTagsRef"
      type="success"
      v-model:value="model.value"
      :max="10"
      @input="onTagInput"
  />
</template>

<script>
import {ref} from "vue";
import {NDynamicTags} from "naive-ui";

export default {
  name: "DynamicTags",
  components: {
    NDynamicTags,
  },
  props: {
    modelValue: Array,
  },
  setup(props, {emit}) {
    const dynamicTagsRef = ref(null);
    // 限制最大字符数为10
    const maxLength = 10;

    const onTagInput = (value) => {
      const inputEl = dynamicTagsRef.value.$el.querySelector('input');
      inputEl.maxLength = maxLength;
      emit('update:modelValue', value);
    };

    return {
      model: {
        value: props.modelValue,
      },
      dynamicTagsRef,
      onTagInput,
    };
  }
}
</script>

<style scoped>

</style>