import { Grid, Cell } from './Grid.ts'
import { color } from './color-scheme'

export interface ElementInterface {
	id: number
	name: string
	type: string
	content: any
	createdAt: number
}

export interface FolderInterface {
	name: string
	children: any
	createdAt: number
}

export class NavSystem {
	grid: Grid
	array: any
	data: Array<Folder | Element>
	canvas: HTMLCanvasElement
	width: number
	height: number
	cellWidth: number
	cellHeight: number
	constructor(grid: Grid, array: any, canvas: HTMLCanvasElement) {
		this.grid = grid
		this.array = array
		this.data = []
		this.canvas = canvas
		this.width = this.canvas.width
		this.height = this.canvas.height
		this.cellWidth = this.width / this.grid.cols
		this.cellHeight = this.height / this.grid.rows
	}

	arrayToData() { }

	update() { }

	mouseHover(e: MouseEvent) { }

	mouseClick(e: MouseEvent): Cell {
		const clickCell = this.detectCell(e)
		clickCell.toggleHighlight()
		this.grid.updateCell(clickCell)
		this.grid.focusCell = clickCell
		return clickCell
	}

	keyDown(e: KeyboardEvent) {
		this.grid.handleKeyboardEvent(e)
	}

	detectCell(e: MouseEvent): Cell {
		let x = e.offsetX
		let y = e.offsetY
		return (this.grid.cells as any).filter(cell => {
			return x >= cell.x * this.cellWidth &&
				x < (cell.x + 1) * this.cellWidth * cell.width &&
				y >= cell.y * this.cellHeight &&
				y < (cell.y + 1) * this.cellHeight * cell.height
		})[0]
	}

	render() {
		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')
		this.grid.cells.forEach(cell => {
			ctx.fillStyle = cell === this.grid.focusCell ? color.highlightTransparent : color.bg
			ctx.strokeStyle = cell === this.grid.focusCell || cell.highlight ? color.highlight : color.secondary
			ctx.lineWidth = cell === this.grid.focusCell ? 2 : .5
			ctx.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth * cell.width - .5, this.cellHeight * cell.height - .5)
			ctx.strokeRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth * cell.width - .5, this.cellHeight * cell.height - .5) // evite la superposition
		})
	}
}

export class Element implements ElementInterface {
	id: number
	name: string
	type: string
	content: any
	createdAt: number
	constructor(object: ElementInterface) {
		this.id = 0
		this.name = object.name
		this.type = object.type
		this.content = object.content
		this.createdAt = object.createdAt
	}
}

export class Folder implements FolderInterface {
	name: string
	children: any
	createdAt: number
	constructor(object: FolderInterface) {
		this.name = object.name
		this.children = object.children
		this.createdAt = object.createdAt
	}
}
