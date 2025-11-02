import { theme } from "@/constants/theme";
import { BookService } from "@/services/books";
import { book } from "@/type/book";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  book: book;
  bookId: string;
};

const { updateBook } = BookService;

const BookDetail = ({ book, bookId }: Props) => {
  const [isFavorite, setIsFavorite] = useState(book.favorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const newFavoriteState = !isFavorite;
      await updateBook(bookId, { ...book, favorite: newFavoriteState });
      setIsFavorite(newFavoriteState);
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: book.cover }}
          contentFit="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          disabled={isLoading}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={32}
            color={isFavorite ? "#e74c3c" : "#ffffff"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{book.name}</Text>

        <View style={styles.infoSection}>
          <InfoRow label="Auteur" value={book.author} />
          <InfoRow label="Éditeur" value={book.editor} />
          <InfoRow label="Année" value={book.year?.toString()} />
          <InfoRow label="Thème" value={book.theme} />
          <InfoRow label="Note" value={`${book.rating}/5`} />
          <InfoRow label="Lu" value={book.read ? "Oui" : "Non"} />
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    width: "100%",
    height: 400,
    backgroundColor: theme.colors.border,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.md,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  infoSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  infoValue: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
});

export default BookDetail;
