exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [{ title: "post 1", content: "sample content" }],
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Created Successfuly",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
