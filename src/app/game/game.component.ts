import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  rows: number = 10;
  cols: number = 10;
  grid: boolean[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.initGrid();
  }

  initGrid(): void {
    this.grid = Array.from({ length: this.rows }, () => 
      Array.from({ length: this.cols }, () => false)
    );
  }

  toggleCell(row: number, col: number): void {
    this.grid[row][col] = !this.grid[row][col];
  }

  nextGeneration(): void {
    let newGrid = this.grid.map(arr => [...arr]);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let aliveNeighbors = this.getAliveNeighbors(row, col);

        if (this.grid[row][col] && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
          newGrid[row][col] = false;
        } else if (!this.grid[row][col] && aliveNeighbors === 3) {
          newGrid[row][col] = true;
        }
      }
    }

    this.grid = newGrid;
  }

  getAliveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          count += this.grid[newRow][newCol] ? 1 : 0;
        }
      }
    }
    return count;
  }
}