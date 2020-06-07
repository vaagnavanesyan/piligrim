import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Slider } from './slider';
import { ParserService } from '../../site-parser';
import { MovieFeedItem } from './movie-feed-item';

export const MoviesFeed = () => {
  const [dashboard, setDashboard] = useState([] as any);
  const [slider, setSlider] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [refresh, triggerRefresh] = useState(false);
  const [stillScrolling, setScrolling] = useState(false);

  const fetchData = async () => {
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
      renderItem={({ item }) => <MovieFeedItem movie={item} />}
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

const Footer = () => {
  return (
    <ActivityIndicator animating size="large" color={styles.movieName.color} />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070215',
  },
  movieName: {
    color: '#9B528E',
    fontSize: 18,
  },
});
