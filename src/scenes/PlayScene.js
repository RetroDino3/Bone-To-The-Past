import * as Phaser from 'phaser'
import { paused } from './UIScene'

let isTouchingGround = true

export let lives = 3

export let timer = 0

const incrementTimer = () => {
  if (paused === false) {
    timer += 1
  }
}

setInterval(incrementTimer, 1000)

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
    this.scene.launch('UIScene')
    timer = 0
  }

  preload() {
    // the loading order here determines the layering of assets

    this.load.image('tiles', '/static/greensides.png')
    this.load.tilemapTiledJSON('tilemap', '/static/stage1.json')
    this.load.atlas('hero', '/static/hero.png', '/static/hero.json')
    this.load.audio('battle1', '/static/Battle Theme 1.mp3')
  }

  create() {
    /* ANIMATIONS*/
    this.createHeroAnimations()

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

    // Detect collision with ground
    this.matter.world.on('collisionactive', (player, platforms) => {
      isTouchingGround = true
    })

    //Pause
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
    Pause.setInteractive({ useHandCursor: true })
    {
      Pause.on(
        'pointerup',
        () => {
          this.scene.pause()
        },
        this
      )
    }

    let PKey = this.input.keyboard.addKey('P')

    PKey.on(
      'down',
      () => {
        this.scene.pause()
      },
      this
    )

    /* CAMERA */
    const mainCam = this.cameras.main
    mainCam.setZoom(2)
    mainCam.setBounds(0, 0, game.config.width, game.config.height)
    mainCam.startFollow(this.player)

    this.battle1 = this.sound.add('battle1', { loop: true, volume: 0.15 })
    this.battle1.play()
  }

  update() {
    const { left, right, up, down, space, shift } = this.cursors
    const speed = 1

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

    if (this.player.body.position.y > 600 && lives > 1) {
      this.fallDeath()
    } else if (this.player.body.position.y > 600 && lives === 1) {
      this.battle1.stop()
      this.scene.stop('UIScene')
      lives = 3
      this.scene.switch('GameOver')
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

  fallDeath() {
    timer = 0
    this.battle1.stop()
    this.scene.restart()
    lives--
  }
}
