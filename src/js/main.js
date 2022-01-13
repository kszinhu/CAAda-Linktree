// Icons
const icons = {
  paper: "assets/social/paper.svg",
  book: "assets/social/book.svg",
  form: "assets/social/formularios-do-google.svg",
  stack_paper: "assets/social/stack_paper.svg",
  diploma: "assets/social/icons8-diploma-1-96.png",
};

/**
 * Properties
 *
 * - Type {String}
 * **Multiples**: When clicking the card a list appears with other links
 * **Single**: When clicking the card a link is opened
 *
 * - Title {String | Node}
 * The title of the card
 *
 * - Description {String | Node}
 * The description of the card
 *
 * - Link {String}
 * The link of the card
 *
 * - Icon {String}
 * Path to the icon of the card
 *
 * - Date {Date}
 * Until which date the card will be displayed
 */
const items = [
  {
    type: "single",
    title: "O que são atividades complementares?",
    description: `<span style="margin-left: 1px">
      Saiba mais sobre o que são atividades complementares, participando da <strong>Mesa Redonda</strong>.
    </span>`,
    link: "https://forms.gle/z6e1YZaMFWKrHSC2A",
    icon: icons.form,
    date: StringToDate("21/01/2022"),
  },
  {
    type: "single",
    title: "Representante no Conselho do Departamento",
    description: "Participe e faça parte do Conselho do Departamento!😊",
    link: "https://forms.gle/6Lw4hzMNXV4fKcb87",
    icon: icons.form,
    date: StringToDate("01/02/2022"),
  },
  {
    type: "single",
    title: "Carta Programa",
    description: '<span>Veja a Carta da Chapa <i>"Frances Allen"</i> 😀</span>',
    link: "https://drive.google.com/file/d/1tVL8LVXsfOQjZrYiolIgb18gNR5tJ3Q5/view?usp=sharing",
    icon: icons.paper,
  },
];

const getItems = (index) => items[index].link;

const createList = (local, items) => {
  const listitems = [];
  for (let i = 0; i < items.length; i++) {
    listitems.push(`<li style="margin: 1em">${items[i]}</li>`);
  }
  local.outerHTML = `<ul>${listitems.join("")}</ul>`;
};

/**
 * Converts a string to a date object
 *
 * @param {String} date
 * @returns
 */
function StringToDate(date) {
  var parts = date.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

/**
 * Check if the date is after today
 *
 * @param {date} date
 * @returns {boolean} If it's after today
 */
function isAfter(date) {
  const now = new Date();
  return now > date;
}

/**
 * check if the string is html
 *
 * @param {string} str
 * @returns {boolean} If it's html
 */
function isHTML(str) {
  var doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
}

/**
 * Renders cards that are not fixed
 */
const renderItems = () => {
  const local = document.getElementById("card-links-unfixed");

  items.forEach(({ type, title, description, link, icon, date }, index) => {
    if (date && isAfter(date)) return;

    const item = document.createElement("a");
    const handleItem = {
      single: () => {
        item.href = link;
        item.innerHTML = `
            <div class='cardLink_Icon'>
              <img
                alt='${title}'
                width='36px'
                height='36px'
                src='${icon}'
              />
            </div>
            <div class='cardLink_Text'>
              ${isHTML(title) ? title : `<h2>${title}</h2>`}
              ${
                isHTML(description)
                  ? description
                  : `<span>${description}</span>`
              }
            </div>`;
      },
      multiple: () => {
        item.id = isHTML(title) ? title : title.replace(/\s/g, "");
        item.onclick = createList(
          document.querySelector(`#${title}`),
          getitems(index)
        );
        item.style.cursor = "pointer";
        item.innerHTML = `
            <div class='cardLink_Icon'>
              <img 
                alt="${title}" 
                width="36px"
                height="36px"
                src="${icon}"
              />
            </div>
            <div class="cardLink_Text">
              ${isHTML(title) ? title : `<h2>${title}</h2>`}
              ${
                isHTML(description)
                  ? description
                  : `<span>${description}</span>`
              }
            </div>`;
      },
    };

    handleItem[type]();
    local.appendChild(item);
  });
};
