import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native';

import { ApiService } from '../services/api-service';

export const MoviesFeed = () => {
    const [dashboard, setDashboard] = useState([] as any);
    const [page, setPage] = useState(1);
    const fetchData = async () => {
        console.log(`Loading page: ${page}`)
        const result = await new ApiService().getDashboard(page);
        setDashboard([...dashboard, ...result.films]);
        setPage(page + 1);
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <FlatList
            style={styles.background}
            data={dashboard}
            renderItem={({ item }) => <Movie movie={item} />}
            keyExtractor={(item: any) => item.link}
            initialNumToRender={10}
            onEndReachedThreshold={3}
            onEndReached={() => fetchData()}
        />
    );
}

const Movie = ({ movie }: any) =>
    <TouchableOpacity
        onPress={() => alert(movie.link)}
        key={movie.name}
        style={styles.film}>
        <Image
            style={styles.filmPoster}
            source={{ uri: movie.poster }}
        />
        <Text style={styles.filmName}>{movie.name}</Text>
        <Text style={styles.filmDuration}>{movie.duration / 60} мин</Text>
        <Text style={styles.filmGenre}>{movie.genre}</Text>
    </TouchableOpacity>

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#070215',
    },
    slide: {
        width: width - 60,
        height: height / 4,
    },
    slideContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: '#070215',
        borderRadius: 8,
    },
    slideImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "contain",
    },
    gallery: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 10
    },
    film: {

    },
    filmPoster: {
        width: width * .45,
        height: width * .45,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    filmName: {
        color: '#9B528E',
        fontSize: 18, //fix issue with long strings
    },
    filmDuration: {
        color: '#7992D2',
        fontSize: 20
    },
    filmGenre: {
        color: '#C7BDDF',
        fontSize: 16,
    },
})