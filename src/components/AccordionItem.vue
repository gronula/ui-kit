<template lang="pug">
  div(:class='card_classes')
    .card-header(@click='notifyOfClick')
      p.card-header-title
        slot(name='title')
      p.card-header-icon
        span.icon(v-if='!usingCustomIcon')
          svg(v-if='showCaret', :class='dropdownIconClasses', :style='iconStyle', version='1.1', viewBox='0 0 129 129', enable-background='new 0 0 129 129')
            g
              path(d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z')
        span.icon(v-else='')
          slot(name='icon')
          slot(v-if='isOpen', name='icon-open')
          slot(v-else='', name='icon-closed')
    .accordion-body(ref='body', :style='slideStyle')
      div(:class='card_content_classes', ref='bodyContent')
        slot(name='content')
      div(:class='footerClasses', ref='bodyFooter')
        slot(name='footer')
</template>

<script>
  import { transitionEndEventName } from '@/utils/index.js'
  export default {
    name: 'accordion-item',
    data() {
      return {
        isOpen: false,
        autoHeightInterval: null,
        showCardContent: false,
        uniqueId: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.$emit('child-registered', this)
        this.$parent.$on('toggle-child', this.handleToggleRequest)

        const accordionBody = this.$refs.body
        const eName = transitionEndEventName(accordionBody)
        accordionBody.addEventListener(eName, () => {
          if (accordionBody.style.height !== '0px') {
            this.autoHeightStart(accordionBody)
          } else {
            this.autoHeightStop()
            this.showCardContent = false
          }
        })
      })
    },
    beforeDestroy() {
      this.$parent.$emit('child-removed', this.uniqueId)
    },
    watch: {
      isOpen(newStatus) {
        if (newStatus) {
          this.$emit('open')
        } else {
          this.$emit('close')
        }
        this.doTheSlide()
      }
    },
    computed: {
      config() {
        const {
          caretAnimation: animation = {
            duration: '450ms',
            timerFunc: 'ease'
          },
          dropdown = false,
          icon = 'caret',
          slide = {
            duration: '700ms',
            timerFunc: 'ease'
          }
        } = this.$parent
        return {
          animation,
          dropdown,
          icon,
          slide
        }
      },
      dropdownIconClasses() {
        return {
          'header-icon': true,
          'caret-down': !this.isOpen
        }
      },
      card_classes() {
        return {
          card: true,
          'card-active': this.isOpen
        }
      },
      card_content_classes() {
        return {
          'card-content': true,
          'is-hidden': !this.showCardContent
        }
      },
      footerClasses() {
        return {
          'card-footer': true,
          'is-hidden': !this.$slots.footer
        }
      },
      usingCustomIcon() {
        return this.config.icon === 'custom'
      },
      showCaret() {
        return this.config.icon === 'caret'
      },
      showPlus() {
        return this.config.icon === 'plus-minus' && !this.isOpen
      },
      showMinus() {
        return this.config.icon === 'plus-minus' && this.isOpen
      },
      slideStyle() {
        const c = this.config.slide
        return {
          transition: `all ${c.duration} ${c.timerFunc}`
        }
      },
      iconStyle() {
        const c = this.config.animation
        if (c.none === true) {
          return {}
        }
        return {
          transition: `all ${c.duration} ${c.timerFunc}`
        }
      }
    },
    methods: {
      handleToggleRequest(toggleId) {
        if (toggleId === this.uniqueId) {
          this.toggleCollapsed()
        }
      },
      setUniqueId(id) {
        this.uniqueId = id
      },
      notifyOfClick() {
        if (this.uniqueId) {
          this.$parent.$emit('child-clicked', this.uniqueId)
        }
      },
      collapse() {
        this.isOpen = false
      },
      toggleCollapsed() {
        this.isOpen = !this.isOpen
      },
      doTheSlide() {
        const el = this.$refs.body
        if (this.isOpen === true) {
          this.showCardContent = true
          this.$nextTick().then(() => {
            this.adjustHeight(el, el.scrollHeight)
          })
        } else {
          this.slideUp(el)
        }
      },
      adjustHeight(el, newHeight) {
        el.style.height = `${newHeight}px`
      },
      slideUp(el) {
        if (el.style.height === 'auto') {
          el.style.height = `${el.scrollHeight}px`
        }
        el.style.height = '0px'
      },
      autoHeightStart(el) {
        // clear running interval
        if (this.autoHeightInterval) this.autoHeightStop()
        this.autoHeightInterval = setInterval(() => {
          // set height for comparison to scrollHeight
          try {
            const actualHeight = this.$refs.bodyContent.scrollHeight + this.$refs.bodyFooter.scrollHeight + 1
            if (el.style.height !== '0px' && actualHeight !== el.style.height && this.isOpen) {
              this.adjustHeight(el, actualHeight)
            }
          } catch (e) {
            this.autoHeightStop()
          }
        }, 100)
      },
      autoHeightStop() {
        clearInterval(this.autoHeightInterval)
        this.autoHeightInterval = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .accordion-body {
    overflow: hidden;
    height: 0px;
  }
  .caret-down {
    transform: rotate(180deg);
  }
  .header-icon {
    width: 2.25em;
    height: 2.25em;
  }
</style>
