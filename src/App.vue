<template>
  <div class="container">
    <h1 class="mt-3 mb-4">Демография России (2019)</h1>
    <my-table
      :data="data"
      :header="[
      {
        invisible: true
      },
      {
        name: 'Регион',
        stretchable: true,
        editable: true,
        css: 'col'
      },
      {
        name: 'Рождаемость',
        editable: true,
        css: 'col-2'
      },
      {
        name: 'Смертность',
        editable: true,
        css: 'col-2'
      }]"
      @update="dataUpdateHandler"
    />
  </div>
</template>
 
<script>
import MyTable from "./components/MyTable";

export default {
  name: "app",
  data() {
    return {
      data: []
    };
  },
  mounted() {
    let promise = new Promise((resolve, reject) => {
      if (localStorage.data) {
        resolve(JSON.parse(localStorage.data));
      } else {
        reject("Missing data.");
      }
    });
    promise
      .then(
        res => {
          this.data = res;
        },
        err => {
          console.log(err);
          this.data = [];
        }
      )
      .catch(err => console.log(err));
  },
  methods: {
    dataUpdateHandler() {
      let promise = new Promise(resolve => {
        localStorage.data = JSON.stringify(this.data);
        resolve();
      }).then(() => console.log(`[${Date.now()}]  Data synchronized.`));
    }
  },
  components: {
    MyTable
  }
};
</script>
 
<style src="./styles/index.scss"lang="scss"></style>