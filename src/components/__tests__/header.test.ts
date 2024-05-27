import { describe, beforeEach, it, expect } from 'vitest'
import { BaseWrapper, mount } from '@vue/test-utils'
import HeaderComponent from '../Header.vue'

//doc: https://vuejs.org/guide/scaling-up/testing
describe('Header Component', () => {
  let headerComponent: BaseWrapper<Node>
  beforeEach(() => {
    headerComponent = mount(HeaderComponent)
  })
  //DOM
  it('renders correctly the logo image', () => {
    expect(headerComponent.find('img').attributes('src')).toBe(
      'https://cf-assets.www.cloudflare.com/slt3lc6tev37/PfzTHNkx0HmGGOJ8TpCSU/0e055736e92e7104fd4618efb7f1c917/visma_logo.png'
    )
  })
  it("contains the right header's background color", () => {
    expect(headerComponent.find('header').classes()).toEqual(expect.arrayContaining(['bg-white']))
  })
})
