import BookList from "@/components/bookList";
import { theme } from "@/constants/theme";
import { BookService } from "@/services/books";
import { books } from "@/type/book";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";

const { getBooks } = BookService;

export default function Index() {
  const [bookList, setBookList] = useState<books[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      getBooks().then((value) => {
        setBookList(value);
      });
    }, [])
  );

  const filteredBooks = bookList.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Rechercher un livre"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            iconColor={theme.colors.primary}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/modals/addBookModal")}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {filteredBooks.map((item, index) => (
            <Link key={index} href={`/book/${item.id}`} asChild>
              <TouchableOpacity>
                <BookList book={item} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  searchbar: {
    flex: 1,
    backgroundColor: theme.colors.background,
    elevation: 0,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.md,
  },
  addButtonText: {
    fontSize: 28,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: theme.spacing.md,
  },
});
