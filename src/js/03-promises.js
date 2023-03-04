import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function createPromise({ position, currentDelay}) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, currentDelay });
      } else {
        reject({ position, currentDelay });
      }
    }, currentDelay);
  });
}


function onSubmit(e) {
   e.preventDefault();

   const { amount, delay, step } = e.currentTarget.elements;
   let currentDelay = Number(delay.value);
  for (let position = 1; position <= amount.value; position += 1) {

    createPromise({ position, currentDelay, amount, step })
      .then(({ position, currentDelay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${currentDelay}ms`);
      })
      .catch(({ position, currentDelay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${currentDelay}ms`);
      })
      currentDelay = currentDelay + Number(step.value);
  }
};

