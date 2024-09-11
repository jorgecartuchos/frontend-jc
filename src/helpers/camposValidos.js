export const camposValidos = (campos) => {
  return ["nombre", "correo", "asunto", "mensaje"].every((key) =>
    campos[key].trim()
  );
};
