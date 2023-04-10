<template>
  <div class="listsContainer">
    <div class="list">
      <IncomeList />
    </div>
    <div class="list">
      <ExpensesList />
    </div>
  </div>
</template>

<script>
import IncomeList from "./IncomeList.vue";
import ExpensesList from "./ExpensesList.vue";

export default {
  name: "Lists",
  components: { ExpensesList, IncomeList },
};
</script>

<style scoped>
.listsContainer {
  margin: 16px;
}

@media screen and (min-width: 2500px) {
  .listsContainer {
    display: flex;
    justify-content: center;
    gap: 32px;
  }
  .list {
    width: 50%;
  }
}
</style>
