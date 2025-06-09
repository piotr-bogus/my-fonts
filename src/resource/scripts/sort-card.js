document.addEventListener('DOMContentLoaded', () => {
  const containerCard = document.querySelector('.container-card');
  const cards = [...document.querySelectorAll('.card')];

  cards.sort((a, b) => 
    a.querySelector('.title-card').textContent.toLowerCase()
      .localeCompare(b.querySelector('.title-card').textContent.toLowerCase())
  );

  containerCard.append(...cards);
});