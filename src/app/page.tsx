import Link from 'next/link';
import CreateTask from './CreateTask';
import DeleteIcon from './notes/deleteButton';
import CompleteIcon from './notes/completebutton';
import EditIcon from './notes/editButton';

// Define the Note interface for type safety
interface Note {
  id: string;
  title: string;
  content: string;
  created: string;
}

// Function that fetches the notes from the db
async function getNotes(): Promise<Note[]> {
  try {
    const res = await fetch('http://127.0.0.1:8090/api/collections/Tasks/records', { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Error fetching notes: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

// function that deletes notes from the db
async function deleteNote(id: string): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:8090/api/collections/Tasks/records/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error(`Failed to delete note ${id}: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log(`Note ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    return false;
  }
}

// function that edits note in the db

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="App">
      <CreateTask />
      <div className="list">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function Note({ note }: { note: Note }) {
  const { id, title, content, created } = note;

  return (
    <Link href={`/Tasks/${id}`}>
      <div className="note-container">
        <div className="note-content">
          <h2>{title}</h2>
          <h5>{content}</h5>
          <p>{new Date(created).toLocaleString()}</p>
        </div>
        <div className="note-icons">
          <DeleteIcon />
          <EditIcon />
          <CompleteIcon />
        </div>
      </div>
    </Link>
  );
}