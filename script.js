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
    for (let i = 0; i < 3; i++) {
        table[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            const current_index = index;
            const cell = get_cell(current_index);
            cell.onclick = () => {
                cell_clicked(current_index);
            };
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.border = "1px solid black";
            cell.innerHTML = "";

            table[i][j] = 0;

            index++;
        }
    }
};

window.onload = init_table;
