import { book, books } from "@/type/book";

export class BookService {
  static getBooks = async () => {
    const response = await fetch("http://localhost:3000/books").then((res) =>
      res.json()
    );

    const result: books[] = response;
    return result;
  };

  static getBook = async (id: string) => {
    const response = await fetch(`http://localhost:3000/books/${id}`).then(
      (res) => res.json()
    );

    const result: book = response;
    return result;
  };

  static createBook = async (book: book) => {
    const response = await fetch(`http://localhost:3000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res) => res.json());

    const result: books = response;
    return result;
  };

  static updateBook = async (id: string, book: book) => {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res) => res.json());

    const result: books = response;
    return result;
  };

  static deleteBook = async (id: string) => {
    await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    });
    return "Book deleted";
  };
}
