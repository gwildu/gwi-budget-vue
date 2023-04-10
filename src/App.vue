<template>
  <Heading />
  <Killer />
  <Controller />
  <Lists />
  <ExpensesByMonth />
  <FileHandle />
  <div :style="{ margin: '0 20px' }">
    <button @click="load">export</button>&nbsp;<button @click="save">
      import
    </button>
    <button @click="exportToFile">export to file</button>
    <label
      >import from file:
      <input id="import" type="file" @change="importFromFile"
    /></label>
  </div>
  <textarea
    :style="{
      width: 'calc(100% - 40px)',
      margin: '0 auto 20px',
      display: 'block',
    }"
    rows="20"
    v-model="storeData"
  />
</template>

<script>
import Heading from "./components/Heading.vue";
import Controller from "./components/Graph/Controller.vue";
import Lists from "./components/List/Lists.vue";
import Killer from "./components/Killer/Killer.vue";
import { LOCAL_STORAGE_KEY } from "./store/index.js";
import ExpensesByMonth from "./components/ExpensesByMonth.vue";
import FileHandle from "./components/FileHandle/FileHandle.vue";
export default {
  components: {
    FileHandle,
    ExpensesByMonth,
    Lists,
    Controller,
    Heading,
    Killer,
  },
  data() {
    return {
      storeData: localStorage.getItem(LOCAL_STORAGE_KEY),
    };
  },
  methods: {
    downloadObjectAsJson(exportObj, exportName, pretty) {
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
        pretty ? JSON.stringify(exportObj, null, 2) : JSON.stringify(exportObj)
      )}`;
      var downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    save() {
      localStorage.setItem(LOCAL_STORAGE_KEY, this.storeData);
    },
    load() {
      this.storeData = localStorage.getItem(LOCAL_STORAGE_KEY);
    },
    exportToFile() {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log(raw);
      this.downloadObjectAsJson(JSON.parse(raw), "gwi-budget");
    },
    importFromFile(e) {
      const reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(e.target.files[0]);
    },
    onReaderLoad(e) {
      const data = JSON.parse(e.target.result);
      console.log(data);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    },
  },
};
</script>

<style scoped></style>
