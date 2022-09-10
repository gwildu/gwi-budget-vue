<template>
  <div>{{ count }}</div>
  <button @click="increment">increase</button>
  <button @click="decrease">decrease</button>
</template>

<script>
export default {
  name: "StoreOutput",
  data() {
    return {};
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrease() {
      this.$store.commit("decrement");
    },
  },
};
</script>

<style scoped></style>
