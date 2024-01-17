const width = 9, height = 6,
symbol = { 0: 'blue', 1: 'red'};

let board2D, currentRow, turn, player;
game = document.querySelector('.board'),
preBoard = document.querySelector('.pre'),
winner = document.querySelector('.win span'),
btn = document.getElementsByTagName('button')[0];

for (let i = 0; i < width; i++)
preBoard.append(document.createElement('span'));

for (let i = 0; i < width * height; i++)
game.append(document.createElement('span'));

let pre = document.querySelectorAll('.pre span'),
board = document.querySelectorAll('.board span');

init();

pre.forEach((i, idx) => {
  i.onmouseover = _ => i.style.opacity = '0.5';
  i.onmouseout = _ => i.style.opacity = '0';
  i.onclick = _ => swapTurn(idx);
});

board.forEach((i, idx) => {
  i.onmouseover = _ => pre[idx % width].style.opacity = '0.5';
  i.onmouseout = _ => pre[idx % width].style.opacity = '0';

  i.onclick = _ => swapTurn(idx);
});

btn.onclick = _ => {
  init();
  winner.parentElement.style.opacity = '0';
  board.forEach(i => i.classList.remove(symbol[0], symbol[1]));
  game.style.pointerEvents = 'auto';
};

function init () {
  board2D = new Array(height).fill('').map(_ => new Array(width).fill('')),
  currentRow = new Array(width).fill(1),
  turn = 0,
  pre.forEach(i => i.classList.add(symbol[turn + 1]));
}

function swapTurn (idx) {
  let col = idx % width;
    
  if (currentRow[col] <= height) {
    let row = height - currentRow[col]++,
    linear = width * (row) + col;
    player = turn++ % 2 == 0 ? 1 : 0;

    board2D[row][col] = player;
    board[linear].classList.add(symbol[player]);

    pre.forEach(j => {
      j.classList.toggle('red');
      j.classList.toggle('blue');
    });

    if (win(row, col)) {
      winner.classList.add(symbol[player]);
      winner.parentElement.style.opacity = '1';
      game.style.pointerEvents = 'none';
    }
  }
}

function win (r, c) {
  if (turn >= 7) {
    let  max = 0, ctrR = 0, ctrC = 0, ctrD = 0, ctrDr = 0;
    
    for (let i = r; i <= r + 3; i++)
      if (i >= 0 && i < height)
        if (board2D[i][c] === player) ctrR++;
        else break;

    for (let i = c - 3; i <= c + 3; i++)
      if (i >= 0 && i < width)
        if (board2D[r][i] === player) ctrC++
        else {
          max = max > ctrC ? max : ctrC;
          ctrC = 0;
        }

    d = -3;
    for (let i = r - 3; i <= r + 3; i++) {
      col = c + d++;
      if (i >= 0 && i < height && col >= 0 && col < width)
        if (board2D[i][col] === player) ctrD++
        else {
          max = max > ctrD ? max : ctrD;
          ctrD = 0;
      }
    }
    
    dr = 3;
    for (let i = r - 3; i <= r + 3; i++) {
      col = c + dr--;
      if (i >= 0 && i < height && col >= 0 && col < width)
        if (board2D[i][col] === player) ctrDr++
        else {
          max = max > ctrDr ? max : ctrDr;
          ctrDr = 0;
      }
    }

    if (Math.max(max, ctrR, ctrC, ctrD, ctrDr) >= 4)
      return true;
  }
  return false;
}
