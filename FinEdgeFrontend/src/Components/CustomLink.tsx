import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ to, children, ...props }: { to: string, children: string }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <>
      <Link to={to} {...props}>{children}</Link>
    </>
  );
};

export default CustomLink;