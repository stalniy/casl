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
      throw new Error('"pson" format is not serializable');
    },
  },
};

export function fetch(rawUrl, options = {}) {
  const format = FORMATS[options.format || 'json'];

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = options.absoluteUrl ? rawUrl : config.baseUrl + rawUrl;

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
