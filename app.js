const clearChildren = parent => parent.querySelectorAll("*").forEach(child => child.remove());

const container = document.querySelector("div.container");
const sizeLabel = document.querySelector(".grid-size");
const positionLabel = document.querySelector(".grid-position")

function constructGrid(width, height) {
    let cells = [];
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.style.gridArea = `${i+1} / ${j+1}`;
            cell.setAttribute("data-x", j);
            cell.setAttribute("data-y", i);
            cells.push(cell);
        }
    }
    clearChildren(container);
    cells.forEach(cell => {
        container.appendChild(cell);
    })
}

constructGrid(16, 16);