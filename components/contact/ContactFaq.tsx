import { contacatfaqsData } from '@/DemoAPI/contactFaq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

function ContactFaq() {
  return (
    <div className=' py-12 lg:py-20 '>
       <div className='max-w-5xl mx-auto'>
        <div>
           <h2 className=' text-3xl lg:text-5xl font-medium text-headerColor text-center mb-10'>Frequently Asked Questions</h2>
        </div>
          <Accordion
            type="single"
            collapsible
          
            className=" space-y-2 "
          >
            {contacatfaqsData.map((item) => (
              <AccordionItem
                key={item.question}
               value={item.question}
                className={`px-3  rounded-xl bg-bgColor  border border-[#DADDE3] `}
              >
                <AccordionTrigger
                  className={`py-4  cursor-pointer text-left text-base text-grayColor1 font-medium hover:no-underline `}
                >
                  <h4 className={` text-base lg:text-lg font-medium  text-headerColor`}>
                    {item.question}
                  </h4>
                 
                </AccordionTrigger>
                <AccordionContent className="md:text-base text-sm md:pr-8 text-grayColor1  ">
                 <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </div>
    </div>
  )
}

export default ContactFaq
