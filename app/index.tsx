import BookList from "@/components/bookList";
import { theme } from "@/constants/theme";
import { BookService } from "@/services/books";
import { book, books } from "@/type/book";
import { Ionicons } from "@expo/vector-icons";
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

type FilterType = "all" | "read" | "unread" | "favorites";
type SortType = "title" | "author" | "theme";

export default function Index() {
  const [bookList, setBookList] = useState<(books & Partial<book>)[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("title");

  useFocusEffect(
    useCallback(() => {
      getBooks().then((value) => {
        setBookList(value);
      });
    }, [])
  );

  const filteredAndSortedBooks = bookList
    .filter((book) => {
      const matchesSearch =
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.author?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "read" && book.read === true) ||
        (activeFilter === "unread" && book.read === false) ||
        (activeFilter === "favorites" && book.favorite === true);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "author") {
        return (a.author || "").localeCompare(b.author || "");
      } else if (sortBy === "theme") {
        return (a.theme || "").localeCompare(b.theme || "");
      }
      return 0;
    });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Rechercher par titre ou auteur"
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

        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "all" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("all")}
            >
              <Ionicons
                name="library"
                size={16}
                color={
                  activeFilter === "all"
                    ? theme.colors.surface
                    : theme.colors.primary
                }
              />
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "all" && styles.filterButtonTextActive,
                ]}
              >
                Tous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "read" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("read")}
            >
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={
                  activeFilter === "read"
                    ? theme.colors.surface
                    : theme.colors.primary
                }
              />
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "read" && styles.filterButtonTextActive,
                ]}
              >
                Lus
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "unread" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("unread")}
            >
              <Ionicons
                name="book-outline"
                size={16}
                color={
                  activeFilter === "unread"
                    ? theme.colors.surface
                    : theme.colors.primary
                }
              />
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "unread" && styles.filterButtonTextActive,
                ]}
              >
                Non lus
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === "favorites" && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter("favorites")}
            >
              <Ionicons
                name="heart"
                size={16}
                color={
                  activeFilter === "favorites"
                    ? theme.colors.surface
                    : "#e74c3c"
                }
              />
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === "favorites" && styles.filterButtonTextActive,
                ]}
              >
                Favoris
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Trier par:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === "title" && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy("title")}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === "title" && styles.sortButtonTextActive,
                ]}
              >
                Titre
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === "author" && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy("author")}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === "author" && styles.sortButtonTextActive,
                ]}
              >
                Auteur
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === "theme" && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy("theme")}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === "theme" && styles.sortButtonTextActive,
                ]}
              >
                Thème
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredAndSortedBooks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={64}
              color={theme.colors.textSecondary}
            />
            <Text style={styles.emptyStateText}>
              Aucun livre ne correspond à vos critères
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredAndSortedBooks.map((item, index) => (
              <Link key={index} href={`/book/${item.id}`} asChild>
                <TouchableOpacity>
                  <BookList book={item} />
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        )}
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
    marginBottom: theme.spacing.md,
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
  filtersContainer: {
    marginBottom: theme.spacing.md,
  },
  filtersScroll: {
    flexGrow: 0,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: theme.colors.surface,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  sortLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: "600",
    fontSize: 14,
  },
  sortButtons: {
    flex: 1,
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  sortButton: {
    flex: 1,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 12,
  },
  sortButtonTextActive: {
    color: theme.colors.surface,
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
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyStateText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
});
