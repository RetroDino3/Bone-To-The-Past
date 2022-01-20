import * as Phaser from 'phaser'
import PlayScene from './src/scenes/PlayScene'

const config = {
  name: 'app',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [PlayScene],
}

window.game = new Phaser.Game(config)
