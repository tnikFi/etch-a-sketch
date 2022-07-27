function constructGrid(width, height) {
    let rows = [];
    for (var i = 0; i < height; i++) {
        let row = document.createElement("div");
        row.classList.add("grid-row");
        for (var j = 0; j < width; j++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.setAttribute("data-x", j);
            row.appendChild(cell);
        }
        row.setAttribute("data-y", i);
        rows.push(row);
    }
    return rows;
}

const container = document.querySelector("div.container");
let rows = constructGrid(50, 50);
rows.forEach(row => {
    container.appendChild(row);
});