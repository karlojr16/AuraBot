"use client";

import React, { useState } from 'react';

export default function HomePage() {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-black text-orange-600 tracking-tighter mb-2">
          AuraBot
        </h1>
        <p className="text-gray-400 text-sm mb-8 font-medium">Chatbot para tu negocio en un clic</p>

        {!fileUploaded ? (

          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 bg-gray-50 hover:border-orange-400 transition-colors">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              accept=".pdf" 
              onChange={() => setFileUploaded(true)} 
            />
            <span className="text-4xl">📄</span>
            <p className="mt-4 text-sm font-bold text-gray-700">Subir Menú (PDF)</p>
            <p className="text-xs text-gray-400 mt-1">Haz clic o arrastra el archivo</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-500 text-left">
            <div className="bg-orange-50 text-orange-700 p-4 rounded-xl text-sm font-bold border border-orange-100 flex items-center gap-2">
              <span></span> ¡Bot creado con éxito!
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Copia este código en tu web</p>
              <div className="bg-slate-900 p-4 rounded-xl font-mono text-[11px] text-orange-300 break-all leading-relaxed shadow-lg border-b-4 border-orange-600">
                {`<script src="https://aurabot.com/widget.js" data-id="MVP-777" defer></script>`}
              </div>
            </div>

            <button 
              onClick={() => setFileUploaded(false)}
              className="w-full py-3 text-xs text-gray-400 hover:text-orange-600 font-bold uppercase tracking-widest transition-colors"
            >
              ← Subir otro archivo
            </button>
          </div>
        )}

        {/* Footer simple */}
        <p className="mt-12 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
          AuraBot AI • 2026
        </p>
      </div>

    </div>
  );
}