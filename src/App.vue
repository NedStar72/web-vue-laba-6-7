<template>
  <div id="hello">
    <img src="./assets/plus.png" />
    <my-table :data="data" @update="dataUpdateHandler"/>
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
    if (localStorage.data) {
      this.data = JSON.parse(localStorage.data);
    }
  },
  methods:{
    dataUpdateHandler(){
      localStorage.data = JSON.stringify(this.data);
    }
  },
  components: {
    MyTable
  }
};
</script>
 
<style src="./styles/index.scss"lang="scss"></style>