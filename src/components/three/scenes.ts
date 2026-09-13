import { lazy } from 'react'

/*
 * Every 3D scene is its own lazily loaded chunk; three.js and R3F travel in a
 * shared vendor chunk behind them. Import scenes from here, never directly.
 */
export const ContourScene = lazy(() => import('./scenes/ContourScene'))
export const TerrainScene = lazy(() => import('./scenes/TerrainScene'))
export const HeroScene = lazy(() => import('./scenes/HeroScene'))
export const LedgerScene = lazy(() => import('./scenes/LedgerScene'))
