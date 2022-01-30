import StateMachine from './StateMachine'
import { sharedInstance as events } from './EventsHandler'

export default class DinosaurController {
  constructor(scene, sprite) {
    this.moveTime = 0
    this.scene = scene
    this.sprite = sprite

    this.createDinoAnimations()

    this.stateMachine = new StateMachine(this, 'dinosaur')

    this.stateMachine
      .addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: () => {},
        onExit: () => {},
      })
      .addState('move-left', {
        onEnter: this.moveLeftOnEnter,
        onUpdate: this.moveLeftOnUpdate,
        onExit: () => {},
      })
      .addState('move-right', {
        onEnter: this.moveRightOnEnter,
        onUpdate: this.moveRightOnUpdate,
        onExit: () => {},
      })
      .addState('dead', {
        onEnter: () => {},
        onUpdate: () => {},
        onExit: () => {},
      })
      .setState('idle')

    events.on('dinosaur-stomped', this.handleStomped, this)
  }

  destroy() {
    events.off('dinosaur-stomped', this.handleStomped, this)
  }

  update(dt) {
    this.stateMachine.update(dt)
  }

  idleOnEnter() {
    this.sprite.play('dino-idle')
    const r = Phaser.Math.Between(1, 100)
    if (r < 50) {
      this.stateMachine.setState('move-left')
    } else {
      this.stateMachine.setState('move-right')
    }
  }

  moveLeftOnEnter() {
    this.moveTime = 0
    this.sprite.flipX = true
    this.sprite.play('dino-walk')
  }

  moveLeftOnUpdate(dt) {
    this.moveTime += dt
    this.sprite.setVelocityX(-1.15)
    const r = Phaser.Math.Between(3000, 10000)

    if (this.moveTime > r) {
      this.stateMachine.setState('move-right')
    }
  }

  moveRightOnEnter() {
    this.moveTime = 0
    this.sprite.flipX = false
    this.sprite.play('dino-walk')
  }

  moveRightOnUpdate(dt) {
    this.moveTime += dt
    this.sprite.setVelocityX(1.15)
    const r = Phaser.Math.Between(3000, 10000)

    if (this.moveTime > r) {
      this.stateMachine.setState('move-left')
    }
  }

  handleStomped(dinosaur) {
    if (this.sprite !== dinosaur) {
      return
    }

    events.off('dinosaur-stomped', this.handleStomped, this)

    this.scene.tweens.add({
      targets: this.sprite,
      displayHeight: 0,
      y: this.sprite.y + this.sprite.displayHeight * 0.5,
      duration: 200,
      onComplete: () => {
        this.sprite.destroy()
      },
    })

    this.stateMachine.setState('dead')
  }

  createDinoAnimations() {
    this.sprite.anims.create({
      key: 'dino-idle',
      frames: [{ key: 'dino-horse', frame: 'bone_dino-0.png' }],
    })
    this.sprite.anims.create({
      key: 'dino-walk',
      frameRate: 5,
      frames: this.sprite.anims.generateFrameNames('dino-horse', {
        start: 0,
        end: 3,
        prefix: 'bone_dino-',
        suffix: '.png',
      }),
      repeat: -1,
    })
  }
}
