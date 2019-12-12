<template>
  <v-content>
    <v-container ref="api" class="markdown-body"></v-container>
  </v-content>
</template>

<script>
import apiDoc from '../../../docs/api.md'
import 'github-markdown-css'

export default {
  mounted() {
    this.$refs.api.innerHTML = apiDoc
  },
}
</script>
<style lang="scss" scoped>
.markdown-body ::v-deep > * {
  font-weight: 300 !important;
  color: var(--v-secondary-base);
}
</style>
