import { Link, useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';
import { BestSellers } from '../page/bestSellers';
import { Grid } from '@mui/material';
import { BestSellersHistory } from '../page/bestSellersHistory';

export const routes: RouteObject[] = [
  {
    index: true,
    element: <BestSellers />,
  },
  {
    path: '/best-sellers',
    element: <BestSellers />,
  },
  {
    path: '/best-sellers-history',
    element: <BestSellersHistory />,
  },
  {
    path: '*',
    element: (
      <Grid
        container
        style={{ padding: 15, fontSize: 28, textAlign: 'center' }}
      >
        <Grid item xs={12}>
          No match path
        </Grid>

        <Grid item xs={12}>
          <Link to="/" style={{ color: '#000' }}>
            Back to index page
          </Link>
        </Grid>
      </Grid>
    ),
  },
];

export const BookRoutes = () => useRoutes(routes);
