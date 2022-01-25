import * as Phaser from 'phaser'
import PlayScene from './src/scenes/PlayScene'
import TitleScene from './src/scenes/TitleScene'
import GameOver from './src/scenes/GameOver'

const config = {
  name: 'app',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
      debug: true,
    },
  },
  scene: [TitleScene, PlayScene, GameOver],
}

window.game = new Phaser.Game(config)
