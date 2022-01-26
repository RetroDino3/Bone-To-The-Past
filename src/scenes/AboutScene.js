import * as Phaser from 'phaser'
let Time
let timedEvent

export default class AboutScene extends Phaser.Scene {
  constructor() {
    super({ key: 'AboutScene' })
  }

  preload() {
    this.load.image('fullScreen', '/static/egg-outline.png')
  }

  create() {
    this.add.text(16, 16, 'Health:', {
      fontSize: '16px',
      fill: '#000',
    })

    Time = this.make.text({
      x: 160,
      y: 16,
      text: 'Time',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })

    this.make.text({
      x: 275,
      y: 16,
      text: 'Resume',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })

    this.make.text({
      x: 375,
      y: 16,
      text: 'Pause',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })
    // Pause.setInteractive({ useHandCursor: true })
    // Pause.on('pointerdown', () => {
    //   this.scene.pause()
    // })

    this.scoreText = this.add.text(475, 16, 'score: 0', {
      fontSize: '16px',
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

    timedEvent = this.time.delayedCall(600000, onEvent, [], this)

    let healthBar = this.makeBar(140, 100, 0x2ecc71)
    this.setValue(healthBar, 100)
  }
  //
  makeBar(x, y, color) {
    //draw the bar
    let bar = this.add.graphics()

    //color the bar
    bar.fillStyle(color, 1)

    //fill the bar with a rectangle
    bar.fillRect(27, 16, 65, 15)

    //position the bar
    bar.x = 55
    bar.y = 0

    //return the bar
    return bar
  }
  setValue(bar, percentage) {
    //scale the bar
    bar.scaleX = percentage / 100
  }

  update() {
    Time.setText('Time: ' + timedEvent.getProgress().toString().substr(0, 4))
  }
}
function onEvent() {
  this.scene.launch('GameOver')
}
