<template>
  <input
    title="start year"
    id="start-year"
    type="number"
    v-model.number="startYear"
  />
  <select title="start month" id="start-month" v-model.number="startMonth">
    <option :value="0">Jan</option>
    <option :value="1">Feb</option>
    <option :value="2">Mar</option>
    <option :value="3">Apr</option>
    <option :value="4">May</option>
    <option :value="5">Jun</option>
    <option :value="6">Jul</option>
    <option :value="7">Aug</option>
    <option :value="8">Sep</option>
    <option :value="9">Oct</option>
    <option :value="10">Nov</option>
    <option :value="11">Dec</option>
  </select>
  <button @click="saveStart">save</button>
  <input
    title="end year"
    id="end-year"
    type="number"
    v-model.number="endYear"
  />
  <select title="end month" id="end-month" v-model.number="endMonth">
    <option :value="0">Jan</option>
    <option :value="1">Feb</option>
    <option :value="2">Mar</option>
    <option :value="3">Apr</option>
    <option :value="4">May</option>
    <option :value="5">Jun</option>
    <option :value="6">Jul</option>
    <option :value="7">Aug</option>
    <option :value="8">Sep</option>
    <option :value="9">Oct</option>
    <option :value="10">Nov</option>
    <option :value="11">Dec</option>
  </select>
  <button @click="saveEnd">save</button>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";
import { Month } from "../../store/types";
import { defineComponent } from "vue";
import FormContainer from "../Form/FormContainer.vue";

export default defineComponent({
  name: "SetStartAndEnd",
  components: { FormContainer },
  data(): {
    startYear: number;
    startMonth: Month;
    endYear: number;
    endMonth: Month;
  } {
    return {
      startYear: 0,
      startMonth: 0,
      endYear: 0,
      endMonth: 0,
    };
  },
  methods: {
    ...mapMutations(["setStart", "setEnd"]),
    saveStart() {
      //console.log({ year: typeof this.startYear, month: this.startMonth });
      this.setStart({ year: +this.startYear, month: this.startMonth });
    },
    saveEnd() {
      this.setEnd({ year: +this.endYear, month: +this.endMonth });
    },
  },
  computed: {
    ...mapGetters(["start", "end"]),
  },
  mounted() {
    this.startYear = this.start.year;
    this.startMonth = this.start.month;
    this.endYear = this.end.year;
    this.endMonth = this.end.month;
  },
});
</script>

<style scoped></style>
