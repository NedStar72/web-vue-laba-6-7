<template>
  <table>
    <tr v-for="d in data" :key="d.name">
      <td>{{ d.name }}</td>
    </tr>
  </table>
</template>
 
<script>
export default {
  name: "my-table",
  props: {
    header: {
      type: Object
    },
    data: {
      type: Array
    }
  }
};
</script>
 
<style lang="scss"></style>