import jss from "jss";
import InterSemiBold from "./fonts/InterSemiBold.ttf";
import InterBold from "./fonts/Inter-Bold.ttf";

const style = {
  body: {
    margin: 0,
    background: "linear-gradient(180deg, rgba(255,247,205,1) 0%, rgba(205,124,49,1) 55%)",
  },
  "@font-face": {
    "font-family": "Inter",
    src: `url(${InterSemiBold})`,
    "font-weight": "500",
  },
  "@font-face": {
    "font-family": "Inter",
    src: `url(${InterBold})`,
    "font-weight": "600",
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
    padding: ".25rem 1.5rem",
    "border-radius": "1rem",
    "box-shadow": "0px 2px 8px -1px rgba(112, 144, 176, 0.12)",
  },
  label: {
    color: "#F35E52",
    "font-family": "Inter, Helvetica, Arial, sans-serif",
    "font-weight": 600,
    margin: 0,
    "user-select": "none",
    "text-transform": "uppercase",
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
    "font-weight": 600,
    color: "#FAFAFA",
    display: "grid",
    "font-size": "2rem",
    "place-items": "center",
    "text-align": "center",
    cursor: "pointer",
    display: "none",
  },
  "endgame-overlay-title": {
    margin: "4px",
  },
  distance: {
    "font-family": "Inter, Helvetica, Arial, sans-serif",
    "font-size": "1.25rem",
    color: "#101010",
    margin: 0,
  },
  "distance-container": {
    "text-align": "center",
  },
  separator: {
    background: "#FFF4CC",
    width: "4px",
    height: "50px",
    margin: "1rem",
    "border-radius": "1rem",
  },
  "travelled-distance": {
    "margin-top": 0,
    "margin-bottom": "25%",
    "font-size": "1.5rem",
    "text-transform": "uppercase"
  },
};

const sheet = jss.createStyleSheet(style);
const { classes } = sheet;

document.body.classList.add(classes.body);

document.body.innerHTML += `
  <div id="endgame-overlay" class="${classes["endgame-overlay"]}">
    <span>
      <h1 class="${classes["endgame-overlay-title"]}">Game over</h1>
      <p id="travelled-distance" class="${classes["travelled-distance"]}">You travelled </p>
      <p>Click to replay</p>
    </span>
  </div>

  <div class="${classes.overlay}">
    <div class="${classes["container"]}">
      <span class="${classes["distance-container"]}">
        <p id="meter-counter" class="${classes["distance"]}">33 meters</p>
        <p class="${classes["label"]}">Distance</p>
      </span>

      <div class="${classes["separator"]}"></div>
    
    
      <p class="${classes["label"]}">Energy</p>
      <div class="${classes["background-bar"]}">
        <div id="energy-bar" class="${classes["energy-bar"]}"></div>
      </div>
    </div>
  </div>
`;

export { sheet };
