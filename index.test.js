const https = require("https");
const { getLatestTweetsByUsername } = require("./index")

describe("getLatestTweetsByUsername", () => {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    it("throws an error if no username is provided", async () => {
        await expect(getLatestTweetsByUsername()).rejects.toThrow("Twitter username is required")
    })

    it("returns an array of tweets", async () => {
        const tweets = await getLatestTweetsByUsername("elonmusk", {
            httpsAgent: agent
        })
        expect(tweets).toBeInstanceOf(Array)
    })

    it("returns an array of tweets with the correct properties", async () => {
        const properties = [
            "fullName",
            "username",
            "id",
            "date",
            "photoUrl",
            "contentHtml",
            "content",
            "dateMoment",
            "link"
        ]
        const tweets = await getLatestTweetsByUsername("elonmusk", {
            httpsAgent: agent
        })
        const tweet = tweets[0]
        const tweetProperties = Object.keys(tweet)

        // attachments is optional
        const hasAttachments = tweetProperties.includes("attachments")

        expect(tweet).toBeInstanceOf(Object)

        properties.forEach(property => {
            expect(tweetProperties).toContain(property)
        })

        if (hasAttachments) {
            expect(tweetProperties).toContain("attachments")
        }
    })
})