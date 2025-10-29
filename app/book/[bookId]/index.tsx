import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  return (
    <View>
      <Text> ici c est la page de détaille {bookId}</Text>
    </View>
  );
};

export default BookDetail;
