const io = require("../socket");

exports.getPosts = (req, res) => {
  
  
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: "First Post",
        content: "This is first post content.",
        author: {
          name: "Author_1",
        },
        createdAt: "1 January 2023",
      },
      {
        _id: 2,
        title: "Second Post",
        content: "This is second post content. Content text ...",
        author: {
          name: "Author_22",
        },
        createdAt: "2 January 2023",
      },
    ],
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title ?? "New post title (3)";
  const content = req.body.content ?? "New post content (3)";
  const socket = io.getIO();
  
    const json = {
        _id: 3,
        title,
        content,
        author: {
          name: "Author_333",
        },
        createdAt: "3 January 2023",
      }

  socket.emit("post", json);  

  res.status(200).json(json);
};
