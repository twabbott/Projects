const HEIGHT = 500;
const pageConsole = document.getElementById("page-console");
pageConsole.style.height = `${HEIGHT}px`;

export function writeLine(text) {
  const newLine = document.createElement("div");
  newLine.innerText = text;
  pageConsole.appendChild(newLine);
  pageConsole.scrollTop = pageConsole.scrollHeight - HEIGHT;
}
