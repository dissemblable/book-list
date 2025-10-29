import { books } from "@/type/book";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type Props = {
  book: books;
};

const BookList = ({ book }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 4,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
      }}
    >
      <Image
        style={{ width: 150, height: 200 }}
        source={{ uri: book.cover }}
      ></Image>
      <Text>{book.name}</Text>
    </View>
  );
};

export default BookList;
