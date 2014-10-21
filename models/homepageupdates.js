var keystone = require('keystone')
var embedVideo = require('embed-video')
var request = require('request')
var Types = keystone.Field.Types

var HomepageUpdate = new keystone.List('HomepageUpdate',
  {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    sortable: true
  }
)

HomepageUpdate.add({
  title: {
    type: String,
    required: true,
    initial: true
  },
  type: {
    type: String,
    initial: true
  },
  published: {
    type: Boolean,
    'default': false
  },
  publishedDate: {
    type: Date,
    'default': Date.now
  },
  image: {
    type: Types.CloudinaryImage
  },
  video: {
    label: 'Youtube/Vimeo URL',
    note: 'Find the video you want and copy the URL in here',
    type: String
  },
  videoEmbed: {
    type: String,
    //hidden: true
  },
  videoThumbnail: {
    type: String,
    //hidden: true
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 500
  },
  excerpt: {
    type: Types.Html,
    wysiwyg: true,
    height: 150,
    initial: true
  }
})

HomepageUpdate.schema.pre('save', function (next) {
  var update = this
  if (update.video) {
    var vimeoRegex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
    var youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var videoId

    update.videoEmbed = embedVideo(update.video)
    
    if (update.video.match(vimeoRegex) != null) {
      videoId = update.video.match(vimeoRegex)[2]
      var vimeoDataUrl = 'http://vimeo.com/api/v2/video/'+ videoId +'.xml'
      
      request({
        url: vimeoDataUrl,
        json: true
      }, function (err, message, response) {
        if (err) console.error(err)
        if (!response) return next()
        update.videoThumbnail = response['thumbnail_large']
        next()
      })

    } else if (update.video.match(youtubeRegex) != null) {
      videoId = update.video.match(youtubeRegex)[2]
      update.videoThumbnail = 'http://i3.ytimg.com/vi/'+ videoId +'/0.jpg'
      next()
    } else {
      console.error('Failed to get a thumbnail for video: ' + update.video)
    }
  }
})

HomepageUpdate.register()
