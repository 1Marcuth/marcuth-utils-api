const { Router } = require("express")

const { generateRandomCode } = require("../../utils/random-code.js")
const youtubeUtils = require("../../utils/youtube.js")
const {
    youtubeVideoDetailsSchema,
    youtubeAudioFromVideoSchema,
    youtubeVideoSchema
} = require("../../schemas/scraping/index")

const router = Router()

router.get("/youtube/video/details/", async (req, res) => {
    try {
        const { url } = youtubeVideoDetailsSchema.parse(req.query)

        let videoDetails = {}

        try {
            videoDetails = await youtubeUtils.getVideoDetails(url)
        } catch(error) {
            return res.send({
                status: "error",
                message: "An error occurred when trying to validate the video data fetch!"
            })
        }

        return res.send({
            status: "success",
            ...videoDetails
        })

    } catch(error) {
        return res.send({
            status: "error",
            message: "An error occurred when trying to validate the request data types!"
        })
    }
})

router.get("/youtube/video/file/", async (req, res) => {
    try {
        const { url } = youtubeVideoSchema.parse(req.query)

        try {
            const randomCode = generateRandomCode(5)
            res.header("Content-Disposition", `attachment; filename="${randomCode}.mp4"`)
            return await youtubeUtils.downloadVideo(url, res)
        } catch(error) {
            return res.send({
                status: "error",
                message: "An error occurred when trying to validate the video data fetch!"
            })
        }
    } catch(error) {
        return res.send({
            status: "error",
            message: "An error occurred when trying to validate the request data types!"
        })
    }
})

router.get("/youtube/video/audio/", async (req, res) => {
    try {
        const { url } = youtubeVideoSchema.parse(req.query)

        try {
            const randomCode = generateRandomCode(5)
            res.header("Content-Disposition", `attachment; filename="${randomCode}.mp3"`)
            return await youtubeUtils.downloadAudioFromVideo(url, res)
        } catch(error) {
            return res.send({
                status: "error",
                message: "An error occurred when trying to validate the video data fetch!"
            })
        }
    } catch(error) {
        return res.send({
            status: "error",
            message: "An error occurred when trying to validate the request data types!"
        })
    }
})

module.exports = router