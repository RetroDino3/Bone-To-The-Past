import * as Phaser from 'phaser'

export default class AboutScene extends Phaser.Scene {
  constructor() {
    super({ key: 'AboutScene' })
  }

  preload() {}
  create() {
    this.make.text({
      x: 200,
      y: 50,
      text: 'Bone To The Past',
      style: {
        fontSize: '40px',
        align: 'center',
      }
    })
    this.make.text({
      x: 50,
      y: 200,
      text: 'Made by Angel Hernandez, Joel Bascombe, and Juan Mateo',
      style: {
        fontSize: '30px',
        align: 'center',
        wordWrap: { width: 750, useAdvancedWrap: true }
      }
    })
    this.make.text({
      x: 200,
      y: 350,
      text: 'Fullstack Academy\n\n\nMade with Javascript and Phaser',
      style: {
        fontSize: '20px',
        align: 'center',
        wordWrap: { width: 750, useAdvancedWrap: true }
      }
    })

    const returnText = this.make.text({
      x: 600,
      y: 550,
      text: 'Return to Start',
      style: {
        fontSize: '20px',
        align: 'right'
      }
    })
    returnText.setInteractive({useHandCursor: true})
    returnText.on('pointerdown', () => {this.returnStart()})
  }
  returnStart() {
    this.scene.switch('TitleScene')
  }
}
