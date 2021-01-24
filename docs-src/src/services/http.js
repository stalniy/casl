import config from '../config/app';

const identity = x => x;
const FORMATS = {
  json: JSON,
  raw: {
    parse: identity,
    stringify: identity,
  },
  txtArrayJSON: {
    parse(value) {
      const values = value.trim().replace(/[\r\n]+/g, ',');
      return JSON.parse(`[${values}]`);
    },
    stringify() {
      throw new Error('"txtArrayJSON" format is not serializable');
    },
  },
};

function http(url, options = {}) {
  const format = FORMATS[options.format || 'json'];

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method || 'GET', url);

    if (options.headers) {
      Object.keys(options.headers).forEach((name) => {
        xhr.setRequestHeader(name, options.headers[name]);
      });
    }

    xhr.onload = () => resolve({
      status: xhr.status,
      headers: {
        'content-type': xhr.getResponseHeader('Content-Type'),
      },
      body: format.parse(xhr.responseText),
    });
    xhr.ontimeout = xhr.onerror = reject; // eslint-disable-line no-multi-assign
    xhr.send(options.data ? format.stringify(options.data) : null);
  });
}

const inflightRequests = Object.create(null);
export function fetch(rawUrl, options = {}) {
  const url = options.absoluteUrl ? rawUrl : config.baseUrl + rawUrl;
  const method = options.method || 'GET';

  if (method !== 'GET') {
    return http(url, options);
  }

  inflightRequests[url] = inflightRequests[url] || http(url, options);

  if (options.cache === true) {
    return inflightRequests[url];
  }

  return inflightRequests[url]
    .then((response) => {
      delete inflightRequests[url];
      return response;
    })
    .catch((error) => {
      delete inflightRequests[url];
      return Promise.reject(error);
    });
}
