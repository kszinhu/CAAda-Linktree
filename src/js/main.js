// Icons
const icons = {
  paper: "assets/social/paper.svg",
  book: "assets/social/book.svg",
  form: "assets/social/formularios-do-google.svg",
  stack_paper: "assets/social/stack_paper.svg",
  certificate: "assets/social/icons8-diploma-1-96.png",
  event: "assets/social/event.svg",
  heart: "assets/social/icons8-heart-96.png",
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
 * 
 * - Important {Boolean}
 * If the card is important appears with a red border
 */
const items = [
  {
    type: 'single',
    title: "Certificados de Filiação Temporária",
    description: "Faça download do seu certificado 👌",
    link: "https://shortest.link/certificados-festa-junina-afiliacao-2022",
    icon: icons.certificate,
    date: StringToDate("01/05/2023"),
  },
  {
    type: "multiples",
    title: "Certificados Curto Circuitos",
    description: "Faça download dos certificados dos curto circuitos 🥳",
    link: [
      {
        title: "Certificado Participante",
        description: "Certificados referente aos participantes",
        icon: icons.certificate,
        link: 'https://drive.google.com/drive/folders/11jW__7jNkuI6gHHwi6UCcad_DGIPwDSD?usp=sharing',
      },
      {
        title: "Certificado Palestrante",
        description: "Certificados referente aos palestrantes",
        icon: icons.certificate,
        link: 'https://drive.google.com/drive/folders/1PJCgEiM_i7X_Y_G6aGas00G8BkZF_TEs?usp=sharing',
      }
    ],
    icon: icons.certificate,
    date: StringToDate("06/08/2022"),
  },
  {
    type: "single",
    title: "Quadrilha Festa Junina - 2022",
    description: "Inscrição para a Quadrilha na Festa Junina - Contabiliza AC",
    link: 'https://forms.gle/Z2uk97kwMwGXZ89F7',
    icon: icons.form,
    date: StringToDate("25/06/2022"),
  },
  {
    type: "single",
    title: "Machine Learning School for Materials",
    description: "Venha conhecer a área de Machine Learning para materiais",
    link: "https://pages.cnpem.br/MLSchool/",
    icon: icons.event,
    date: StringToDate("31/07/2022"),
  },
  {
    type: "single",
    title: "Processo de entrada FAAC WebTV",
    description: "Preencha e faça parte do FAAC WebTV. 🥳",
    link: "https://docs.google.com/forms/d/1OM-4keQZYtfnGn5WN3_wr6lWZ3dGh2Bzmo0YXiYbGL8/viewform?edit_requested=true",
    icon: icons.form,
  },
  {
    type: "single",
    title: "Carta Programa",
    description: '<span>Veja a Carta da Chapa <i>"Larry Tesler"</i> 😀</span>',
    link: "https://shortest.link/CartaPrograma-LarryTesler",
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
function createItem({ title, description, icon, link, important }) {
  const item = document.createElement("a");
  item.id = title.replace(/\s/g, "");
  item.classList.add("hoverable");
  item.target = "_blank";

  important && item.classList.add("important-card");
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

  items.forEach(({ type, title, description, link, icon, date, important }, index) => {
    if (date && isAfter(date)) return;

    const handleItem = {
      single: () => createItem({ title, description, icon, link, important }),
      multiples: () => {
        const item = createItem({ title, description, icon, important });
        item.onclick = () => createList(item, getItems(index));
        return item;
      },
    };
    local.appendChild(handleItem[type]());
  });
};

const changeEntity = ({ name, type }) => {
  document.getElementById("entity-name").innerHTML = name;
  document.getElementById("entity-class").innerHTML = type;
}

/**
 * Render a card with x and y position toggling a each hover on button
 */
const renderIsadoraCard = () => {
  const local = document.getElementById("birthdate-isadora");

  local.style = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;";
  local.onclick = () => {
    // Added a new card with two buttons accept and reject with a text and a image
    local.innerHTML = `
      <div class="cardLink_Icon">
        <img src="/assets/img/isadora-with-me.png" alt="Isadora" />
      </div>
      <div class='cardLink_Text'>
        <h2>Isadora</h2>
        <p>Você gostaria de casar comigo?</p>
        <div class="buttons">
          <button id="accept-button-commemorative"  class="accept">Aceito</button>
          <button id="reject-button-commemorative" class="reject">Recuso</button>
        </div>
      </div>
    `;

    // Added a new button to reject the proposal
    const rejectButton = document.getElementById("reject-button-commemorative");
    rejectButton.onmouseover = () => {
      // change a local position randomly
      local.style = `position: absolute; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; transform: translate(-50%, -50%); z-index: 2;`;
    };

    // Added a new button to accept the proposal
    const acceptButton = document.getElementById("accept-button-commemorative");
    acceptButton.onclick = () => {
      // open a new tab with a maps
      window.open("https://www.google.com.br/maps/place/N%C3%A3o+me+importo+quanto+aonde+vamos+estar+se+estaremos+juntos,+mas+farei+de+tudo+por+voc%C3%AA.+Te+amo+muito.+Com+amor+Cassiano/@1.1523615,73.2391621,7.63z/data=!4m8!3m7!1s0x3b4a7510768e3ca5:0xfc332882e5472b6d!5m2!4m1!1i2!8m2!3d0.847621!4d73.4071712", "_blank");
    };

  }
};