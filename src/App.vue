<template>
  <div class="container">
    <h1 class="mt-3 mb-4">Демография России</h1>
    <div>
      <input type="text" v-model="filter" class="form-control d-inline-block mw-100 w-auto mr-3" />
    </div>
    <my-table
      tableStyle="table table-striped table-borderless table-sorted"
      :header="header"
      :rows="rows"
      @update="dataUpdateHandler"
      @sort="sortHandler"
    />
    <div class="mb-3">
      <button
        v-if="true"
        type="button"
        class="btn btn-success pl-5 pr-5"
        @click="addButtonClickHandler"
      >Добавить элем.</button>
    </div>
    <div>
      <input type="number" ref="year" class="form-control d-inline-block mw-100 w-auto mr-3" />
      <button
        v-if="true"
        type="button"
        class="btn btn-success pl-5 pr-5"
        @click="addYearHandler"
      >Добавить год</button>
    </div>
  </div>
</template>
 
<script>
import jsonHeader from "./header.json";
import jsonData from "./data.json";
import MyTable from "./components/MyTable";

export default {
  name: "app",
  data() {
    return {
      my_data: {},
      my_header: [],
      sortCol: 0,
      sortDuration: true,
      filter: "",
      filterPropName: "name"
    };
  },
  computed: {
    header() {
      return (
        this.my_header &&
        this.my_header.map((col, i) => {
          let style = col.headerStyle;
          if (i == this.sortCol) {
            style += " sorting__" + (this.sortDuration ? "ASC" : "DESC");
          }
          return {
            id: i,
            name: col.name,
            style: style
          };
        })
      );
    },
    rows() {
      return this.sortData(
        this.injectCrease(
          this.filterData(
            this.representData(this.my_data.data, this.my_header),
            this.filter,
            this.filterPropName
          )
        ),
        this.sortCol
      );
    }
  },
  methods: {
    dataUpdateHandler(id, propName, newValue) {
      let obj = this.my_data.data.find(obj => obj.id == id);
      if (typeof propName == "string") {
        if (typeof obj[propName] == "undefined")
          this.$set(obj, propName, newValue);
        else obj[propName] = newValue;
      } else {
        let [lastPropName, ...otherProps] = [...propName].reverse();
        otherProps.reverse();
        otherProps.forEach(prop => {
          if (typeof obj[prop] == "undefined") this.$set(obj, prop, {});
          obj = obj[prop];
        });
        if (typeof obj[lastPropName] == "undefined")
          this.$set(obj, lastPropName, newValue);
        else obj[lastPropName] = newValue;
      }
      this.syncData(this.my_data);
    },
    sortHandler(col) {
      if (this.sortCol == col) this.sortDuration = !this.sortDuration;
      this.sortCol = col;
    },
    representData(data, header) {
      return (
        data &&
        data.map(obj => {
          let row = {
            id: obj.id,
            cells: []
          };

          row.cells = header.map(col => {
            let cell = {
              propName: col.propName,
              value: undefined,
              optionalData: { ...col.optionalData }
            };

            if (typeof cell.propName == "string") {
              cell.value = obj[cell.propName];
            } else {
              let value = obj;
              cell.propName.forEach(propName => {
                value = value && value[propName];
              });
              cell.value = value;
            }

            if (typeof cell.value == "undefined") {
              cell.value = col.defaultValue;
            }

            return cell;
          });
          return row;
        })
      );
    },
    filterData(data, filter, filterPropName) {
      if (filter && filterPropName) {
        data = data.filter(row =>
          row.cells
            .find(cell => cell.propName.toString().includes(filterPropName))
            .value.toString()
            .includes(filter)
        );
      }
      return data;
    },
    sortData(data, col) {
      return (
        data &&
        data.sort((a, b) => {
          if (a.cells[col].value < b.cells[col].value)
            return this.sortDuration ? -1 : 1;
          else return this.sortDuration ? 1 : -1;
        })
      );
    },
    injectCrease(data) {
      data &&
        data.forEach(row => {
          for (let index = 3; index < row.cells.length; index++) {
            if (row.cells[index].value > row.cells[index - 2].value) {
              row.cells[index].optionalData.crease = 1;
            } else if (row.cells[index].value < row.cells[index - 2].value) {
              row.cells[index].optionalData.crease = -1;
            } else {
              row.cells[index].optionalData.crease = 0;
            }
          }
        });
      return data;
    },
    addButtonClickHandler() {
      this.my_data.data.push({
        id: this.my_data.count++
      });
    },
    addYearHandler() {
      let year = this.$refs.year.value.toString();
      this.my_header.push(
        {
          name: year + " (рождаемость)",
          propName: ["years", year, "birthRate"],
          defaultValue: 0,
          headerStyle: "position-relative sorting",
          optionalData: {
            editable: true,
            cellStyle: "",
            inputStyle: "form-control d-inline-block mw-100 w-auto"
          }
        },
        {
          name: year + " (смертность)",
          propName: ["years", year, "deathRate"],
          defaultValue: 0,
          headerStyle: "position-relative sorting",
          optionalData: {
            editable: true,
            cellStyle: "",
            inputStyle: "form-control d-inline-block mw-100 w-auto"
          }
        }
      );
      this.my_header.sort((a, b) => {
        if (a.name == "Регион") return -1;
        else if (b.name == "Регион") return 1;
        if (a.name < b.name) return -1;
        else return 1;
      });
      this.syncHeader(this.my_header);
    },
    syncData(newData) {
      localStorage.data = JSON.stringify(newData);
    },
    syncHeader(newHeader) {
      localStorage.header = JSON.stringify(newHeader);
    }
  },
  mounted() {
    // Try to get header from localStorage
    if (localStorage.header) {
      this.my_header = JSON.parse(localStorage.header);
    } else {
      this.my_header = jsonHeader;
    }

    //Try to get data from localStorage
    if (localStorage.data) {
      this.my_data = JSON.parse(localStorage.data);
    } else {
      this.my_data = jsonData;
    }
  },
  components: {
    MyTable
  }
};
</script>
 
<style src="./styles/index.scss" lang="scss"></style>
