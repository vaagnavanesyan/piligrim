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
                'duration': 3600,
                'mediatype': 'video'
            })
        addDirectoryItem(plugin.handle, plugin.url_for(show_film, film_id),
                         item, True)
    endOfDirectory(plugin.handle)


@plugin.route('/films/<film_id>')
def show_film(film_id):
    try:
        url = 'https://piligrim-app.herokuapp.com/api/films/' + film_id
        result = requests.get(url)
        film = result.json()
        film_name = film['name']
        film_genre = film['genre']
        film_duration = film['duration']
        film_description = film['description']

        item = ListItem("%s (%s, %s)" % (film_name, film_genre, film_duration))
        item.setInfo(
            'video', {
                'title': film_name,
                'genre': film_genre,
                'plot': film_description,
                'duration': 3600,
                'mediatype': 'video'
            })

        youtube_prefix = 'https://www.youtube.com/watch?v='
        vimeo_prefix = 'https://player.vimeo.com/video/'
        if film['video'].index(youtube_prefix) > -1:
            video_id = film['video'].replace(youtube_prefix, '')
            path = 'plugin://plugin.video.youtube/play/?video_id=' + video_id
        elif film['video'].index(vimeo_prefix) > -1:
            video_id = film['video'].replace(vimeo_prefix, '')
            path = 'plugin://plugin.video.vimeo/play/?uri=%2Fvideos%2F' + video_id

        addDirectoryItem(plugin.handle, path, item)
        endOfDirectory(plugin.handle)
    except:
        raise BaseException(film['video'])


def run():
    plugin.run()
