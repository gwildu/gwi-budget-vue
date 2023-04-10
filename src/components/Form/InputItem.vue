<template>
  <div class="flex-container"><slot></slot></div>
</template>

<script>
export default {
  name: "InputItem",
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}
</style>
