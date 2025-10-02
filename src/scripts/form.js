export function form() {
  const form = document.getElementById("contact-form");
  const modalOverlay = document.getElementById("modal-overlay");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const phoneInput = document.getElementById("phone");

  // Adiciona um "ouvinte" para o evento de 'submit' do formulário
  form.addEventListener("submit", function (event) {
    // 1. Previne o comportamento padrão do formulário (que é recarregar a página)
    event.preventDefault();
    /*
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
    // - Mostra o card de agradecimento
    */
    modalOverlay.classList.remove("hidden");
    /*
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
    */
  });

  phoneInput.addEventListener("input", (event) => {
    // Pega o valor atual do campo, removendo tudo que não for número
    let value = event.target.value.replace(/\D/g, "");

    // Limita o valor a 11 dígitos (DDD + 9 dígitos)
    value = value.substring(0, 11);

    // Aplica a máscara dinamicamente
    if (value.length > 10) {
      // Formato para celular com 9 dígitos: (XX) XXXXX-XXXX
      event.target.value = value.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1) $2-$3",
      );
    } else if (value.length > 6) {
      // Formato para telefone fixo ou celular incompleto: (XX) XXXX-XXXX
      event.target.value = value.replace(
        /^(\d{2})(\d{4})(\d{0,4})$/,
        "($1) $2-$3",
      );
    } else if (value.length > 2) {
      // Formato para DDD incompleto: (XX) XXXX
      event.target.value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else {
      // Apenas o DDD sendo digitado
      event.target.value = value.replace(/^(\d*)/, "($1");
    }
  });

  btnCloseModal.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
  });
}
