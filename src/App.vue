<template>
  <div class="container">
    <h1 class="mt-3 mb-4">Демография России (2018)</h1>
    <my-table
      :data="processedData"
      :header="header"
      :sortDuration="sortDuration"
      :sortCol="sortCol"
      :filter="filter"
      @update="tableUpdateHandler"
      @sort="sortHandler"
    />
    <div>
      <button
        v-if="false"
        type="button"
        class="btn btn-success pl-5 pr-5"
        @click="addButtonClickHandler"
      >Добавить</button>
    </div>
  </div>
</template>
 
<script>
import MyTable from "./components/MyTable";

export default {
  name: "app",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      header: [
        {
          invisible: true
        },
        {
          name: "Регион",
          editable: true,
          sortable: true,
          css: "col"
        },
        {
          name: "Рождаемость",
          editable: true,
          sortable: true,
          css: "col-2"
        },
        {
          name: "Смертность",
          editable: true,
          sortable: true,
          css: "col-2"
        }
      ],
      filter: "",
      filterPropName: null,
      sortDuration: true,
      sortCol: 0
    };
  },
  methods: {
    tableUpdateHandler(newValue, pName, id) {
      this.$emit("update", newValue, pName, id);
    },
    addButtonClickHandler() {
      this.$emit("insert", {
        name: "Название региона",
        birthrate: 0,
        deathrate: 0
      });
    },
    sortHandler(col) {
      if (this.sortCol == col) this.sortDuration = !this.sortDuration;
      this.sortCol = col;
    },
    getFilteredData(data) {
      let arr = data.slice();
      if (this.filterPropName && this.filter) {
        arr = arr.filter(obj => obj[this.filterPropName].includes(this.filter));
      }
      return arr;
    },
    getSortedData(data) {
      if (data.length > 0) {
        const sortColName = Object.keys(data[0])[this.sortCol];
        if (this.sortDuration)
          data.sort((a, b) => {
            if (a[sortColName] > b[sortColName]) return 1;
            else if (a[sortColName] < b[sortColName]) return -1;
            return 0;
          });
        else
          data.sort((a, b) => {
            if (a[sortColName] > b[sortColName]) return -1;
            else if (a[sortColName] < b[sortColName]) return 1;
            return 0;
          });
      }
      return data;
    }
  },
  computed: {
    processedData() {
      return this.getSortedData(this.getFilteredData(this.data));
    }
  },
  components: {
    MyTable
  }
};
</script>
 
<style src="./styles/index.scss"lang="scss"></style>