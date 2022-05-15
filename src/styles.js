import jss from "jss";
import InterFont from "./fonts/InterSemiBold.ttf";

const style = {
  body: {
    margin: 0,
    background: "linear-gradient(180deg, rgba(255,247,205,1) 0%, rgba(205,124,49,1) 55%)",
  },
  "@font-face": {
    "font-family": "Inter",
    src: `url(${InterFont})`,
  },
  overlay: {
    position: "absolute",
    right: "2.5%",
    "margin-top": "2rem",
  },
  container: {
    background: "#FFECA8",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    padding: "1.5rem",
    "border-radius": "1rem",
    "box-shadow": "0px 2px 8px -1px rgba(112, 144, 176, 0.12)",
  },
  "energy-label": {
    color: "#F35E52",
    "font-family": "Inter, Helvetica, Arial, sans-serif",
    "font-weight": 600,
    margin: 0,
    "user-select": "none",
  },
  "background-bar": {
    background: "#FFF4CC",
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
    transition: "width 0.2s ease",
  },
  "endgame-overlay": {
    background: "#10101070",
    width: "100%",
    height: "100%",
    position: "absolute",
    "z-index": 1,
    "font-family": "Inter, Helvetica, Arial, sans-serif",
    color: "#FAFAFA",
    display: "grid",
    "font-size": "2rem",
    "place-items": "center",
    "text-align": "center",
    cursor: "pointer",
    display: "none",
  },
  "endgame-overlay-title": {
    margin: "4px"
  }
};

const sheet = jss.createStyleSheet(style);
const { classes } = sheet;

document.body.classList.add(classes.body);

document.body.innerHTML += `
  <div id="endgame-overlay" class="${classes["endgame-overlay"]}">
    <span>
      <h1 class="${classes["endgame-overlay-title"]}">Game over</h1>
      <p>Click to replay</p>
    </span>
  </div>

  <div class="${classes.overlay}">
    <div class="${classes["container"]}">
      <p class="${classes["energy-label"]}">Energy</p>
      <div class="${classes["background-bar"]}">
        <div id="energy-bar" class="${classes["energy-bar"]}"></div>
      </div>
    </div>
  </div>
`;

export { sheet };
