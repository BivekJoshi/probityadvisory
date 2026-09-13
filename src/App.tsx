import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

/* Interior pages are split out of the initial bundle; Layout holds the Suspense boundary. */
const Services = lazy(() => import('@/pages/Services'))
const About = lazy(() => import('@/pages/About'))
const WhyNepal = lazy(() => import('@/pages/WhyNepal'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="why-nepal" element={<WhyNepal />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
