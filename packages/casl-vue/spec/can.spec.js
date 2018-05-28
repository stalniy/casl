import chai from 'chai';
import spies from 'chai-spies';
import { createLocalVue, mount } from '@vue/test-utils';
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';

chai.use(spies);
const should = chai.should();


describe('vue Can component', () => {
  const localVue = createLocalVue();
  const abilityFromPlugin = AbilityBuilder.define(can => can('read', 'Plugin'));
  localVue.use(abilitiesPlugin, abilityFromPlugin);

  describe('when provider exist use provider ability', () => {
    const Component = {
      template: `
                <div>
                  <Can  I = 'read' of = 'Provider'>
                    <span></span>
                    <h1></h1>
                  </Can>
                  <button @click="updateAbility"></button>
                </div>
      `,
      data() {
        return {
          ability: this.$defineAbility(can => can('read', 'Provider'))
        };
      },
      provide() {
        const { ability } = this;
        return {
          ability
        };
      },
      methods: {
        updateAbility() {
          this.ability.update([{
            action: 'read',
            subject: 'Plugin'
          }]);
        }
      }
    };
    const wrapper = mount(Component, {
      localVue
    });
    it('use ability from provider', () => {
      expect(wrapper.contains('h1')).to.equal(true);
    });
    it('update ability to plugin', () => {
      wrapper.find('button').trigger('click');
      expect(wrapper.contains('h1')).to.equal(false);
    });
  });

  describe('when provider not exist use ability from plugin', () => {
    const Component = {
      template: `
                <div>
                  <Can  I = 'read' of = 'Plugin'>
                    <span></span>
                    <h1></h1>
                  </Can>
                  <button @click="updateAbility"></button>
                </div>
      `,
      methods: {
        updateAbility() {
          this.$ability.update([{
            action: 'read',
            subject: 'Provider'
          }]);
        }
      }
    };
    const wrapper = mount(Component, {
      localVue
    });
    it('use ability from plugin', () => {
      expect(wrapper.contains('h1')).to.equal(true);
    });
    it('update ability to provider', () => {
      wrapper.find('button').trigger('click');
      expect(wrapper.contains('h1')).to.equal(false);
    });
  });

  describe('Can component return single element when only have one element', () => {
    const Component = {
      template: `
                  <Can  I = 'read' of = 'Plugin'>
                    <h1></h1>
                  </Can>
      `
    };
    const wrapper = mount(Component, {
      localVue
    });
    it('use ability from plugin', () => {
      expect(wrapper.contains('h1')).to.equal(true);
    });
  });

  describe('Validation props', () => {
    const spy = chai.spy.on(console, 'error');

    it('prop no error', () => {
      const Component = {
        template: `
                    <Can do = 'update' on = 'Post'>
                      <h1></h1>
                    </Can>
        `
      };
      const wrapper = mount(Component, {
        localVue
      });
      spy.should.not.have.been.called();
    });

    it('prop no error', () => {
      const Component = {
        template: `
                    <Can I = 'update' this = 'Post'>
                      <h1></h1>
                    </Can>
        `
      };
      const wrapper = mount(Component, {
        localVue
      });
      spy.should.not.have.been.called();
    });

    it('lack action prop', () => {
      const Component = {
        template: `
                    <Can a = 'Plugin'>
                      <h1></h1>
                    </Can>
        `
      };
      const wrapper = mount(Component, {
        localVue
      });
      spy.should.have.been.called();
    });

    it('lack subject prop', () => {
      const Component = {
        template: `
                    <Can I = 'read'>
                      <h1></h1>
                    </Can>
        `
      };
      const wrapper = mount(Component, {
        localVue
      });
      spy.should.have.been.called();
    });
  });
});
