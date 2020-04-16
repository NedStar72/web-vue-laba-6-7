<template>
  <tr>
    <cell
      v-for="(cell, i) in cells"
      :key="i"
      :propName="cell.propName"
      :value="cell.value"
      :optionalData="cell.optionalData"
      @update="cellUpdateHandler"
    />
  </tr>
</template>
 
<script>
import Cell from "./Cell";

export default {
  name: "row",
  props: {
    id: {
      type: Number,
      required: true
    },
    cells: Array
  },
  methods: {
    cellUpdateHandler(propName, newValue) {
      this.$emit("update", this.id, propName, newValue);
    }
  },
  components: {
    Cell
  }
};
</script>
 
<style lang="scss"></style>
