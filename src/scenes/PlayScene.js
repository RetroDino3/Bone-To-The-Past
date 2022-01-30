import * as Phaser from 'phaser'
import PlayerController from '../states/PlayerController'
import ObstaclesController from '../states/ObstaclesController'
import DinosaurController from '../states/DinosaurController'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.player = null
    this.score = 0
    this.scoreText = null
    this.battle1 = null
    this.playerController = null
    this.obstacles = null
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.obstacles = new ObstaclesController()
    this.dinosaurs = []
  }

  preload() {
    // the loading order here determines the layering of assets

    this.load.image('tiles', '/static/greensides.png')
    this.load.tilemapTiledJSON('tilemap', '/static/stage1.json')
    this.load.atlas('hero', '/static/hero.png', '/static/hero.json')
    this.load.atlas('dino-horse', '/static/dino1.png', '/static/dino1.json')
    this.load.image('fullScreen', '/static/egg-outline.png')
    this.load.audio('battle1', '/static/Battle Theme 1.mp3')
  }

  create() {
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

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height)

    const objectsLayer = map.getObjectLayer('objects')

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0, height = 0 } = objData

      switch (name) {
        case 'hero-spawn': {
          this.player = this.matter.add
            .sprite(x + width * 0.5, y, 'hero')
            .setFixedRotation()

          this.playerController = new PlayerController(
            this,
            this.player,
            this.cursors,
            this.obstacles
          )
          break
        }

        case 'dinoHorse-spawn': {
          const dinoHorse = this.matter.add
            .sprite(x, y, 'dino-horse')
            .setFixedRotation()

          this.dinosaurs.push(new DinosaurController(this, dinoHorse))
          this.obstacles.add('dino-horse', dinoHorse.body)
          break
        }
      }
    })

    /* UI ELEMENTS*/
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
    // mainCam.setZoom(1.2)
    mainCam.setBounds(0, 0, game.config.width, game.config.height)
    mainCam.startFollow(this.player)

    /* AUDIO */
    this.battle1 = this.sound.add('battle1', { loop: true, volume: 0.2 })
    this.battle1.play()
  }

  update(t, dt) {
    if (this.playerController) {
      this.playerController.update(dt)
    }

    this.dinosaurs.forEach((dinosaur) => dinosaur.update(dt))
  }
}
