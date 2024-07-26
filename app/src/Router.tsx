import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About/About.page';
import HowItWorks from './pages/HowItWorks/HowItWorks.page';
import Roadmap from './pages/Roadmap/Roadmap.page';
import { Archive, Nfts, Notes, Team, Trash } from '@/pages';

const router = createBrowserRouter([
  { path: '/nfts', element: (<Nfts />) },
  { path: '/', element: (<Notes />), },
  { path: '/archive', element: (<Archive />), },
  { path: '/trash', element: (<Trash />), },
  { path: '/team', element: (<Team />), },
  { path: '/how-it-works', element: (<HowItWorks />), },
  { path: '/roadmap', element: (<Roadmap />), },
  { path: '/about', element: (<About />) }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
