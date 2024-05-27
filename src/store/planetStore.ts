import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const usePlanetsStore = defineStore('planets', () => {
  const planets: any = ref([])
  const loading: Ref<boolean> = ref(false)
  const nextPageUrl: Ref<string | null> = ref(null)
  const previousPageUrl: Ref<string | null> = ref(null)

  //actual chose planet
  const actualPlanet: any = ref(null)

  async function fillPlanets(url: string) {
    loading.value = true
    const response = await fetch(url)
    const data = await response.json()
    //response values
    nextPageUrl.value = data.next ? data.next : null
    previousPageUrl.value = data.previous ? data.previous : null
    //
    if (Array.isArray(data.results) && data.results.length > 0) {
      for (const planet of data.results) {
        if (planet.films && planet.films.length > 0) {
          const filmsNames: Array<string> = []
          for (const film of planet.films) {
            const response = await fetch(film)
            const data = await response.json()
            filmsNames.push(data.title)
          }
          planet.films = filmsNames
        }
        if (planet.residents && planet.residents.length > 0) {
          const residentsNames: Array<string> = []
          for (const resident of planet.residents) {
            const response = await fetch(resident)
            const data = await response.json()
            residentsNames.push(data.name)
          }
          planet.residents = residentsNames
        }
      }
      planets.value = data.results
    }
    loading.value = false
  }
  async function choosePlanetFromTheList(url: string) {
    actualPlanet.value = planets.value.find((planet: { url: string }) => planet.url == url)
  }

  return {
    planets,
    nextPageUrl,
    previousPageUrl,
    fillPlanets,
    choosePlanetFromTheList,
    loading,
    actualPlanet
  }
})
