import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}

export default Layout;
