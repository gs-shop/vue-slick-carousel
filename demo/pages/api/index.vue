<template>
  <v-content>
    <v-container ref="api" class="markdown-body"></v-container>
    <v-container>
      <MarkdownContent :content="apiDoc"></MarkdownContent>
    </v-container>
  </v-content>
</template>

<script>
import apiDoc from '../../../docs/API.md'
import MarkdownContent from '../../components/MarkdownContent'

export default {
  components: { MarkdownContent },
  data() {
    return {
      apiDoc,
    }
  },
}
</script>
