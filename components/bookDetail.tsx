import { book } from "@/type/book";
import { Text, View } from "react-native";

type Props = {
  book: book;
};

const BookDetail = ({ book }: Props) => {
  return (
    <View>
      <Text>{book.name}</Text>
      <Text>{book.author}</Text>
      <Text>{book.theme}</Text>
      <Text>{book.year}</Text>
      <Text>{book.cover}</Text>
      <Text>{book.favorite}</Text>
      <Text>{book.rating}</Text>
      <Text>{book.editor}</Text>
      <Text>{book.read}</Text>
    </View>
  );
};

export default BookDetail;
