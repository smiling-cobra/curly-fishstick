<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <!-- Title -->
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="mt-1 block w-full p-2 border rounded-md"
        required
      />
    </div>

    <!-- Author Dropdown -->
    <div>
      <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
      <select
        id="author"
        v-model="formData.author"
        class="mt-1 block w-full p-2 border rounded-md"
      >
        <option value="">Select an author</option>
        <option v-for="author in authors" :key="author.id" :value="author.name">
          {{ author.name }}
        </option>
      </select>
    </div>

    <!-- Rich Text Editor -->
    <div>
      <label for="body" class="block text-sm font-medium text-gray-700">Body</label>
      <QuillEditor v-model="formData.body" theme="snow" class="mt-2 border rounded-md" />
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// Props
const props = defineProps({
  modelValue: Object, // Reactive object for form data
  authors: Array,     // List of authors
});

// Emits
const emit = defineEmits(["update:modelValue", "submit"]);

// Reactive form data
const formData = ref({ title: "", author: "", body: "" });

// Watch for changes in the modelValue (for edit mode)
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = { ...newValue };
  },
  { deep: true, immediate: true }
);

// Handle form submission
const submitForm = () => {
  emit("update:modelValue", formData.value);
  emit("submit");
};
</script>
