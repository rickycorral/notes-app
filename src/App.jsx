import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import { useEffect } from "react";
import { generateRandomGradientColor } from "./components/NoteItem"; // Import the function from NoteItem.jsx


import { useState } from "react";

const App = () => {
  // Attempt to retrieve notes from localStorage
  const storedNotes = localStorage.getItem('notes');
  const initialNotes = storedNotes ? JSON.parse(storedNotes) : [];
  const gradientColor = generateRandomGradientColor();

  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    // Store notes in localStorage whenever it changes
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Notes notes={notes} gradientColor={gradientColor} />} // Pass gradientColor as a prop to Notes
          />
          <Route
            path="/create-note"
            element={<CreateNote setNotes={setNotes} gradientColor={gradientColor} />} // Pass gradientColor as a prop to CreateNote
          />
          <Route
            path="/edit-note/:id"
            element={<EditNote notes={notes} setNotes={setNotes} gradientColor={gradientColor} />} // Pass gradientColor as a prop to EditNote
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App;
