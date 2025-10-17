<template>
  <v-container class="mt-20">
    <v-skeleton-loader
        v-if="loading"
        type="card"
        v-for="i in 8"
        :key="i"
        class="mb-3"
    />

    <v-row v-else>
      <v-col cols="12" v-for="user in paginatedUsers" :key="user.id">
        <UserItem :user="user" />
      </v-col>
    </v-row>

    <v-pagination
        v-if="!loading && pages > 1"
        v-model="page"
        :length="pages"
        circle
        class="mt-4"
        color="primary"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        total-visible="7"
    ></v-pagination>
  </v-container>
</template>

<script>
import UserItem from '@/components/UserItem.vue'

export default {
  components: { UserItem },
  data() {
    return {
      users: [],
      loading: true,
      search: '',
      selectedCities: [],
      page: 1,
      perPage: 50,
    }
  },
  computed: {
    cityOptions() {
      const cities = this.users.map(u => u.city.title)
      return [...new Set(cities)].sort()
    },
    filteredUsers() {
      const term = this.search.toLowerCase()
      return this.users.filter(u => {
        const matchSearch =
            u.name.toLowerCase().includes(term) ||
            u.phone.toLowerCase().includes(term)
        const matchCity =
            this.selectedCities.length === 0 ||
            this.selectedCities.includes(u.city.title)
        return matchSearch && matchCity
      })
    },
    paginatedUsers() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredUsers.slice(start, end)
    },
    pages() {
      return Math.ceil(this.filteredUsers.length / this.perPage)
    },
  },

  async mounted() {
    window.addEventListener('keydown', this.handleArrowNavigation)

    this.$nuxt.$on('search-changed', (value) => {
      this.search = value
    })

    this.$nuxt.$on('cities-changed', (value) => {
      this.selectedCities = value
    })

    this.users = []
    let offset = 0

    const firstBatch = await this.$api.users.list({ offset, limit: 100 })
    this.users.push(...firstBatch)
    offset += 100

    while (offset < 8000) {
      const batch = await this.$api.users.list({ offset, limit: 500 })
      this.users.push(...batch)
      offset += 500
    }

    this.loading = false
  },

  watch: {
    search() {
      this.page = 1
    },
    selectedCities() {
      this.page = 1
    },
    filteredUsers() {
      if (this.pages === 0) {
        this.page = 1
        return
      }

      if (this.page > this.pages) {
        this.page = this.pages
      }
    },
    cityOptions: {
      handler(newOptions) {
        // Send city options to header
        this.$nuxt.$emit('city-options-updated', newOptions)
      },
      immediate: true
    }
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleArrowNavigation)
  },

  methods: {
    handleArrowNavigation(event) {
      if (this.loading || !this.pages) {
        return
      }

      const target = event.target
      const tag = target && target.tagName ? target.tagName.toLowerCase() : ''
      const isEditable = target && (target.isContentEditable || ['input', 'textarea', 'select'].includes(tag))

      if (isEditable) {
        return
      }

      if (event.key === 'ArrowLeft' && this.page > 1) {
        event.preventDefault()
        this.page -= 1
      }

      if (event.key === 'ArrowRight' && this.page < this.pages) {
        event.preventDefault()
        this.page += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 10rem;
}
</style>
