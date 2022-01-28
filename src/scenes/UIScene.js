import * as Phaser from 'phaser'
import { lives, timer } from './PlayScene'
let time

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' })
  }

  preload() {
    this.load.image('fullScreen', '/static/egg-outline.png')
  }

  create() {
    //Health Bar
    this.add.text(16, 16, 'Health:', {
      fontSize: '16px',
      fill: '#000',
    })
    // Time
    time = this.make.text({
      x: 160,
      y: 16,
      text: 'Time',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })
    //Resume
    let Resume = this.make.text({
      x: 275,
      y: 16,
      text: 'Resume',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })
    //Lives
    this.make.text({
      x: 16,
      y: 40,
      text: `Lives: ${lives}`,
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000'
      }
    })
    Resume.setInteractive({ useHandCursor: true })
    {
      Resume.on(
        'pointerup',
        () => {
          this.scene.resume('PlayScene')
        },
        this
      )
    }

    let RKey = this.input.keyboard.addKey('R')

    RKey.on(
      'down',
      () => {
        this.scene.resume('PlayScene')
      },
      this
    )

    let Pause = this.make.text({
      x: 375,
      y: 16,
      text: 'Pause',
      style: {
        fontSize: '16px',
        align: 'center',
        fill: '#000',
      },
    })

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
    time.setText('Time: ' + timer.toString())
  }
}
