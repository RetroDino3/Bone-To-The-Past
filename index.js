import * as Phaser from 'phaser'
import PlayScene from './src/scenes/PlayScene'
import TitleScene from './src/scenes/TitleScene'
import GameOver from './src/scenes/GameOver'
import VictoryScene from './src/scenes/VictoryScene'
import AboutScene from './src/scenes/AboutScene'
import UIScene from './src/scenes/UIScene'

const config = {
  name: 'app',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'matter',
    matter: {
      debug: false,
    },
  },
  scene: [TitleScene, PlayScene, GameOver, VictoryScene, UIScene, AboutScene],
}

window.game = new Phaser.Game(config)
