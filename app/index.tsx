import BookList from "@/components/bookList";
import { BookService } from "@/services/books";
import { books } from "@/type/book";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const { getBooks } = BookService;

export default function Index() {
  const [bookList, setBookList] = useState<books[]>([]);

  useEffect(() => {
    getBooks().then((value) => {
      setBookList(value);
    });
  }, []);

  console.log("data", bookList);
  return (
    <ScrollView>
      <View
        style={{
          gap: 10,
          alignItems: "center",
        }}
      >
        {bookList.map((item, index) => (
          <Link key={index} href={`/book/${item.id}`}>
            <BookList key={index} book={item}></BookList>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
