<template>
  <td @dblclick="dblclickHandler" :class="cellStyle">
    <img v-if="increase && !isEditing" src="../assets/up-arrow.png" alt />
    <img v-if="nocrease && !isEditing" src="../assets/minus.png" alt />
    <img v-if="decrease && !isEditing" src="../assets/down-arrow.png" alt />
    <span v-if="!isEditing">{{ value }}</span>
    <input
      v-else
      ref="input"
      :class="inputStyle"
      :type="inputType"
      :value="value"
      :step="inputStep"
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
    optionalData: Object
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
    inputStep() {
      if (this.inputType == "number") return this.step;
    },
    increase() {
      return this.optionalData && this.optionalData.crease == 1;
    },
    nocrease() {
      return this.optionalData && this.optionalData.crease == 0;
    },
    decrease() {
      return this.optionalData && this.optionalData.crease == -1;
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
        this.inputType == "number" ? parseFloat(e.target.value) || 0 : e.target.value
      );
    }
  }
};
</script>
 
<style lang="scss"></style>
