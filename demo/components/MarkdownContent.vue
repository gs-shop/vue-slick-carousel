<script>
import 'github-markdown-css'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  name: 'MarkdownContent',
  props: {
    content: String,
  },
  render() {
    const content = this.content.replace(
      /<pre>(\s*)<code class="([\w-]+)">/g,
      '<pre class="$2">$1<code class="$2">',
    )
    const wrapper = <div class="markdown-body"></div>
    wrapper.data.domProps = {
      innerHTML: content,
    }

    return wrapper
  },
}
</script>
<style lang="scss" scoped>
.markdown-body ::v-deep > * {
  font-weight: 300 !important;
  color: var(--v-secondary-base);
}
::v-deep pre[class*='language-'] {
  background-color: var(--v-secondary-base);
  code {
    box-shadow: unset;
    background-color: var(--v-secondary-base);
  }
}
</style>
