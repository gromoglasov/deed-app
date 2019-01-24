export class Prize {
  name: string
  image: string
  desc: string
  points: number
  constructor(name, image, desc, karma) {
    this.name = name;
    this.image = image;
    this.desc = desc;
    this.points = karma;
  }
}
