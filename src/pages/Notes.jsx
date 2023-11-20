import React, { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import NoteItem from "../components/NoteItem";
import { IoMdCloseCircleOutline } from "react-icons/io";
import NoteCarousel from "../components/NoteCarousel";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [showCarousel, setShowCarousel] = useState(false);
  const outerContainerRef = useRef(null);

  const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => note.title.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const toggleCarousel = () => {
    console.log("toggleCarousel called");
    setShowCarousel((prevState) => !prevState);
  };

  const closeCarousel = () => {
    console.log("Close Carousel called");
    setShowCarousel(false);
  };

  const handleShowAllClick = (e) => {
    e.stopPropagation(); // Stop click event propagation
    console.log("handleShowAllClick called");
    toggleCarousel();
  };

  useEffect(handleSearch, [text]);

  const handleClickOutside = (e) => {
    console.log("handleClickOutside called");
    if (!outerContainerRef.current.contains(e.target)) {
      console.log("Clicked outside Notes component");
      // Add any additional actions if needed when clicking outside the Notes component
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={outerContainerRef}>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
            autoFocus
            placeholder="Keyword..."
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showSearch ? <IoMdCloseCircleOutline /> : <IoSearchOutline />}
        </button>

        <button className="btn" onClick={(e) => handleShowAllClick(e)}>
          Show All
        </button>
      </header>

      {/* Conditionally render the NoteCarousel component */}
      {showCarousel && (
        <div className="note-carousel-container">
          <NoteCarousel notes={filteredNotes} onClose={closeCarousel} />
        </div>
      )}

      {/* Notes container */}
      <div className={`notes__container ${showCarousel ? "carousel-open" : ""}`}>
        {filteredNotes.length === 0 && (
          <p className="empty__notes">No notes found.</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>

      <Link to="/create-note" className="btn add__btn">
        <FaPlusCircle />
      </Link>
    </div>
  );
};

export default Notes;
