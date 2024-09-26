<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { generateUUID as uuidv4} from "~/helpers/common";

const emit = defineEmits(['onShow'])

const props = defineProps({
  deadline: {
    type: String,
    required: true,
  },
  stop: {
    type: Boolean,
    default: false,
  },
  labels: {
    type: Object,
    default: () => ({
      days: 'Дней',
      hours: 'Часов',
      minutes: 'Минут',
      seconds: 'Секунд',
    }),
  },
});

const uuid = uuidv4();
const now = ref(Math.trunc(Date.now() / 1000));
const date = ref<number | null>(null);
const diff = ref(0);
const show = ref(false);
let interval: number | undefined;

const timeData = ref([
  {
    current: 0,
    previous: 0,
    label: props.labels.days,
    elementId: `flip-card-days-${uuid}`,
  },
  {
    current: 0,
    previous: 0,
    label: props.labels.hours,
    elementId: `flip-card-hours-${uuid}`,
  },
  {
    current: 0,
    previous: 0,
    label: props.labels.minutes,
    elementId: `flip-card-minutes-${uuid}`,
  },
  {
    current: 0,
    previous: 0,
    label: props.labels.seconds,
    elementId: `flip-card-seconds-${uuid}`,
  },
]);

const seconds = computed(() => Math.trunc(diff.value) % 60);
const minutes = computed(() => Math.trunc(diff.value / 60) % 60);
const hours = computed(() => Math.trunc(diff.value / 60 / 60) % 24);
const days = computed(() => Math.trunc(diff.value / 60 / 60 / 24));

watch(
    () => props.deadline,
    (newDeadline) => {
      date.value = Math.trunc(Date.parse(newDeadline.replace(/-/g, '/')) / 1000);
      if (!date.value) {
        throw new Error("Invalid props value, correct the 'deadline'");
      }
    },
    { immediate: true }
);

watch(
    () => now.value,
    () => {
      diff.value = (date.value ?? 0) - now.value;
      if (diff.value > 0) {
        updateTime(0, days.value);
        updateTime(1, hours.value);
        updateTime(2, minutes.value);
        updateTime(3, seconds.value);
        show.value = true;  // Set show to true when the countdown is active
        emit('onShow', true);
      } else {
        diff.value = 0;
        updateTime(3, 0);
        show.value = false; // Hide if the countdown is over or stopped
        emit('onShow', false);
      }
    }
);

onBeforeMount(() => {
  if (!props.deadline) {
    throw new Error("Missing props 'deadline'");
  }
  date.value = Math.trunc(Date.parse(props.deadline.replace(/-/g, '/')) / 1000);
  if (!date.value) {
    throw new Error("Invalid props value, correct the 'deadline'");
  }
  interval = window.setInterval(() => {
    now.value = Math.trunc(Date.now() / 1000);
  }, 1000);
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});

function twoDigits(value: number) {
  return value.toString().padStart(2, '0');
}

function updateTime(idx: number, newValue: number) {
  if (idx >= timeData.value.length || newValue === undefined) {
    return;
  }
  const d = timeData.value[idx];
  const val = newValue < 0 ? 0 : newValue;
  const el = document.querySelector(`#${d.elementId}`);
  if (val !== d.current) {
    d.previous = d.current;
    d.current = val;
    if (el) {
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
    }
    if (idx === 0) {
      const els = el?.querySelectorAll('span b');
      els?.forEach((e) => {
        const cls = e.classList[0];
        if (newValue / 1000 >= 1) {
          if (!cls.includes('-4digits')) {
            const newCls = `${cls}-4digits`;
            e.classList.add(newCls);
            e.classList.remove(cls);
          }
        } else if (cls.includes('-4digits')) {
          const newCls = cls.replace('-4digits', '');
          e.classList.add(newCls);
          e.classList.remove(cls);
        }
      });
    }
  }
}
</script>

<template>
  <div class="container flip-clock">
    <div
      v-for="data in timeData"
      v-show="show"
      :key="data.label"
    >
      <span
        :id="data.elementId"
        class="flip-clock__piece"
      >
        <span class="flip-clock__card flip-card">
          <b class="flip-card__top font-thin">{{ twoDigits(data.current) }}</b>
          <b
            class="flip-card__bottom font-thin"
            :data-value="twoDigits(data.current)"
          />
          <b
            class="flip-card__back font-thin"
            :data-value="twoDigits(data.previous)"
          />
          <b
            class="flip-card__back-bottom font-thin"
            :data-value="twoDigits(data.previous)"
          />
        </span>
        <span class="flip-clock__slot">{{ data.label }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flip-clock {
  text-align: center;
  perspective: 600px;
  margin: 0 auto;
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
}
.flip-clock__piece {
  display: inline-block;
  margin: 0 0.2vw;
  @media (min-width: 1000px) {
    margin: 0 5px;
  }
}
.flip-clock__slot {
  font-size: 1rem;
  line-height: 1.5;
  display: block;
}
$halfHeight: 0.72em;
$borderRadius: 0.15em;
.flip-card {
  display: block;
  position: relative;
  padding-bottom: $halfHeight;
  font-size: 2.25rem;
  line-height: 0.95;
}
@media (min-width: 1000px) {
  .flip-clock__slot {
    font-size: 1.2rem;
  }
  .flip-card {
    font-size: 3rem;
  }
}
.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
  display: block;
  height: $halfHeight;
  color: #875726;
  background: #222;
  padding: 0.23em 0.15em 0.4em;
  border-radius: $borderRadius $borderRadius 0 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  width: 2.1em;
  height: $halfHeight;
}
.flip-card__top-4digits,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits,
.flip-card__back-4digits::before,
.flip-card__back-4digits::after {
  display: block;
  height: $halfHeight;
  color: #cca900;
  background: #222;
  padding: 0.23em 0.15em 0.4em;
  border-radius: $borderRadius $borderRadius 0 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  width: 2.65em;
  height: $halfHeight;
}
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits {
  color: #e59541;
  position: absolute;
  top: 50%;
  left: 0;
  border-top: solid 1px #000;
  background: #393939;
  border-radius: 0 0 $borderRadius $borderRadius;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
}
.flip-card__back-bottom,
.flip-card__back-bottom-4digits {
  z-index: 1;
}
.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
  display: block;
  margin-top: -$halfHeight;
}
.flip-card__back::before,
.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__back-4digits::before,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
  content: attr(data-value);
}
.flip-card__back,
.flip-card__back-4digits {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0%;
  pointer-events: none;
}
.flip-card__back::before,
.flip-card__back-4digits::before {
  position: relative;
  overflow: hidden;
  z-index: -1;
}
.flip .flip-card__back::before,
.flip .flip-card__back-4digits::before {
  z-index: 1;
  animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
  animation-fill-mode: both;
  transform-origin: center bottom;
}
.flip .flip-card__bottom,
.flip .flip-card__bottom-4digits {
  transform-origin: center top;
  animation-fill-mode: both;
  animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
}
@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    z-index: 2;
  }
  0%,
  99% {
    opacity: 1;
  }
  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
}
@keyframes flipBottom {
  0%,
  50% {
    z-index: -1;
    transform: rotateX(90deg);
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
    z-index: 5;
  }
}
</style>
