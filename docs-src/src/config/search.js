function extractField(object, fieldName) {
  switch (fieldName) {
    case 'summary':
      return object.meta?.description;
    case 'headings':
      return object[fieldName]?.map(h => h.title).join(' ');
    case 'keywords':
      return object.meta?.keywords;
    default:
      return object[fieldName];
  }
}

export default {
  extractField,
  fields: ['title', 'headings', 'keywords', 'summary'],
  storeFields: ['title', 'url'],
  searchOptions: {
    boost: {
      title: 2,
    },
  },
};
