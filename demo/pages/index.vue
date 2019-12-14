<template>
  <v-content>
    <v-container>
      <MarkdownContent :content="readme"></MarkdownContent>
    </v-container>
  </v-content>
</template>

<script>
import readme from '../../README.md'
import MarkdownContent from '../components/MarkdownContent'

export default {
  components: { MarkdownContent },
  data() {
    return {
      readme,
    }
  },
}
</script>
