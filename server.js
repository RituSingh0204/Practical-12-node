const express = require("express");
const Ajv = require("ajv");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 3000;
const ajv = new Ajv();


app.use((req, res, next) => {
  req.id = randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
});


app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const time = Date.now() - start;
    res.setHeader("X-Response-Time-ms", time);
  });
  next();
});


const whitelist = ["http://localhost:3000"];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});


app.use(express.json({ limit: "100kb" }));


const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};
const validate = ajv.compile(schema);

app.post("/echo", (req, res, next) => {
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      type: "https://example.com/validation-error",
      title: "Invalid request body",
      detail: ajv.errorsText(validate.errors),
      status: 400,
      "request-id": req.id,
    });
  }
  res.json({
    message: "Everything works!",
    data: req.body,
    "request-id": req.id,
  });
});


app.get("/async-error", async (req, res, next) => {
  try {
    throw new Error("Example async error");
  } catch (err) {
    next(err);
  }
});


app.use((err, req, res, next) => {
  res.status(500).json({
    type: "about:blank",
    title: "Internal Server Error",
    detail: err.message,
    status: 500,
    "request-id": req.id,
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
