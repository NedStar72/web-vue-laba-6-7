<template>
  <td @dblclick="dblclickHandler" :class="classCss">
    <span v-if="!isEdit">{{ value }}</span>
    <input
      class="form-control d-inline-block mw-100 w-auto"
      ref="input"
      v-if="isEdit"
      :type="type"
      :value="value"
      @blur="afterEditHandler"
      @keyup.enter="afterEditHandler"
    />
  </td>
</template>
 
<script>
export default {
  name: "cell",
  props: {
    value: "",
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    classCss: {
      type: String,
      required: false,
      default: null
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
      this.isEdit = this.editable;
      if (this.isEdit)
        setTimeout(() => {
          this.$refs.input.focus();
        });
    },
    afterEditHandler(e) {
      this.isEdit = false;
      this.$emit(
        "update",
        this.type == "number" ? parseInt(e.target.value) : e.target.value,
        this.name,
        this.id
      );
    }
  },
  created() {
    switch (typeof this.value) {
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