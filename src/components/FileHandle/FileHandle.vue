<template>
  <div class="container">
    <button @click="exportToFile">export to file</button>
    <label
      >import from file:
      <input id="import" type="file" @change="importFromFile"
    /></label>
  </div>
</template>

<script setup lang="ts">
import { LOCAL_STORAGE_KEY } from "../../store";

const downloadObjectAsJson = (
  exportObj: object,
  exportName: string,
  pretty?: boolean
) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    pretty ? JSON.stringify(exportObj, null, 2) : JSON.stringify(exportObj)
  )}`;
  const tempAnchor = document.createElement("a");
  tempAnchor.setAttribute("href", dataStr);
  tempAnchor.setAttribute("download", exportName + ".json");
  document.body.appendChild(tempAnchor); // required for firefox
  tempAnchor.click();
  tempAnchor.remove();
};
const exportToFile = () => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  console.log(raw);
  if (raw) {
    downloadObjectAsJson(JSON.parse(raw), "gwi-budget");
  }
};
const importFromFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (file) {
    const data = JSON.parse(await file.text());
    console.log(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    document.location = document.location;
  }
  // const reader = new FileReader();
  // reader.onload = (e: Event) => {
  //   const fileContent = reader.result as string;
  //   const data = JSON.parse(fileContent);
  //   console.log(data);
  //   //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  // };
  // const file = (e.target as HTMLInputElement)?.files?.[0];
  // if (file) {
  //   reader.readAsText(file);
  // }
};
</script>

<style scoped>
.container {
  margin: 0 20px;
}
</style>
