export const strContains = (name, searchString) => {
  return name.toLowerCase().includes(searchString.toLowerCase()) ? true : false;
};
