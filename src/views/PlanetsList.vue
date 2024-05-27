<template>
  <section class="mt-12 bg-blueGray-50">
    <div class="mx-auto max-w-7xl px-6 lg-px-8 mb-12 xl:mb-0">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-12">
        <span class="block">
          May the
          <span class="text-transparent bg-clip-text bg-gradient-to-tr to-red-100 from-red-600">
            Force
          </span>
          be with you
        </span>
      </h1>
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="block w-full overflow-x-auto">
          <table class="items-center bg-transparent w-full border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Planet's name
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Films
                </th>
              </tr>
            </thead>
            <tbody v-if="planets">
              <tr v-for="planet in planets" :key="planet">
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700"
                >
                  <button class="hover:cursor-pointer" v-on:click="planetDetails(planet.url)">
                    <span>
                      {{ planet.name }}
                    </span>
                  </button>
                </th>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <div v-if="planet.films && planet.films.length > 0">
                    <ul>
                      <li v-for="filmName in planet.films" :key="filmName" class="mb-4">
                        {{ filmName }}
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <span> Doesn't appear in any Star Wars film yet </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <nav>
        <ul class="flex justify-center -space-x-px text-base h-10">
          <li>
            <button
              :disabled="!previousPageDisabled"
              v-on:click="previousPage"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </li>
          <li>
            <button
              :disabled="!nextPageDisabled"
              v-on:click="nextPage"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePlanetsStore } from '@/store/planetStore'
import { storeToRefs } from 'pinia'
import { computed, type Ref } from 'vue'
import { useRouter } from 'vue-router'

//store for the planets
const usePlanet = usePlanetsStore()
const router = useRouter()

const { planets, nextPageUrl, previousPageUrl } = storeToRefs(usePlanet)

//compute if there is next page
const nextPageDisabled: Ref<boolean> = computed(() => {
  return nextPageUrl.value ? true : false
})

//compute if there is previous page
const previousPageDisabled: Ref<boolean> = computed(() => {
  return previousPageUrl.value ? true : false
})

function nextPage() {
  usePlanet.fillPlanets(nextPageUrl.value!)
}

function previousPage() {
  usePlanet.fillPlanets(previousPageUrl.value!)
}

async function planetDetails(url: string) {
  await usePlanet.choosePlanetFromTheList(url)
  router.push({ name: 'planetDetails' })
}
</script>
