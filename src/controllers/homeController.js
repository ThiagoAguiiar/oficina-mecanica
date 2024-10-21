const homeController = async (req, res) => {
  try {
    return res.render("index.ejs");
  } catch (err) {
    return res.render("error.ejs", { error: JSON.stringify(err) });
  }
};

export default homeController;
