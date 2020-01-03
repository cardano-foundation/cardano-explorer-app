import React from 'react';
import { BrandType } from '../../constants';
import { Footer } from './Footer';
import { Header } from './Header';
import { Layout } from './Layout';

export const ShrinkedHeaderLayout = (page: React.ReactNode) => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    {page}
    <Footer />
  </Layout>
);
