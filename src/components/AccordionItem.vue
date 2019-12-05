<template lang="pug">
  .acc-item.trs(
    :class="{ opened: opened }"
  )
    button.acc-header.trs(@click="headerClickHandler")
      slot(name="title")
      span.acc-icon Icon

    .acc-body.trs(ref="body")
      .acc-inner
        slot(name="content")

</template>

<script>
  export default {
    props: {
      item: Object,
      opened: Boolean
    },
    mounted() {
      if (this.opened) {
        this.$refs.body.style.height = `${this.$refs.body.scrollHeight}px`
      } else {
        this.$refs.body.style.height = 0
      }
    },
    methods: {
      headerClickHandler(e) {
        if (this.$el.classList.contains('opened')) {
          this.$el.classList.remove('opened')
          this.$refs.body.style.height = 0
        } else {
          const items = document.querySelectorAll('.acc__item')
          const targetItem = e.target.closest('.acc-item')

          items.forEach(item => {
            if (item === targetItem) {
              this.$el.classList.add('opened')
              this.$refs.body.style.height = `${this.$refs.body.scrollHeight}px`
            } else {
              item.classList.remove('opened')
              const body = item.querySelector('.acc-body')
              body.style.height = 0
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .acc-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border: 1px solid #eee;

    &:last-of-type {
      margin-bottom: 0;
    }

    &:hover {
      border-color: #333;
    }
  }

  .acc-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    padding-right: 2.5rem;
    border: 0;
    background-color: #f8f8f8;

    .acc-item.opened & {
      background-color: rgba(#ccc, 0.8);
    }

    span {
      position: absolute;
      top: 50%;
      right: 1rem;
      width: 16px;
      height: 16px;
      font-size: 0;
      transform: translateY(-50%);

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 1px;
        background-color: #000;
        transform: translate(-50%, -50%);
      }

      .acc-item:not(.opened) &::after {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
  }

  .acc-body {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .acc-inner {
    padding: 1.5rem 1rem;
  }
</style>
