// Icons
const icons = {
  paper: "assets/social/paper.svg",
  book: "assets/social/book.svg",
  form: "assets/social/formularios-do-google.svg",
  stack_paper: "assets/social/stack_paper.svg",
  certificate: "assets/social/icons8-diploma-1-96.png",
};

/**
 * Properties
 *
 * - Type {String} !Required
 * **Multiples**: When clicking the card a list appears with other links
 * **Single**: When clicking the card a link is opened
 *
 * - Title {String | Node} !Required
 * The title of the card
 *
 * - Description {String | Node} !Required
 * The description of the card
 *
 * - Link {String} !Required
 * The link of the card
 *
 * - Icon {String} !Required
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
  local.classList.remove("hoverable");
  local.style = "";
  const listitems = Array.from(items).map((item) => createItem(item));
  const list = document.createElement("ul");
  list.style = "margin: 1em; width: 100%";
  list.innerHTML = listitems.map((item) => item.outerHTML).join("");
  local.innerHTML = list.outerHTML;
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
 * Creates a card item with the given properties
 *
 * @param {Object} Data
 * @returns {Node} The card
 */
function createItem({ title, description, icon, link }) {
  const item = document.createElement("a");
  item.id = title.replace(/\s/g, "");
  item.classList.add("hoverable");
  item.target = "_blank";
  link && (item.href = link);
  item.innerHTML = `
    <div class="cardLink_Icon">
      <img src="${icon}" alt="${title}" width='36px' height='36px'>
    </div>
    <div class='cardLink_Text'>
      ${isHTML(title) ? title : `<h2>${title}</h2>`}
      ${isHTML(description) ? description : `<span>${description}</span>`}
    </div>`;
  return item;
}

/**
 * Renders cards that are not fixed
 */
const renderItems = () => {
  const local = document.getElementById("card-links-unfixed");

  items.forEach(({ type, title, description, link, icon, date }, index) => {
    if (date && isAfter(date)) return;

    const handleItem = {
      single: () => createItem({ title, description, icon, link }),
      multiples: () => {
        const item = createItem({ title, description, icon });
        item.onclick = () => createList(item, getItems(index));
        return item;
      },
    };
    local.appendChild(handleItem[type]());
  });
};
