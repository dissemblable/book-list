import BookDetail from "@/components/bookDetail";
import { BookService } from "@/services/books";
import { book } from "@/type/book";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const { getBook } = BookService;

const BookDetailPage = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const [bookInformation, setBookInformation] = useState<book>();

  useEffect(() => {
    getBook(bookId).then((value) => {
      setBookInformation(value);
    });
  }, []);

  return (
    <View>
      {bookInformation && <BookDetail book={bookInformation}></BookDetail>}
    </View>
  );
};

export default BookDetailPage;
