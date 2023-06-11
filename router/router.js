const express = require("express");
const dbconnected = require("../database/dbConnectivity");

const Router = express.Router();

Router.get("/", (req, res) => {
  const response = {
    api: "mtop.aliexpress.usertouch.houyi.launchrule.runtime.pull",
    data: {
      result: [{
        content: {}
      }]
    },
    ret: ["SUCCESS::调用成功"],
    v: "2.0"
  };

  dbconnected.query("SELECT * FROM Runtimecontent", (err, content, fields) => {
    if (!err) {
      response.data.result[0].content = content.map((Runtime) => ({
        //define response here 
        discount: Runtime.discount,    
      }));

      const jsonResponse = `mtopjsonp3(${JSON.stringify(response)})`;
      res.set("Content-Type", "application/javascript");
      res.send(jsonResponse);
    } else {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

module.exports = Router;
