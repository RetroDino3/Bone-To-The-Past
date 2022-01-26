import * as Phaser from 'phaser'
import VictoryScene from './VictoryScene'
let timedEvent

export default class UIScene extends Phaser.Scenes {
  constructor() {
    super({ key: 'UIScene' })
  }

  preload() {
    this.load.image('fullScreen', '/static/egg-outline.png')
  }

  create() {
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    })
    /* FULL SCREEN */

    let button = this.add
      .image(800 - 16, 16, 'fullScreen', 0)
      .setOrigin(1, 0)
      .setInteractive()

    button.on(
      'pointerup',
      function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0)

          this.scale.stopFullscreen()
        } else {
          button.setFrame(1)

          this.scale.startFullscreen()
        }
      },
      this
    )

    let FKey = this.input.keyboard.addKey('F')

    FKey.on(
      'down',
      function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          button.setFrame(1)
          this.scale.startFullscreen()
        }
      },
      this
    )
    // let Pause = this.add
    //   .image(400 - 24, 16, 'Pause', 0)
    //   .setOrigin(0, 0)
    //   .setInteractive()

    this.make.text({
      x: 450,
      y: 16,
      text: 'Pause',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })
    this.make.text({
      x: 250,
      y: 16,
      text: 'Resume',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })
    let Time = this.make.text({
      x: 550,
      y: 16,
      text: 'Time',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })
    timedEvent = this.time.delayedCall(60000, onEvent, [], this)
  }
  //
}

function update() {
  Time.setText('Time: ' + timedEvent.getProgress().toString().substr(0, 4))
}

function onEvent() {
  this.scene.launch('VictoryScene')
}
