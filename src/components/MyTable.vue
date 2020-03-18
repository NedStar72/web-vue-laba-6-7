<template>
  <table>
    <tr v-for="(obj, i) in data" :key="i">
      <cell
        v-for="(property, name) in obj"
        :key="i + '_' + name"
        :val="property"
        :name="name"
        :row="i"
        @update="updateCellHandler"
      />
    </tr>
  </table>
</template>
 
<script>
import Cell from "./Cell";

export default {
  name: "my-table",
  props: {
    header: {
      type: Object
    },
    data: {
      type: Array
    }
  },
  methods: {
    updateCellHandler(value, name, row) {
      console.log(value, name, row);
      this.data[row][name] = value;
      this.$emit('update');
    }
  },
  components: {
    Cell
  }
};
</script>
 
<style lang="scss"></style>