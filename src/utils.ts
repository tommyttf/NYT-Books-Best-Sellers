export const pathToTitle = (path: string) =>
  path
    .substring(1)
    .split('-')
    .map((str) =>
      encodeURIComponent(str.charAt(0).toUpperCase() + str.substring(1))
    )
    .join(' ');
