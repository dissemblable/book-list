import { book } from "@/type/book";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { Text, View, StyleSheet, ScrollView } from "react-native";

type Props = {
  book: book;
};

const BookDetail = ({ book }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: book.cover }}
          contentFit="cover"
        />
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
  },
  image: {
    width: "100%",
    height: "100%",
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
