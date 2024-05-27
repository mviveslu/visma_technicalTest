import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlanetsStore } from '@/store/planetStore'

//doc: https://pinia.vuejs.org/cookbook/testing.html
describe('usePlanetsStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('initialize the planets with an empty array', () => {
    const store = usePlanetsStore()
    expect(store.planets).toEqual([])
  })

  it('fetches and fills planets', async () => {
    const usePlanet = usePlanetsStore()

    // Mocked fetch response with two registers of the original answer
    const mockResponse = {
      results: [
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
          films: ['https://swapi.dev/api/films/5/'],
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
          films: ['https://swapi.dev/api/films/6/'],
          created: '2014-12-10T12:49:01.491000Z',
          edited: '2014-12-20T20:58:18.439000Z',
          url: 'https://swapi.dev/api/planets/12/'
        }
      ],
      next: 'https://swapi.dev/api/planets/?page=2',
      previous: null
    }
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    await usePlanet.fillPlanets('https://swapi.dev/api/planets/')

    expect(usePlanet.planets).toEqual(mockResponse.results)
    expect(usePlanet.nextPageUrl).toBe(mockResponse.next)
    expect(usePlanet.previousPageUrl).toBe(mockResponse.previous)
  })

  it('handles fetch error', async () => {
    const usePlanet = usePlanetsStore()

    // Mock fetch to throw an error
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'))

    try {
      await usePlanet.fillPlanets('https://swapi.dev/api/planets/')
    } catch (error) {
      expect(usePlanet.planets).toEqual([])
      expect(usePlanet.nextPageUrl).toBe(null)
      expect(usePlanet.previousPageUrl).toBe(null)
    }
  })
  it('assigns a planet to our store', async () => {
    const usePlanet = usePlanetsStore()
    usePlanet.actualPlanet = null
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
        films: ['https://swapi.dev/api/films/5/'],
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
        films: ['https://swapi.dev/api/films/6/'],
        created: '2014-12-10T12:49:01.491000Z',
        edited: '2014-12-20T20:58:18.439000Z',
        url: 'https://swapi.dev/api/planets/12/'
      }
    ]
    await usePlanet.choosePlanetFromTheList('https://swapi.dev/api/planets/11/')
    expect(usePlanet.actualPlanet).toEqual({
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
      films: ['https://swapi.dev/api/films/5/'],
      created: '2014-12-10T12:47:22.350000Z',
      edited: '2014-12-20T20:58:18.437000Z',
      url: 'https://swapi.dev/api/planets/11/'
    })
  })
})
