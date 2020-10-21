<template>
  <div>
    <div class="gameHeader">
      Guess the Squares
    </div>
    <div class="playerInfo">
      <span class="playerStat" v-b-tooltip.hover title="Your cash">
        {{ this.Player_1.Cash | money }}
      </span>
      <span class="playerStat" v-b-tooltip.hover title="Remaining number of squares you may select">
        {{ this.Player_1.Selections }}
      </span>
      <span class="playerStat" v-b-tooltip.hover title="Total Winnings (this run)">
        {{ this.Player_1.TotalWinnings | money}}
      </span>
    </div>
    <div class="title">
      <b-button variant="outline-primary" v-on:click="onStart()" v-b-tooltip.hover title="Pressing start cost $500">Start Game</b-button>
      <b-button variant="outline-primary" v-on:click="onPause()">Pause Game</b-button>
      ||
      <b-button variant="outline-primary" v-on:click="InitializeGrid()">Initialize Grid</b-button>
      ||
      <b-button variant="outline-primary" v-on:click="onReset()">Reset Player Stats</b-button>
      <span class="completedRuns">
        Runs:{{ this.Player_1.RunsCompleted }}
      </span>
      <div class="main">
        <div ref="container"></div>
      </div>
    </div>
    <b-modal id="endScreen">The round is over, you've won {{ this.winnings | money }}</b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Square from '@/components/Square'
import { EventBus } from '@/event-bus.js';
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Square,
  },
  watch: {
    addedSquare: function () {
      this.$store.dispatch('addSquare', this.addedSquare)
    }
  },
  filters: {
    money: function(value) {
      if (parseInt(value) === 0) return 0;
      if (!value) return;
      return `$${value.toFixed(0)}`
    }
  },
  computed: {
    ...mapState(["Player_1"])
  },
  mounted() {
    this.createGrid();
  },
  data() {
    return {
      Board: [],
      addedSquare: 0,
      winnings: 0,
    }
  },
  created() {
    this.BOARD_SIZE = 251
    this.BOARD = [];
    EventBus.$on('addSquare', (squareId) => {
      if (this.Player_1.Selections > 0){
        this.addedSquare = squareId;
        this.withdrawFunds(this.calculateCost());
        this.$store.dispatch('decrementSelection');
        this.selectButton(squareId);
      }
    });
    this.si = null;
  },
  methods: {
    addFunds(amount){
      this.$store.dispatch('addFunds', amount);
    },
    withdrawFunds(amount) {
      this.$store.dispatch('withdrawFunds');
    },
    calculateCost() {
      const cost = 100 + Math.round(2*(this.BOARD.length/3));
      return cost;
    },
    selectButton(id) {
      let square = this.$refs.container.children[id];
      square.className = "square2";
    },
    animate() {
      this.si = setInterval(() => {
        (this.BOARD.length === 247) ? this.endAnimation() : 
        this.selectSquare(this.randomSquare());
      },25);
    },
    ...mapActions({
      addSquare: 'addSquare',
      resetPlayer: 'resetPlayer',
      decrementSelection: 'decrementSelection',
      withdrawFunds: 'withdrawFunds',
      addFunds: 'addFunds',
      resetSelections: 'resetSelections',
      IncrementRunsCounter: 'IncrementRunsCounter'
    }),
    createGrid() {
      for (let x = 0; x <= this.BOARD_SIZE; x++) {
        let ComponentClass = Vue.extend(Square)
        let instance = new ComponentClass({
          propsData: { type: 'square', sid: x }
        })
        instance.$mount() // pass nothing
        this.$refs.container.appendChild(instance.$el)
      }
    },
    onPause() {
      clearInterval(this.si);
    },
    InitializeGrid() {
      this.$store.dispatch('resetSelections');
      window.location.reload(true);
    },
    onReset() {
      this.$store.dispatch('resetPlayer');
    },
    onStart() {
      this.withdrawFunds(500);
      this.animate();
    },
    endAnimation(){
      clearInterval(this.si);
      this.$store.dispatch('IncrementRunsCounter');
      this.checkForMatches();
      this.$bvModal.show('endScreen');
    },
    checkForMatches(){
      let vm = this;
      this.Player_1.Player_1_Selected_Squares.forEach(e => {
        if (!vm.BOARD.includes(e)){
          vm.winnings += 500;
        }
      });
      this.addFunds(this.winnings); 
    },
    selectSquare(squareID) {
      let square = this.$refs.container.children[squareID];
      square.className = "toggleState";
    },
    randomSquare() {
      if (this.BOARD.length === 251) { return }
      let rnd = Math.floor(Math.random() * Math.floor(this.BOARD_SIZE));
      while (this.BOARD.includes(rnd)){
        rnd = Math.floor(Math.random() * Math.floor(this.BOARD_SIZE));
      }
      this.BOARD.push(rnd);
      return rnd;
    }
  },
}
</script>

<style scoped>
.main {
  background-image: url('https://source.unsplash.com/random/1200x705');
  width: 1200px;
  height: 705px;
  border: thick;
  border-color: black;
  border-style: solid;
}
.title {
  text-align: left;
  font-size: 35px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
}
.playerInfo {
  font-size: 35px;
  font-family: cursive;
}
.playerStat {
  width: 30%;
  display: inline-block; 
  border: tomato;
  border-style: solid;
}
.completedRuns{
float: right;
}
.gameHeader{
  font-family: fantasy;
  font-size: 45px;
  color: cornflowerblue;
}
</style>
