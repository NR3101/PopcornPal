import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";

interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const EmptyState = ({ searchQuery, onClearSearch }: EmptyStateProps) => {
  if (searchQuery?.trim()) {
    return (
      <View className="px-5 mt-10 items-center">
        <MaterialCommunityIcons name="movie-search" size={80} color="#A8B5DB" />
        <Text className="text-xl font-bold text-white mt-4">
          No Results Found
        </Text>
        <Text className="text-base text-gray-400 text-center mt-2 max-w-[250px]">
          We couldn't find any movies matching "{searchQuery}"
        </Text>
        <TouchableOpacity
          onPress={onClearSearch}
          className="flex-row items-center bg-accent/20 px-6 py-3 rounded-full mt-6"
        >
          <Feather name="refresh-ccw" size={16} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Clear Search</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="px-5 mt-10 items-center">
      <MaterialCommunityIcons name="movie-roll" size={80} color="#A8B5DB" />
      <Text className="text-xl font-bold text-white mt-4">Discover Movies</Text>
      <Text className="text-base text-gray-400 text-center mt-2 max-w-[250px]">
        Search for your favorite movies using the search bar above
      </Text>
      <View className="flex-row items-center mt-6 bg-dark-100/60 px-5 py-3 rounded-2xl">
        <Feather name="search" size={18} color="#A8B5DB" />
        <Text className="text-gray-400 ml-2">Try "Inception" or "Avatar"</Text>
      </View>
    </View>
  );
};

export default EmptyState;
