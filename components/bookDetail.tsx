import { theme } from "@/constants/theme";
import { BookService } from "@/services/books";
import { NotesService } from "@/services/notes";
import { book } from "@/type/book";
import { notes } from "@/type/notes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  book: book;
  bookId: string;
};

const { updateBook } = BookService;
const { getNotes, createNote } = NotesService;

const BookDetail = ({ book, bookId }: Props) => {
  const [isFavorite, setIsFavorite] = useState(book.favorite);
  const [rating, setRating] = useState(book.rating);
  const [isLoading, setIsLoading] = useState(false);
  const [notesList, setNotesList] = useState<notes[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [bookId]);

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      const notes = await getNotes(bookId);
      setNotesList(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoadingNotes(false);
    }
  };

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

  const handleRatingChange = async (newRating: number) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await updateBook(bookId, { ...book, rating: newRating });
      setRating(newRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNoteContent.trim() || isAddingNote) return;

    try {
      setIsAddingNote(true);
      const newNote: notes = {
        id: Date.now(),
        bookId: parseInt(bookId),
        content: newNoteContent.trim(),
        dateISO: new Date(),
      };
      await createNote(bookId, newNote);
      setNewNoteContent("");
      await fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsAddingNote(false);
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
          <InfoRow label="Lu" value={book.read ? "Oui" : "Non"} />

          <View style={styles.ratingRow}>
            <Text style={styles.infoLabel}>Note</Text>
            <StarRating
              rating={rating}
              onRatingChange={handleRatingChange}
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.addNoteContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder="Ajouter une note..."
              placeholderTextColor={theme.colors.textSecondary}
              value={newNoteContent}
              onChangeText={setNewNoteContent}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.addNoteButton,
                (!newNoteContent.trim() || isAddingNote) &&
                  styles.addNoteButtonDisabled,
              ]}
              onPress={handleAddNote}
              disabled={!newNoteContent.trim() || isAddingNote}
            >
              {isAddingNote ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Ionicons name="add" size={24} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>

          {loadingNotes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : notesList.length > 0 ? (
            <View style={styles.notesList}>
              {notesList.map((note) => (
                <View key={note.id} style={styles.noteItem}>
                  <Text style={styles.noteContent}>{note.content}</Text>
                  <Text style={styles.noteDate}>
                    {new Date(note.dateISO).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noNotesText}>Aucune note pour ce livre</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const StarRating = ({
  rating,
  onRatingChange,
  disabled = false,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => !disabled && onRatingChange(star)}
          disabled={disabled}
          style={styles.starButton}
        >
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={28}
            color={star <= rating ? "#FFD700" : "#ccc"}
          />
        </TouchableOpacity>
      ))}
    </View>
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
  notesSection: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  addNoteContainer: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  noteInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.text,
    minHeight: 80,
    textAlignVertical: "top",
    ...theme.shadows.sm,
  },
  addNoteButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.md,
  },
  addNoteButtonDisabled: {
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.5,
  },
  loadingContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  notesList: {
    gap: theme.spacing.md,
  },
  noteItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  noteContent: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  noteDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontStyle: "italic",
  },
  noNotesText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: theme.spacing.xl,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    paddingTop: theme.spacing.md,
  },
  starsContainer: {
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  starButton: {
    padding: 2,
  },
});

export default BookDetail;
