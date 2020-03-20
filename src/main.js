import Vue from 'vue';
import App from './App.vue';
import json from './data.json';

new Vue({
  el: '#app',
  data: {
    data: []
  },
  mounted() {
    new Promise((resolve, reject) => {
      if (localStorage.data) {
        resolve(JSON.parse(localStorage.data));
      } else {
        reject("Missing data.");
      }
    })
      .then(
        res => {
          this.data = res;
        },
        err => {
          console.log(err);
          this.data = json;
        }
      )
      .catch(err => console.log(err));
  },
  methods: {
    updateHandler(newValue, pName, id) {
      if (newValue)
        this.data[this.data.findIndex(obj => obj.id === id)][pName] = newValue;
      new Promise(resolve => {
        localStorage.data = JSON.stringify(this.data);
        resolve();
      }).then(() =>
        console.log(
          `[${new Date(Date.now())
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "")}]  Data synchronized.`
        )
      );
    },
    insertHandler(obj){
      obj.id = this.data[this.data.length - 1].id + 1,
      this.data.push(obj);
    }
  },
  components: { App },
  template: '<App :data="data" @update="updateHandler" @insert="insertHandler"/>'
})