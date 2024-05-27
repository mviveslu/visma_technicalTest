<template>
  <div class="">
    <div class="max-w-7xl mx-auto mt-8 px-6 lg:px-8" v-if="actualPlanet">
      <button
        type="button"
        v-on:click="$router.back()"
        class="flex items-center pb-8 w-1/2 text-sm text-gray-700 transition-colors duration-200 gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
      >
        <svg
          class="w-5 h-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Go back</span>
      </button>
      <div class="flex flex-col md:flex-row gap-4 md:items-center">
        <div class="md:flex-1">
          <div class="h-[460px] rounded-xl bg-gray-300 dark:bg-gray-700 mb-4">
            <img
              class="w-full h-full object-cover shadow border rounded-xl"
              :src="planetsImages[Math.floor(Math.random() * planetsImages.length)]"
              alt="Product Image"
            />
          </div>
        </div>
        <div class="md:flex-1">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2 uppercase">
            {{ actualPlanet.name }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {{ creationDate }}
          </p>
          <!--PLANET DATA SUM UP-->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Diameter: </span>
              <span class="text-gray-600 dark:text-gray-300">{{ actualPlanet.diameter }}</span>
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Surface Water: </span>
              <span class="text-gray-600 dark:text-gray-300">{{ actualPlanet.surface_water }}</span>
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Terrain: </span>
              <span class="text-gray-600 dark:text-gray-300">{{ actualPlanet.terrain }}</span>
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Orbital Period: </span>
              <span class="text-gray-600 dark:text-gray-300">{{
                actualPlanet.orbital_period
              }}</span>
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Rotation Period: </span>
              <span class="text-gray-600 dark:text-gray-300">{{
                actualPlanet.rotation_period
              }}</span>
            </div>
          </div>
          <!--END PLANET DATA SUM UP-->
          <div></div>
        </div>
      </div>
      <div class="flex gap-4 mt-8 flex-col md:flex-row">
        <!--FILMS-->
        <div class="w-full">
          <span class="font-bold text-xl text-gray-700 dark:text-gray-300">FILMS</span>
          <ul
            class="shadow p-4 divide-y divide-gray-200 mt-4"
            v-if="actualPlanet.films && actualPlanet.films.length > 0"
          >
            <li class="py-4" v-for="film of actualPlanet.films" :key="film">
              <div class="flex justify-between">
                <span class="font-semibold text-sm">{{ film }}</span>
                <icon-film></icon-film>
              </div>
            </li>
          </ul>
        </div>
        <!--END FILMS-->
        <!--ACTORS-->
        <div class="w-full">
          <span class="font-bold text-xl text-gray-700 dark:text-gray-300">RESIDENTS</span>
          <ul
            class="shadow p-4 divide-y divide-gray-200 mt-4"
            v-if="actualPlanet.residents && actualPlanet.residents.length > 0"
          >
            <li class="py-4" v-for="resident of actualPlanet.residents" :key="resident">
              <div class="flex justify-between">
                <span class="font-semibold text-sm">{{ resident }}</span>
                <icon-residents></icon-residents>
              </div>
            </li>
          </ul>
        </div>
        <!--END ACTORS-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlanetsStore } from '../store/planetStore'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref, type Ref } from 'vue'
import IconFilm from '../components/icons/IconFilm.vue'
import IconResidents from '../components/icons/IconResidents.vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

//planets images
const planetsImages: Ref<Array<string>> = ref([
  'https://images.pexels.com/photos/360912/pexels-photo-360912.jpeg',
  'https://images.pexels.com/photos/71116/hurricane-earth-satellite-tracking-71116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/287229/pexels-photo-287229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3374210/pexels-photo-3374210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
])
const usePlanet = usePlanetsStore()
const router = useRouter()

const { actualPlanet } = storeToRefs(usePlanet)

const creationDate = computed(() => {
  if (actualPlanet.value.created) {
    dayjs.extend(customParseFormat)
    const parsedDate = dayjs(actualPlanet.value.created)
    return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : 'Not informed correctly'
  }
  return 'N/A'
})

onBeforeMount(() => {
  // Realiza tareas de inicialización
  if (!actualPlanet.value) {
    router.push({ name: 'planetsList' })
  }
})
</script>
