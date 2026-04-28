import React from 'react';
import { LinkItem } from '../types';

interface LinkCardProps {
  link: LinkItem;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full group/card cursor-pointer"
      aria-label={link.title}
    >
      <div className="relative w-full bg-[#1A1E23]">
        <img
          src={link.imageUrl}
          alt={link.title}
          loading="lazy"
          decoding="async"
          className="w-full h-auto block object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
        />
        
        <div className="absolute inset-0 bg-flyup-green mix-blend-overlay opacity-0 group-active/card:opacity-30 transition-opacity duration-100" />
      </div>

      <div 
        className="absolute inset-0 z-20 pointer-events-none -translate-x-[150%] skew-x-[-20deg] group-hover/card:translate-x-[150%] transition-transform duration-700 ease-out"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), rgba(60,255,0,0.2), transparent)'
        }}
      />
    </a>
  );
};

export default LinkCard;
