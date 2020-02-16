# -*- coding: utf-8 -*-

import routing
import logging
import requests
import xbmcaddon

from resources.lib import kodiutils
from resources.lib import kodilogging
from xbmcgui import ListItem
from xbmcplugin import addDirectoryItem, endOfDirectory, setContent, setResolvedUrl

ADDON = xbmcaddon.Addon()
logger = logging.getLogger(ADDON.getAddonInfo('id'))
kodilogging.config()
plugin = routing.Plugin()


@plugin.route('/')
def index():
    setContent(plugin.handle, 'videos')

    url = 'https://piligrim-app.herokuapp.com/api/dashboard'
    result = requests.get(url)
    json_data = result.json()

    films = json_data['films']
    for film in films:
        film_name = film['name']
        film_genre = film['genre']
        film_duration = film['duration']
        film_id = film['link'].replace('/film/', '')

        item = ListItem(film_name)
        item.setArt({
            'thumb': film['poster'],
            'icon': film['poster'],
            'fanart': film['poster']
        })
        item.setInfo(
            'video', {
                'title': film_name,
                'genre': film_genre,
                'plot': 'paste plot here',
                'duration': film_duration,
                'mediatype': 'video'
            })
        addDirectoryItem(plugin.handle, plugin.url_for(show_film, film_id=film_id, poster=film['poster']),
                         item, True)
    endOfDirectory(plugin.handle)


@plugin.route('/films')
def show_film():
    film_id = plugin.args['film_id'][0]
    film_poster = plugin.args['poster'][0]
    url = 'https://piligrim-app.herokuapp.com/api/films/' + film_id
    result = requests.get(url)
    film = result.json()
    film_name = film['name']
    film_genre = film['genre']
    film_duration = film['duration']
    film_description = film['description']

    item = ListItem(film_name)
    item.setArt({
        'thumb': film_poster,
        'icon': film_poster,
        'fanart': film_poster
    })
    item.setInfo(
        'video', {
            'title': film_name,
            'genre': film_genre,
            'plot': film_description,
            'duration': film_duration,
            'mediatype': 'video'
        })

    youtube_prefix = 'https://www.youtube.com/watch?v='
    vimeo_prefix = 'https://player.vimeo.com/video/'
    if youtube_prefix in film['video']:
        video_id = film['video'].replace(youtube_prefix, '')
        path = 'plugin://plugin.video.youtube/play/?video_id=' + video_id
    elif vimeo_prefix in film['video']:
        video_id = film['video'].replace(vimeo_prefix, '')
        path = 'plugin://plugin.video.vimeo/play/?uri=%2Fvideos%2F' + video_id

    addDirectoryItem(plugin.handle, path, item)
    endOfDirectory(plugin.handle)


def run():
    plugin.run()
