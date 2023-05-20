const { default: axios } = require("axios")

async function getVideoKeywords(url) {
    if (url.includes("youtu.be")) {
        const videoId = url.split("/")[3]
        url = `https://youtube.com/watch?v=${videoId}`
    }

    const response = await axios.get(url)
    const data = response.data
    const videoKeywords = data.match(/<meta\s+name="keywords"\s+content="([^"]+)">/)[1]
        .split(",")
        .map(keyword => keyword.trim())

    return videoKeywords
}

module.exports = {
    getVideoKeywords
}