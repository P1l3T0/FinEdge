import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ to, children, className, ...props }: { to: string, children: string, className: string }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <>
      <Link className={className} to={to} {...props}>{children}</Link>
    </>
  );
};

export default CustomLink;