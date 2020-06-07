import {Right, Thumbnail} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Slider} from './slider';
import {ParserService} from '../src/site-parser';

export const MoviesFeed = () => {
  const [dashboard, setDashboard] = useState([] as any);
  const [slider, setSlider] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  // idk better way how to implement multiple "Pull to refresh" and keep useEffect deendendent only on "page"
  const [refresh, triggerRefresh] = useState(false);
  const [stillScrolling, setScrolling] = useState(false);

  const fetchData = async () => {
    // console.log(`Loading page: ${page}\tFeed length: ${dashboard.length}\tExpected: ${page * 36}`);
    setLoading(true);
    const result = await ParserService.getDashboard(page);
    setDashboard([...dashboard, ...result.movies]);
    setSlider(result.slider);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, refresh]);

  const doRefresh = () => {
    setDashboard([]);
    if (page === 0) {
      triggerRefresh(!refresh);
    } else {
      setPage(0);
    }
  };

  const loadMoreData = () => {
    if (stillScrolling) {
      setScrolling(false);
      setPage(page + 1);
    }
  };

  return (
    <FlatList
      style={styles.background}
      data={dashboard}
      ListHeaderComponent={<Slider slider={slider} />}
      renderItem={({item}) => <Movie movie={item} />}
      keyExtractor={(item: any) => item.link}
      initialNumToRender={10}
      ListFooterComponent={isLoading ? Footer : null}
      onEndReachedThreshold={3}
      refreshing={false}
      onRefresh={() => doRefresh()}
      onMomentumScrollBegin={() => setScrolling(true)}
      onEndReached={() => loadMoreData()}
    />
  );
};
class Movie extends React.Component<any> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.movie}
        onPress={() => console.log(this.props.movie.link)}
        key={this.props.movie.name}>
        <Thumbnail
          square
          large
          source={{uri: this.props.movie.poster}}
          style={styles.moviePoster}
        />
        <View style={styles.movieTextContainer}>
          <Text style={styles.movieName}>{this.props.movie.name}</Text>
          <Text style={styles.movieGenre}>{this.props.movie.genre}</Text>
        </View>
        <Right>
          <Text style={styles.movieDuration}>
            {this.props.movie.duration / 60} мин
          </Text>
        </Right>
      </TouchableOpacity>
    );
  }
}

const Footer = () => {
  return (
    <ActivityIndicator animating size="large" color={styles.movieName.color} />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070215',
  },
  movie: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  moviePoster: {
    flex: 1,
  },
  movieTextContainer: {
    marginLeft: 10,
    flex: 4,
  },
  movieName: {
    color: '#9B528E',
    fontSize: 18,
  },
  movieDuration: {
    color: '#7992D2',
    flex: 1,
  },
  movieGenre: {
    color: '#C7BDDF',
  },
});
