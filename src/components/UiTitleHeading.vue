<template>
  <header class="title-heading">
    <h1 class="title">Mixin Polls</h1>
    <nav class="nav">
      <a href="https://github.com/tougee/gh-polls-web" class="link" target="_blank" title="GitHub">
        <icon name="github-alt"></icon>
      </a>
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
    margin-right: 120px;
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

  .avatar-cropper {
    width: 28px;
    height: 28px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }

  .avatar {
    display: inline;
    height: 100%;
    width: 100%;
  }
</style>