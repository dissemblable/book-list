import { theme } from "@/constants/theme";
import { books } from "@/type/book";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  book: books;
};

const BookList = ({ book }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: book.cover }}
          contentFit="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    ...theme.shadows.md,
  },
  imageContainer: {
    width: "100%",
    height: 190,
    backgroundColor: theme.colors.border,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: theme.spacing.sm,
  },
  title: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: "600",
  },
});

export default BookList;
