import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const { linkId } = req.body;
    const otherLink = await req.db.collection("links").findOne({
      linkId
    });
    if (otherLink) {
      res.json({
        ok: true,
        message: "Found URL",
        data: otherLink
      });
    } else {
      res.json({
        ok: false,
        message: "URL Not found"
      });
    }
  } catch (err) {
    res.json({
      ok: false,
      message: "API Error: " + err.toString()
    });
  }
});
handler.get(async (req, res) => {
  try {
    const { linkId } = req.query;
    const otherLink = await req.db.collection("links").findOne({
      linkId
    });
    if (otherLink) {
      res.json({
        ok: true,
        message: "Found URL",
        data: otherLink
      });
    } else {
      res.json({
        ok: false,
        message: "URL Not found"
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
