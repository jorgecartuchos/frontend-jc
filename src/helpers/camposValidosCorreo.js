export const camposValidosCorreo = (campos) => {
  return ["nombre", "correo", "asunto", "mensaje"].every((key) =>
    campos[key].trim()
  );
};
