import { EmailIcon, PhoneIcon } from "assets/icons"
import React from "react"

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="content flex justify-between flex-col md:flex-row gap-6 pt-6 pb-8">
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold">Contact</h4>
          <div className="space-y-2">
            <div className="text-sm flex items-center space-x-4">
              <PhoneIcon className="w-4 h-4" />
              <span className="font-semibold mr-6">Phone</span>{" "}
              <a href="tel:+719 339 5617" className="hover:text-pink">
                +719 339 5617
              </a>
            </div>
            <div className="text-sm flex items-center space-x-4">
              <EmailIcon className="w-4 h-4" />
              <span className="font-semibold">Email</span>
              <a href="mailto:freemanartcompany@gmail.com" className="hover:text-pink">
                freemanartcompany@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div>
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
