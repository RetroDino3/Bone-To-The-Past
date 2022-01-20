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
    this.load.image('background', '/static/background.png')
    this.load.spritesheet('ground', '/static/ground.png', {
      frameWidth: 136,
      frameHeight: 32,
    })
    this.load.image('bird48', '/static/bird48.png')
    this.load.spritesheet('hero', '/static/hero.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.image('git', '/static/egg-outline.png')
  }

  create() {
    this.add.image(game.config.width / 2, game.config.height / 2, 'background')

    // platforms
    let platforms = this.physics.add.staticGroup()

    platforms.create(400, 600, 'ground').setScale(5).refreshBody()
    platforms.create(198, 568, 'ground')
    platforms.create(328, 568, 'ground')

    // player
    let player = this.physics.add.sprite(300, 400, 'hero')
    player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'hero', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    })
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

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    })

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
    let cursors = this.cursors
    let player = this.player

    if (cursors.left.isDown) {
      player.setVelocityX(-160)

      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(160)

      player.anims.play('right', true)
    } else {
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
