import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "@/constants/images";

const ProfileSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="mt-6">
    <Text className="text-light-200 text-lg font-semibold mb-4">{title}</Text>
    <View className="bg-dark-100 rounded-2xl p-4">{children}</View>
  </View>
);

const ProfileButton = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-3 px-2"
  >
    <View className="w-10 h-10 rounded-full bg-dark-200 items-center justify-center">
      {icon}
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-white text-base">{title}</Text>
      {subtitle && <Text className="text-light-300 text-sm">{subtitle}</Text>}
    </View>
    <Feather name="chevron-right" size={20} color="#9CA4AB" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0 flex-1"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <LinearGradient
          colors={["rgba(171,139,255,0.1)", "transparent"]}
          className="w-full h-64 absolute"
        />

        {/* Header */}
        <View className="items-center mt-16 mb-8">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-dark-100 items-center justify-center">
              <MaterialCommunityIcons
                name="account"
                size={40}
                color="#AB8BFF"
              />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-accent rounded-full p-2">
              <Feather name="edit-2" size={16} color="#030014" />
            </TouchableOpacity>
          </View>
          <Text className="text-white text-xl font-semibold mt-4">
            John Doe
          </Text>
          <Text className="text-light-300">john.doe@example.com</Text>
        </View>

        <View className="px-6">
          {/* Stats */}
          <View className="flex-row justify-between bg-dark-100 rounded-2xl p-4">
            <View className="items-center flex-1">
              <Text className="text-accent text-xl font-bold">24</Text>
              <Text className="text-light-300 text-sm">Watchlist</Text>
            </View>
            <View className="items-center flex-1 border-x border-dark-200">
              <Text className="text-accent text-xl font-bold">142</Text>
              <Text className="text-light-300 text-sm">Watched</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-accent text-xl font-bold">38</Text>
              <Text className="text-light-300 text-sm">Reviews</Text>
            </View>
          </View>

          {/* Account Settings */}
          <ProfileSection title="Account Settings">
            <ProfileButton
              icon={
                <Ionicons name="person-outline" size={24} color="#AB8BFF" />
              }
              title="Edit Profile"
              subtitle="Update your personal information"
            />
            <ProfileButton
              icon={
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#AB8BFF"
                />
              }
              title="Notifications"
              subtitle="Manage your notifications"
            />
            <ProfileButton
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#AB8BFF"
                />
              }
              title="Privacy"
              subtitle="Control your privacy settings"
            />
          </ProfileSection>

          {/* Preferences */}
          <ProfileSection title="Preferences">
            <ProfileButton
              icon={
                <Ionicons
                  name="color-palette-outline"
                  size={24}
                  color="#AB8BFF"
                />
              }
              title="Appearance"
              subtitle="Dark mode and theme settings"
            />
            <ProfileButton
              icon={
                <MaterialCommunityIcons
                  name="movie-outline"
                  size={24}
                  color="#AB8BFF"
                />
              }
              title="Content Preferences"
              subtitle="Customize your movie recommendations"
            />
            <ProfileButton
              icon={
                <Ionicons name="language-outline" size={24} color="#AB8BFF" />
              }
              title="Language"
              subtitle="Change app language"
            />
          </ProfileSection>

          {/* Support */}
          <ProfileSection title="Support">
            <ProfileButton
              icon={<Feather name="help-circle" size={24} color="#AB8BFF" />}
              title="Help Center"
            />
            <ProfileButton
              icon={
                <MaterialCommunityIcons
                  name="information-outline"
                  size={24}
                  color="#AB8BFF"
                />
              }
              title="About PopcornPal"
            />
          </ProfileSection>

          {/* Sign Out Button */}
          <TouchableOpacity className="mt-8 mb-10 bg-dark-100 rounded-2xl p-4 items-center">
            <Text className="text-red-500 text-base font-semibold">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
