// components/dashboard/header.tsx
import { Menu } from "lucide-react"; // or any icon
import { Button } from "../../ui/button";
import { UserButton } from "@clerk/nextjs";
import { Typography } from "../../ui/typography";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <section className="mt-0 w-full">
      <div className="flex flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Show on mobile only */}
          <button className="sm:hidden" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <Typography variant="h3" className="font-bold text-[#1A283E]">
            DASHBOARD
          </Typography>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Button variant="outline" size="lg">
            Add Business
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </section>
  );
};

export default Header;
