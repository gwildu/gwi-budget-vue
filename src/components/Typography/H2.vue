<template>
  <h2><slot></slot></h2>
</template>

<script>
export default {
  name: "H2",
};
</script>

<style scoped>
h2 {
  font-size: 2em;
  margin-bottom: 1em;
  margin-top: 0.75em;
}
</style>
