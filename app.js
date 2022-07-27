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
    return cells;
}

const container = document.querySelector("div.container");
let cells = constructGrid(16, 16);
cells.forEach(cell => {
    container.appendChild(cell);
    console.log("Added")
});