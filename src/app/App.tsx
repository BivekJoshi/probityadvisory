import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { paths } from '@/config/routes'
import HomePage from '@/pages/home/HomePage'

/* Interior pages are split out of the initial bundle; Layout holds the Suspense boundary. */
const pages = [
  { path: paths.services, Page: lazy(() => import('@/pages/services/ServicesPage')) },
  { path: paths.about, Page: lazy(() => import('@/pages/about/AboutPage')) },
  { path: paths.whyNepal, Page: lazy(() => import('@/pages/why-nepal/WhyNepalPage')) },
  { path: paths.contact, Page: lazy(() => import('@/pages/contact/ContactPage')) },
]

const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {pages.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
