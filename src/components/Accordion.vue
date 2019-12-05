<template lang="pug">
  .acc
    .acc-item.trs(
      v-for="item in items"
      :key="Math.random()"
      :class="{ opened: item.opened }"
      ref="items"
    )
      button.acc-header.trs(@click="headerClickHandler")
        h2.acc-title {{ item.title }}
        span Icon

      .acc-body.trs(ref="body")
        .acc-inner
          p.acc-content {{ item.content }}

</template>

<script>
  export default {
    props: {
      items: Array
    },
    mounted() {
      if (this.$refs.body.length) {
        this.$refs.body.forEach((body, i) => {
          if (this.items[i].opened) {
            body.style.height = `${body.scrollHeight}px`
          } else {
            body.style.height = 0
          }
        })
      }
    },
    methods: {
      headerClickHandler(e) {
        const targetItem = e.target.closest('.acc-item')
        const targetBody = targetItem.querySelector('.acc-body')

        if (targetItem.classList.contains('opened')) {
          targetItem.classList.remove('opened')
          targetBody.style.height = 0
        } else {
          if (this.$refs.body.length) {
            this.$refs.body.forEach((body, i) => {
              if (body === targetBody) {
                this.$refs.items[i].classList.add('opened')
                body.style.height = `${body.scrollHeight}px`
              } else {
                this.$refs.items[i].classList.remove('opened')
                body.style.height = 0
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .acc {
    display: flex;
    flex-direction: column;
  }

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
