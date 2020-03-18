import router from '../services/router';

function scrollToElement(root, id) {
  const element = root.getElementById(id);

  if (!element) {
    return;
  }

  const headerHeight = 85;
  element.scrollIntoView(true);
  document.documentElement.scrollTop -= headerHeight;
}

export function tryToNavigateElement(root, target) {
  let hash;

  if (target.className === 'h-link') {
    hash = target.name;
  } else if (target.tagName[0] === 'H' && target.id) {
    hash = target.id;
  } else if (target.tagName === 'A') {
    const index = target.href.indexOf('#');

    if (index !== -1) {
      scrollToElement(root, target.href.slice(index + 1));
    }
  }

  if (hash) {
    const { location } = router.current().response;
    const url = `${location.pathname}${window.location.search}#${hash}`;
    router.navigate({ url });
    scrollToElement(root, hash);
  }
}

export function scrollToSectionIn(root) {
  const { hash } = router.current().response.location;

  if (hash) {
    scrollToElement(root, hash);
  } else {
    window.scroll(0, 0);
  }
}
