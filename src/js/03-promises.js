import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formProm = document.querySelector('.form');
formProm.addEventListener('submit', onFormSubmit)


function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay)
      })
    delay += step;
   }
}


  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const ObjektPromise = { position, delay };

    return new Promise((resolve, rejekt) => {

      if (shouldResolve) {
        resolve(ObjektPromise);
      } 
      rejekt(ObjektPromise);
    })
  }