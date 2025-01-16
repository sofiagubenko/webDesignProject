// На початку файлу
console.log('Скрипт запущено');
console.log('Поточний URL:', window.location.href);
console.log('Параметри URL:', window.location.search);

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    console.log('Параметри пошуку:', params.toString());
    const id = params.get('id');
    console.log('Отриманий ID:', id);
    return id;
}
  
  // Функція для завантаження даних про виставку за ID
  async function fetchExhibitionById(id) {
    try {
      const response = await fetch('http://localhost:3000/exhibitions/' + id); // Запит до API
      if (!response.ok) {
        throw new Error(`HTTP помилка! Статус: ${response.status}`);
      }
      const exhibition = await response.json();
      renderExhibition(exhibition);
    } catch (error) {
      console.error('Помилка завантаження даних:', error);
      document.body.innerHTML = `<p style="color:red;">Помилка завантаження даних. Спробуйте пізніше.</p>`;
    }
  }
  
  // Функція для відображення виставки
  function renderExhibition(exhibition) {
    const container = document.body; // Виведення прямо на сторінку
    container.innerHTML = `
      <h1>${exhibition.title}</h1>
      <img src="${exhibition.mainImage}" alt="${exhibition.title}" style="max-width: 100%; height: auto;">
      <p><strong>Дати:</strong> ${exhibition.dates}</p>
      <p><strong>Локація:</strong> ${exhibition.location}</p>
      <p>${exhibition.description}</p>
      <h2>Детальна інформація</h2>
      <p>${exhibition.mainInfo}</p>
      <div>
        <h3>Зображення:</h3>
        ${[exhibition.image1, exhibition.image2, exhibition.image3, exhibition.image4, exhibition.image5, exhibition.image6]
          .filter(Boolean)
          .map((img) => `<img src="${img}" alt="Exhibition Image" style="max-width: 200px; margin: 5px;">`)
          .join('')}
      </div>
    `;
  }
  
  // Отримання ID з URL та завантаження даних
  const exhibitionId = getUrlParams();
  if (exhibitionId) {
    console.log('ID виставки:', exhibitionId); // Для перевірки
    fetchExhibitionById(exhibitionId);
  } else {
    console.error('ID виставки не вказано в URL');
    document.body.innerHTML = `<p style="color:red;">ID виставки не вказано в URL.</p>`;
  }
  