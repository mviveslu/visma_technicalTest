import { describe, beforeEach, it, expect } from 'vitest'
import { BaseWrapper, mount } from '@vue/test-utils'
import PlanetListComponent from '@/views/PlanetsList.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePlanetsStore } from '@/store/planetStore'
import router from '@/router'

//doc: https://vuejs.org/guide/scaling-up/testing
describe('Planet List Component', () => {
  let planetListComponent: BaseWrapper<Node>
  beforeEach(() => {
    //set the data to the store
    setActivePinia(createPinia())
    const usePlanet = usePlanetsStore()
    usePlanet.planets = [
      {
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
      },
      {
        name: 'Utapau',
        rotation_period: '27',
        orbital_period: '351',
        diameter: '12900',
        climate: 'temperate, arid, windy',
        gravity: '1 standard',
        terrain: 'scrublands, savanna, canyons, sinkholes',
        surface_water: '0.9',
        population: '95000000',
        residents: ['https://swapi.dev/api/people/83/'],
        films: ['The Clone Wars'],
        created: '2014-12-10T12:49:01.491000Z',
        edited: '2014-12-20T20:58:18.439000Z',
        url: 'https://swapi.dev/api/planets/12/'
      }
    ]
    usePlanet.nextPageUrl = 'https://swapi.dev/api/planets/?page=2'
    usePlanet.previousPageUrl = null
    //component
    planetListComponent = mount(PlanetListComponent, {
      global: {
        plugins: [router]
      }
    })
  })
  //DOM
  it('List the planets: lists the correct total of planets', () => {
    expect(planetListComponent.findAll('tr').length).toBe(3)
  })
  it('List the planets: checks if the nextpage button exists', () => {
    //search button
    const buttonNext = planetListComponent
      .findAll('button')
      .find((button) => button.text() == 'Next')
    expect(buttonNext).to.exist
  })
})
