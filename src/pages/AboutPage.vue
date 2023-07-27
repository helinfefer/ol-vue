<template>
	<div v-html="content"></div>
</template>
  
<script>
  import axios from 'axios'
  import marked from 'marked'
  
  export default {
	data() {
	  return {
		content: ''
	  }
	},
	async mounted() {
	  const response = await axios.get(require('/assets/readme.md'))
	  this.content = marked(response.data)
	}
  }
</script>
  