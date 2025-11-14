<template>
  <div :class="containerClasses">
    <h2 :class="titleClasses">{{ title }}</h2>
    <p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    containerClasses() {
      const classes = ['mb-12 md:mb-16   !py-6']

      if (this.align === 'center') {
        classes.push('text-center')
      } else if (this.align === 'right') {
        classes.push('text-right')
      } else {
        classes.push('text-left')
      }

      return classes.join(' ')
    },
    titleClasses() {
      const classes = [
        'font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4'
      ]

      if (this.dark) {
        classes.push('text-white')
      } else {
        classes.push('text-ki-black')
      }

      return classes.join(' ')
    },
    subtitleClasses() {
      const classes = [
        'font-heading text-lg md:text-xl lg:text-2xl tracking-wide uppercase'
      ]

      if (this.dark) {
        classes.push('text-gray-300')
      } else {
        classes.push('text-ki-medium-gray')
      }

      return classes.join(' ')
    }
  }
}
</script>
