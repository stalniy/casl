import App from './components/App.js';
import AppRoot from './components/AppRoot.js';
import AppFooter from './components/AppFooter.js';
import AppHeader from './components/AppHeader.js';
import AppLink from './components/AppLink.js';
import AppMenu from './components/AppMenu.js';
import ArticleDetails from './components/ArticleDetails.js';
import Page from './components/Page.js';
import PageNav from './components/PageNav.js';
import HomePage from './components/HomePage.js';
import GithubButton from './components/GithubButton.js';
import NpmDownloadsButton from './components/NpmDownloadsButton.js';
import QuickSearch from './components/QuickSearch.js';
import LangPicker from './components/LangPicker.js';
import OneTimeDonations from './components/OneTimeDonations.js';
import PagesByCategories from './components/PagesByCategories.js';
import AppNotification from './components/AppNotification.js';
import MenuDrawer from './components/MenuDrawer.js';
import VersionsSelect from './components/VersionsSelect.js';
import OldVersionAlert from './components/OldVersionAlert.js';
import { locale, setLocale, defaultLocale } from './services/i18n.js';
import router from './services/router.js';
import { setRouteMeta } from './services/meta.js';

const components = [
  App,
  AppRoot,
  AppFooter,
  AppHeader,
  AppLink,
  AppMenu,
  ArticleDetails,
  Page,
  HomePage,
  PageNav,
  QuickSearch,
  LangPicker,
  GithubButton,
  NpmDownloadsButton,
  PagesByCategories,
  OneTimeDonations,
  AppNotification,
  MenuDrawer,
  VersionsSelect,
  OldVersionAlert,
];

export function bootstrap(selector) {
  const app = document.querySelector(selector);
  components.forEach(c => customElements.define(c.cName, c));
  let routeGeneration = 0;
  router.observe(async (route) => {
    const generation = ++routeGeneration;
    const lang = route.response.params.lang || defaultLocale;

    if (locale() !== lang) await setLocale(lang);
    if (generation !== routeGeneration) return;
    setRouteMeta(route);
    app.ready = true;
  });

  return app;
}
