export function form() {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  // Adiciona um "ouvinte" para o evento de 'submit' do formulário
  form.addEventListener("submit", function (event) {
    // 1. Previne o comportamento padrão do formulário (que é recarregar a página)
    event.preventDefault();

    // 2. Cria um objeto com os dados do formulário
    const formData = new FormData(form);

    // 3. Usa a API 'fetch' para enviar os dados para a Netlify em segundo plano
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        // Quando a Netlify responde, verificamos se foi um sucesso
        if (response.ok) {
          // Se deu certo:
          // - Esconde o formulário
          form.classList.add("hidden");
          // - Mostra o card de agradecimento
          successMessage.classList.remove("hidden");
        } else {
          // Se deu errado, lança um erro para ser pego pelo .catch()
          throw new Error("Houve um problema com o envio do formulário.");
        }
      })
      .catch((error) => {
        // Se ocorrer qualquer erro na rede ou no envio, exibe um alerta
        console.error("Erro:", error);
        alert(
          "Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
        );
      });
  });
}
