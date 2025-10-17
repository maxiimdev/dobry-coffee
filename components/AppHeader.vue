<template>
  <v-app-bar
      app
      flat
      color="transparent"
      class="app-header"
      height="auto"
  >
    <v-container fluid class="pa-0">
      <div class="app-header__main">
        <div class="app-header__identity">
          <v-avatar :size="isMobile ? 36 : 40" class="app-header__icon">
            <v-icon>{{ pageMeta.icon }}</v-icon>
          </v-avatar>
          <div class="app-header__text">
            <div class="app-header__title">{{ pageMeta.title }}</div>
            <div v-if="pageMeta.subtitle && !isMobile" class="app-header__subtitle">
              {{ pageMeta.subtitle }}
            </div>
          </div>
        </div>

        <div class="app-header__right">
          <v-chip
              v-if="isUsersPage && selectedCities.length && !isMobile"
              small
              outlined
              class="app-header__chip"
          >
            <v-icon left small>mdi-map-marker</v-icon>
            {{ filterSummary }}
          </v-chip>

          <v-btn icon @click="toggleTheme" class="app-header__theme-btn">
            <v-icon>{{ themeIcon }}</v-icon>
          </v-btn>
        </div>
      </div>

      <div v-if="isUsersPage" class="app-header__filters">
        <div class="app-header__search">
          <v-text-field
              :value="searchValue"
              @input="$emit('update:search', $event)"
              :placeholder="isMobile ? 'Поиск...' : 'Поиск по имени или телефону'"
              prepend-inner-icon="mdi-magnify"
              outlined
              dense
              hide-details
              class="app-header__input"
          />
        </div>

        <div class="app-header__city-filter">
          <v-select
              :value="selectedCities"
              @input="$emit('update:cities', $event)"
              :items="cityOptions"
              :placeholder="isMobile ? 'Города' : 'Фильтр по городам'"
              outlined
              dense
              multiple
              clearable
              hide-details
              class="app-header__input"
              chips
              small-chips
              deletable-chips
              :menu-props="{ maxHeight: 300, offsetY: true }"
          >
            <template v-slot:prepend-inner>
              <v-icon small>mdi-map-marker</v-icon>
            </template>
            <template v-slot:selection="{ item, index }">
              <v-chip
                  v-if="index < (isMobile ? 1 : 2)"
                  x-small
                  close
                  @click:close="removeCity(item)"
                  class="app-header__selected-chip"
              >
                {{ item }}
              </v-chip>
              <span
                  v-else-if="index === (isMobile ? 1 : 2)"
                  class="grey--text text-caption ml-1"
              >
                +{{ selectedCities.length - (isMobile ? 1 : 2) }}
              </span>
            </template>
          </v-select>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    searchValue: {
      type: String,
      default: ''
    },
    selectedCities: {
      type: Array,
      default: () => []
    },
    cityOptions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isUsersPage() {
      return this.$route.path === '/users'
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    pageMeta() {
      const meta = {
        '/': {
          title: 'Главная',
          subtitle: 'Добро пожаловать в рабочее пространство',
          icon: 'mdi-home-variant-outline'
        },
        '/users': {
          title: 'Пользователи',
          subtitle: 'Управляйте клиентской базой и фильтрами',
          icon: 'mdi-account-group-outline'
        },
        '/partners': {
          title: 'Партнеры',
          subtitle: 'Взаимодействие с ключевыми партнёрами',
          icon: 'mdi-handshake-outline'
        },
        '/employees': {
          title: 'Сотрудники',
          subtitle: 'Команда, роли и доступы',
          icon: 'mdi-account-tie-outline'
        },
        '/drinks': {
          title: 'Напитки',
          subtitle: 'Ассортимент и карточки напитков',
          icon: 'mdi-coffee-outline'
        },
        '/machines': {
          title: 'Кофемашины',
          subtitle: 'Оборудование и их статусы',
          icon: 'mdi-coffee-maker-outline'
        },
        '/orders': {
          title: 'Заказы',
          subtitle: 'Активные и завершённые операции',
          icon: 'mdi-clipboard-list-outline'
        },
        '/analytics': {
          title: 'Аналитика',
          subtitle: 'Метрики для принятия решений',
          icon: 'mdi-chart-timeline-variant'
        }
      }

      return meta[this.$route.path] || {
        title: 'Страница',
        subtitle: 'Рабочее пространство',
        icon: 'mdi-monitor-dashboard'
      }
    },
    themeIcon() {
      return this.$vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
    },
    filterSummary() {
      const count = this.selectedCities.length
      if (!count) return ''

      if (count === 1) return this.selectedCities[0]

      const mod10 = count % 10
      const mod100 = count % 100

      if (mod10 === 1 && mod100 !== 11) {
        return `${count} город`
      }
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return `${count} города`
      }
      return `${count} городов`
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    removeCity(cityToRemove) {
      const updatedCities = this.selectedCities.filter(city => city !== cityToRemove)
      this.$emit('update:cities', updatedCities)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/app-header';
</style>