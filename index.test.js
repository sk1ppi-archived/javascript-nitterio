const { getLatestTweetsByUsername } = require('./index')

describe('getLatestTweetsByUsername', () => {

    it('throws an error if no username is provided', async () => {
        await expect(getLatestTweetsByUsername()).rejects.toThrow('Twitter username is required')
    })

    it('returns an array of tweets', async () => {
        const tweets = await getLatestTweetsByUsername('elonmusk')
        expect(tweets).toBeInstanceOf(Array)
    })

    it('returns an array of tweets with the correct properties', async () => {
        const properties = ['tweetLink', 'tweetPhotoURL', 'tweetFullName', 'tweetUsername', 'tweetDate', 'tweetMoment', 'tweetText', 'tweetTextHtml', 'tweetFullHtml', 'tweetId']
        const tweets = await getLatestTweetsByUsername('elonmusk')
        const tweet = tweets[0]
        const tweetProperties = Object.keys(tweet)

        // attachments is optional
        const hasAttachments = tweetProperties.includes('tweetAttachments')

        expect(tweet).toBeInstanceOf(Object)

        properties.forEach(property => {
            expect(tweetProperties).toContain(property)
        })

        if (hasAttachments) {
            expect(tweetProperties).toContain('tweetAttachments')
        }
    })
})