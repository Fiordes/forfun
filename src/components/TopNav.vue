<template>
  <nav class='navbar navbar-light'>
    <div class='container'>
      <router-link :to='{name: "home"}' class='navbar-brand'>
        Medium
      </router-link>

      <ul class='nav navbar-nav pull-xs-right'>
        <li class='nav-item'>
          <router-link class='nav-link' :to='{name: "home"}' active-class='active'>Home</router-link>
        </li>
        <template v-if='isLoggedIn'>
          <li class='nav-item'>
            <router-link class='nav-link' :to='{name: "home"}' active-class='active'>
              <i class='ion-compose'></i> &nbsp;
              New Article
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link class='nav-link' :to='{name: "home"}' active-class='active'>
              <i class='ion-gear-a'></i> &nbsp;
              Settings
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link class='nav-link' :to='{name: "userProfile", params: {slug: currentUser.username}}'>
              <img :src='currentUser.image' alt='' class='user-pic'> &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if='isAnonymous'>
          <li class='nav-item'>
            <router-link class='nav-link' :to='{name: "login"}' active-class='active'>Login</router-link>
          </li>
          <li class='nav-item'>
            <router-link class='nav-link' :to='{name: "register"}' active-class='active'>Sign Up</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'

export default {
  name: 'AppTopNav',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    }),
    // currentUser() {
    //   return this.$store.getters[getterTypes.currentUser]
    // }
  }
}
</script>

<style scoped>

</style>
