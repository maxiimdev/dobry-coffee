<template>
  <v-card class="user-card" elevation="3">
    <div class="user-card__overlay"></div>

    <div class="user-card__header">
      <div class="user-card__identity">
        <v-avatar size="56" class="user-card__avatar" :class="{ 'user-card__avatar--blocked': user.isBlocked }">
          <span>{{ initials }}</span>
        </v-avatar>
        <div>
          <div class="user-card__name">
            {{ user.name }}
          </div>
          <div class="user-card__contact">
            <v-icon x-small class="mr-1">mdi-cellphone</v-icon>
            {{ user.phone }}
          </div>
        </div>
      </div>

      <div class="user-card__status">
        <v-chip
          v-if="user.isBlocked"
          small
          outlined
          color="error"
          class="user-card__status-chip"
        >
          <v-icon left x-small>mdi-account-cancel</v-icon>
          Заблокирован
        </v-chip>
        <v-chip
          v-else
          small
          outlined
          color="primary"
          class="user-card__status-chip"
        >
          <v-icon left x-small>mdi-account-star</v-icon>
          Активен
        </v-chip>
      </div>
    </div>

    <v-divider class="user-card__divider"></v-divider>

    <div class="user-card__metrics">
      <div class="user-card__metric">
        <span class="user-card__metric-label">Баланс</span>
        <span class="user-card__metric-value">{{ formatCurrency(user.balance) }}</span>
      </div>
      <div class="user-card__metric">
        <span class="user-card__metric-label">Накоплено</span>
        <span class="user-card__metric-value user-card__metric-value--positive">
          {{ formatCurrency(user.saveTotal) }}
        </span>
      </div>
      <div class="user-card__metric">
        <span class="user-card__metric-label">Потрачено</span>
        <span class="user-card__metric-value user-card__metric-value--muted">
          {{ formatCurrency(user.spendTotal) }}
        </span>
      </div>
    </div>

    <div class="user-card__footer">
      <div class="user-card__location" @click="navigateToCity">
        <v-icon small class="mr-1">mdi-map-marker</v-icon>
        {{ user.city.title }}
      </div>

      <div class="user-card__visit">
        <v-icon small class="mr-1">mdi-clock-outline</v-icon>
        {{ formatDate(user.lastVisit) }}
      </div>

      <v-btn color="primary" depressed small class="user-card__action" @click="goToUserDetail">
        <v-icon left x-small>mdi-account-details</v-icon>
        Подробнее
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    initials() {
      if (!this.user || !this.user.name) {
        return 'DC'
      }

      const parts = this.user.name.trim().split(' ').filter(Boolean)
      if (!parts.length) {
        return 'DC'
      }

      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase()
      }

      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
    }
  },
  methods: {
    navigateToCity() {
      this.$router.push(`/cities/${this.user.city.id}`).catch(() => {})
    },
    goToUserDetail() {
      this.$router.push(`/users/${this.user.id}`).catch(() => {})
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    },
    formatDate(timestamp) {
      return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(timestamp))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/user-item';
</style>
