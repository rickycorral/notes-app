import React from 'react';
import { Link } from 'react-router-dom';

// Define the generateRandomGradientColor function
export function generateRandomGradientColor() {
  const hue = 42; // Golden hue
  const saturation = 80; // Reduce saturation for a less vibrant color
  const lightness = 50; // Reduce lightness for a more opaque look
  const color1 = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`; // Slightly darker shade
  const color2 = `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Main golden shade
  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

const NoteItem = ({ note }) => {
  // Use the generateRandomGradientColor function to get the gradient color
  const gradientColor = generateRandomGradientColor();

  return (
    <Link to={`/edit-note/${note.id}`} className='note' style={{ background: gradientColor }}>
      <div className="note-content">
        <h4>{note.title}</h4>
        <div className="note-footer">
          <p className="note-date">{note.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default NoteItem;
