import * as Phaser from 'phaser'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  preload() {
    this.load.image('fortress', '/static/fortress.png')
    this.load.image('star', '/static/favicon.ico')
    this.load.spritesheet('hero', '/static/hero.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create() {
    this.add.image(game.config.width / 2, game.config.height / 2, 'fortress')
    this.add.image(game.config.width / 2, game.config.height / 2, 'star')
    // this.add.image(game.config.width / 2, game.config.height / 2, 'hero')

    let player = this.add.sprite(100, 400, 'hero')
    console.log('THIS >>> ', player)
  }
}
