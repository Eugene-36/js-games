document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid'),
    resultDisplay = document.querySelector('#result');

  let width = 15;
  let currentShooterIndex = 202;
  let currentInvaderIndex = 0;
  let alineInvadersTakenDown = [];
  let result = 0;
  let direction = 1;
  let invaderId;
  let goingRight = true;

  for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
  }

  const squares = Array.from(document.querySelectorAll('.grid div'));

  //define the alien invaders
  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  //draw the aline invaders
  alienInvaders.forEach((invader) =>
    squares[currentInvaderIndex + invader].classList.add('invader')
  );

  // Удаление захватчиков
  function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove('invader');
    }
  }

  //draw the shooter
  squares[currentShooterIndex].classList.add('shooter');

  //move the shooter along a line
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');

    switch (e.keyCode) {
      case 37:
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        break;

      case 39:
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
        break;
    }

    squares[currentShooterIndex].classList.add('shooter');
  }

  document.addEventListener('keydown', moveShooter);

  //move the alien invaders
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rigtEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;

    remove();

    if (rigtEdge && goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width + 1;
        direction = -1;
        goingRight = false;
      }
    }

    if (leftEdge && !goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width - 1;
        direction = 1;
        goingRight = true;
      }
    }
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction;
    }
    // for (let i = 0; i < alienInvaders.length - 1; i++) {
    //   squares[alienInvaders[i]].classList.remove('invader');
    // }

    // for (let i = 0; i < alienInvaders.length - 1; i++) {
    //   alienInvaders[i] += direction;
    // }

    for (let i = 0; i < alienInvaders.length - 1; i++) {
      if (!alineInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader');
      }
    }

    // decide a game is over
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplay.innerHTML = 'GAME OVER';
      squares[currentShooterIndex].classList.add('boom');
      clearInterval(invaderId);
    }

    //Отвечает за то, если Aliens проскочили шутера и датронулись до края
    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > squares.length) {
        resultDisplay.innerHTML = 'GAME OVER';
        clearInterval(invaderId);
      }
    }

    //decide a win

    if (alineInvadersTakenDown.length === alienInvaders.length - 1) {
      resultDisplay.innerHTML = 'YOU WIN';
      clearInterval(invaderId);
    }
  }
  invaderId = setInterval(moveInvaders, 500);

  //shoot at aliens
  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    //move the laser from the shooter to the alien Invander

    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser');
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add('laser');

      if (squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser');
        squares[currentLaserIndex].classList.remove('invader');
        squares[currentLaserIndex].classList.add('boom');

        setTimeout(
          () => squares[currentLaserIndex].classList.remove('boom'),
          250
        );
        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
        alineInvadersTakenDown.push(alienTakenDown);
        result++;
        resultDisplay.innerHTML = result;
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        setTimeout(
          () => squares[currentLaserIndex].classList.remove('laser'),
          100
        );
      }
    }

    // document.addEventListener('keyup', (e) => {
    //   //! ЕСЛИ БУДЕТ ОШИБКА, ТО ПОСМОТРИ ТУТ ! KeyboardEvent
    //   if (e.KeyboardEvent === 32) {
    //     laserId = setInterval(moveLaser, 100);
    //   }
    // });

    switch (e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100);
        break;
    }
  }

  document.addEventListener('keyup', shoot);
});
