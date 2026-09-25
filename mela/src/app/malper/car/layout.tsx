// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// Allah U Ekber ve lillahi'l-hamd

"use client";

import React from 'react'
import ForYouFeed from './ForYouFeed'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {children}
      <section className="mt-10 border-t-4 border-[#bb1919] bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-black">
          Other Articles
        </h2>
        <ForYouFeed />
      </section>
    </div>
  )
}
