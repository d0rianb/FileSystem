interface NeihboorObject {
	top?: Cell
	right?: Cell
	bottom?: Cell
	left?: Cell
}

export class Grid {
	rows: number
	cols: number
	cells: Array<Cell>
	focusCell: Cell
	constructor(cols: number, rows: number) {
		this.rows = rows
		this.cols = cols
		this.cells = []
		this.focusCell = null
		this.createCells()
		this.defineNeighboors()
	}

	createCells() {
		for (let col = 0; col < this.cols; col++) {
			for (let row = 0; row < this.rows; row++) {
				this.cells.push(new Cell(col, row))
			}
		}
	}

	updateCell(newCell: Cell) {
		if (!this.cells.includes(newCell)) return
		if (newCell.width !== 1 || newCell.height !== 1) {
			if (newCell.width > 1) {
				let range: number = newCell.width - 1
				let removeCell: Array<Cell> = this.cells.filter(cell => cell.y === newCell.y && cell.x > newCell.x && cell.x <= newCell.x + range)
				this.cells = this.cells.filter(cell => !removeCell.includes(cell))
			}
			if (newCell.height > 1) {
				let range: number = newCell.height - 1
				let removeCell: Array<Cell> = this.cells.filter(cell => cell.x === newCell.x && cell.y > newCell.y && cell.y <= newCell.y + range)
				this.cells = this.cells.filter(cell => !removeCell.includes(cell))
			}
		}
		this.defineNeighboors()
		this.cells[this.cells.indexOf(newCell)] = newCell
	}

	defineNeighboors() {
		this.cells.forEach(cell => {
			cell.neighboor.top = cell.y >= 1 ? this.cells.filter(othercell => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y - cell.height)[0] : null
			cell.neighboor.bottom = cell.y <= this.rows - 1 ? this.cells.filter(othercell => othercell.x <= cell.x && othercell.x + othercell.width > cell.x && othercell.y === cell.y + cell.height)[0] : null
			cell.neighboor.left = cell.x >= 1 ? this.cells.filter(othercell => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x - cell.width)[0] : null
			cell.neighboor.right = cell.x <= this.cols - 1 ? this.cells.filter(othercell => othercell.y <= cell.y && othercell.y + othercell.height > cell.y && othercell.x === cell.x + cell.width)[0] : null
		})
	}

	handleKeyboardEvent(e: KeyboardEvent) {
		if (!this.focusCell) return
		switch (e.code) {
			case 'ArrowUp':
			case 'KeyW':
				this.focusCell.neighboor['top'] ? this.focusCell = this.focusCell.neighboor['top'] : null
				break
			case 'ArrowDown':
			case 'KeyS':
			case 'Enter':
				this.focusCell.neighboor['bottom'] ? this.focusCell = this.focusCell.neighboor['bottom'] : null
				break
			case 'ArrowLeft':
			case 'KeyA':
				this.focusCell.neighboor['left'] ? this.focusCell = this.focusCell.neighboor['left'] : null
				break
			case 'ArrowRight':
			case 'KeyD':
				this.focusCell.neighboor['right'] ? this.focusCell = this.focusCell.neighboor['right'] : null
				break
		}
	}
}

export class Cell {
	x: number
	y: number
	width: number
	height: number
	highlight: boolean
	neighboor: NeihboorObject
	constructor(x: number, y: number, width = 1, height = 1) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.highlight = false
		this.neighboor = {}
	}

	toggleHighlight() {
		this.highlight = !this.highlight
	}
}
