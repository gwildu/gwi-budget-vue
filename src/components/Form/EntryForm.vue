<template>
  <FormContainer>
    <div class="flex">
      <InputItem>
        <input :id="ids.name" type="text" title="name" v-model="name" />
      </InputItem>
      <InputItem>
        <textarea
          title="description"
          :id="ids.description"
          v-model="description"
          rows="1"
        />
      </InputItem>
      <InputItem>
        <input
          title="amount"
          :id="ids.amount"
          type="number"
          v-model.number="amount"
        />
      </InputItem>
      <InputItem>
        <select
          title="execution type"
          :id="ids.executionType"
          v-model="executionType"
        >
          <option value="single">single</option>
          <option value="multiple">multiple</option>
        </select>
      </InputItem>
    </div>
    <div class="flex" v-if="executionType === 'single'">
      <InputItem>
        <select
          title="execution month"
          :id="ids.executionMonth"
          v-model.number="executionMonth"
        >
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
      </InputItem>
      <InputItem>
        <input
          title="execution year"
          :id="ids.executionYear"
          type="number"
          v-model.number="executionYear"
        />
      </InputItem>
    </div>
    <div class="flex" v-if="executionType === 'multiple'">
      <InputItem>
        <select
          title="execution interval"
          :id="ids.executionInterval"
          v-model.number="executionInterval"
        >
          <option :value="1">monthly</option>
          <option :value="2">2-monthly</option>
          <option :value="3">quarterly</option>
          <option :value="4">trimestrial</option>
          <option :value="6">semiannual</option>
          <option :value="12">annual</option>
        </select>
      </InputItem>
      <InputItem>
        <select
          title="first execution month"
          :id="ids.firstExecutionMonth"
          v-model.number="firstExecutionMonth"
        >
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
      </InputItem>
      <InputItem>
        <input
          title="first execution year"
          :id="ids.firstExecutionYear"
          type="number"
          v-model.number="firstExecutionYear"
        />
      </InputItem>
      <InputItem>
        <input
          title="has end date"
          :id="ids.hasEndDate"
          type="checkbox"
          value="hat ein Enddatum: "
          v-model="hasLastExecution"
        />
      </InputItem>
      <div class="flex" v-if="hasLastExecution">
        <InputItem>
          <select
            title="last execution month"
            :id="ids.lastExecutionMonth"
            v-model.number="lastExecutionMonth"
          >
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
        </InputItem>
        <InputItem>
          <input
            title="last execution year"
            :id="ids.lastExecutionYear"
            type="number"
            v-model.number="lastExecutionYear"
          />
        </InputItem>
      </div>
    </div>
    <button @click="saveEntry">save</button>
  </FormContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  Entry,
  ExecutionInterval,
  ExecutionType,
  IEntryMultiple,
  IEntrySingle,
  Month,
  TransactionType,
} from "../../store/types";
import { mapMutations } from "vuex";
import InputItem from "./InputItem.vue";
import FormContainer from "./FormContainer.vue";

type IdKeys =
  | "name"
  | "description"
  | "amount"
  | "executionType"
  | "executionMonth"
  | "executionYear"
  | "executionInterval"
  | "firstExecutionMonth"
  | "firstExecutionYear"
  | "hasEndDate"
  | "lastExecutionMonth"
  | "lastExecutionYear";
type Ids = { [key in IdKeys]: string };
const IDS: IdKeys[] = [
  "name",
  "description",
  "amount",
  "executionType",
  "executionMonth",
  "executionYear",
  "executionInterval",
  "firstExecutionMonth",
  "firstExecutionYear",
  "hasEndDate",
  "lastExecutionMonth",
  "lastExecutionYear",
];

const getUUIDEnhancedId = (humanReadablePart: string) =>
  `${humanReadablePart}-${self.crypto.randomUUID()}`;

const now = new Date();
interface IData {
  name: string;
  description: string;
  amount: number;
  executionType: ExecutionType;
  executionMonth: Month;
  executionYear: number;
  executionInterval: ExecutionInterval;
  firstExecutionYear: number;
  firstExecutionMonth: Month;
  hasLastExecution: boolean;
  lastExecutionYear: number;
  lastExecutionMonth: Month;
  ids: Ids;
}
const initiateOrReset = (entry?: Entry): Omit<IData, "ids"> => ({
  name: entry?.name || "name",
  description: entry?.description || "description",
  amount: entry?.amount || 0,
  executionType: entry?.executionType || "single",
  executionMonth:
    (entry as IEntrySingle)?.execution?.month || (now.getMonth() as Month),
  executionYear: (entry as IEntrySingle)?.execution?.year || now.getFullYear(),
  executionInterval: (entry as IEntryMultiple)?.executionInterval || 1,
  firstExecutionMonth:
    (entry as IEntryMultiple)?.firstExecution?.month ||
    (now.getMonth() as Month),
  firstExecutionYear:
    (entry as IEntryMultiple)?.firstExecution?.year || now.getFullYear(),
  hasLastExecution: false,
  lastExecutionMonth: (entry as IEntryMultiple)?.lastExecution?.month || 0,
  lastExecutionYear: (entry as IEntryMultiple)?.lastExecution?.year || 0,
});

export default defineComponent({
  name: "EntryForm",
  components: { FormContainer, InputItem },
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
  data(): IData {
    return {
      ...initiateOrReset(this.entry),
      ids: IDS.reduce<Ids>((ids, humanReadablePart) => {
        ids[humanReadablePart] = getUUIDEnhancedId(humanReadablePart);
        return ids;
      }, {} as Ids),
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
div {
  max-width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
@media screen and (max-width: 750px) {
  div {
    flex-direction: column;
  }
}
input {
  width: calc(100% - 8px);
}
</style>
