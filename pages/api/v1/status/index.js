function status(request, response) {
  response.status(200).json({ mensagem: "mensagem de teste" });
}

export default status;
