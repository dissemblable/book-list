import { book, books } from "@/type/book";

export class BookService {
  static getBooks = async () => {
    const response = await fetch("http://10.14.169.76:3000/books").then((res) =>
      res.json()
    );

    const result: books[] = response;
    return result;
  };

  static getBook = async (id: string) => {
    const response = await fetch(`http://10.14.169.76:3000/books/${id}`).then(
      (res) => res.json()
    );

    const result: book = response;
    return result;
  };

  static createBook = async (book: books) => {
    const response = await fetch(`http://10.14.169.76:3000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res) => res.json());

    const result: books = response;
    return result;
  };

  static updateBook = async (id: number, book: books) => {
    const response = await fetch(`http://10.14.169.76:3000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res) => res.json());

    const result: books = response;
    return result;
  };

  static deleteBook = async (id: number) => {
    await fetch(`http://10.14.169.76:3000/books/${id}`, {
      method: "DELETE",
    });
    return "Book deleted";
  };
}
