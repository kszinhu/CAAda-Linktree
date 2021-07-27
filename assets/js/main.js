const getItems = (type) =>
  type == 1
    ? [
        '<a href="https://drive.google.com/drive/folders/1hAuNy1t7igJmjXoX-AV8-gs2VCxQ5sB?usp=sharing">Curto Circuito - BCC</a>',
        '<a href="https://drive.google.com/drive/folders/1xZN9_vZfBmjiba6qIAHGACKGXsdzIVX-?usp=sharing">Curto Circuito - BSI</a>',
        '<a href="https://drive.google.com/drive/folders/1bgm1JOemAyGVKChA2L4MGnKL3BZtAIyS?usp=sharing">Além da Sala de Aula - BCC</a>',
        '<a href="https://drive.google.com/drive/folders/1F7QUBuBr7UYoHcKGWPxyev00edxlUfLA?usp=sharing">Além da Sala de Aula - BSI</a>',
      ]
    : [
        '<a href="https://bit.ly/3zcpIqf">Workshop Web & React</a>',
        '<a href="https://bit.ly/3kgz1Rt">Workshop Data Science</a>'
      ];

const createList = (local, items) => {
  const listItems = [];
  for (let i = 0; i < items.length; i++) {
    listItems.push(`<li style="margin: 1em">${items[i]}</li>`);
  }
  local.outerHTML = `<ul>${listItems.join("")}</ul>`;
};
