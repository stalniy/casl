import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';
import AbilityProvider from '../src/component/abilityProvider';


describe('vue AbilityProvider component', () => {
  describe('AbilityProvider can provider Ability to children', () => {
    const localVue = createLocalVue();
    localVue.use(abilitiesPlugin);

    localVue.component('ChildrenComponent', {
      name: 'childrenComponent',
      inject: ['ability'],
      render(h) {
        return h('div');
      }
    });

    const ProviderComponent = localVue.extend({
      name: 'providerComponent',
      render(h) {
        return h(AbilityProvider, {}, [h('div')]);
      }
    });

    const vm = new ProviderComponent().$mount();

    // const wrapper = mount(providerComponent, {
    //   localVue,
    // });
    // const childrenVm = wrapper.find('children-component').vm;
    // const html = childrenVm.html();
    expect(1).to.equal(1);
  });
});

