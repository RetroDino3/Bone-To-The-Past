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
    // o: probably makes sense to do:
    //  this.titleBGM = this.sound.add('titleBGM', { loop: true })
    //  this.titleBGM.play()
    // 
    //  for the sake of simplicity
    let titleBGM = this.sound.add('titleBGM', { loop: true })
    this.titleBGM = titleBGM
    titleBGM.play()

    // o: you should be able to do this.add.image(400, 300, 'titleBackground').setScale(0.5)
    //  here
    let titleBg = this.add.image(400, 300, 'titleBackground')
    titleBg.setScale(0.5)

    // o: no need to store this variable since its not being used anywhere
    let titleText = this.make.text({
      x: 250,
      y: 175,
      text: 'Bone To The Past',
      style: {
        fontSize: '30px',
        align: 'center'
      }
    })

    // o: this can be made into a const
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
