import Phaser from 'phaser'
import StateMachine from '../states/StateMachine'
import { sharedInstance as events } from './EventsHandler'

export default class PlayerController {
  constructor(scene, sprite, cursors, obstacles) {
    this.scene = scene
    this.sprite = sprite
    this.cursors = cursors
    this.obstacles = obstacles
    this.lastDinosaur

    this.createHeroAnimations()

    this.stateMachine = new StateMachine(this, 'hero')

    this.stateMachine
      .addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
        onExit: () => {},
      })
      .addState('walk', {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
        onExit: () => {},
      })
      .addState('jump', {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate,
        onExit: () => {},
      })
      .addState('fall', {
        onEnter: this.fallOnEnter,
        onUpdate: this.fallOnUpdate,
        onExit: () => {},
      })
      .addState('dinosaur-hit', {
        onEnter: this.dinoHitOnEnter,
        onUpdate: () => {},
        onExit: () => {},
      })
      .addState('dinosaur-stomp', {
        onEnter: this.dinoStompOnEnter,
        onUpdate: () => {},
        onExit: () => {},
      })
      .addState('dead', {
        onEnter: this.deadOnEnter,
        onUpdate: () => {},
        onExit: () => {},
      })
      .setState('idle')

    this.sprite.setOnCollide((data) => {
      const body = data.bodyB

      if (this.obstacles.is('dino-horse', body)) {
        this.lastDinosaur = body.gameObject
        if (this.sprite.y < body.position.y) {
          // stomp on dinosaur
          this.stateMachine.setState('dinosaur-stomp')
        } else {
          // hit by dinosaur
          this.stateMachine.setState('dinosaur-hit')
        }
        return
      }

      // landing after jumping or falling
      if (
        this.stateMachine.isCurrentState('jump') ||
        this.stateMachine.isCurrentState('fall')
      ) {
        this.stateMachine.setState('idle')
      }
    })
  }

  update(dt) {
    this.stateMachine.update(dt)
  }

  setHealth(value) {
    this.health = Phaser.Math.Clamp(value, 0, 100)

    if (this.health <= 0) {
      this.stateMachine.setState('dead')
    }
  }

  idleOnEnter() {
    this.sprite.play('hero-idle')
  }

  idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.stateMachine.setState('walk')
    }

    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
    if (upJustPressed) {
      this.stateMachine.setState('jump')
    }
  }

  walkOnEnter() {
    this.sprite.play('hero-walk')
  }

  walkOnUpdate() {
    const speed = 1

    if (this.cursors.left.isDown) {
      this.sprite.flipX = true
      this.sprite.setVelocityX(-speed)
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false
      this.sprite.setVelocityX(speed)
    } else {
      this.sprite.setVelocityX(0)
      this.stateMachine.setState('idle')
    }

    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
    if (upJustPressed) {
      this.stateMachine.setState('jump')
    }

    if (this.sprite.body.velocity.y > 1) {
      this.stateMachine.setState('fall')
    }
  }

  jumpOnEnter() {
    this.sprite.play('hero-leap')
    this.sprite.setVelocityY(-6)
  }

  jumpOnUpdate() {
    const speed = 1

    if (this.cursors.left.isDown) {
      this.sprite.flipX = true
      this.sprite.setVelocityX(-speed)
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false
      this.sprite.setVelocityX(speed)
    }
    if (this.sprite.body.velocity.y > 0) {
      this.stateMachine.setState('fall')
    }
  }

  fallOnEnter() {
    this.sprite.play('hero-fall')
  }

  fallOnUpdate() {
    const speed = 1

    if (this.cursors.left.isDown) {
      this.sprite.flipX = true
      this.sprite.setVelocityX(-speed)
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false
      this.sprite.setVelocityX(speed)
    }
  }

  dinoHitOnEnter() {
    if (this.lastDinosaur) {
      if (this.sprite.x < this.lastDinosaur.x) {
        this.sprite.setVelocityX(-20)
      } else {
        this.sprite.setVelocityX(20)
      }
    } else {
      this.sprite.setVelocityY(-20)
    }

    const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
    const endColor = Phaser.Display.Color.ValueToColor(0x0000ff)

    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 100,
      repeat: 2,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween) => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          startColor,
          endColor,
          100,
          value
        )

        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        )

        this.sprite.setTint(color)
      },
    })

    this.stateMachine.setState('idle')

    this.setHealth(this.health - 25)
  }

  dinoStompOnEnter() {
    this.sprite.setVelocityY(-10)
    events.emit('dinosaur-stomped', this.lastDinosaur)
    this.stateMachine.setState('idle')
  }

  deadOnEnter() {
    this.sprite.play('hero-die')

    this.sprite.setOnCollide(() => {})

    this.scene.time.delayedCall(1500, () => {
      this.scene.scene.start('GameOver')
    })
  }

  createHeroAnimations() {
    this.sprite.anims.create({
      key: 'hero-idle',
      frames: [{ key: 'hero', frame: 'hero-walk-04.png' }],
    })
    this.sprite.anims.create({
      key: 'hero-walk',
      frameRate: 5,
      frames: this.sprite.anims.generateFrameNames('hero', {
        start: 1,
        end: 4,
        prefix: 'hero-walk-0',
        suffix: '.png',
      }),
      repeat: -1,
    })
    this.sprite.anims.create({
      key: 'hero-leap',
      frames: [{ key: 'hero', frame: 'hero-leap.png' }],
    })
    this.sprite.anims.create({
      key: 'hero-fall',
      frames: [{ key: 'hero', frame: 'hero-fall.png' }],
    })
    this.sprite.anims.create({
      key: 'hero-die',
      frames: [{ key: 'hero', frame: 'hero-die.png' }],
    })
  }
}
