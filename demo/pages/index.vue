<template>
  <v-content>
    <v-container ref="readme" class="markdown-body"></v-container>
  </v-content>
</template>

<script>
import readme from '../../README.md'
import 'github-markdown-css'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  mounted() {
    this.$refs.readme.innerHTML = readme.replace(
      /<pre>(\s*)<code class="([\w-]+)">/g,
      '<pre class="$2">$1<code class="$2">',
    )
  },
}
</script>
<style lang="scss" scoped>
::v-deep * {
  font-weight: 300 !important;
  color: var(--v-secondary-base);
}
::v-deep pre[class*='language-'] {
  background-color: var(--v-secondary-base);
  ::v-deep code {
    background-color: var(--v-secondary-base);
  }
}
</style>
