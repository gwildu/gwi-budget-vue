<template>
  <div v-for="entry in entries"><Output :output="entry" /></div>
</template>

<script lang="ts">
import { Entry } from "../../store/types";
import Output from "../Form/Output.vue";
import { PropType } from "vue";

export default {
  name: "list",
  components: { Output },
  props: {
    entries: {
      type: Array as PropType<Entry[]>,
      required: true,
    },
  },
};
</script>

<style scoped></style>
