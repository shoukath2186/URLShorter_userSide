import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-600 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Linkify</h3>
            <p className="text-sm">
              Simplify your links, amplify your reach. Linkify helps you manage and share URLs effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">About Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: support@linkify.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              
              {/* Social Icons */}
              <li className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <Linkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Linkify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}