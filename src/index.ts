import { NavSystem } from './NavSystem.ts'
import { Grid } from './Grid.ts'

const main: HTMLMainElement = document.querySelector('main')
const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

main.appendChild(canvas)

let tempData = {
	name: 'Test Name',
	createdAt: Date.now(),
	data: [
		{
			name: 'test element name',
			content: 'test content',
			type: 'text/plain',
			createdAt: Date.now()
		},
		{
			name: 'test element 2 name',
			content: 'test 2 content',
			type: 'text/plain',
			createdAt: Date.now() + 1
		}
	]

}

let fs = new NavSystem(new Grid(5, 25), tempData, canvas)
fs.render()

window.addEventListener('mousemove', e => fs.mouseHover(e))
window.addEventListener('mousedown', e => fs.mouseClick(e))
window.addEventListener('keydown', e => fs.keyDown(e))
window.setInterval(() => fs.render(), 1000 / 30)

console.log(fs)
