<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'outline', 'secondary'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    href: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tag() {
      if (this.href) return 'a'
      if (this.to) return 'router-link'
      return 'button'
    },
    buttonClasses() {
      const classes = [
        'inline-flex items-center  justify-center font-heading font-semibold uppercase  transition-all duration-300 ease-in-out '
      ]

      // Variant styles
      if (this.variant === 'primary') {
        classes.push(
          'bg-(--ki-yellow)  text-white hover:bg-pink-600 transition-colors duration-700 ease-in-out '
        )
      } else if (this.variant === 'outline') {
        classes.push(
          'border-2 border-(--ki-yellow) !px-4 text-white bg-transparent hover:bg-white hover:text-ki-black focus:ring-white'
        )
      } else if (this.variant === 'secondary') {
        classes.push(
          'bg-ki-black text-white hover:bg-ki-medium-gray focus:ring-ki-black'
        )
      }

      // Size styles
      if (this.size === 'small') {
        classes.push('! px-4 !py-2 text-sm rounded-3xl')
      } else if (this.size === 'medium') {
        classes.push('!px-4 !py-2 text-base rounded-3xl')
      } else if (this.size === 'large') {
        classes.push('!px-4 !py-2 text-lg !rounded-3xl')
      }

      // Full width
      if (this.fullWidth) {
        classes.push('w-full')
      }

      // Disabled state
      if (this.disabled) {
        classes.push('opacity-50 cursor-not-allowed')
      }

      return classes.join(' ')
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
