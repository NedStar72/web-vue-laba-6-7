<template>
  <table :class="tableStyle">
    <thead>
      <tr>
        <th
          v-for="col in header"
          :key="col.id"
          :class="col.style"
          @click="$emit('sort', col.id)"
        >{{ col.name }}</th>
      </tr>
    </thead>
    <tbody>
      <row
        v-for="row in rows"
        :id="row.id"
        :key="row.id"
        :cells="row.cells"
        @update="rowUpdateHandler"
      />
    </tbody>
  </table>
</template>
 
<script>
import Row from "./Row";

export default {
  name: "my-table",
  props: {
    tableStyle: String,
    header: Array,
    rows: Array
  },
  methods: {
    rowUpdateHandler(id, propName, newValue) {
      this.$emit("update", id, propName, newValue);
    }
  },
  components: {
    Row
  }
};
</script>
 
<style lang="scss"></style>
