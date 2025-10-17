<template>
  <v-app>
    <Sidebar />
    <AppHeader
      :search-value="search"
      :selected-cities="selectedCities"
      :city-options="cityOptions"
      @update:search="updateSearch"
      @update:cities="updateCities"
    />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    Sidebar,
    AppHeader
  },
  data() {
    return {
      search: '',
      selectedCities: [],
      cityOptions: []
    }
  },
  methods: {
    updateSearch(value) {
      this.search = value
      this.$nuxt.$emit('search-changed', value)
    },
    updateCities(value) {
      this.selectedCities = value
      this.$nuxt.$emit('cities-changed', value)
    }
  },
  mounted() {
    this.$nuxt.$on('city-options-updated', (options) => {
      this.cityOptions = options
    })
  }
}
</script>

