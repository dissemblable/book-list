import BookForm from "@/components/bookForm";
import { BookService } from "@/services/books";
import { book } from "@/type/book";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const { getBook } = BookService;

const UpdateBookModal = () => {
  const id = useLocalSearchParams<{ id: string }>();
  const [initialValue, setInitialValue] = useState<book>();

  useEffect(() => {
    getBook(id.id).then((value) => setInitialValue(value));
  }, []);

  return (
    <View>
      {initialValue && (
        <BookForm
          type="update"
          initialValue={initialValue}
          bookId={id.id}
        ></BookForm>
      )}
    </View>
  );
};

export default UpdateBookModal;
