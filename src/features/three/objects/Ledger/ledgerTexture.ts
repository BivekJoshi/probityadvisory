import * as THREE from 'three'

/** A ruled ledger page with a forest header and a green tab, drawn once. */
export function ledgerTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 344
  const g = canvas.getContext('2d')!
  g.fillStyle = '#F1F5EE'
  g.fillRect(0, 0, 256, 344)
  g.fillStyle = '#1B3317'
  g.fillRect(0, 0, 256, 34)
  g.fillStyle = '#5AAD2A'
  g.fillRect(18, 12, 60, 10)

  g.lineWidth = 2
  g.strokeStyle = 'rgba(27, 51, 23, 0.18)'
  for (let y = 58; y < 330; y += 20) {
    g.beginPath()
    g.moveTo(18, y)
    g.lineTo(238, y)
    g.stroke()
  }
  g.strokeStyle = 'rgba(27, 51, 23, 0.12)'
  for (const x of [150, 196]) {
    g.beginPath()
    g.moveTo(x, 44)
    g.lineTo(x, 330)
    g.stroke()
  }
  g.fillStyle = 'rgba(27, 51, 23, 0.45)'
  for (let y = 64, row = 0; y < 320; y += 20, row++) {
    g.fillRect(24, y, 60 + ((row * 37) % 70), 6)
    g.fillRect(158, y, 28, 6)
    g.fillRect(204, y, 26, 6)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}
