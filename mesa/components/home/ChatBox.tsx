import React from "react";
import TypingHeader from "./TypingHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ChatBox = () => {
  return (
    <section className="bg-[#1e1e1e] rounded-xl p-8 w-full mx-auto mt-20 shadow-lg border border-gray-700">
      <TypingHeader />

      <Textarea
        placeholder="Start typing your business idea here..."
        className="min-h-[200px] text-white bg-[#2a2a2a] border border-gray-600 placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 mb-6"
      />

      <div className="flex gap-4">
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Generate Report
        </Button>
        <Button
          variant="outline"
          className="border-white text-black hover:bg-white hover:text-black"
        >
          Send
        </Button>
      </div>
    </section>
  );
};

export default ChatBox;
