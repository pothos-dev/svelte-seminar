<script context="module">
  function rotate({ dx, dy, angle }) {
    angle = (angle * Math.PI) / 180
    let x = dx * Math.cos(angle) - dy * Math.sin(angle)
    let y = dx * Math.sin(angle) + dy * Math.cos(angle)
    return { dx: x, dy: y }
  }

  function random(min, max) {
    return Math.random() * (max - min) + min
  }
</script>

<script>
  let width = 1000
  let height = 800

  class Line {
    x2 = $state()
    y2 = $state()

    constructor({ x1, y1, dx, dy, maxLength = 100, maxIter = 20 }) {
      this.x1 = x1
      this.x2 = x1

      this.y1 = y1
      this.y2 = y1

      this.dx = dx
      this.dy = dy

      this.maxLength = maxLength
      this.maxIter = maxIter
      this.isGrowing = maxLength > 1

      // console.log("New Line", { maxIter, maxLength })
    }

    grow() {
      if (!this.isGrowing) return []

      // Extend the line
      this.x2 += this.dx
      this.y2 += this.dy

      // Check if the line is too long and should stop growing
      let length = Math.sqrt(
        (this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2
      )

      if (length > this.maxLength) {
        this.isGrowing = false

        if (this.maxIter > 0) {
          return [this.spawn(), this.spawn()]
        }
      }

      return []
    }

    spawn() {
      let maxLength = random(10, 80)
      let angle = random(-45, 45)
      let { dx, dy } = rotate({ dx: this.dx, dy: this.dy, angle })

      return new Line({
        x1: this.x2,
        y1: this.y2,
        dx,
        dy,
        maxLength: this.maxLength,
        maxIter: this.maxIter - 1,
      })
    }
  }

  let lines = $state([
    new Line({
      x1: width / 2,
      y1: 10,
      dx: 0,
      dy: 1,
    }),
  ])

  let interval = setInterval(() => {
    const newLines = []
    for (const line of lines) {
      if (!line.isGrowing) continue
      newLines.push(...line.grow())
    }
    lines.push(...newLines)
    if (lines.length > 100) {
      clearInterval(interval)
    }
  }, 10)
</script>

<svg {width} {height}>
  {#each lines as line}
    <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="green" />
  {/each}
</svg>
