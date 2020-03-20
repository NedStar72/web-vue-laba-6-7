<template>
  <td @dblclick="dblclickHandler" :class="css">
    <span v-if="!isEditing">{{ value }}</span>
    <input
      class="form-control d-inline-block mw-100 w-auto"
      ref="input"
      v-if="isEditing"
      :type="inputType"
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
    css: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      isEditing: false,
      inputType: ""
    };
  },
  methods: {
    dblclickHandler(e) {
      this.isEditing = this.editable;
      if (this.isEditing)
        setTimeout(() => {
          this.$refs.input.focus();
        });
    },
    afterEditHandler(e) {
      this.isEditing = false;
      this.$emit(
        "update",
        this.inputType == "number" ? parseInt(e.target.value) : e.target.value,
        this.name,
        this.id
      );
    }
  },
  created() {
    switch (typeof this.value) {
      case "string":
        this.inputType = "text";
        break;
      case "number":
        this.inputType = "number";
        break;
    }
  }
};
</script>
 
<style lang="scss"></style>