import { books } from "@/type/book";
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
        margin: 5,
      }}
    >
      <Text>{book.name}</Text>
    </View>
  );
};

export default BookList;
