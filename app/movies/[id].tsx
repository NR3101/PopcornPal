import React from "react";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}

const MovieInfo = ({ label, value, icon }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5 bg-dark-100/80 p-4 rounded-xl w-full border border-dark-100">
    <View className="flex-row items-center mb-2">
      {icon}
      <Text className="text-light-200 font-medium text-base ml-2">{label}</Text>
    </View>
    <Text className="text-light-100 font-bold text-sm mt-1 leading-5">
      {value || "N/A"}
    </Text>
  </View>
);

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);
  const IMAGE_HEIGHT = 500;

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2]
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, IMAGE_HEIGHT],
            [0, -IMAGE_HEIGHT / 2],
            "clamp"
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [IMAGE_HEIGHT - 100, IMAGE_HEIGHT],
        [1, 0],
        "clamp"
      ),
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, IMAGE_HEIGHT / 1.5],
            [0, -IMAGE_HEIGHT + 150],
            "clamp"
          ),
        },
      ],
    };
  });

  return (
    <View className="bg-primary flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ab8bff" />
        </View>
      ) : (
        <>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            className="flex-1"
          >
            <Animated.View
              className="h-[500px] absolute left-0 right-0"
              style={imageAnimatedStyle}
            >
              <Animated.Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
                }}
                className="w-full h-full"
                style={{ position: "absolute" }}
              />
              <LinearGradient
                colors={["transparent", "rgba(15, 13, 35, 0.8)", "#0f0D23"]}
                className="absolute bottom-0 left-0 right-0 h-40"
              />
            </Animated.View>

            <Animated.View
              className="px-5 pt-[500px]"
              style={contentAnimatedStyle}
            >
              <Animated.View style={headerAnimatedStyle}>
                <Text className="text-2xl font-bold text-white mt-5">
                  {movie?.title}
                </Text>

                {movie?.tagline && (
                  <Text className="text-light-100 text-lg italic mt-2 opacity-90">
                    "{movie.tagline}"
                  </Text>
                )}

                <View className="flex-row items-center flex-wrap gap-2 mt-3">
                  <View className="flex-row items-center bg-dark-100/50 px-3 py-1.5 rounded-full">
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#A8B5DB"
                    />
                    <Text className="text-light-200 text-sm ml-1">
                      {movie?.release_date?.split("-")[0]}
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-dark-100/50 px-3 py-1.5 rounded-full">
                    <Ionicons name="time-outline" size={14} color="#A8B5DB" />
                    <Text className="text-light-200 text-sm ml-1">
                      {movie?.runtime}m
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-dark-100/50 px-3 py-1.5 rounded-full">
                    <MaterialCommunityIcons
                      name="star"
                      size={14}
                      color="#FFD700"
                    />
                    <Text className="text-white font-bold text-sm ml-1">
                      {Math.round(movie?.vote_average ?? 0)}/10
                    </Text>
                    <Text className="text-light-200 text-xs ml-1">
                      ({movie?.vote_count} votes)
                    </Text>
                  </View>
                </View>

                {movie?.genres && (
                  <View className="flex-row flex-wrap gap-2 mt-4">
                    {movie.genres.map((genre) => (
                      <View
                        key={genre.id}
                        className="bg-accent/20 px-3 py-1.5 rounded-full"
                      >
                        <Text className="text-accent text-xs font-medium">
                          {genre.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </Animated.View>

              <MovieInfo
                label="Overview"
                value={movie?.overview}
                icon={
                  <Ionicons
                    name="document-text-outline"
                    size={18}
                    color="#A8B5DB"
                  />
                }
              />

              <View className="flex-row gap-x-4 w-full">
                <View className="flex-1">
                  <MovieInfo
                    label="Budget"
                    value={
                      movie?.budget
                        ? `$${(movie.budget / 1_000_000).toFixed(1)}M`
                        : "N/A"
                    }
                    icon={
                      <MaterialCommunityIcons
                        name="cash"
                        size={18}
                        color="#A8B5DB"
                      />
                    }
                  />
                </View>
                <View className="flex-1">
                  <MovieInfo
                    label="Revenue"
                    value={
                      movie?.revenue
                        ? `$${(movie.revenue / 1_000_000).toFixed(1)}M`
                        : "N/A"
                    }
                    icon={
                      <MaterialCommunityIcons
                        name="chart-line"
                        size={18}
                        color="#A8B5DB"
                      />
                    }
                  />
                </View>
              </View>

              {movie && movie.production_companies?.length > 0 && (
                <MovieInfo
                  label="Production"
                  value={movie.production_companies
                    .map((c) => c.name)
                    .join(" • ")}
                  icon={
                    <MaterialCommunityIcons
                      name="movie-open"
                      size={18}
                      color="#A8B5DB"
                    />
                  }
                />
              )}

              {movie?.spoken_languages && movie.spoken_languages.length > 0 && (
                <MovieInfo
                  label="Languages"
                  value={movie?.spoken_languages
                    .map((lang) => lang.english_name)
                    .join(" • ")}
                  icon={<Ionicons name="language" size={18} color="#A8B5DB" />}
                />
              )}
            </Animated.View>
          </Animated.ScrollView>

          <TouchableOpacity
            className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-xl py-4 flex flex-row items-center justify-center z-50 shadow-lg shadow-accent/50"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color="#fff"
              className="mr-2"
            />
            <Text className="text-white font-semibold text-base">Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
