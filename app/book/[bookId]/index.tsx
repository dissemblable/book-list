import BookDetail from "@/components/bookDetail";
import { theme } from "@/constants/theme";
import { BookService } from "@/services/books";
import { book } from "@/type/book";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { getBook, deleteBook } = BookService;

const BookDetailPage = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const [bookInformation, setBookInformation] = useState<book>();
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async () => {
    if (Platform.OS === "web") {
      const confirmed = globalThis.confirm(
        "Êtes-vous sûr de vouloir supprimer ce livre ?"
      );

      if (confirmed) {
        await deleteBook(bookId);
        router.back();
      }
    } else {
      Alert.alert(
        "Supprimer le livre",
        "Êtes-vous sûr de vouloir supprimer ce livre ?",
        [
          {
            text: "Annuler",
            style: "cancel",
          },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: async () => {
              await deleteBook(bookId);
              router.back();
            },
          },
        ]
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBook(bookId).then((value) => {
        setBookInformation(value);
        setIsLoading(false);
      });
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookInformation && <BookDetail book={bookInformation} />}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            router.navigate({
              pathname: "/modals/updateBookModal",
              params: { id: bookId },
            })
          }
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  actionBar: {
    flexDirection: "row",
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.md,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
  },
  buttonText: {
    ...theme.typography.body,
    color: theme.colors.surface,
    fontWeight: "600",
  },
});

export default BookDetailPage;
