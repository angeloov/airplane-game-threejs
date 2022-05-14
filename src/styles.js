import jss from "jss";
import backgroundImage from "./assets/background.png";
import InterFont from "./fonts/InterSemiBold.ttf";

const style = {
  body: {
    "background-image": `url(${backgroundImage})`,
  },
  "@font-face": {
    "font-family": "Inter",
    src: `url(${InterFont})`,
  },
  overlay: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
    "margin-top": "2rem",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
  "energy-label": {
    color: "#F35E52",
    "font-family": "Inter, Helvetica, Arial, sans-serif",
    "font-weight": 600,
  },
  "background-bar": {
    background: "#FFE380",
    height: "16px",
    width: "200px",
    "margin-left": "1rem",
    display: "flex",
    "justify-content": "left",
    "border-radius": "8px",
  },
  "energy-bar": {
    height: "16px",
    width: "200px",
    background: "#F35E52",
    "border-radius": "8px",
    "transition": "width 0.2s ease"
  },
};

const sheet = jss.createStyleSheet(style);
const { classes } = sheet;

document.body.classList.add(classes.body);

document.body.innerHTML += `
  <div class="${classes.overlay}">
    <p class="${classes["energy-label"]}">Energy</p>
    <div class="${classes["background-bar"]}">
      <div id="energy-bar" class="${classes["energy-bar"]}"></div>
    </div>
  </div>
`;

export { sheet };
