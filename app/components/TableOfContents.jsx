//TableOfContents.jsx
"use client";

import React, { useState } from 'react';

const TableOfContents = ({ 
  title,
  sections, // [{ title: string, content: array }, ...]
  activeSection, // { contentIndex: number, sectionIndex: number }
  onSectionClick 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedTitles, setExpandedTitles] = useState([]);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleTitle = (title) => {
    if (expandedTitles.includes(title)) {
      setExpandedTitles(expandedTitles.filter(t => t !== title));
    } else {
      setExpandedTitles([...expandedTitles, title]);
    }
  };

  const handleScrollToSection = (contentIndex, sectionIndex) => {
    onSectionClick(contentIndex, sectionIndex);
    const id = `section-${contentIndex}-${sectionIndex}`;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) toggleOverlay();
  };

  const renderSections = () => {
    return sections.map((content, contentIndex) => (
      <li key={contentIndex} className="mb-2">
        <div 
          onClick={() => toggleTitle(content.title)}
          className="flex items-center justify-between cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
        >
          <span className="font-bold text-gray-900 dark:text-gray-300">
            {content.title}
          </span>
          <span>{expandedTitles.includes(content.title) ? '−' : '+'}</span>
        </div>
        
        {expandedTitles.includes(content.title) && (
          <ul className="ml-4 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3">
            {content.content.map((section, sectionIndex) => (
              <li key={sectionIndex}>
                <button
                  onClick={() => handleScrollToSection(contentIndex, sectionIndex)}
                  className="text-left w-full hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-300">
                  {section.header}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleOverlay}
        className="xl:hidden fixed right-4 bottom-4 z-30 bg-gray-500 text-white px-3 pt-1 pb-1.5 rounded-xl shadow-lg hover:bg-gray-600 hover:scale-125 transition-all"
      >
        {isOpen ? '×' : '≡'}
      </button>

      {/* Desktop Version */}
      <div className={`hidden xl:block z-20 w-64 sticky self-start top-0 2xl:top-10 ml-2 mr-8 font-gowun`}>
        <div className="bg-white/70 dark:bg-[#121212]/90 p-4 rounded-lg shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-3 font-gowun">목차</h3>
          <ul className="space-y-2">
            {renderSections()}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay Version */}
      <div className={`
        xl:hidden fixed inset-0 z-20 transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleOverlay}
        />
        
        <div className={`
          absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white dark:bg-[#121212]
          shadow-xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold font-gowun">목차</h3>
              <button 
                onClick={toggleOverlay}
                className="text-2xl p-2 hover:text-blue-500 dark:hover:text-blue-400"
              >
                ×
              </button>
            </div>
            <ul className="space-y-3">
              {renderSections()}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
