<template>
  <table class="table table-striped table-borderless">
    <thead>
      <tr class="d-flex flex-row">
        <th
          v-for="(col, i) in header"
          v-if="!col.invisible"
          :key="i"
          :class="col.css"
          @click="$emit('sort', i)"
        >{{ col.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="d-flex flex-row" v-for="(obj, i) in data" :key="i">
        <cell
          v-for="props in objToList(obj)"
          :key="i + '_' + props.name"
          :id="obj.id"
          :name="props.name"
          :value="props.value"
          :editable="props.editable"
          :css="props.css"
          @update="cellUpdateHandler"
        />
      </tr>
    </tbody>
  </table>
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
    },
    filterPropName: {
      type: String,
      required: false,
      default: null
    },
    filter: {
      type: String,
      required: false,
      default: ""
    },
    sortDuration: {
      type: Boolean,
      required: false,
      default: true
    },
    sortCol: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    cellUpdateHandler(value, name, id) {
      this.$emit("update", value, name, id);
    },
    objToList(obj) {
      let arr = [];
      // Добавить фильтр
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