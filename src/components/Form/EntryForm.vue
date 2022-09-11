<template>
  <div class="container">
    <span>name: <input type="text" v-model="name" />&nbsp;</span>
    <span>description: <textarea v-model="description" />&nbsp; </span>
    <span
      >amount:
      <input type="number" v-model="amount" :style="{ width: '100px' }" />&nbsp;
    </span>
    <span
      ><select v-model="executionType">
        <option value="single">single</option>
        <option value="multiple">multiple</option></select
      >&nbsp;
    </span>
    <span v-if="executionType === 'single'">
      <span
        >executionMonth:
        <select v-model="executionMonth">
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
          <option :value="11">Dec</option></select
        >&nbsp;
      </span>
      <span
        >executionYear:
        <input
          type="number"
          v-model="executionYear"
          :style="{ width: '60px' }"
        />&nbsp;
      </span>
    </span>
  </div>
  <div class="container" v-if="executionType === 'multiple'">
    <span
      >executionInterval:
      <select v-model="executionInterval">
        <option :value="1">monatlich</option>
        <option :value="2">2-montlich</option>
        <option :value="3">viertel-jährlich</option>
        <option :value="4">drittel-jährlich</option>
        <option :value="6">halb-jährlich</option></select
      >&nbsp;
    </span>
    <span>
      firstExecutionMonth:
      <select v-model="firstExecutionMonth">
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
        <option :value="11">Dec</option></select
      >&nbsp;
    </span>
    <span
      >firstExecutionYear
      <input
        type="number"
        v-model="firstExecutionYear"
        :style="{ width: '60px' }"
      />
    </span>
    <span
      >&nbsp;<label for="hasLastExecutionYear">hat ein Enddatum: </label
      ><input
        type="checkbox"
        id="hasLastExecutionYear"
        value="hat ein Enddatum: "
        v-model="hasLastExecution"
    /></span>
    <span v-if="hasLastExecution">
      <span>
        lastExecutionMonth:
        <select v-model="lastExecutionMonth">
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
          <option :value="11">Dec</option></select
        >&nbsp;
      </span>
      <span
        >lastExecutionYear<input
          type="number"
          v-model="lastExecutionYear"
          :style="{ width: '60px' }"
        />
      </span>
    </span>
  </div>
  <button @click="saveEntry">save</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  Entry,
  IEntryMultiple,
  IEntrySingle,
  Month,
  TransactionType,
} from "../../store/types";
import { mapMutations } from "vuex";

const now = new Date();

export default defineComponent({
  name: "EntryForm",
  props: {
    transactionType: {
      type: String as PropType<TransactionType>,
      required: true,
    },
    entry: {
      type: Object as PropType<Entry>,
      required: false,
    },
  },
  data() {
    return {
      name: this.entry?.name || "name",
      description: this.entry?.description || "description",
      amount: this.entry?.amount || 0,
      executionType: this.entry?.executionType || "single",
      executionMonth:
        (this.entry as IEntrySingle)?.execution?.month || now.getMonth(),
      executionYear:
        (this.entry as IEntrySingle)?.execution?.year || now.getFullYear(),
      executionInterval: (this.entry as IEntryMultiple)?.executionInterval || 1,
      firstExecutionMonth:
        (this.entry as IEntryMultiple)?.firstExecution?.month || now.getMonth(),
      firstExecutionYear:
        (this.entry as IEntryMultiple)?.firstExecution?.year ||
        now.getFullYear(),
      hasLastExecution: false,
      lastExecutionMonth:
        (this.entry as IEntryMultiple)?.lastExecution?.month || 0,
      lastExecutionYear:
        (this.entry as IEntryMultiple)?.lastExecution?.year || 0,
    };
  },
  computed: {
    isUpdate() {
      return Boolean(this.entry);
    },
  },
  methods: {
    ...mapMutations([
      "addExpense",
      "addIncome",
      "updateIncome",
      "updateExpense",
    ]),
    saveEntry() {
      const baseProps = {
        id: this.isUpdate ? (this.entry as Entry).id : self.crypto.randomUUID(),
        name: this.name,
        description: this.description,
        amount: this.amount,
        transactionType: this.transactionType,
        executionType: this.executionType,
      };
      const specificProps = {
        executionType: this.executionType,
      };
      if (this.executionType === "single") {
        (specificProps as IEntrySingle).execution = {
          year: this.executionYear,
          month: this.executionMonth as Month,
        };
      } else {
        (specificProps as IEntryMultiple).executionInterval =
          this.executionInterval;
        (specificProps as IEntryMultiple).firstExecution = {
          year: this.firstExecutionYear,
          month: this.firstExecutionMonth as Month,
        };
        if (this.hasLastExecution) {
          (specificProps as IEntryMultiple).lastExecution = {
            year: this.lastExecutionYear,
            month: this.lastExecutionMonth as Month,
          };
        }
      }
      const entryToSave = { ...baseProps, ...specificProps };
      if (this.transactionType === "income") {
        if (this.isUpdate) {
          this.updateIncome(entryToSave);
        } else {
          this.addIncome(entryToSave);
        }
      } else {
        if (this.isUpdate) {
          this.updateExpense(entryToSave);
        } else {
          this.addExpense(entryToSave);
        }
      }
      this.$emit("save", entryToSave);
    },
  },
});
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
