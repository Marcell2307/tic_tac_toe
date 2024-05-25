let table = [];
let current_turn = 0;

let x_score = 0;
let o_score = 0;

const get_cell = (id) => {
	return document.querySelector(`#cell-${id}`);
};

const set_current_turn_text = () => {
	const current_turn_path = current_turn == 0 ? "cross.png" : "circle.png";
	document.querySelector("#whose-turn").innerHTML = `<img src="${current_turn_path}" width="30px">'s turn!`;
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

		// cell_element.innerText = current_turn == 0 ? "X" : "O";
		const current_turn_path = current_turn == 0 ? "cross.png" : "circle.png";
		cell_element.innerHTML = `<img src="${current_turn_path}" width="100px">`;

		current_turn = !current_turn;
		set_current_turn_text();

		const modal = document.querySelector("#modal");
		const winner_text = document.querySelector("#winner-text");
		const score_counter = document.querySelector("#score-counter");

		if (has_won(1)) {
			winner_text.innerHTML = `<img src="cross.png" width="30px"> has won the game!`;

			x_score++;
			
			modal.showModal();
		} else if (has_won(2)) {
			winner_text.innerHTML = `<img src="circle.png" width="30px"> has won the game!`;
			
			o_score++;
			
			modal.showModal();
		} else if (is_draw()) {
			winner_text.innerText = "Draw!";
			
			modal.showModal();
		}

		score_counter.innerText = `${x_score} : ${o_score}`;
	}
};

const reset_game = () => {
	table.fill(0);

	current_turn = Math.round(Math.random());
	set_current_turn_text();

	for (let i = 0; i < 9; i++) {
		const cell_element = document.querySelector(`#cell-${i}`);

		cell_element.innerText = "";
	}

	const modal = document.querySelector("#modal");

	modal.close();
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

setInterval(() => {alert("Touch grass.")}, 1000 * 60 * 10);

// AFK