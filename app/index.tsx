import BookList from "@/components/bookList";
import { BookService } from "@/services/books";
import { books } from "@/type/book";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";

const { getBooks } = BookService;

export default function Index() {
  const [bookList, setBookList] = useState<books[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          paddingBottom: 50,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Searchbar
            placeholder="Rechercher un livre"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ flex: 1 }}
          ></Searchbar>
          <Button title="+"></Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          {bookList.map((item, index) => (
            <Link key={index} href={`/book/${item.id}`}>
              <BookList key={index} book={item}></BookList>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
