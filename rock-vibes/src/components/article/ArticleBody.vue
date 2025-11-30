<template>
  <article class="article-body prose prose-lg dark:prose-invert max-w-none" v-html="renderedContent"></article>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'ArticleBody',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    renderedContent() {
      if (!this.content) return ''

      // Configure marked for better output
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
      })

      return marked(this.content)
    }
  }
}
</script>

<style scoped>
.article-body {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.8;
  color: #E5E7EB;
}

.article-body :deep(h2) {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.article-body :deep(h3) {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #FFFFFF;
  line-height: 1.4;
}

.article-body :deep(p) {
  margin-bottom: 1.75rem;
  color: #E5E7EB;
  line-height: 1.8;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
  color: #E5E7EB;
}

.article-body :deep(ul) {
  list-style-type: disc;
}

.article-body :deep(ol) {
  list-style-type: decimal;
}

.article-body :deep(li) {
  color: #E5E7EB;
  margin-bottom: 0.75rem;
  line-height: 1.75;
}

.article-body :deep(strong) {
  font-weight: 700;
  color: #FFFFFF;
}

.article-body :deep(em) {
  font-style: italic;
  color: #D1D5DB;
}

.article-body :deep(a) {
  color: var(--ki-yellow);
  text-decoration: underline;
  text-decoration-color: rgba(255, 210, 63, 0.3);
  text-underline-offset: 3px;
  transition: all 0.2s ease;
}

.article-body :deep(a:hover) {
  text-decoration-color: var(--ki-yellow);
  color: var(--ki-warm-orange);
}

.article-body :deep(blockquote) {
  margin: 2.5rem 0;
  padding-left: 1.5rem;
  border-left: 4px solid var(--ki-yellow);
  font-style: italic;
  font-size: 1.25rem;
  color: #D1D5DB;
  line-height: 1.6;
}

.article-body :deep(code) {
  background: rgba(255, 255, 255, 0.05);
  color: var(--ki-yellow);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.article-body :deep(pre) {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 2rem 0;
}

.article-body :deep(pre code) {
  background: none;
  padding: 0;
  color: #E5E7EB;
}

.article-body :deep(hr) {
  margin: 3rem 0;
  border: none;
  border-top: 1px solid #374151;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2rem 0;
}
</style>
