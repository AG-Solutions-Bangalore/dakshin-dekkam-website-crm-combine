import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { TestimonialData } from "../data/testimonial";
import SingleTestimonial from "./SingleTestimonial";
import MemberForm from "./Member/MemberForm";

const Info = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-black" data-aos="fade-right">
            <div className="flex items-center relative mb-6">
              <div className="bg-yellow-400 rounded-full w-12 h-12 absolute -left-4 -top-3 animate-pulse"></div>
              <h2 className="font-bold text-2xl relative z-10 text-darken">
                Join Us Now
              </h2>
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold text-darken mb-6 leading-snug">
              <span className="text-yellow-500">Dakshin</span> Bharat K.D.O.
              Jain Ekkam
            </h1>

            <p className="text-gray-700 leading-relaxed mb-2 text-justify">
              The <strong>Dakshin Bharat Kutchi Dasha Oswal Jain Ekkam</strong>{" "}
              is a vibrant community dedicated to{" "}
              <strong>service, unity, and cultural enrichment</strong> across
              South India. If you are a resident of <strong>Karnataka</strong>,{" "}
              <strong>Andhra Pradesh</strong>, <strong>Tamil Nadu</strong>,{" "}
              <strong>Kerala</strong>, <strong>Pondicherry</strong>, or{" "}
              <strong>Goa</strong>, and above 18 years of age, you are eligible
              to become a <strong>Life Member</strong>and from the KDO Jain
              Community .
            </p>

            <p className="text-gray-700 leading-relaxed mb-2">
              Societies, trusts, and {" "}
              <strong>75 or more members</strong> can also enroll as{" "}
              <strong>Associate Life Members</strong> Mahajans of the KDO Jain Community of South india.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Join a legacy that continues to promote{" "}
              <strong>education, philanthropy, and harmony</strong> across
              generations.
            </p>

            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 mt-2">
              <h3 className="text-xl font-semibold text-darken mb-4 border-b pb-2">
                Membership Details
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-yellow-600">
                    Life Member
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>
                      <strong>Eligibility:</strong> Individual (18+), minimum 1
                      year residency in South India
                    </li>
                    <li>
                      <strong>Fee:</strong> ₹101 (one-time)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-yellow-600">
                    Associate Life Member
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>
                      <strong>Eligibility:</strong> Registered Society, Trust,
                      or Mahajan with 75+ members of the KDO Jain community of South India
                    </li>
                    <li>
                      <strong>Fee:</strong> ₹501 (one-time)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-8 lg:p-12 shadow-lg overflow-hidden">
              <MemberForm />
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-green-400 animate-pulse opacity-70"></div>
              <div className="absolute top-6 -right-6 w-8 h-8 rounded-full bg-blue-400 animate-ping opacity-80"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-indigo-500 animate-pulse opacity-70"></div>
              <div className="absolute -bottom-10 left-4 w-12 h-12 rounded-full bg-red-400 animate-ping opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
