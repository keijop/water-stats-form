const handleSubmit = (event) => {
  event.preventDefault();
  // console.log('submit')
  removeUnauthorizedMessage();
  const password = document.querySelector('input').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })
    .then((resp) => {
      if (resp.status === 401) {
        displayUnauhtorizedMessage();
      } else {
        window.location.href = '/home'; // redirect to home page
      }
    })
    .catch((err) => console.log('error in fetch: ', err));
};

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

const displayUnauhtorizedMessage = () => {
  const input = document.querySelector('#password');
  if (document.querySelector('p')) {
    input.focus();
    return;
  }
  const node = document.createElement('p');
  node.classList.add('notification', 'is-danger', 'is-light');
  const textnode = document.createTextNode('Vale salasõna');
  node.appendChild(textnode);
  const button = document.querySelector('.button');
  form.insertBefore(node, button);
  input.focus();
};

const removeUnauthorizedMessage = () => {
  document.querySelector('p')?.remove();
};
