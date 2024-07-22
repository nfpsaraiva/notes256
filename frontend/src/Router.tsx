import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Proofs from './pages/Proofs/Proofs.page';
import About from './pages/About/About.page';
import Search from './pages/Search/Search.page';
import HowItWorks from './pages/HowItWorks/HowItWorks.page';
import Roadmap from './pages/Roadmap/Roadmap.page';
import Explore from './pages/Explore/Explore.page';
import Drafts from './pages/Drafts/Drafts.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Proofs />
    ),
  },
  {
    path: '/drafts',
    element: (
        <Drafts />
    ),
  },
  {
    path: '/explore',
    element: (
        <Explore />
    ),
  },
  {
    path: '/search',
    element: (
        <Search />
    ),
  },
  {
    path: '/how-it-works',
    element: (
        <HowItWorks />
    ),
  },
  {
    path: '/roadmap',
    element: (
        <Roadmap />
    ),
  },
  {
    path: '/about',
    element: (
        <About />
    ),
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
