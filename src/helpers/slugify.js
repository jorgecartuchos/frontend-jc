export const slugify = (name) => {
  return name.toLowerCase().replace(/ /g, "-");
};
