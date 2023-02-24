const cache = {};

function checkHistory(url) {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }
  
  return fetch(url)
    .then(response => {
      if (response.ok) {
        cache[url] = true;
      } else {
        cache[url] = false;
      }
      return cache[url];
    })
    .catch(error => {
      console.error(error);
      cache[url] = false;
      return false;
    });
}

const form = document.querySelector('form');
const historyList = document.querySelector('.history-list');
const bustedText = document.querySelector('.busted');

form.addEventListener('submit', event => {
  event.preventDefault();
  const url = document.querySelector('#input-url').value;
  checkHistory(url)
    .then(result => {
      const historyItem = document.createElement('li');
      historyItem.classList.add('history-item');
      historyItem.textContent = `${url} - ${result ? 'Exists' : 'Does not exist'}`;
     

      historyList.appendChild(historyItem);
    });
});
