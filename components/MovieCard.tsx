import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  genre_ids,
  original_language,
}: Movie) => {
  // Format vote average to display as stars out of 5
  const rating = Math.round(vote_average / 2);

  // Get year from release date
  const year = release_date?.split("-")[0] || "N/A";

  // Language display
  const language = original_language?.toUpperCase() || "EN";

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-5" activeOpacity={0.6}>
        <View className="relative">
          <ImageBackground
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : `https://placehold.co/200x400/1a1a1a/FFFFFF.png?text=No%20Image`,
            }}
            className="w-full h-52 rounded-lg overflow-hidden"
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              className="absolute bottom-0 left-0 right-0 h-16"
            />

            {/* Rating badge */}
            <View className="absolute top-2 right-2 bg-yellow-500 px-1.5 py-1 rounded-full flex-row items-center">
              <Image
                source={icons.star}
                className="size-3 mr-1"
                tintColor="#000"
              />
              <Text className="text-xs text-black font-bold">{rating}</Text>
            </View>

            {/* Language badge */}
            <View className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full">
              <Text className="text-xs text-black font-bold">{language}</Text>
            </View>
          </ImageBackground>
        </View>

        <View className="mt-2">
          <Text className="text-sm font-bold text-white" numberOfLines={1}>
            {title}
          </Text>

          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row items-center">
              <Ionicons
                name="calendar-outline"
                size={12}
                color="#A8B5DB"
                style={{ marginRight: 4 }}
              />
              <Text className="text-xs text-light-300 font-medium">{year}</Text>
            </View>

            {vote_average > 7 && (
              <View className="bg-red-500 px-1.5 py-0.5 rounded-full ml-1">
                <Text className="text-[8px] text-white font-bold">HOT</Text>
              </View>
            )}
          </View>

          {/* Progress bar for popularity */}
          <View className="mt-2 bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <View
              className="bg-green-500 h-full rounded-full"
              style={{ width: `${Math.min(vote_average * 10, 100)}%` }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
