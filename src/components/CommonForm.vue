<template>
    <el-form ref="form" label-width="100px" :model="internalForm" :inline="inline">
      <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <el-input v-if="item.type === 'input'" :placeholder="'請輸入' + item.label" v-model="internalForm[item.model]"></el-input>
        <el-switch v-if="item.type === 'switch'" v-model="internalForm[item.model]"></el-switch>
        <el-date-picker v-if="item.type === 'date'" type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="internalForm[item.model]"></el-date-picker>
        <el-select v-if="item.type === 'select'" placeholder="請選擇" v-model="internalForm[item.model]">
          <el-option v-for="(opt, index) in item.opts" :key="index" :label="opt.label" :value="opt.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    name: 'CommonForm',
    props: {
      formLabel: Array,
      form: Object,
      inline: Boolean
    },
    data() {
      return {
        internalForm: {}
      };
    },
    watch: {
      form: {
        handler(newForm) {
          this.internalForm = { ...newForm };
        },
        immediate: true
      }
    }
  };
  </script>  