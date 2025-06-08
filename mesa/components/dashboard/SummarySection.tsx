import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SummarySection() {
  return (
    <aside className="w-full md:w-1/4 bg-white rounded-2xl p-6 shadow-sm space-y-8 absolute right-0 top-0 h-screen">
      {/* Balance */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Your Balance</h2>
        <div className="text-3xl font-bold text-gray-900 flex items-center justify-between">
          $10,632.00
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
            +
          </button>
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUpRight size={16} />
            $3,250.07
          </div>
          <div className="flex items-center gap-1 text-red-500">
            <ArrowDownRight size={16} />
            $1,062.90
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-700">Activity</h3>
          <button className="text-xs text-indigo-600 hover:underline">
            See all
          </button>
        </div>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                💸
              </div>
              <div>
                <p className="font-medium">Withdraw Earning</p>
                <p className="text-xs text-gray-400">12:40 am</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">$4,120</p>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 text-red-600 rounded-full p-2">💳</div>
              <div>
                <p className="font-medium">Paying Website Tax</p>
                <p className="text-xs text-gray-400">10:20 am</p>
              </div>
            </div>
            <p className="font-semibold text-red-500">- $230</p>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                💸
              </div>
              <div>
                <p className="font-medium">Withdraw Earning</p>
                <p className="text-xs text-gray-400">12:40 am</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">$4,120</p>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 text-red-600 rounded-full p-2">💳</div>
              <div>
                <p className="font-medium">Paying Website Tax</p>
                <p className="text-xs text-gray-400">10:20 am</p>
              </div>
            </div>
            <p className="font-semibold text-red-500">- $230</p>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                💸
              </div>
              <div>
                <p className="font-medium">Withdraw Earning</p>
                <p className="text-xs text-gray-400">12:40 am</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">$4,120</p>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 text-red-600 rounded-full p-2">💳</div>
              <div>
                <p className="font-medium">Paying Website Tax</p>
                <p className="text-xs text-gray-400">10:20 am</p>
              </div>
            </div>
            <p className="font-semibold text-red-500">- $230</p>
          </li>
        </ul>
      </div>

      {/* Top Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Top Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
            <p className="text-xs font-medium">Footwear</p>
            <p className="text-sm font-semibold">18,941 units</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <p className="text-xs font-medium">Accessories</p>
            <p className="text-sm font-semibold">26,061 units</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
            <p className="text-xs font-medium">Footwear</p>
            <p className="text-sm font-semibold">18,941 units</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <p className="text-xs font-medium">Accessories</p>
            <p className="text-sm font-semibold">26,061 units</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
