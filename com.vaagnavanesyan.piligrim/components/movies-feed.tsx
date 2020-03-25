import { Right, Thumbnail } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { ApiService } from '../services/api-service';

export const MoviesFeed = () => {
    const [dashboard, setDashboard] = useState([] as any);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        const result = await new ApiService().getDashboard(page);
        setDashboard([...dashboard, ...result.films]);
        setPage(page + 1);
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <FlatList
            style={styles.background}
            data={dashboard}
            renderItem={({ item }) => <Movie movie={item} />}
            keyExtractor={(item: any) => item.link}
            initialNumToRender={10}
            ListFooterComponent={Footer}
            onEndReachedThreshold={3}
            onEndReached={() => fetchData()}
        />
    );
}
class Movie extends React.Component<any>{
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <TouchableOpacity
            style={styles.movie}
            onPress={() => console.log(this.props.movie.link)}
            key={this.props.movie.name}
        >
            <Thumbnail square large source={{ uri: this.props.movie.poster }} style={styles.moviePoster} />
            <View style={styles.movieTextContainer}>
                <Text style={styles.movieName}>{this.props.movie.name}</Text>
                <Text style={styles.movieGenre}>{this.props.movie.genre}</Text>
            </View>
            <Right>
                <Text style={styles.movieDuration}>{this.props.movie.duration / 60} мин</Text>
            </Right>
        </TouchableOpacity>
    }
}

const Footer = () => {
    return <ActivityIndicator animating size="large" color={styles.movieName.color} />;
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#070215',
    },
    movie: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10
    },
    moviePoster: {
        flex: 1
    },
    movieTextContainer: {
        marginLeft: 10,
        flex: 4
    },
    movieName: {
        color: '#9B528E',
        fontSize: 18
    },
    movieDuration: {
        color: '#7992D2',
        flex: 1
    },
    movieGenre: {
        color: '#C7BDDF',
    },
})