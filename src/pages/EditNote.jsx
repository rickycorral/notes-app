import { Link, useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp, IoTrashOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import useCreateDate from './../components/useCreateDate';

const EditNote = ({ notes, setNotes, gradientColor }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [note, setNote] = useState(null);
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map(item => { 
        if(item.id == id) {
          item = newNote;
        }
        return item;
      })
      setNotes(newNotes);
    }
    //redirect to hompage
    navigate('/');
  };

   const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete')){
    const newNotes = notes.filter(item => item.id != id);

    setNotes(newNotes);
    navigate('/');
   }
  }

  useEffect(() => {
    const foundNote = notes.find((item) => item.id === id);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setDetails(foundNote.details);
    }
  }, [id, notes]);

  const handleSave = () => {
    // Update the note with the edited title and details
    const updatedNotes = notes.map((item) =>
      item.id === id ? { ...item, title, details } : item
    );
    setNotes(updatedNotes);
  };

  if (!note) {
    return (
      <section>
        <p>Note not found.</p>
        <Link to="/">Go back to the homepage</Link>
      </section>
    );
  }

  return (
    <section style={{ background: gradientColor}}>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoArrowBackCircleSharp />
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Save
        </button>
        <button className="btn danger" onClick={handleDelete}>
          <IoTrashOutline />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Note details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
