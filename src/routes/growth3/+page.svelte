<script context="module">
  function random(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  function lerp(from: number, to: number, t: number) {
    return from * (1 - t) + to * t
  }

  function tweened(
    from: number,
    to: number,
    duration: number,
    fn: (t: number) => void
  ) {
    fn(from)
    let start = Date.now()
    let interval = setInterval(() => {
      let elapsed = Date.now() - start
      let progress = elapsed / duration
      if (progress >= 1) {
        clearInterval(interval!)
        progress = 1
      }
      fn(lerp(from, to, progress))
    })
  }
</script>

<script lang="ts">
  import * as d3 from "d3"

  let root = $state<HTMLDivElement>()

  // create stem
  function createStem(container: d3.Selection<any, any, any, any>) {
    let stem = container
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round")

    let lastSpawnHeight = 0
    tweened(0, 500, 5000, (height) => {
      let dist = height - lastSpawnHeight
      if (dist > 40) {
        lastSpawnHeight = height

        let left = random(0, 1) < 0.5
        let rotation = random(30, 60) * (left ? -1 : 1) - 180

        let leafContainer = container
          .append("g")
          .attr(
            "transform",
            `translate(0, ${height}) rotate(${rotation}) translate(0, -5)`
          )

        createLeaf(leafContainer)
      }

      let path = d3.path()
      path.moveTo(0, 0)
      path.lineTo(0, height)
      stem.attr("d", path.toString())
    })
  }

  function createLeaf(container: d3.Selection<any, any, any, any>) {
    let length = -random(30, 40)
    let chonkLength = length * random(0.1, 0.4)
    let left = -random(15, 20)
    let right = random(15, 20)

    let group = container.append("g")
    tweened(0, 1, 1000, (scale) => {
      group.attr("transform", `scale(${scale})`)
    })

    let leafPath = d3.path()
    leafPath.moveTo(0, 0)
    leafPath.quadraticCurveTo(left, chonkLength, 0, length)
    leafPath.quadraticCurveTo(right, chonkLength, 0, 0)
    let leaf = group
      .append("path")
      .attr("fill", "green")
      .attr("stroke", "black")
      .attr("d", leafPath.toString())

    let veinPath = d3.path()
    veinPath.moveTo(0, 0)
    veinPath.quadraticCurveTo(0, length * 0.9, 0, length * 0.9)
    let vein = group
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("opacity", 0.25)
      .attr("d", veinPath.toString())
  }

  let svg = d3
    .create("svg")
    .attr("width", 800)
    .attr("height", 800)
    .attr("viewBox", "-400 0 800 800")

  let group = svg
    .append("g")
    .attr("transform", "rotate(180) translate(0, -800)")

  $effect(() => {
    createStem(group)
    root!.appendChild(svg.node()!)
  })
</script>

<div bind:this={root} />
