const board = document.querySelector('.board');


// constant(like PI math constants not const declared) variables
const keyMap = {
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,
  LEFT: 37,
};

const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;

class Obstacle {
  element;
  x;
  y;
  width;
  height;

  constructor(x, y, width, height, position = 'top') {
    this._createElement();

    this.x = x;
    this.y = y;
    if (position === 'bottom') {
      this.y = MAP_HEIGHT - height - y;
    }
    this.width = width;
    this.height = height;

    this._setPosition();
  }

  _createElement() {
    this.element = document.createElement('div');
    this.element.classList.add('obstacle');
    board.appendChild(this.element);
  }

  _setPosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }

  remove() {
    this.element.remove();
  }
}

function randomGeneratedObstacles(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const obstacles = [
  new Obstacle(100, 0, 20, randomGeneratedObstacles(60, 400)),
  new Obstacle(200, 0, 20, randomGeneratedObstacles(60, 400), 'bottom'),
  new Obstacle(300, 0, 20, randomGeneratedObstacles(60, 400)),
  new Obstacle(400, 0, 20, randomGeneratedObstacles(60, 400), 'bottom'),
  new Obstacle(500, 0, 20, randomGeneratedObstacles(60, 400)),
  new Obstacle(600, 0, 20, randomGeneratedObstacles(60, 400), 'bottom'),
  new Obstacle(700, 0, 20, randomGeneratedObstacles(60, 400)),
  new Obstacle(800, 0, 20, randomGeneratedObstacles(60, 400), 'bottom'),
  new Obstacle(900, 0, 20, randomGeneratedObstacles(60, 400)),
];

// const finishLine = document.querySelector('.finish-line');

class Player {
  element = document.querySelector('.player');
  x = 0;
  y = 0;
  width = PLAYER_WIDTH;
  height = PLAYER_HEIGHT;
  lives = 3;

  // when new Player is called, `this` is created
  constructor() {
    // console.log(this.element)
    this._initMovement();
  }

  _initMovement() {
    document.addEventListener('keydown', this._handleMovement.bind(this));
  }

  _handleMovement(event) {
    switch (event.keyCode) {
      case keyMap.TOP: {
        this.moveTop();
        break;
      }
      case keyMap.RIGHT: {
        this.moveRight();
        break;
      }
      case keyMap.BOTTOM: {
        this.moveBottom();
        break;
      }
      case keyMap.LEFT: {
        this.moveLeft();
        break;
      }
    }

    if (this._isCollided()) {
      this.moveLeft();
      this._updateLives();
      
      // this._resetPosition();
    }

    // if (this._winCondition()) {
    //   alert('You Won!');
    //   this._updateLives();
    //   this._resetPosition();
    // }
  }

  _updateLives() {
    this.lives = this.lives - 1;
    if (this.lives < 1) {
      alert('Game Over!');
      this._resetPosition();
      this.lives = 3;
    } else {
      alert('1 life lost');
      
    }
    document.querySelector('.player-lives').innerHTML = `LIVES: ${this.lives}`;
  }

  _resetPosition() {
    this.x = 0;
    this.y = 0;
    this._updatePosition();
  }

  _isCollided() {
    for (let i = 0; i < obstacles.length; i++) {
      if (isCollision(this, obstacles[i])) {
        
        return true;
      }
    }

    return false;
  }
  
  // Win Condition
  
  // _winCondition() {
  //   if (isCollision(this, finishLine)) {
  //     return true;
  //   }
  //   return false;
  // }

  moveTop() {
    const newY = this.y - PLAYER_MOVE_STEP;

    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveRight() {
    const newX = this.x + PLAYER_MOVE_STEP;

    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  moveBottom() {
    const newY = this.y + PLAYER_MOVE_STEP;

    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveLeft() {
    const newX = this.x - PLAYER_MOVE_STEP;

    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  _updatePosition() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }

  _isMoveInBoundaries(x, y) {
    if (y < 0) {
      return false;
    }

    if (x < 0) {
      return false;
    }

    if (x > MAP_WIDTH - PLAYER_WIDTH) {
      return false;
    }

    if (y > MAP_HEIGHT - PLAYER_HEIGHT) {
      return false;
    }

    return true;
  }
}


const p1 = new Player();

// const pl = {
//   key: 'player',
//   test: function() {
//     console.log('test is called')
//   },
//   callMe: function () {
//     console.log(this);
//     this.test();
//   },
// };

// pl.callMe(); // pl -> this

// const doc = {
//   key: 'document',
// };

// // with bind we can hardcode the execution context(`this`)
// doc.callMe = pl.callMe.bind(pl);
// // console.log(doc);
// doc.callMe(); //
