import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About CryptoInsider</h2>
        <p className="text-lg leading-relaxed mb-6">
          CryptoInsider is a secure and innovative platform designed to help you
          grow your wealth through cryptocurrency investments. We combine
          cutting-edge technology with expert insights to give you confidence in
          every trade.
        </p>
        <p className="text-lg leading-relaxed">
          Our mission is to make crypto investing accessible, transparent, and
          profitable for everyone — whether you’re just starting out or already
          an experienced investor.
        </p>
      </div>
    </div>
  );
}
