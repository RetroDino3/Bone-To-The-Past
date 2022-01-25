import * as Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' })
    this.endBGM = null
  }
  preload() {
    this.load.audio('endBGM', '/static/No Hope.mp3')
  }
  create() {
    this.endBGM = this.sound.add('endBGM', { loop: false, volume: 0.66 })
    this.endBGM.play()

    this.make.text({
      x: 300,
      y: 175,
      text: 'Game Over',
      style: {
        fontSize: '40px',
        align: 'center'
      }
    })

    const contText = this.make.text({
      x: 350,
      y: 350,
      text: 'Main Menu',
      style: {
        fontSize: '20px',
        align: 'center'
      }
    })

    contText.setInteractive({useHandCursor: true})
    contText.on('pointerdown', () => {this.toTitle()})
  }
  toTitle() {
    this.endBGM.stop()
    this.scene.switch('TitleScene')
  }
}
