import { prepareRoutes } from '@curi/router';

export function buildRoutes(rawRoutes, controllers) {
  return rawRoutes.map((rawRoute) => {
    const buildController = controllers[rawRoute.controller];

    if (!buildController) {
      throw new Error(`Did you forget to specify controller for route "${rawRoute.name}"?`);
    }

    const route = {
      name: rawRoute.name,
      path: rawRoute.path,
      extra: {
        restrictions: Object.entries(rawRoute.restrictions || {})
          .map(([name, pattern]) => [name, new RegExp(`^(?:${pattern})$`, 'i')]),
      },
      ...buildController(rawRoute),
    };

    if (rawRoute.meta?.encode === false) {
      // v9 accepts wildcard strings when encoding is disabled.
      route.pathOptions = { compile: { encode: false } };
    }

    if (rawRoute.children) {
      route.children = buildRoutes(rawRoute.children, controllers);
    }

    return route;
  });
}

export function prepareRestrictedRoutes(routes) {
  const prepared = prepareRoutes(routes);
  const fallback = prepareRoutes([routes.find(route => route.name === 'notFound')]);

  return {
    ...prepared,
    match(location) {
      const result = prepared.match(location);
      for (let route = result.route; route; route = route.parent) {
        const restrictions = route.extra?.restrictions || [];
        const invalid = restrictions.some(([name, pattern]) =>
          result.match.params[name] !== undefined && !pattern.test(result.match.params[name]));
        if (invalid) return fallback.match(location);
      }
      return result;
    },
  };
}
