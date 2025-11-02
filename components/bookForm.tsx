import { BookService } from "@/services/books";
import { book } from "@/type/book";
import { faker } from "@faker-js/faker";
import { router } from "expo-router";
import { Formik } from "formik";
import { Button, TextInput, View } from "react-native";
import { Checkbox } from "react-native-paper";

const { createBook, updateBook } = BookService;

type Props = {
  initialValue: book;
  type: "create" | "update";
  bookId?: string;
};

const BookForm = ({ initialValue, type, bookId }: Props) => {
  const coverWidth = 400;
  const coverHight = 600;
  const getCoverImage = () =>
    faker.image.url({
      width: coverWidth,
      height: coverHight,
    });

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={async (values) => {
        if (type === "create") {
          await createBook({ ...values, cover: getCoverImage() });
          router.back();
        } else {
          if (bookId === undefined) {
            return;
          }
          await updateBook(bookId, values);
          router.back();
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <View>
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            placeholder="Nom du livre"
          />
          <TextInput
            onChangeText={handleChange("author")}
            onBlur={handleBlur("author")}
            value={values.author}
            placeholder="Auteur"
          />
          <TextInput
            onChangeText={handleChange("editor")}
            onBlur={handleBlur("editor")}
            value={values.editor}
            placeholder="Éditeur"
          />
          <TextInput
            onChangeText={handleChange("year")}
            onBlur={handleBlur("year")}
            value={values.year.toString()}
            keyboardType="numeric"
            placeholder="Année"
          />
          <TextInput
            onChangeText={handleChange("theme")}
            onBlur={handleBlur("theme")}
            value={values.theme}
            placeholder="Thème"
          />
          <Checkbox.Item
            label="Déjà lu"
            status={values.read ? "checked" : "unchecked"}
            onPress={() => setFieldValue("read", !values.read)}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default BookForm;
