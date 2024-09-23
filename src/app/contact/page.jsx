"use client";
import React, { useState } from "react";
import { LuMailCheck } from "react-icons/lu";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate 2 seconds loading state
    setTimeout(() => {
      setLoading(false);

      // Create a form to manually submit the form data
      const form = document.createElement("form");
      form.action = "https://formspree.io/f/meojbrvj";
      form.method = "POST";
      form.style.display = "none";

      // Create input elements for email, subject, and message
      for (const key in formData) {
        const input = document.createElement("input");
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      }

      // Append form to the body and submit it
      document.body.appendChild(form);
      form.submit();

      alert("Your message has been sent!");
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-gradient-to-b from-[#0096C4] to-[#0F3659] flex flex-col items-center text-white w-[90%] lg:w-[50%] my-8 rounded-xl">
          <p className="text-xl lg:text-2xl font-bold p-4">Contact Us</p>
          <div className="rounded-full bg-white p-2">
            <div className="rounded-full bg-black/5 p-3">
              <LuMailCheck size={25} color="#0096c4" />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-4 py-4 my-4 w-[80%] text-black"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-white">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-white rounded-lg pl-2 py-2 text-sm lg:text-base outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="font-semibold text-white">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Email Subject"
                className="w-full bg-white rounded-lg pl-2 py-2 text-sm lg:text-base outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-semibold text-white">
                Message:
              </label>
              <textarea
                placeholder="Write your message here..."
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                cols="30"
                rows="4"
                className="bg-white rounded-md pl-2 py-2 w-full text-sm lg:text-base outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`text-sm lg:text-base bg-white rounded-3xl text-[#0096c4] py-2 px-4 w-fit hover:font-bold self-center mt-2 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
