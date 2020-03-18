<template>
  <div id="hello">
    <img src="./assets/plus.png" />
    <my-table :data="data"/>
  </div>
</template>
 
<script>
import MyTable from "./components/MyTable";

export default {
  name: "app",
  data() {
    return {
      data: [{ name: "123" }, { name: "456" }]
    };
  },
  components: {
    MyTable
  }
};
</script>
 
<style src="./styles/index.scss"lang="scss"></style>