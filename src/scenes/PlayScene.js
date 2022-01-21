import * as Phaser from 'phaser'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.player = null
    this.cursors = null
    this.score = 0
    this.scoreText = null
  }

  preload() {
    // the loading order here determines the layering of assets
    this.load.image('background', '/static/background.png')
    this.load.image('ground', '/static/ground.png')
    this.load.image('bird48', '/static/bird48.png')
    this.load.spritesheet('hero', '/static/hero.png', {
      frameWidth: 17,
      frameHeight: 19,
    })
    this.load.image('git', '/static/egg-outline.png')
  }

  create() {
    this.add.image(game.config.width / 2, game.config.height / 2, 'background')

    /* ASSETS */
    // platforms
    let platforms = this.physics.add.staticGroup()

    platforms.create(400, 600, 'ground').setScale(5).refreshBody()
    platforms.create(198, 400, 'ground')
    platforms.create(550, 300, 'ground')

    // player
    let player = this.physics.add.sprite(300, 400, 'hero').setScale(3)
    player.setCollideWorldBounds(true)

    this.player = player
    this.cursors = this.input.keyboard.createCursorKeys()

    // bird
    let birds = this.physics.add.group({
      key: 'bird48',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })

    birds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(player, platforms)
    this.physics.add.collider(birds, platforms)
    this.physics.add.overlap(player, birds, this.collectBird, null, this)

    // o: you can make a function out the shared logic written below so you
    //  don't have to pass in the same data over and over again, just pass in what
    //  varies into your custom util function
    /* ANIMATIONS*/
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'hero', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'jump-right',
      frames: [{ key: 'hero', frame: 13 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'jump-left',
      frames: [{ key: 'hero', frame: 14 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'fall-right',
      frames: [{ key: 'hero', frame: 15 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'fall-left',
      frames: [{ key: 'hero', frame: 16 }],
      frameRate: 20,
    })

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    })

    // o: this can be made into a const
    // full screen
    let button = this.add
      .image(800 - 16, 16, 'git', 0)
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

    // o: this can be made into a const
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
  }

  update() {
    // o: these can be made into consts
    let cursors = this.cursors
    let player = this.player
    let { velocity } = player.body

    if (velocity.y < 0 && velocity.x > 0) {
      player.anims.play('jump-right')
    } else if (velocity.y < 0 && velocity.x < 0) {
      player.anims.play('jump-left')
    } else if (velocity.y > 0 && velocity.x > 0) {
      player.anims.play('fall-right')
    } else if (velocity.y > 0 && velocity.x < 0) {
      player.anims.play('fall-left')
    } else if (cursors.left.isDown) {
      player.setVelocityX(-100)

      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(100)

      player.anims.play('right', true)
    } else if (player.body.touching.down) {
      player.setVelocityX(0)

      player.anims.play('turn')
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330)
    }
  }

  collectBird(player, bird) {
    bird.disableBody(true, true)

    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }
}
