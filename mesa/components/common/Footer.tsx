/* eslint-disable @next/next/no-img-element */

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="assets/logo/mesa-dark.svg"
            alt="Homepage hero image"
            className="h-8 w-16"
          />
        </div>

        {/* Copyright */}
        <p className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} MESA. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
