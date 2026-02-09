const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData.email = (parsedData.email ?? '').trim();
    formData.message = (parsedData.message ?? '').trim();

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name !== 'email' && name !== 'message') return;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = formData.email.trim();
  const message = formData.message.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log({ email, message });
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
