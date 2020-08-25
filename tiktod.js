const tiktod = require('tiktok-scraper')

module.exports = async () => {
	const tiktok = (url) => new Promise((resolve, reject) => {
		tiktod.getVideoMeta(url, { noWaterMark: true, hdVideo: true })
			.then(async (result) => {
				console.log('Get Video From', '@' + result.authorMeta.name, 'ID:', result.id)
				if (result.videoUrlNoWaterMark !== '') {
					result.url = result.videoUrlNoWaterMark
					result.NoWaterMark = true
				} else {
					result.url = result.videoUrl
					result.NoWaterMark = false
				}
				resolve(result)
			}).catch((err) => {
				console.error(err)
				reject(err)
			})
	})
}