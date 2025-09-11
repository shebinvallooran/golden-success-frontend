// src/utils/navigation.js

const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  products: '/products',
  industries: '/industries'
};

export const getRoutePath = (name) => {
  return routes[name] || '/';
};
