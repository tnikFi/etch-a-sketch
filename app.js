const clearChildren = parent => parent.querySelectorAll("*").forEach(child => child.remove());

const root = document.querySelector(":root");
const container = document.querySelector("div.container");
const sizeLabel = document.querySelector(".grid-size");
const positionLabel = document.querySelector(".grid-position")
const penColorPicker = document.querySelector("#pen-color");
const backgroundColorPicker = document.querySelector("#background-color");
const gridEnabled = document.querySelector("#show-grid")
const gridSizeSlider = document.querySelector("#grid-size");

let mouseIsDown = false
let penColor = null;

function setPositionLabel(x, y) {
    positionLabel.innerText = `${x}, ${y}`;
}

function watchBackgroundColorPicker(e) {
    root.style.setProperty("--background-color", this.value);
}

function watchPenColorPicker(e) {
    root.style.setProperty("--hover-color", this.value);
    penColor = this.value;
}

function drawCell(cell) {
    if (!cell.classList || !cell.classList.contains("grid-cell")) return;
    cell.classList.add("draw");
    cell.style.backgroundColor = penColor;
}

function onCellHover(e) {
    if (mouseIsDown) {
        drawCell(this);
    }
    this.classList.add("hover");
    setPositionLabel(this.getAttribute("data-x"), this.getAttribute("data-y"))
}

function onCellOut(e) {
    this.classList.remove("hover");
}

function constructGrid(width, height) {
    let cells = [];
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.style.gridArea = `${i+1} / ${j+1}`;
            cell.setAttribute("data-x", j+1);
            cell.setAttribute("data-y", i+1);
            cells.push(cell);
        }
    }
    clearChildren(container);
    cells.forEach(cell => {
        container.appendChild(cell);
        cell.addEventListener("mouseover", onCellHover);
        cell.addEventListener("mouseout", onCellOut);
        cell.addEventListener("click", e => {
            drawCell(e.target);
        });
    })
    sizeLabel.innerText = `${width} × ${height}`
}

window.addEventListener("mousedown", e => {
    if (e.button == 0) {
        mouseIsDown = true;
    }
})

window.addEventListener("mouseup", e => {
    if (e.button == 0) {
        mouseIsDown = false;
    }
})

penColorPicker.addEventListener("input", watchPenColorPicker);
penColorPicker.addEventListener("change", watchPenColorPicker);

backgroundColorPicker.addEventListener("input", watchBackgroundColorPicker);
backgroundColorPicker.addEventListener("change", watchBackgroundColorPicker);

gridEnabled.addEventListener("input", e => {
    if (e.target.checked) {
        root.style.setProperty("--grid-gap", "1px");
    } else {
        root.style.setProperty("--grid-gap", "0px");
    }
})

gridSizeSlider.addEventListener("input", e => {
    constructGrid(e.target.value, e.target.value);
})

constructGrid(16, 16);