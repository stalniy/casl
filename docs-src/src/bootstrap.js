import 'core-js/modules/web.immediate';
import App from './components/App';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import AppLink from './components/AppLink';
import AppMenu from './components/AppMenu';
import ArticleDetails from './components/ArticleDetails';
import Page from './components/Page';
import PageNav from './components/PageNav';
import HomePage from './components/HomePage';
import GithubButton from './components/GithubButton';
import PageSearch from './components/PageSearch';
import QuickSearch from './components/QuickSearch';
import LangPicker from './components/LangPicker';
import OneTimeDonations from './components/OneTimeDonations';
import PagesByCategories from './components/PagesByCategories';
import { locale, setLocale, defaultLocale } from './services/i18n';
import router from './services/router';
import { setRouteMeta } from './services/meta';

const components = [
  App,
  AppFooter,
  AppHeader,
  AppLink,
  AppMenu,
  ArticleDetails,
  Page,
  HomePage,
  PageNav,
  PageSearch,
  QuickSearch,
  LangPicker,
  GithubButton,
  PagesByCategories,
  OneTimeDonations,
];

export default function bootstrap(selector) {
  const app = document.querySelector(selector);
  components.forEach(c => customElements.define(c.cName, c));
  router.observe(async (route) => {
    const lang = route.response.params.lang || defaultLocale;

    if (locale() !== lang) {
      await setLocale(lang);
      app.ready = true;
    }

    setRouteMeta(route);
  });
}
