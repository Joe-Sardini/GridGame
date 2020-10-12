<template>
  <button :class="type" v-on:click="onClick()" :id="'Square' + sid">
    {{ sid }}<slot />
  </button>
</template>

<script>

import { EventBus } from '@/event-bus.js';

export default {
  name: 'Square',
  props: {
    type: String,
    sid: Number,
  },
  methods: {
    onClick() {
      EventBus.$emit('addSquare', this.sid);
    }
  },
}
</script>

<style scoped>
.square {
  padding: 12px;
  border-style: solid;
  border-color: red;
  background-color: white;
  font-size: 20px;
  text-align: center;
  position: relative;
  transition-duration: 0.4s;
  float: left;
  width: 56.67px;
  opacity: 0.5;
}

.toggleState{
  padding: 12px;
  border-style: solid;
  border-color: red;
  font-size: 20px;
  background-color: royalblue;
  text-align: center;
  position: relative;
  transition-duration: 0.4s;
  float: left;
  width: 56.67px;
  opacity: 0.5;
}

.square2 {
  padding: 12px;
  border-style: solid;
  border-color: red;
  background-color: royalblue;
  font-size: 20px;
  text-align: center;
  position: relative;
  transition-duration: 0.4s;
  float: left;
  width: 56.67px;
  opacity: 0.1;
}

.square:hover {
  background-color: #4caf50; /* Green */
  color: white;
}

.square .square2 .toggleState {
  animation-duration: 3s;
  animation-name: bgChange;
}

@keyframes bgChange {
  from {
    background-color: royalblue;
  }

  to {
    background-color:yellow;
  }
}
</style>
