<template>
    <div id="app" class="centered-container md-content">
      <calendar-view
        :show-date="showDate"
        @show-date-change="setShowDate"
        class="holiday-us-traditional holiday-us-official">
      </calendar-view>
  </div>

</template>
<script>
  import endereco from '../forms-endereco/FormEndereco'
 	import CalendarView from "vue-simple-calendar"
	require("vue-simple-calendar/dist/static/css/default.css")
	require("vue-simple-calendar/dist/static/css/holidays-us.css")

	export default {
		name: 'app',
		data: function() {
			return { showDate: new Date() }
		},
		components: {
      CalendarView,
      endereco
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
		}
	}
</script>
<style lang="scss" scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 60vh;
		width: 75vw;
		margin-left: auto;
		margin-right: auto;
    padding: auto;
	}
  .centered-container {
  display: flex;
  align-items: left;
  justify-content: center;
  position: relative;
  height: 170vh;
  padding: auto;

  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      width: 10em;
    }
  }
  .form {
    margin-bottom: 6%;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 100%;
    position: absolute;
  }
}
</style>
