import { View, Text, ScrollView } from "react-native";
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ScreenHeaderBtn} from '../components';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Stack.Screen
                options={{
                    headerStyle: {  },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: "GetYum"
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1
                        //padding: SIZES.medium
                    }}
                >
                    {/* <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs /> */}
                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default Home;
