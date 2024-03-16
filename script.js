let table = [];
let current_turn = 0;

const get_cell = (id) => {
    return document.querySelector(`#cell-${id}`);
};

const cell_clicked = (id) => {
    console.log(id);
};

const init_table = () => {
    let index = 0;
    const table = document.querySelector("#content-table");

    for (let i = 0; i < 3; i++) {
        table[i] = new Array(3);

        const row = document.createElement("tr");
        table.appendChild(row);
        for (let j = 0; j < 3; j++) {
            const current_index = index;

            const cell = document.createElement("td");
            row.appendChild(cell);
            cell.setAttribute("class", "cell");
            cell.setAttribute("id", `cell-${index}`);

            cell.onclick = () => {
                cell_clicked(current_index);
            };
            cell.innerHTML = "";

            table[i][j] = 0;

            index++;
        }
    }
};

window.onload = init_table;
