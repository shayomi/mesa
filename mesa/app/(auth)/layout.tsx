const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center mx-auto bg-dark-4">
      {children}
    </div>
  );
};

export default Layout;
