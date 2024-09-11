export const respuestasFormulario = (
  response,
  setMensaje,
  setIsModalVisible
) => {
  if (response?.status === 200) {
    setMensaje({ message: response.data.msg, status: 200 });
    setTimeout(() => setIsModalVisible(true), 500);
    setTimeout(() => setIsModalVisible(false), 15000);
  } else if (response?.status === 400) {
    setMensaje({ message: response.data.error, status: 400 });
  } else if (response?.status === 500) {
    setMensaje({ message: response.data.error, status: 500 });
  } else {
    setMensaje({
      message: "Error desconocido. Intenta más tarde",
      status: "Desconocido",
    });
  }
};
