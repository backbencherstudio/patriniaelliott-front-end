"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questionData } from "@/DemoAPI/question";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import "../css/questions.css";

export default function Questions() {
  const [openItem, setOpenItem] = useState<string | null>("faq-0");
  console.log(openItem);
  return (
    <section className="container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 w-full  mx-auto py-20">
        {/* Left Heading */}
        <div className="col-span-1 lg:col-span-4">
          <h2 className="text-3xl lg:text-5xl font-semibold text-[#1F2937] leading-snug">
            Frequently Asked
            <br />
            Question
          </h2>
        </div>
        {/* Right Accordion */}
        <div className=" lg:col-span-1"></div>
        <div className="w-full col-span-1 lg:col-span-7">
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={(val) => setOpenItem(val)}
            className=" space-y-2 "
          >
            {questionData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={`px-3 lg:px-6 rounded-2xl  py-2 border border-[#DADDE3] ${
                  openItem === item.id ? "bg-bgSecondColor rounded-2xl " : ""
                }`}
              >
                <AccordionTrigger
                  className={` arrow cursor-pointer text-left text-base text-[#0B0F2F] font-medium hover:no-underline after:hidden !pr-0`}
                >
                  <h4 className={` text-base lg:text-2xl font-medium  text-headerColor`}>
                    {item.question}
                  </h4>
                  <span
                    className={`${
                      openItem === item.id &&
                      "bg-secondaryColor border-0 text-blackColor"
                    } ml-auto border border-grayColor1 rounded-full p-2`}
                  >
                    {openItem === item.id ? (
                      <Minus className={`lg:w-4 w-3 h-3 lg:h-4 text-muted-blackColor`} />
                    ) : (
                      <Plus className={"lg:w-4 w-3 h-3 lg:h-4 text-muted-foreground"} />
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base pr-8 text-grayColor1   ">
                  {item.answer || "Answer coming soon..."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
