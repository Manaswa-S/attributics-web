const express = require("express");
const axios = require("axios");
const cors = require("cors");
const xml2js = require("xml2js");

const app = express();
app.use(cors());

const MEDIUM_RSS = "https://medium.com/feed/@mnsattributics";

app.get("/api/blogs", async (req, res) => {
  try {
    const response = await axios.get(MEDIUM_RSS, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0", // helps avoid some bot blocks
      },
    });

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);

    if (!result?.rss?.channel?.item) {
      return res.status(404).json({
        error: "RSS feed parsed but no blog items found",
      });
    }

    const items = Array.isArray(result.rss.channel.item)
      ? result.rss.channel.item
      : [result.rss.channel.item];

    const blogs = items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
      content: item["content:encoded"],
      categories: item.category || [],
    }));

    res.json(blogs);

  } catch (err) {
    console.error("Medium Fetch Error:", err.message);

    res.status(500).json({
      error: "Failed to fetch Medium feed",
      message: err.message,
      status: err.response?.status || null,
      data: err.response?.data || null,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
