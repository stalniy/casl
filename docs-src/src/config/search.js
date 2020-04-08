function extractField(object, fieldName) {
  switch (fieldName) {
    case 'summary':
      return object.meta ? object.meta.description : null;
    case 'headings':
      return object[fieldName].map(h => h.title).join(' ');
    default:
      return object[fieldName];
  }
}

export default {
  extractField,
  fields: ['title', 'headings', 'summary'],
  searchOptions: {
    boost: {
      title: 2,
    },
  },
};
