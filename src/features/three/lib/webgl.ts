/* Nothing here imports three, so it is safe to use from the main bundle. */

let webgl: boolean | undefined

/** three.js r163+ renders through WebGL2 only; anything less gets the static fallback. */
export function hasWebGL() {
  if (webgl !== undefined) return webgl
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
    webgl = Boolean(gl)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webgl = false
  }
  return webgl
}
