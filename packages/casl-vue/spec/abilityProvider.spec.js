<<<<<<< HEAD
import { createLocalVue, mount } from '@vue/test-utils';
=======
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
>>>>>>> 5965a30... add can component
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';
import AbilityProvider from '../src/component/abilityProvider';


describe('vue AbilityProvider component', () => {
<<<<<<< HEAD
  describe('when AbilityProvider exist', () => {
    const localVue = createLocalVue();
    localVue.use(abilitiesPlugin);
    const ability = AbilityBuilder.define(can => can('read', 'Post'));

    localVue.component('ChildrenComponent', {
      name: 'ChildrenComponent',
=======
  describe('AbilityProvider can provider Ability to children', () => {
    const localVue = createLocalVue();
    localVue.use(abilitiesPlugin);
    const childrenComponent = localVue.extend({
      name: 'childrenComponent',
>>>>>>> 5965a30... add can component
      inject: ['ability'],
      render(h) {
        return h('div');
      }
    });
<<<<<<< HEAD

    const ProviderComponent = localVue.extend({
      name: 'providerComponent',
      render(h) {
        return h(AbilityProvider, { props: { ability } }, [h('ChildrenComponent')]);
      }
    });
    const wrapper = mount(ProviderComponent, {
      localVue,
    });
    const childrenVm = wrapper.find({ name: 'ChildrenComponent' }).vm;
    it('children component exist', () => {
      expect(childrenVm).not.to.be.empty;
    });
    it('AbilityProvider can provider Ability to children', () => {
      expect(childrenVm.ability).to.equal(ability);
    });
  });

  // const vm = new ProviderComponent().$mount();
=======
    const wrapper = shallowMount(AbilityProvider, {
      stubs: {
        'children-component': childrenComponent,
      }
    });
    const childrenVm = wrapper.find('children-component').vm;
    const html = childrenVm.html();
    expect(1).to.equal(1);
  });
>>>>>>> 5965a30... add can component
});

