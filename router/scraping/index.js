const { Router } = require("express")

const youtubeUtils = require("../../utils/youtube.js")

const router = Router()

router.get("/youtube-video-keywords/", async (request, response) => {
    const { url } = request.query

    if (!url) {
        return response.send({ status: "error", message: "No url in parameters." })
    }

    const videoKeywords = await youtubeUtils.getVideoKeywords(url)

    return response.send({
        status: "success",
        keywords: videoKeywords
    })
})

module.exports = router