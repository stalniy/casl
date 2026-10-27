/**
 * Tracks every worker of a registration (already waiting, already installing
 * and future ones) and reports each update at most once.
 */
export function watchRegistration(registration, container, config = {}) {
  const tracked = new WeakSet();
  const announced = new WeakSet();

  function announce(worker) {
    if (announced.has(worker)) return;
    announced.add(worker);

    if (container.controller) {
      if (config.onUpdate) config.onUpdate(worker);
    } else if (config.onSuccess) {
      config.onSuccess(worker);
    }
  }

  function track(worker) {
    if (!worker || tracked.has(worker)) return;
    tracked.add(worker);

    const check = () => {
      if (worker.state === 'installed') announce(worker);
    };
    worker.addEventListener('statechange', check);
    check();
  }

  track(registration.waiting);
  track(registration.installing);
  registration.addEventListener('updatefound', () => track(registration.installing));
}

/**
 * Reloads once when a new worker takes control of a page that was already
 * controlled. The first installation never reloads the page.
 */
export function reloadOnControllerChange(container, reload) {
  const wasControlled = !!container.controller;
  let isRefreshing = false;

  container.addEventListener('controllerchange', () => {
    if (!wasControlled || isRefreshing) return;
    isRefreshing = true;
    reload();
  });
}
