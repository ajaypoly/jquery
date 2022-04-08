function main() {
    $.get({
        url: 'http://127.0.0.1:5000/artist',
        success: (data) => {
            list ='';
            data.forEach(element => {
                list += `<li class="artistbox" value="${element.id}">` + element.name + `</li>`;

            });
            tag = `<ul>${list}<ul/>`;
            $("div.artist").html(tag);
            // console.log("",value);
        },

    });
    $(document).on('click', 'li.artistbox', function () {
        console.log(this.value);
        $.get({
          url: `http://127.0.0.1:5000/songs/${this.value}`,
          success: (data) => {console.log(data)
            list = '';  
            data.forEach((element) => {
              list +=
                `<li class="songbox" id=${element.id}>` + element.name + `</li>`;
            });
            tag = `<h4>Songs</h4><ul type="none">${list}</ul>`;
            $('div.song_list').html(tag);
            console.log(data);
          },
        });
      });
      $(document).on('click', 'li.songbox', function () {
        $.get({
          url: `http://127.0.0.1:5000/songs/${this.value}/lyrics/${this.id}`,
          success: (data) => {
            lyrics = `<h4 class="lhead">Lyrics</h4><pre><p>${data}</p></pre>`;
            $('div.lyrics').html(lyrics);
            // console.log(data);
          },
        });
      });

}

$(main);