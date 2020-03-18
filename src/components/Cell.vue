<template>
  <td @dblclick="dblclickHandler">
    <span v-if="!isEdit">{{ val }}</span>
    <input
      ref="input"
      v-if="isEdit"
      :type="type"
      :value="val"
      @blur="afterEditHandler"
      @keyup.enter="afterEditHandler"
    />
  </td>
</template>
 
<script>
export default {
  name: "cell",
  props: {
    val: "",
    row: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      type: ""
    };
  },
  methods: {
    dblclickHandler(e) {
      this.isEdit = true;
      setTimeout(() => {
        this.$refs.input.focus();
      });
    },
    afterEditHandler(e) {
      this.isEdit = false;
      this.$emit("update", e.target.value, this.name, this.row);
    }
  },
  created() {
    switch (typeof this.val) {
      case "string":
        this.type = "text";
        break;
      case "number":
        this.type = "number";
        break;
    }
  }
};
</script>
 
<style lang="scss"></style>