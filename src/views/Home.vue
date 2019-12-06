<template lang="pug">
  #home
    header
      h1 Home page

    main
      .row
        .col
          h2 Accordion
          Accordion
            AccordionItem(
              v-for="item in accItems"
              :key="item.title"
            )
              h3(slot="title") {{ item.title }}
              p(slot="content") {{ item.content }}
</template>

<script>
  export default {
    data: () => ({
      accItems: [
        {
          title: 'Item 1',
          content: 'Lorem ipsum dolor sit amet consectetur.',
          opened: true
        },
        {
          title: 'Item 2',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea!',
          opened: false
        },
        {
          title: 'Item 3',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis natus accusantium?',
          opened: false
        }
      ]
    }),
    components: {
      Accordion: () => import('@/components/Accordion'),
      AccordionItem: () => import('@/components/AccordionItem')
    }
  }
</script>

<style lang="scss" scoped>
  #home {
    display: flex;
    flex-direction: column;
  }

  main {
    display: flex;
    flex-direction: column;
    padding-top: $offset-mobile;
    padding-bottom: $offset-mobile;

    @include respond-min(tablet) {
      padding-top: $offset-desktop;
      padding-bottom: $offset-desktop;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .col {
    flex-grow: 1;
    width: 50%;

    &:nth-of-type(2n) {
      padding-left: 1.5rem;
      border-left: 1px solid #000;
    }

    &:nth-of-type(2n + 1) {
      padding-right: 1.5rem;
    }
  }
</style>
