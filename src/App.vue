<template>
  <div id="hello">
    <img src="./assets/plus.png" />
    <my-table :data="data" @update="dataUpdateHandler" />
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