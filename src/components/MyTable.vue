<template>
  <div class="table table-hover">
    <tr class="d-flex flex-row" v-for="(obj, i) in data" :key="i">
      <cell
        v-for="props in getList(obj)"
        :key="i + '_' + props.name"
        :id="obj.id"
        :name="props.name"
        :value="props.value"
        :editable="props.editable"
        :classCss="props.css"
        @update="updateCellHandler"
      />
    </tr>
  </div>
</template>
 
<script>
import Cell from "./Cell";

export default {
  name: "my-table",
  props: {
    header: {
      type: Array,
      required: false,
      default: []
    },
    data: {
      type: Array
    }
  },
  methods: {
    updateCellHandler(value, name, id) {
      this.data[this.data.findIndex(obj => obj.id === id)][name] = value;
      this.$emit("update");
    },
    getList(obj) {
      let arr = [];
      for (const [i, [key, value]] of Object.entries(Object.entries(obj))) {
        if (!this.header[i].invisible) {
          arr.push({
            name: key,
            value,
            editable: this.header[i].editable,
            css: this.header[i].css
          });
        }
      }
      return arr;
    }
  },
  components: {
    Cell
  }
};
</script>
 
<style lang="scss"></style>