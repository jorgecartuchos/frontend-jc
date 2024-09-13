export const camposValidosWhatsApp = (campos) => {
  return ["nombre", "asunto", "mensaje"].every((key) => campos[key].trim());
};
