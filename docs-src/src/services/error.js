export function notFoundError(message) {
  return Object.assign(new Error(message), {
    code: 'NOT_FOUND'
  });
}
