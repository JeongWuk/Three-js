import * as THREE from "three";

export class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color,
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color })
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);

    this.top = this.position.y + this.height / 2;
    this.bottom = this.position.y - this.height / 2;

    this.velocity = velocity;
    this.gravity = -0.002;
  }

  update(ground) {
    this.top = this.position.y + this.height / 2;
    this.bottom = this.position.y - this.height / 2;

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;

    if (this.bottom + this.velocity.y <= ground.top) {
      this.velocity.y *= 0.8;
      this.velocity.y = -this.velocity.y;
    } else {
      this.position.y += this.velocity.y;
    }
  }
}
