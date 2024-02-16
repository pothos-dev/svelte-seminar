<script>
  function interp(v, a, b, c, d) {
    return ((v - a) / (b - a)) * (d - c) + c
  }

  let mousePos = { x: 0, y: 0 }
  function onMouseMove(e) {
    mousePos = { x: e.clientX, y: e.clientY }
  }

  let growthPos = { x: 0, y: 0 }

  let lines = $state([{ points: "", numPoints: 0, strokeWidth: 1 }])

  function tick() {
    let dx = mousePos.x - growthPos.x
    let dy = mousePos.y - growthPos.y

    // Normalize the vector
    let distance = Math.sqrt(dx ** 2 + dy ** 2)
    if (distance == 0) return
    dx /= distance
    dy /= distance

    // Grow towards the mouse
    let speed = interp(distance, 10, 1000, 0, 1)
    growthPos.x += dx * speed
    growthPos.y += dy * speed

    let line = lines[lines.length - 1]
    if (line.numPoints > 10) {
      // Make all lines thicker, but cap at 5
      for (let line of lines) {
        if (line.strokeWidth < 5) line.strokeWidth *= 1.1
      }

      // Start a new line
      lines.push({ points: "", numPoints: 0, strokeWidth: 1 })
      line = lines[lines.length - 1]
    }

    line.points += `${growthPos.x},${growthPos.y} `
    line.numPoints++
  }

  $effect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  })

  $effect(() => {
    let interval = setInterval(() => tick(), 10)
    return () => clearInterval(interval)
  })
</script>

<svg class="w-screen h-screen">
  {#each lines as { points, strokeWidth }}
    <polyline
      {points}
      fill="none"
      stroke="green"
      stroke-width={strokeWidth}
      stroke-linecap="round"
    />
  {/each}
</svg>
