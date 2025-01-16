// На початку файлу
console.log("\u0421\u043A\u0440\u0438\u043F\u0442 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E");
console.log("\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 URL:", window.location.href);
console.log("\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0438 URL:", window.location.search);
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    console.log("\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0438 \u043F\u043E\u0448\u0443\u043A\u0443:", params.toString());
    const id = params.get('id');
    console.log("\u041E\u0442\u0440\u0438\u043C\u0430\u043D\u0438\u0439 ID:", id);
    return id;
}
// Функція для завантаження даних про виставку за ID
async function fetchExhibitionById(id) {
    try {
        const response = await fetch('http://localhost:3000/exhibitions/' + id); // Запит до API
        if (!response.ok) throw new Error(`HTTP \u{43F}\u{43E}\u{43C}\u{438}\u{43B}\u{43A}\u{430}! \u{421}\u{442}\u{430}\u{442}\u{443}\u{441}: ${response.status}`);
        const exhibition = await response.json();
        renderExhibition(exhibition);
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0430\u043D\u0438\u0445:", error);
        document.body.innerHTML = `<p style="color:red;">\u{41F}\u{43E}\u{43C}\u{438}\u{43B}\u{43A}\u{430} \u{437}\u{430}\u{432}\u{430}\u{43D}\u{442}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F} \u{434}\u{430}\u{43D}\u{438}\u{445}. \u{421}\u{43F}\u{440}\u{43E}\u{431}\u{443}\u{439}\u{442}\u{435} \u{43F}\u{456}\u{437}\u{43D}\u{456}\u{448}\u{435}.</p>`;
    }
}
// Функція для відображення виставки
function renderExhibition(exhibition) {
    const container = document.body; // Виведення прямо на сторінку
    container.innerHTML = `
      <h1>${exhibition.title}</h1>
      <img src="${exhibition.mainImage}" alt="${exhibition.title}" style="max-width: 100%; height: auto;">
      <p><strong>\u{414}\u{430}\u{442}\u{438}:</strong> ${exhibition.dates}</p>
      <p><strong>\u{41B}\u{43E}\u{43A}\u{430}\u{446}\u{456}\u{44F}:</strong> ${exhibition.location}</p>
      <p>${exhibition.description}</p>
      <h2>\u{414}\u{435}\u{442}\u{430}\u{43B}\u{44C}\u{43D}\u{430} \u{456}\u{43D}\u{444}\u{43E}\u{440}\u{43C}\u{430}\u{446}\u{456}\u{44F}</h2>
      <p>${exhibition.mainInfo}</p>
      <div>
        <h3>\u{417}\u{43E}\u{431}\u{440}\u{430}\u{436}\u{435}\u{43D}\u{43D}\u{44F}:</h3>
        ${[
        exhibition.image1,
        exhibition.image2,
        exhibition.image3,
        exhibition.image4,
        exhibition.image5,
        exhibition.image6
    ].filter(Boolean).map((img)=>`<img src="${img}" alt="Exhibition Image" style="max-width: 200px; margin: 5px;">`).join('')}
      </div>
    `;
}
// Отримання ID з URL та завантаження даних
const exhibitionId = getUrlParams();
if (exhibitionId) {
    console.log("ID \u0432\u0438\u0441\u0442\u0430\u0432\u043A\u0438:", exhibitionId); // Для перевірки
    fetchExhibitionById(exhibitionId);
} else {
    console.error("ID \u0432\u0438\u0441\u0442\u0430\u0432\u043A\u0438 \u043D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E \u0432 URL");
    document.body.innerHTML = `<p style="color:red;">ID \u{432}\u{438}\u{441}\u{442}\u{430}\u{432}\u{43A}\u{438} \u{43D}\u{435} \u{432}\u{43A}\u{430}\u{437}\u{430}\u{43D}\u{43E} \u{432} URL.</p>`;
}

//# sourceMappingURL=exhibition2.ec0095ef.js.map
