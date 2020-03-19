import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import shortid from "shortid";

import isURL from 'validator/lib/isURL'
import normalizeURL from '../../lib/normalizeURL';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    let { redirectUrl } = req.body;
    if(isURL(redirectUrl)) {
      redirectUrl = normalizeURL(redirectUrl)
    }
    else {
      throw new Error("Redirect is not a URL")
    }
    const otherLink = await req.db.collection("links").findOne({
      redirectUrl
    });
    if (otherLink) {
      res.json({
        ok: true,
        message: "Sucessfully shortened URL",
        data: otherLink
      });
    } else {
      const id = shortid.generate();

      const link = await req.db
        .collection("links")
        .insertOne({
          redirectUrl,
          linkId: id
        })
        .then(({ ops }) => ops[0]);

      res.json({
        ok: true,
        message: "Sucessfully shortened URL",
        data: link
      });
    }
  } catch (err) {
    res.json({
      ok: false,
      message: "API Error: " + err.toString()
    });
  }
});

export default handler;
