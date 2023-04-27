"use client";
import React, { useRef, useState } from "react";


import Header from "./components/header";

import { SidebarProvider } from "./context/SidebarContext";

export default function Index(): JSX.Element {
  return (
    <SidebarProvider>
      <Header />
      <div className="flex min-h-screen dark:bg-gray-900">
        <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
          <HomePage />
        </main>
        
      </div>
    </SidebarProvider>
  );
}


function HomePage(): JSX.Element {
  return (
    <div className="p-6">
      <section>
        <header>
          <h1 className="mb-6 text-4xl font-extrabold dark:text-white">
           Mail To Generator
          </h1>
        </header>
      </section>
      <section>
      <div className="h-64 flex items-center justify-center">
      <div className="bg-white  dark:bg-slate-800 p-8 rounded-md shadow-md w-full max-w-lg">
        <Composer />
      </div>
    </div>
      
      </section>
      
    </div>
  );
}
function Composer() {
  const [emailContent, setEmailContent] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const aTagRef = useRef<HTMLAnchorElement | null>(null);

  const createMailtoLink = () => {
    const encodedContent = encodeURIComponent(emailContent);
    const encodedSubject = encodeURIComponent(emailSubject);
    return `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedContent}`;
  };

  const copyATagToClipboard = () => {
    if (aTagRef.current) {
      const aTagWithoutClass = document.createElement('a');
      aTagWithoutClass.href = aTagRef.current.href;
      aTagWithoutClass.textContent = aTagRef.current.textContent;
  
      const aTagHtml = aTagWithoutClass.outerHTML;
      navigator.clipboard.writeText(aTagHtml).then(
        () => {
          alert('The mailto link has been copied to the clipboard!');
        },
        (err) => {
          console.error('Failed to copy the mailto link: ', err);
        }
      );
    }
  };
  return (
    <div className="space-y-4">
      <input
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Enter recipient email address"
      />
      <input
        type="text"
        value={emailSubject}
        onChange={(e) => setEmailSubject(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Enter email subject"
      />
      <textarea
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        maxLength={800}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Enter your email content (max 800 characters)"
      ></textarea>
      <a href={createMailtoLink()} ref={aTagRef} className="text-blue-500">
        Send Email
      </a>
      <button onClick={copyATagToClipboard} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Copy Link
      </button>
    </div>
  );
}


