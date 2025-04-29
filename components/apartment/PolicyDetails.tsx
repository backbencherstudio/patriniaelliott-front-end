import { PoliciesData } from "@/DemoAPI/Policies"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

function PolicyDetails() {
  return (
    <div>
      <h1 className=' text-2xl lg:text-[32px] font-medium text-blackColor'>Policies</h1>
      <p className=" lg:text-lg leading-[150%] text-grayColor1 text-base">We aim to ensure a smooth stay with flexible check-in options, clear guidelines, and respectful use of property amenities. Review booking terms for cancellations, refunds, and pet policies. Our support team is always available for assistance.</p>

      <div>
          <Accordion
            type="single"
            collapsible
          
            className=" space-y-2 "
          >
            {PoliciesData.map((item) => (
              <AccordionItem
                key={item.id}
               value={item.id}
                className={`px-3  rounded-xl bg-bgColor  border border-[#DADDE3] `}
              >
                <AccordionTrigger
                  className={`py-2  cursor-pointer text-left text-base text-grayColor1 font-medium hover:no-underline `}
                >
                  <h4 className={` text-base lg:text-lg font-medium  text-headerColor`}>
                    {item.title}
                  </h4>
                 
                </AccordionTrigger>
                <AccordionContent className="text-base pr-8 text-grayColor1   ">
                  {item.items.map((data)=>(
                    <ul className="list-disc list-inside text-base pl-4">
                        <li className="">{data}</li>
                    </ul>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </div>
    </div>
  )
}

export default PolicyDetails
