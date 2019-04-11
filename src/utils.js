export default {
  getList(html){
    var bodylines = html.split('\n')
    var file_list = []
    for (var i in bodylines) {
    	var m = false
      if (m = /\s*<a href="(.+?)">(.+?)<\/a>\s+(\S+)\s+(\S+)\s+(\S+)\s*/.exec(bodylines[i])) {
        var filename = m[1]
        var datetime = m[3] + ' ' + m[4]
        var size = m[5]
        var type = ''
        if (/\/$/.test(filename)) {
          type = 'file-directory'
        } else if (/\.(zip|7z|bz2|gz|tar|tgz|tbz2|xz|cab)$/.test(filename)) {
          type = 'file-zip'
        } else if (/\.(jpg|png|bmp|gif|ico|webp)$/.test(filename)) {
          type = 'file-image'
        } else if (/\.(flv|mp4|mkv|avi|mkv|webm)$/.test(filename)) {
          type = 'file-video'
        } else {
          type = 'file'
        }
        var displayname = decodeURIComponent(filename.replace(/\/$/, ''))
        file_list.push({name: displayname, filename: filename, datetime: datetime, size: size, type: type})
      }
    }
    return file_list
  },
  groupList(file_list){
    var file_count = 0
    var file_group_list = [[]]
    var file_list_group_index = 0
    for (var item of file_list){
      file_count += 1
      file_group_list[file_list_group_index].push(item)
      if (file_count % 15 == 0) {
        file_group_list.push([])
        file_list_group_index += 1
      }
    }
    return file_group_list
  }
}