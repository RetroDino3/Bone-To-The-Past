import * as Phaser from 'phaser'
import PlayScene from './src/scenes/PlayScene'
import TitleScene from './src/scenes/TitleScene'
import GameOver from './src/scenes/GameOver'
import VictoryScene from './src/scenes/VictoryScene'

const config = {
  name: 'app',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [TitleScene, PlayScene, GameOver, VictoryScene],
}

window.game = new Phaser.Game(config)
