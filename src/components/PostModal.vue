<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
  
        <div class="p-6">
          <slot></slot> <!-- Slot for dynamic content (form, text, etc.) -->
        </div>
  
        <div class="flex justify-end p-4 border-t">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded-md mr-2">Close</button>
          <button @click="$emit('save')" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String, // Modal title (e.g., "Edit Blog Entry" or "Create Blog Entry")
  });
  defineEmits(["close", "save"]);
  </script>
  