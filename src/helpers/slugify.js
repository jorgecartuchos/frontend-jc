import slugifyLib from "slugify";

export const slugify = (text = "") =>
  slugifyLib(text, {
    lower: true,
    strict: true,
    locale: "es",
  });
