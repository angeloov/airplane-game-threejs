import jss from "jss";

const style = {
  "@global": {
    body: {
      padding : "20px",
    }
  },
  ciao: {
    color: "blue",
    position: "absolute",
  },
};

const sheet = jss.createStyleSheet(style);

document.body.innerHTML += `
  <p class=${sheet.classes.ciao} id="score">Ciao!</p>
`;

export { sheet };
