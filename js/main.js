window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact_form')

  const thanksModal = (msg = 'Ваша заявка успешно отправлена и находится в обработке.') => {
    const div = document.createElement('div');
    div.classList.add("thanksModal")
    div.textContent = msg
    document.body.prepend(div);
    setTimeout(() => document.querySelector('.thanksModal').style.display = 'none', 4000);
  }

  const postData = async (formData) => {
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: jsonData,
      });

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      const data = await response.json();
      console.log("Sent:", data);
      thanksModal();
      form.reset()
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      thanksModal('Похоже что произошла ошибка на стороне сервера!')
    }
  };


  const showErrorMessage = (input, message) => {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error_message')) {
      error = document.createElement('div');
      error.classList.add('error_message');
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
  }
  const clearError = (input) => {
    let error = input.nextElementSibling;
    if (error && error.classList.contains('error_message')) {
      error.remove();
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email');
    const name = document.querySelector('#name');
    const phone = document.querySelector('#tel');
    const message = document.querySelector('#your_message');


    const validEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const validName = /^[a-zA-Zа-яА-ЯёЁґҐєЄіІїЇўЎ\s]{2,}$/;
    const validPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/;
    const validMessage = /^.{4,}$/;

    let isValid = true;

    if (!validEmail.test(email.value.trim())) {
      isValid = false;
      showErrorMessage(email, 'Пожалуйста правильно заполните email.');
    } else {
      clearError(email)
    }

    if (!validName.test(name.value.trim())) {
      isValid = false;
      showErrorMessage(name, 'Пожалуйста правильно заполните имя');
    } else {
      clearError(name)
    }

    if (!validPhone.test(phone.value.trim())) {
      isValid = false;
      showErrorMessage(phone, 'Пожалуйста введите телефон в формате +375 XX XXXXXXX');
    } else {
      clearError(phone)
    }

    if (!validMessage.test(message.value.trim())) {
      isValid = false;
      showErrorMessage(message, 'Пожалуйста введите сообщение');
    } else {
      clearError(message)
    }

    if (isValid) {
      const formData = new FormData(e.target);
      postData(formData);
    }
  })


  //Modal
  const modal = document.body.querySelector(".modal");
  const btn = document.body.querySelector(".open_modal");
  const cross = document.body.querySelector(".cross");

  const openModal = () => {
    btn.addEventListener('click', () => {
      modal.classList.add("display_block")
      document.body.classList.add("no_scroll")
    })

  }
  const closeModal = () => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove("display_block")
        document.body.classList.remove("no_scroll")
      }
    })

    cross.addEventListener('click', (e) => {
      modal.classList.remove("display_block")
      document.body.classList.remove("no_scroll")
    })
  }

  openModal()
  closeModal()
})