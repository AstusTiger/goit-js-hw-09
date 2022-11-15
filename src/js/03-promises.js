import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const firstDelayRef = formRef.querySelector('input[name="delay"]');
const stepRef = formRef.querySelector('input[name="step"]');
const amountRef = formRef.querySelector('input[name="amount"]');

// formRef.addEventListener('submit', async e => {
//   e.preventDefault();
//   const firstDelay = firstDelayRef.value;
//   const step = stepRef.value;
//   const amount = amountRef.value;

//   for (let i = 0; i < amount; i++) {
//     try {
//       const result = await createPromise(i, i === 0 ? firstDelay : step);
//       Notiflix.Notify.success(
//         `Fulfiled promise ${result.position + 1} in ${
//           +firstDelay + result.position * +step
//         } ms`
//       );
//     } catch (e) {
//       Notiflix.Notify.failure(
//         `Reject promise ${e.position + 1} in ${
//           +firstDelay + e.position * +step
//         } ms`
//       );
//     }
//   }
// });

formRef.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = firstDelayRef.value;
  const step = stepRef.value;
  const amount = amountRef.value;

  for (let i = 0; i < amount; i++) {
    const delay = +firstDelay + i * +step;
    createPromise(i, delay)
      .then(result =>
        Notiflix.Notify.success(
          `Fulfiled promise ${result.position + 1} in ${result.delay} ms`
        )
      )
      .catch(e =>
        Notiflix.Notify.failure(
          `Reject promise ${e.position + 1} in ${e.delay} ms`
        )
      );
  }

  formRef.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}
