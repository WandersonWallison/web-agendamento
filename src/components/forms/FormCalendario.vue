<template>
  <div class="hello">
    <h2>Vue2 Simple Calendar</h2>
    <vue-calendar
      :show-limit="3"
      @show-all="showAll"
      @event-clicked="eventClicked"
      @month-changed="monthChanged"
  ></vue-calendar>
  </div>
</template>

<script>
import vueCalendar from 'vue2-simple-calendar'
import './../../assets/vue2-simple-calendar.css'


export default {
  name: "FormCalendario",
  data() {
    return {
      data: []
    };
  },
  methods: {
    showAll(events) {
      // Do something...
    },
    dayClicked(day) {
      console.log(day);
      // Do something...
    },
    eventClicked(event) {
      // Do something...
    },
    monthChanged(start, end) {
      // Do something...
    }
  },
  created() {
    this.$calendar.eventBus.$on("show-all", events => this.showAll(events));
    this.$calendar.eventBus.$on("day-clicked", day => this.dayClicked(day));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
