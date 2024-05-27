import { describe, beforeEach, it, expect } from 'vitest'
import { BaseWrapper, mount } from '@vue/test-utils'
import PlanetDetailComponent from '@/views/PlanetDetail.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePlanetsStore } from '@/store/planetStore'
import router from '@/router'

//doc: https://vuejs.org/guide/scaling-up/testing
describe('Planet List Component', () => {
  let planetDetailComponent: BaseWrapper<Node>
  beforeEach(() => {
    //set the data to the store
    setActivePinia(createPinia())
    const usePlanet = usePlanetsStore()
    usePlanet.actualPlanet = {
      name: 'Geonosis',
      rotation_period: '30',
      orbital_period: '256',
      diameter: '11370',
      climate: 'temperate, arid',
      gravity: '0.9 standard',
      terrain: 'rock, desert, mountain, barren',
      surface_water: '5',
      population: '100000000000',
      residents: ['https://swapi.dev/api/people/63/'],
      films: ['The Clone Wars'],
      created: '2014-12-10T12:47:22.350000Z',
      edited: '2014-12-20T20:58:18.437000Z',
      url: 'https://swapi.dev/api/planets/11/'
    }

    //component
    planetDetailComponent = mount(PlanetDetailComponent, {
      global: {
        plugins: [router]
      }
    })
  })

  //DOM
  it("Planet Details: Lists the correct planet's name", () => {
    expect(planetDetailComponent.find('h2').text()).equals('Geonosis')
  })
})
