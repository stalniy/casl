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

function closest(startNode, tagName) {
  let current = startNode;
  const maxIterations = 3;
  let i = 0;

  while (current && i < maxIterations) {
    if (current.tagName === tagName) {
      return current;
    }

    current = current.parentNode;
    i++;
  }

  return null;
}

export function tryToNavigateElement(root, target) {
  let hash;

  if (target.tagName[0] === 'H' && target.id) {
    hash = target.id;
  } else {
    const clickedTarget = closest(target, 'A');
    const hashIndex = clickedTarget ? clickedTarget.href.indexOf('#') : -1;

    if (hashIndex !== -1) {
      scrollToElement(root, clickedTarget.href.slice(hashIndex + 1));
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
