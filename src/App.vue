<template>
  <div>
    <TopBar/>
    <router-view></router-view>
  </div>
</template>

<script>

import TopBar from '@/components/TopBar'
import {actionTypes} from '@/store/modules/auth'

export default {
  components: {TopBar},
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
