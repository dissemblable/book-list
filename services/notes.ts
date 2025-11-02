import { notes } from "@/type/notes";

export class NotesService {
  static getNotes = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/books/${id}/notes`
    ).then((res) => res.json());

    const result: notes[] = response;
    return result;
  };
  static createNote = async (id: string, note: notes) => {
    const response = await fetch(`http://localhost:3000/books/${id}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then((res) => res.json());

    const result: notes = response;
    return result;
  };
}
