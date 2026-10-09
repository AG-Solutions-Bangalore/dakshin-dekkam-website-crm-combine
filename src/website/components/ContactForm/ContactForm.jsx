// import Form from "./Form";

// const ContactForm = () => {
//   return (
//     <section className=" pb-24 !pt-0">
//       <div className="container mx-auto  px-4">
//         <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
//           <div className="col-span-6 md:pt-12 pt-0 relative">
//             <div
//               data-aos="flip-up"
//               className="max-w-xl mx-auto text-center my-6"
//             >
//               <h1 className="font-bold text-darken my-3 text-2xl">
//                 Contact <span className="text-yellow-500">Form.</span>
//               </h1>
//               <p className="leading-relaxed text-gray-500">
//                 contaus for more information .
//               </p>
//             </div>
//             <Form />
//           </div>
//           <div className="col-span-6" data-aos="fade-up" data-aos-delay="700">
//             <img
//               src="/img/contact.webp"
//               alt="Contact"
//               style={{
//                 borderRadius: "0.5rem",
//                 width: "100%",
//                 maxHeight: "600px",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;
import Form from "./Form";

const ContactForm = () => {
  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-8 items-stretch">
          <div className="col-span-12 md:col-span-6 relative flex flex-col justify-center">
            <Form />
          </div>
          <div
            className="col-span-12 md:col-span-6 flex items-center justify-center"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <img
              src="/img/contact.jpg"
              alt="Contact us"
              className="w-full h-full object-cover rounded-2xl shadow-md min-h-[380px] max-h-[560px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
