const handleSubmit = (event) => {
  event.preventDefault();
  console.log('submit');
  const form = document.querySelector('form');
  const myFormData = new FormData(form);
  const myFormDataObject = {};
  for (const pair of myFormData.entries()) {
    myFormDataObject[pair[0]] = pair[1];
  }

  fetch('/water-stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(myFormDataObject),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log('error in fetch: ', err));

  displaySubmitMsg();
  document.querySelectorAll('input').forEach((element) => (element.value = ''));
};

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

const displaySubmitMsg = () => {
  const node = document.createElement('p');
  node.classList.add('notification', 'is-success', 'has-text-centered', 'mt-3');
  const textnode = document.createTextNode('Keijo tänab, veenäit edastatud!');
  node.append(textnode);
  document.querySelector('main').appendChild(node);
};
