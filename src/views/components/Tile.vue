<template>
  <router-link
    class="tile-medium"
    :to="$route.path + file.filename"
  >
    <span class="branding-bar">{{ file.name }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: function(){
      	return {name: 'miss'}
      },
      required: true
    },
  }
}
</script>