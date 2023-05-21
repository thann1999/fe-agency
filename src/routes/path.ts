function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

export const ROOTS_DASHBOARD = import.meta.env.REACT_APP_PATH || '';

// #endregion

export const PATH = {
  root: path(ROOTS_DASHBOARD, ''),
  notFound: path(ROOTS_DASHBOARD, '/404'),
  users: path(ROOTS_DASHBOARD, '/users'),
};
