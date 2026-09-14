/*
 * The WebGL layer's public entry. Nothing exported here imports three.js — the
 * scenes are lazy — so it is safe to use from the main bundle.
 */
export { SceneMount } from './SceneMount/SceneMount'
export { ContourScene, HeroScene, LedgerScene, TerrainScene } from './scenes'
export { hasWebGL } from './lib/webgl'
