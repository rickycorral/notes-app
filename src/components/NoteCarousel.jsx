import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

const NoteCarousel = ({ notes, onClose }) => {
    const ref = useRef(null); // Create a ref
    const navigate = useNavigate(); // Get the navigate function from React Router

    useEffect(() => {
        const handleClickOutsideCarousel = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("Clicked outside NoteCarousel");
                onClose(); // Call the function to close the carousel
            }
        };

        document.addEventListener("mousedown", handleClickOutsideCarousel);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideCarousel);
        };
    }, [ref, onClose]); // Pass ref and onClose as dependencies

    // Function to navigate to EditNote page when a note is clicked
    const handleNoteClick = (noteId) => {
        navigate(`/edit-note/${noteId}`);
    };

    return (
        <div className="note-carousel" ref={ref}>
            {notes.map((note) => (
                <Link
                    key={note.id}
                    to={`/edit-note/${note.id}`} // Link to the edit page
                    className="note-link"
                    onClick={() => handleNoteClick(note.id)} // Handle click event
                >
                    <div className="note gradient">
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NoteCarousel;
