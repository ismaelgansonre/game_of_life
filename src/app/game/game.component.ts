import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
  @ViewChild('gameGrid') gameGrid!: ElementRef;
  gameInterval: any;

  ngAfterViewInit() {
    const gridElement = this.gameGrid.nativeElement;
  
    // Créer les cellules de la grille
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => cell.classList.toggle('alive'));
      gridElement.appendChild(cell);
    }
  }
  

  startGame() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    } else {
      this.gameInterval = setInterval(() => this.updateGrid(), 500);
    }
  }
  
  private updateGrid() {
    const gridElement = this.gameGrid.nativeElement;
    const newGridState = [];
  
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cellIsAlive = this.isCellAlive(x, y);
        const aliveNeighbors = this.countAliveNeighbors(x, y, gridElement);
  
        if (cellIsAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
          newGridState.push(true);
        } else if (!cellIsAlive && aliveNeighbors === 3) {
          newGridState.push(true);
        } else {
          newGridState.push(false);
        }
      }
    }
  
    newGridState.forEach((state, index) => {
      const cell = gridElement.children[index];
      cell.classList.toggle('alive', state);
    });
  }
  
  private isCellAlive(x: number, y: number): boolean {
    const gridElement = this.gameGrid.nativeElement;
    return gridElement.children[y * 10 + x].classList.contains('alive');
  }
  
  private countAliveNeighbors(x: number, y: number, gridElement: any): number {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const neighborX = x + dx;
        const neighborY = y + dy;
        if (neighborX >= 0 && neighborX < 10 && neighborY >= 0 && neighborY < 10) {
          if (gridElement.children[neighborY * 10 + neighborX].classList.contains('alive')) {
            count++;
          }
        }
      }
    }
    return count;
  }
  
  

  resetGame() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  
    const cells = this.gameGrid.nativeElement.children;
    for (const cell of cells) {
      cell.classList.remove('alive');
    }
  }
  

  // Additional game logic methods
  // ...
}