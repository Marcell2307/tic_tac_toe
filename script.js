let table = [];
let current_turn = 0;

const get_cell = (id) => {
	return document.querySelector(`#cell-${id}`);
};

const set_current_turn_text = () => {
	document.querySelector("#whose-turn").innerText = (current_turn == 0 ? "X" : "O") + "'s turn!";
}

const check_row = (row, value) => {
	let start_index = row * 3;

	if (table[start_index] == value && table[start_index + 1] == value && table[start_index + 2] == value) {
		return true;
	}

	return false;
}

const check_column = (column, value) => {
	let start_index = column;

	if (table[start_index] == value && table[start_index + 3] == value && table[start_index + 6] == value) {
		return true;
	}
	
	return false;
}

const check_cross = (variation, value) => {
	if (variation == 0) {
		if (table[0] == value && table[4] == value && table[8] == value) {
			return true;
		} else {
			return false;
		}
	} else if (variation == 1) {
		if (table[2] == value && table[4] == value && table[6] == value) {
			return true;
		} else {
			return false;
		}
	}

	return false;
}

const has_won = (value) => {
	if (check_row(0, value) || check_row(1, value) || check_row(2, value) || check_column(0, value) || check_column(1, value) || check_column(2, value) || check_cross(0, value) || check_cross(1, value)) {
		return true;
	}

	return false;
}

const is_draw = () => {
	let is_all_set = true;

	for (let i = 0; i < 9; i++) {
		if (table[i] == 0) is_all_set = false;
	}

	return is_all_set;
}

const cell_clicked = (id) => {
	if (table[id] == 0) {
		const to_be_placed = current_turn == 0 ? 1 : 2;

		table[id] = to_be_placed;

		const cell_element = document.querySelector(`#cell-${id}`);

		cell_element.innerText = current_turn == 0 ? "X" : "O";

		current_turn = !current_turn;
		set_current_turn_text();

		if (has_won(1)) {
			console.log("NYERT AZ X!");
		} else if (has_won(2)) {
			console.log("NYERT A O!");
		} else if (is_draw()) {
			console.log("DONTETLEN!");
		}
	}
};

const reset_game = () => {
	table.fill(0);

	current_turn = 0;
	set_current_turn_text();

	for (let i = 0; i < 9; i++) {
		const cell_element = document.querySelector(`#cell-${i}`);

		cell_element.innerText = "";
	}
}

const init_table = () => {
	let index = 0;
	const table_element = document.querySelector(".content-table");

	table = new Array(9);

	for (let i = 0; i < 9; i++) {
		const current_index = index;

		const cell = document.createElement("div");
		table_element.appendChild(cell);

		cell.setAttribute("class", "cell");
		cell.setAttribute("id", `cell-${index}`);

		cell.onclick = () => {
			cell_clicked(current_index);
		};
		cell.innerHTML = "";

		table[i] = 0;

		index++;
	}

	document.querySelector("#reset-button").onclick = reset_game;

	set_current_turn_text();
};

window.onload = init_table;

// AFK