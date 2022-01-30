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
    this.titleBGM = this.sound.add('titleBGM', { loop: true, volume: 0.33 })
    this.titleBGM.play()

    this.add.image(400, 300, 'titleBackground').setScale(0.5)

    this.make.text({
      x: 250,
      y: 175,
      text: 'Bone To The Past',
      style: {
        fontSize: '30px',
        align: 'center'
      }
    })

    const startText = this.make.text({
      x: 350,
      y: 275,
      text: 'Start',
      style: {
        fontSize: '30px',
        align: 'center'
      }
    })

    const aboutText = this.make.text({
      x: 350,
      y: 375,
      text: 'About',
      style: {
        fontSize: '30px',
        align: 'center'
      }
    })

    startText.setInteractive({useHandCursor: true})
    startText.on('pointerdown', () => {this.clickTitle()})
    aboutText.setInteractive({useHandCursor: true})
    aboutText.on('pointerdown', () => {this.clickAbout()})
  }
  clickTitle() {
    this.titleBGM.stop()
    this.scene.stop()
    this.scene.start('PlayScene')
  }

  clickAbout() {
    this.scene.switch('AboutScene')
  }
}
