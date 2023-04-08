const input = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const entryLog = [];

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.xLocation = null;
    this.yLocation = null;
    this.mode = false;
  }

  runGame() {
    //Initialize location of hat and player
    this.randomPlayer();
    this.generateHat();
    let gameRunning = true;
    while (gameRunning) {
      this.displayGame();

      this.moveCharacter();
      console.log(`You are at X : ${this.xLocation} Y: ${this.yLocation}`);
      
      
      if (this.checkField()) {
        console.log("Player is out of the field");
        gameRunning = false;
        break;
      }
      else if (this.checkHole()) {
        console.log("You fell into the deepest hole");
        gameRunning = false;
      }
      else if (this.checkHat()) {
        console.log("You win!");
        gameRunning = false;
      }
        
      
      
      //Update the next path character location
      this.field[this.xLocation][this.yLocation] = pathCharacter;
    }

  }

  playerLog() {
    let playerLogs = {
      xLocation: null,
      yLocation: null
    }
  }

  displayGame() {
    return this.field.forEach(row => console.log(row.join(" ")));
  }

  checkField() {
    if (this.xLocation >= this.field.length || this.yLocation >= this.field[0].length || this.xLocation < 0 || this.yLocation < 0) {
      return true;
    }
  }

  checkHat() {
    return this.field[this.xLocation][this.yLocation] === hat;
  }

  //checking the hole 
  checkHole() {
    return this.field[this.xLocation][this.yLocation] === hole;
  }
  //To move the character

  moveCharacter() {
    const direction = input("Enter direction with W, A, S, D : ").toLowerCase();
    let path = "";
    switch (direction) {
      case 'w':
        this.xLocation--;
        path += 'Up';
        break;
      case 'a':
        this.yLocation--;
        path += 'Left';
        break;
      case 's':
        this.xLocation++;
        path += 'Down';
        break;
      case 'd':
        this.yLocation++;
        path += 'Right';
        break;
      default:
        console.log("Enter just W A S D");
        break

    }
    console.log(`You move ${path}`);

  }

  randomPlayer() {
    const widthOfField = this.field.length;
    const heightofField = this.field[0].length;

    const randomPlayer = {
      x: Math.floor(Math.random() * widthOfField),
      y: Math.floor(Math.random() * heightofField)
    }

    this.xLocation = randomPlayer.x;
    this.yLocation = randomPlayer.y;

    this.field[randomPlayer.x][randomPlayer.y] = pathCharacter;

  }

  generateHat() {
    const widthOfField = this.field.length;
    const heightofField = this.field[0].length;

    const hatLoc = {
      x: Math.floor(Math.random() * widthOfField),
      y: Math.floor(Math.random() * heightofField)
    }


    while (hatLoc.x === 0 && hatLoc.y === 0 && hatLoc.x === randomPlayer.x && hatLoc.y === randomPlayer.y) {

      hatLoc.x = Math.floor(Math.random() * row);
      hatLoc.y = Math.floor(Math.random() * column);
    }

    console.log();
    this.field[hatLoc.x][hatLoc.y] = hat;

  }

  //Generate the field to be passed in class constructor
  //Input height and width or row and column of the 
  static generateField(row, column, chance = 0.2) {

    let field = [];
    for (let i = 0; i < row; i++) {
      let rows = [];
      for (let j = 0; j < column; j++) {
        const randomHoles = Math.random() * 1.01
        if (randomHoles < chance) {
          rows.push(hole);
        } else {
          rows.push(fieldCharacter);
        }
      }
      field.push(rows);
    }

    return field;
  }




}

// Custom Size

const inputRow = parseInt(input('Enter the size of row : '));
const inputCol = parseInt(input('Enter the size of column : '));
let newGame = new Field(Field.generateField(inputRow, inputCol));
newGame.runGame();
