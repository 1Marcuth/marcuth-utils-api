const { z } = require("zod")

const youtubeVideoDetailsSchema = z.object({
    url: z.string().url()
})

const youtubeVideoSchema = z.object({
    url: z.string().url()
})

const youtubeAudioFromVideoSchema = z.object({
    url: z.string().url()
})

module.exports = {
    youtubeVideoDetailsSchema,
    youtubeVideoSchema,
    youtubeAudioFromVideoSchema
}