import throttle from 'lodash.throttle';
const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener(
  'input',
  throttle(event => {
    event.preventDefault();
    const feedbackState = {
      email: emailInput.value,
      message: messageInput.value,
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackState));
  }, 500)
);

document.addEventListener('DOMContentLoaded', () => {
  const feedbackState =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

  if (feedbackState.email) {
    emailInput = feedbackState.email;
  }
  if (feedbackState.message) {
    messageInput = feedbackState.message;
  }
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const feedbackState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.removeItem(LOCALSTORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';

  console.log(feedbackState);
});
