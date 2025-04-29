import ContactForm from "@/components/AllForm/ContactForm";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactInfo from "@/components/contact/ContactInfo";
import Image from "next/image";

function ContactPage() {
  return (
    <div className="">
      <div className=" relative">
        <Image
          src="/contact/contact.jpg"
          alt="contact image"
          width={2500}
          height={200}
          className=" w-full h-24 lg:h-auto"
        />
        <div className=" absolute top-1/2 left-1/2 -translate-1/2">
          <h2 className=" text-3xl lg:text-[72px] text-whiteColor font-medium">
            {" "}
            Contact us
          </h2>
        </div>
      </div>

      <div className=" bg-bgColor py-14 lg:py-20">
        <div className="  md:grid grid-cols-12 container ">
          <div className=" col-span-1"></div>
          <div className=" col-span-4">
            <ContactInfo />
          </div>
          <div className=" col-span-6">
            <ContactForm />
          </div>
          <div className=" col-span-1"></div>
        </div>
      </div>

      <div>
        <ContactFaq/>
      </div>
    </div>
  );
}

export default ContactPage;
