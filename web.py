from distutils.log import debug
from flask import Flask, render_template,jsonify
import lyrics
app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("base.html")


@app.route("/artist")
def get_artist():
    artists = lyrics.get_all_artist()
    artist_arr =[{'id':i[0], 'name':i[1]}for i in artists]
    # print(artist_arr)
    return jsonify(artist_arr)



@app.route("/songs/<int:aid>")
def list_all_songs(aid):    
    songs = lyrics.get_all_songs(aid)
    songs_arr=[{'id':i[1], 'name':i[0]}for i in songs]
    # singer = lyrics.singer(aid)
    # artists = lyrics.get_all_artist()
    print(songs)
    return jsonify(songs_arr)


@app.route("/songs/<int:aid>/lyrics/<int:sid>")
def lyric(sid, aid):
    songs = lyrics.get_all_songs(aid)
    singer = lyrics.singer(aid)
    artists = lyrics.get_all_artist()
    lyric = lyrics.get_lyrics(sid)
    return jsonify(lyric)


if __name__ == "__main__":
    app.run(debug=True)
