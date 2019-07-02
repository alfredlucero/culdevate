import { NowRequest, NowResponse } from "@now/node";

module.exports = (req: NowRequest, res: NowResponse) => {
  console.log(req);
  res.send(new Date().toString());
};
