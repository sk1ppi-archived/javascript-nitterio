const axios = require("axios")
const cheerio = require("cheerio")
const moment = require("moment")

/**
 * Retrieves the latest tweets by username from the Nitter website.
 * @param {string} username - The Twitter username.
 * @param {object} axiosConfig - Optional axios configuration object.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of tweet objects.
 * @throws {Error} - If the Twitter username is not provided.
 * @example 
 * const { getLatestTweetsByUsername } = require('@sk1ppi/js-nitter-scraper')
 * async function main () {
 *  const tweets = await getLatestTweetsByUsername('sk1ppi_)
 * }
 */
async function getLatestTweetsByUsername(username, axiosConfig = {}) {
    if (!username) {
        throw new Error("Twitter username is required")
    }

    const $ = await axios({
        method: "GET",
        url: `https://nitter.net/${username}`,
        headers: {
            "Accept": "text/html",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "TE": "Trailers",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0"
        },
        ...axiosConfig
    })
        .then((response) => {
            return cheerio.load(response.data)
        })

    const tweets = []
    const timelineItemCss = "div.timeline-item"
    const timelimeItemList = $(timelineItemCss)

    timelimeItemList.each((index, element) => {

        const fullName = $(element).find("div.tweet-body div.tweet-header div.tweet-name-row div.fullname-and-username a.fullname").text()
        const username = $(element).find("div.tweet-body div.tweet-header div.tweet-name-row div.fullname-and-username a.username").text()
        const id = $(element).find("div.tweet-body div.tweet-header div.tweet-name-row span.tweet-date a").attr("href").replace("/", "")
        const date = $(element).find("div.tweet-body div.tweet-header div.tweet-name-row span.tweet-date a").attr("title")
        const photoUrl = $(element).find("div.tweet-body div.tweet-header a.tweet-avatar img.avatar").attr("src")
        const attachments = $(element).find("div.tweet-body div.gallery-video").html()
        const contentHtml = $(element).find("div.tweet-body div.tweet-content").html()
        const content = $(element).find("div.tweet-body div.tweet-content").text()
        const dateMoment = moment(date, "MMM DD, YYYY · hh:mm A UTC")
        const link = $(element).find("a.tweet-link").attr("href")


        const tweet = {
            fullName,
            username,
            id,
            date,
            photoUrl,
            attachments,
            contentHtml,
            content,
            dateMoment,
            link
        }

        tweets.push(tweet)
    })

    return tweets
}

module.exports = {
    getLatestTweetsByUsername
}