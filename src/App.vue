<template>
  <app-top-nav />
  <router-view />
</template>
<script>
import AppTopNav from './components/TopNav'
import {actionTypes} from '@/store/modules/auth'


export default {
  components: {AppTopNav},
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
