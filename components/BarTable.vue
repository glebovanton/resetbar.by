<script setup lang="ts">
import { uId } from "~/helpers/common";

const tableId = uId();
const { title, tableHeaders, tableData, tableDescription } = defineProps({
  title: String,
  tableDescription: String,
  tableHeaders: Array,
  tableData: Object,
});

</script>

<template>
  <div class="">
    <h2 v-if="title">{{title}}</h2>
    <p v-if="tableDescription">{{tableDescription}}</p>
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th v-for="(content, index) in tableHeaders" :key="`table-header-${tableId}-${index}`">
            {{ content }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in tableData" :key="`table-${tableId}-${index}`">
          <template v-for="(value, key) in row" :key="`table-${tableId}-${index}-${key}`">
            <td v-if="value">
              {{ value }}
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ccc;
}

th, td {
  padding: 8px;
  text-align: left;
}

@media (max-width: 600px) {
  th,td {
    padding: 2px;
    font-weight: 100;
    font-size: 12px;
  }
}
</style>
