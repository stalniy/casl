const FORMATS = {
  json: JSON
};

export function fetch(url, options = {}) {
  const format = FORMATS[options.format || 'json'];

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method || 'GET', url);
    xhr.onload = () => resolve(format.parse(xhr.responseText));
    xhr.ontimeout = xhr.onerror = reject;
    xhr.send(options.data ? format.stringify(options.data) : null);
  });
}
