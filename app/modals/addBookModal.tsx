import BookForm from "@/components/bookForm";
import { generalInformation } from "@/data/generalInformation";
import { View } from "react-native";

const addbookModal = () => {
  return (
    <View>
      <BookForm initialValue={generalInformation}></BookForm>
    </View>
  );
};

export default addbookModal;
