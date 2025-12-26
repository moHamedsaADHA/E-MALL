import auth from './auth.routes';
import users from './users.routes';
import shops from './shops.routes';
import products from './products.routes';
import categories from './categories.routes';
import cart from './cart.routes';
import orders from './orders.routes';
import reviews from './reviews.routes';
import jobs from './jobs.routes';
import applications from './applications.routes';
import coupons from './coupons.routes';
import wishlist from './wishlist.routes';
import messages from './messages.routes';
import notifications from './notifications.routes';
import dashboards from './dashboards.routes';

export const v1 = {
  auth,
  users,
  shops,
  products,
  categories,
  cart,
  orders,
  reviews,
  jobs,
  applications,
  coupons,
  wishlist,
  messages,
  notifications,
  dashboards,
};
