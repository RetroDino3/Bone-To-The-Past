import * as Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' })
    this.titleBGM = null
  }

  preload() {
    this.load.image('titleBackground', '/static/dinosaur-hunting-1.jpeg')
    this.load.audio('titleBGM', '/static/A New Dawn Title Screen.mp3')
  }
  create() {
    let titleBGM = this.sound.add('titleBGM', { loop: true })
    this.titleBGM = titleBGM
    titleBGM.play()

    let titleBg = this.add.image(400, 300, 'titleBackground')
    titleBg.setScale(0.5)

    let titleText = this.make.text({
      x: 250,
      y: 175,
      text: 'Bone To The Past',
      style: {
        fontSize: '30px',
        align: 'center'
      }
    })

    let startText = this.make.text({
      x: 350,
      y: 375,
      text: 'Start',
      style: {
        fontSize: '30px',
        align: 'center'
      }
    })

    startText.setInteractive({useHandCursor: true})
    startText.on('pointerdown', () => {this.clickTitle()})
  }
  clickTitle() {
    this.titleBGM.stop()
    this.scene.switch('PlayScene')
  }
}
