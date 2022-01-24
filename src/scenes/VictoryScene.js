import * as Phaser from 'phaser'

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' })
    this.victoryBGM = null
  }

  preload() {
    this.load.audio('victoryBGM', '/static/Victory1.mp3')
  }
  create() {
    this.victoryBGM = this.sound.add('victoryBGM', { loop: false })
    this.victoryBGM.play()

    this.make.text({
      x: 250,
      y: 150,
      text: 'Level Cleared!',
      style: {
        fontSize: '40px',
        align: 'center'
      }
    })

    const endText = this.make.text({
      x: 320,
      y: 350,
      text: 'Return to Start',
      style: {
        fontSize: '20px',
        align: 'center'
      }
    })

    endText.setInteractive({useHandCursor: true})
    endText.on('pointerdown', () => {this.returnTitle()})
  }
  returnTitle() {
    this.victoryBGM.stop()
    this.scene.switch('TitleScene')
  }
}
