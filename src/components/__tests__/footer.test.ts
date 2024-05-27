import { describe, beforeEach, it, expect } from 'vitest'
import { BaseWrapper, mount } from '@vue/test-utils'
import FooterComponent from '../Footer.vue'

//doc: https://vuejs.org/guide/scaling-up/testing
describe('Footer Component', () => {
  let footerComponent: BaseWrapper<Node>
  beforeEach(() => {
    footerComponent = mount(FooterComponent)
  })
  //DOM
  it('renders correctly the logo image', () => {
    expect(footerComponent.find('img').attributes('src')).toBe(
      'https://cf-assets.www.cloudflare.com/slt3lc6tev37/PfzTHNkx0HmGGOJ8TpCSU/0e055736e92e7104fd4618efb7f1c917/visma_logo.png'
    )
  })
  it("contains the right p's style color text", () => {
    expect(footerComponent.find('p').classes()).toEqual(expect.arrayContaining(['text-slate-500']))
  })
})
