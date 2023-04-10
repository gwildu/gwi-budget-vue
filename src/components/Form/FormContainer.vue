<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: "FormContainer",
};
</script>

<style scoped>
.container {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  max-width: 100%;
  background-color: lightblue;
}
@media screen and (max-width: 750px) {
  .container {
    flex-direction: column;
  }
}
</style>
