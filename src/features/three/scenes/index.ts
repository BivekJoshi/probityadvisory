import { lazy } from 'react'

/*
 * Every 3D scene is its own lazily loaded chunk; three.js and R3F travel in a
 * shared vendor chunk behind them. Import scenes through `@/features/three`,
 * never directly.
 */
export const ContourScene = lazy(() => import('./ContourScene'))
export const TerrainScene = lazy(() => import('./TerrainScene'))
export const HeroScene = lazy(() => import('./HeroScene'))
export const LedgerScene = lazy(() => import('./LedgerScene'))
