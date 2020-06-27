export function parse(querystring) {
  return querystring
    ? JSON.parse(`{"${querystring.replace(/&/g, '","').replace(/=/g, '":"')}"}`)
    : {};
}

export function stringify(querystring) {
  if (!querystring) {
    return '';
  }

  return Object.keys(querystring)
    .reduce((qs, key) => {
      qs.push(`${key}=${querystring[key]}`);
      return qs;
    }, [])
    .join('&');
}
