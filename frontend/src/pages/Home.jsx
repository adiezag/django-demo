import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activity_level, setActivity_level] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/note/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("note deleted");
        else alert("Failed to delete the note");
        getNotes();
      })
      .catch((error) => alert(error));
  };
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("note created");
        else alert("failed to make note");
        getNotes();
      })
      .catch((err) => alert(err));
  };
  const createProfile = (e) => {
    e.preventDefault();
    api
      .post("/api/profile/", { height, weight, age, activity_level, goal })
      .then((res) => {
        if (res.status === 201) alert("profile created");
        else alert("failed to make profile");
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note} />
        ))}
      </div>
      <h2>Create a note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
      <h2>Set profile</h2>
      <form onSubmit={createProfile}>
        <label htmlFor="height">Height:</label>
        <br />
        <input
          type="number"
          id="height"
          name="height"
          required
          onChange={(e) => setHeight(e.target.value)}
          value={height}
        />
        <label htmlFor="content">Weight:</label>
        <br />
        <input
          type="number"
          id="weight"
          name="weight"
          required
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        ></input>
        <br />
        <label htmlFor="age">Age:</label>
        <br />
        <input
          type="number"
          id="age"
          name="age"
          required
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <label htmlFor="activity_level">Activity level:</label>
        <br />
        <select
          type="text"
          id="activity_level"
          name="activity_level"
          required
          onChange={(e) => setActivity_level(e.target.value)}
          value={activity_level}
        >
          <option value="">-- Select activity level --</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          {/* <option value="very_active">Very Active</option> */}
        </select>
        <br />
        <label htmlFor="goal">Goal:</label>
        <br />
        <select
          type="text"
          id="goal"
          name="goal"
          required
          onChange={(e) => setGoal(e.target.value)}
          value={goal}
        >
          <option value="">-- Select goal --</option>
          <option value="lose">Lose</option>
          <option value="maintain">Maintain</option>
          <option value="gain">Gain</option>
        </select>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
export default Home;
