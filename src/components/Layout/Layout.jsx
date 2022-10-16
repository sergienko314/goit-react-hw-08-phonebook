import {Section} from '../Section/Section';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Suspense } from 'react';
import Loader from 'components/Loader';

const Layout = () => {
  return (
    <div>
      <Section>
        <Sidebar />
        <Suspense fallback={<Loader />}>
        <Outlet />
        </Suspense>
      </Section>
    </div>
  );
};

export default Layout;
