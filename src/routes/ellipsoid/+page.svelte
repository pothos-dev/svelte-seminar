<script>
  import { onMount } from "svelte"
  import * as THREE from "three"

  const width = 800
  const height = 800

  function createEllipsoid(a, b) {
    function xyz(phi, lamda) {
      let P = THREE.MathUtils.degToRad(phi)
      let L = THREE.MathUtils.degToRad(lamda)
      let x = a * Math.cos(P) * Math.cos(L)
      let y = a * Math.cos(P) * Math.sin(L)
      let z = b * Math.sin(P)
      return [x, y, z]
    }

    // Create a geometry from scratch

    let vertices = []
    for (let phi = -90; phi <= 90; phi += 5) {
      for (let lamda = 0; lamda <= 360; lamda += 5) {
        vertices.push(...xyz(phi, lamda))
        vertices.push(...xyz(phi, lamda + 20))

        vertices.push(...xyz(phi, lamda))
        vertices.push(...xyz(phi + 10, lamda))
      }
    }

    return vertices
  }

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)

  // Scene
  let scene = new THREE.Scene()

  // Camera
  let camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 1000)
  camera.position.z = 3
  camera.position.y = 10
  camera.lookAt(0, 0, 0)

  let vertices = createEllipsoid(4, 3)
  let lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices), 3)
  )

  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({})
  )
  scene.add(lines)

  renderer.render(scene, camera)

  // Mount
  let root
  onMount(() => root.appendChild(renderer.domElement))
</script>

<div bind:this={root} />
