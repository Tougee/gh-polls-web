<template>
  <header class="title-heading">
    <h1 class="title"><a href="/">{{ $t('message.poll') }}</a></h1>
    <nav class="nav">
      <div class="avatar-cropper">
        <img v-if="avatar" class="avatar" :src=avatar>
        <icon v-else name="user-circle"></icon>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'ui-title-heading',
    props: ['avatar'],
  }
</script>

<style scoped>
  .title-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    margin-bottom: 24px;
  }

  .title-heading > .title {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    font-family: var(--font-montserrat);
  }

  .title-heading > .nav {
    display: flex;
    margin-right: 100px;
    align-items: center;
  }

  .title-heading > .nav > .link {
    color: var(--color-dark-silver);
    font-size: var(--font-size);
    text-decoration: none;
    line-height: 0;
  }

  .title-heading > .nav > .link:hover {
    color: var(--color-lavender);
    transition: 200ms ease all;
  }

  .title-heading > .nav > .link:not(:last-child) {
    margin-right: 24px;
  }

  a {
    text-decoration: none !important;
  }

  .avatar-cropper {
    width: 24px;
    height: 24px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .avatar {
    display: block;
    height: 100%;
    width: 100%;
  }
</style>