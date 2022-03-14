import { EmailIcon, PhoneIcon } from "assets/icons"
import React from "react"

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="content flex justify-between flex-col md:flex-row gap-6 pt-6 pb-8">
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-center md:text-left">Contact</h4>
          <div className="space-y-6 md:space-y-2">
            <div className="text-sm flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-4">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4" />
                <span className="font-semibold mr-6">Phone</span>{" "}
              </div>
              <a href="tel:+719 339 5617" className="hover:text-pink">
                +719 339 5617
              </a>
            </div>
            <div className="text-sm flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-4">
              <div className="flex items-center space-x-2">
                <EmailIcon className="w-4 h-4" />
                <span className="font-semibold mr-6">Email</span>{" "}
              </div>
              <a href="mailto:freemanartcompany@gmail.com" className="hover:text-pink">
                freemanartcompany@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-pink"
          >
            @ Freeman Art Company
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
