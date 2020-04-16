<template>
  <td @dblclick="dblclickHandler" :class="cellStyle">
    <span v-if="!isEditing">{{ value }}</span>
    <input
      v-else
      ref="input"
      :class="inputStyle"
      :type="inputType"
      :value="value"
      :step="step"
      @blur="editingEndHandler"
      @keyup.enter="editingEndHandler"
    />
  </td>
</template>
 
<script>
export default {
  name: "cell",
  props: {
    propName: {
      type: [String, Array],
      required: true
    },
    value: [Number, String],
    step: {
      type: Number,
      required: false,
      default: 0.1
    },
    optionalData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isEditing: false
    };
  },
  computed: {
    editable() {
      if (typeof this.optionalData.editable == "undefined") return true;
      return this.optionalData && this.optionalData.editable;
    },
    cellStyle() {
      return this.optionalData && this.optionalData.cellStyle;
    },
    inputStyle() {
      return this.optionalData && this.optionalData.inputStyle;
    },
    inputType() {
      if (typeof this.value == "number") return "number";
      return "text";
    },
    step() {
      if (typeof this.value == "number") return 0.1;
    }
  },
  methods: {
    dblclickHandler(e) {
      this.isEditing = this.editable;
      if (this.isEditing)
        setTimeout(() => {
          this.$refs.input.focus();
        });
    },
    editingEndHandler(e) {
      this.isEditing = false;
      this.$emit(
        "update",
        this.propName,
        this.inputType == "number" ? parseInt(e.target.value) : e.target.value
      );
    }
  }
};
</script>
 
<style lang="scss"></style>
