import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://voteverse-server.onrender.com/api/contact",
        formData
      );
      if (data?.success) {
        toast.success("Message submitted successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("❌ Error in submitContactMessage");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">Let's Get In Touch</h2>
          <p className="text-gray-300">
            We'd love to hear from you. Whether you have a question about features,
            pricing, or anything else, our team is ready to answer all your questions.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-400">support@voteverse.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-400">+91 7367084034</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p className="text-gray-400">Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl space-y-6"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Contact Us
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          ></textarea>

          
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            Send Message 🚀
          </button>
        </form>
      </div>


      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default Contact;
