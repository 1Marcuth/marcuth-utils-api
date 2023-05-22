const { default: axios } = require("axios")
const ytdl = require("ytdl-core")
const fs = require("fs")

const { generateRandomCode } = require("./random-code")

async function getVideoDetails(url) {
    if (url.includes("youtu.be")) {
        const videoId = url.split("/")[3]
        url = `https://youtube.com/watch?v=${videoId}`
    }

    const response = await axios.get(url)
    const data = response.data
    const title = data.match(/<meta\s+name="title"\s+content="([^"]+)">/)[1]
    const descriptionPreview = data.match(/<meta\s+name="description"\s+content="([^"]+)">/)[1]
    const keywords = data.match(/<meta\s+name="keywords"\s+content="([^"]+)">/)[1]
        .split(",")
        .map(keyword => keyword.trim())

    return {
        title,
        descriptionPreview,
        keywords
    }
}

async function downloadVideo(url, destination) {
    const video = ytdl(url, { filter: "videoandaudio" })
    await video.pipe(destination)
}

async function downloadAudioFromVideo(url, destination) {
    const video = ytdl(url, { filter: "audioonly" })
    await video.pipe(destination)
}

module.exports = {
    getVideoDetails,
    downloadVideo,
    downloadAudioFromVideo
}