import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { FaLocationArrow, FaPhone, FaPhoneAlt, } from 'react-icons/fa'
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-[#020A47] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo and Social Icons */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">    
              <div>
               <img className='h-[30%] w-[55%]' src="/images/Logo2.png" alt="" />
              </div>
            </div>
            <div className="flex space-x-10">
              <a href="#" aria-label="Instagram" className="hover:text-emerald-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-emerald-500 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-emerald-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">Primary Pages</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold mb-4">About Office</h3>
            <div className="space-y-2">
              <p className='flex  items-center gap-5'><span><FaPhoneAlt /></span>+91-7738538548</p>
              <p className='flex  items-center gap-5'><span className='text-xl'><IoMdMail /></span>info@adryter.com</p>
              <p className='flex items-center gap-5'> 
                <span><FaLocationArrow /></span>
                CV Raman Ideapad,<br />
                opp. sithouli Railway Station,<br />
                Gwalior, Madhya Pradesh 475001
              </p>
            </div>
          </div>
        </div>

       
        <div className="mt-12 text-center border-t border-gray-700 pt-8">
          <p>Copyright © Aarambh 2025. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

