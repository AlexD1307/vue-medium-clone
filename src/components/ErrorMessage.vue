<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      default: 'Something went wrong'
    }
  }
}
</script>
