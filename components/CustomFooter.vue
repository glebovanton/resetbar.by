<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const startYear = 2017;
const scrollToTopButtonAfter = 300;
const copyrightYears = `${startYear}${new Date().getFullYear() <= startYear ? "" : -new Date().getFullYear()}`
const showScroll = ref(false);

const handleScroll = () => {
  showScroll.value = window.scrollY > scrollToTopButtonAfter;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <footer class="footer">
    <div class="container">
      <ul class="social-icons">
        <li>
          <a href="tel:+375293577726">
            <Icon name="mdi:phone" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/gena.nikan" target="_blank">
            <Icon name="mdi:facebook-box" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=gLA3Hgn-1Po" target="_blank">
            <Icon name="mdi:youtube" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/reset.classic.bar" target="_blank"
          >
            <Icon name="mdi:instagram" />
          </a>
        </li>
        <li>
          <a href="https://t.me/+375293846785">
            <Icon name="simple-icons:telegram" />
          </a>
        </li>
        <li>
          <a href="viber://chat?number=375293577726">
            <Icon name="simple-icons:viber" />
          </a>
        </li>
      </ul>
      <p class="copyright">
        &copy; {{ copyrightYears }} Glebov Anton. All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "assets/css/footer.scss";

body {
  background: #232323;
}

.white-text {
  color: #ffffff;
}

h2 {
  font-size: 2.125rem;
  line-height: 3.063rem;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

a {
  color: white;
  text-decoration: none;
  transition: color .8s;
  -webkit-transition: color .8s;
}

a:hover {
  text-decoration: none;
  color: rgba(217,167,87,0.49);
  opacity: .5;
}

a:visited {
  text-decoration: none;
  color: white;
}
a:active {
  text-decoration: none;
  color: white;
}

@media screen and (max-width: 480px) {
  .adapt_link {
    font-size: 2.8vw;
  }
}

.left {
  text-align: left;
}

.img-responsive {
  margin: auto;
  /*width: 100%;*/
  height: 22vh;
}

footer p {
  font-size: 10px;
}
</style>
