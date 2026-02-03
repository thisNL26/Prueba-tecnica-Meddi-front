<script setup lang="ts">
// 404 Page Not Found
const router = useRouter();
const goBack = () => {
  router.replace('/');
};
</script>

<template>
  <div>404 Page Not Found</div>
  <button @click="goBack">Go Back</button>
</template>
