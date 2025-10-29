import { theme } from "@/constants/theme";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle: {
          fontWeight: "600",
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Ma Bibliothèque",
        }}
      />
      <Stack.Screen
        name="book/[bookId]/index"
        options={{
          title: "Détails du livre",
        }}
      />
      <Stack.Screen
        name="modals/addBookModal"
        options={{
          presentation: "modal",
          title: "Ajouter un livre",
        }}
      />
      <Stack.Screen
        name="modals/updateBookModal"
        options={{
          presentation: "modal",
          title: "Modifier le livre",
        }}
      />
    </Stack>
  );
}
