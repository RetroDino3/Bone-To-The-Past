import * as Phaser from 'phaser'

let isTouchingGround = true

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.player = null
    this.score = 0
    this.scoreText = null
    this.battle1 = null
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    // the loading order here determines the layering of assets

    this.load.image('tiles', '/static/greensides.png')
    this.load.tilemapTiledJSON('tilemap', '/static/stage1.json')
    this.load.atlas('hero', '/static/hero.png', '/static/hero.json')
    this.load.atlas('dino1', '/static/dino1.png', '/static/dino1.json')
    this.load.image('fullScreen', '/static/egg-outline.png')
    this.load.audio('battle1', '/static/Battle Theme 1.mp3')
  }

  create() {
    /* ANIMATIONS*/
    this.createHeroAnimations()
    this.createDinoAnimations()

    /* TILES */
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('greensides', 'tiles')
    map.createLayer('sky', tileset)
    const platforms = map.createLayer('platforms', tileset)
    const trees = map.createLayer('trees', tileset)
    map.createLayer('foliage', tileset)

    platforms.setCollisionByProperty({ collides: true })
    trees.setCollisionByProperty({ collides: true })

    this.matter.world.convertTilemapLayer(platforms)
    this.matter.world.convertTilemapLayer(trees)

    /* PLAYER */
    this.player = this.matter.add
      .sprite(10, 548, 'hero')
      .play('hero-idle')
      .setFixedRotation()

    /* DINO1 */
    this.dino1 = this.matter.add
      .sprite(125, 548, 'dino1')
      .play('dino1-idle')
      .setFixedRotation()

    // Detect collision with ground
    this.matter.world.on('collisionstart', (bodyA, bodyB) => {
      isTouchingGround = true
    })

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height)

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

    /* CAMERA */
    const mainCam = this.cameras.main
    mainCam.setZoom(2)
    mainCam.setBounds(0, 0, game.config.width, game.config.height)
    mainCam.startFollow(this.player)

    /* AUDIO */
    this.battle1 = this.sound.add('battle1', { loop: true, volume: 0.2 })
    this.battle1.play()
  }

  update() {
    const { left, right, up, down, space, shift } = this.cursors
    const speed = 1

    /* PLAYER CONTROLS */
    if (left.isDown) {
      this.player.flipX = true
      this.player.setVelocityX(-speed)
      this.player.anims.play('hero-walk', true)
    } else if (right.isDown) {
      this.player.flipX = false
      this.player.setVelocityX(speed)
      this.player.anims.play('hero-walk', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('hero-idle', true)
    }
    if (this.player.body.velocity.y < -1) {
      this.player.anims.play('hero-leap', true)
    } else if (this.player.body.velocity.y > 1) {
      this.player.anims.play('hero-fall', true)
    }
    if (Phaser.Input.Keyboard.JustDown(up) && isTouchingGround) {
      this.player.setVelocityY(-speed * 7)
      isTouchingGround = false
    }

    /* DINO MOVEMENTS */
    console.log("Dinosaur's velocity: ", this.dino1.body.velocity.x)

    if (this.dino1.body.velocity.x < 0) {
      this.dino1.flipX = true
      this.dino1.anims.play('dino1-walk', true)
    } else if (this.dino1.body.velocity.x > 0) {
      this.dino1.flipX = false
      this.dino1.anims.play('dino1-walk', true)
    } else if (this.dino1.body.velocity.x === 0) {
      this.dino1.flipX = true
      this.dino1.setVelocityX(-speed * 0.75)
      this.dino1.anims.play('dino1-walk', true)
      if (this.dino1.body.velocity.x === 0) {
        this.dino1.flipX = false
        this.dino1.setVelocityX(speed * 0.75)
        this.dino1.anims.play('dino1-walk', true)
      }
    }
  }

  /* METHODS */
  createHeroAnimations() {
    this.anims.create({
      key: 'hero-idle',
      frames: [{ key: 'hero', frame: 'hero-walk-04.png' }],
    })
    this.anims.create({
      key: 'hero-walk',
      frameRate: 5,
      frames: this.anims.generateFrameNames('hero', {
        start: 1,
        end: 5,
        prefix: 'hero-walk-0',
        suffix: '.png',
      }),
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-leap',
      frames: [{ key: 'hero', frame: 'hero-leap.png' }],
    })
    this.anims.create({
      key: 'hero-fall',
      frames: [{ key: 'hero', frame: 'hero-fall.png' }],
    })
  }

  createDinoAnimations() {
    this.anims.create({
      key: 'dino1-idle',
      frames: [{ key: 'dino1', frame: 'bone_dino-0.png' }],
    })
    this.anims.create({
      key: 'dino1-walk',
      frameRate: 5,
      frames: this.anims.generateFrameNames('dino1', {
        start: 0,
        end: 3,
        prefix: 'bone_dino-',
        suffix: '.png',
      }),
      repeat: -1,
    })
  }
}
