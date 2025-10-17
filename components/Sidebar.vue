<template>
  <v-navigation-drawer
    app
    permanent
    :width="expanded ? 240 : 80"
    class="sidebar"
  >
    <v-list dense>
      <v-list-item @click="toggleSidebar" class="mb-2 sidebar__toggle">
        <v-list-item-icon>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="expanded">
          <v-list-item-title>Меню</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-2"></v-divider>

      <v-list-item
        v-for="item in navigationItems"
        :key="item.to"
        :to="item.to"
        router
        exact
        class="sidebar__item"
        :class="{ 'sidebar__item--active': isActive(item) }"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="expanded">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      navigationItems: [
        {
          title: 'Пользователи',
          icon: 'mdi-account-group',
          to: '/users'
        },
        {
          title: 'Партнеры',
          icon: 'mdi-handshake',
          to: '/partners'
        },
        {
          title: 'Сотрудники',
          icon: 'mdi-account-tie',
          to: '/employees'
        },
        {
          title: 'Напитки',
          icon: 'mdi-coffee',
          to: '/drinks'
        },
        {
          title: 'Кофемашины',
          icon: 'mdi-coffee-maker',
          to: '/machines'
        },
        {
          title: 'Заказы',
          icon: 'mdi-clipboard-list',
          to: '/orders'
        },
        {
          title: 'Аналитика',
          icon: 'mdi-chart-line',
          to: '/analytics'
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.expanded = !this.expanded
    },
    isActive(item) {
      return this.$route.path === item.to
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/sidebar';
</style>
