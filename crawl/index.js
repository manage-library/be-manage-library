/* eslint-disable @typescript-eslint/no-var-requires */
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.sachhayonline.com';

const getChapterDetail = async ({ data }) => {
  await axios(`${url}/tua-sach/${data.href}`).then((response) => {
    const $ = cheerio.load(response.data);
    $.html();

    const content = $('.reading-white > p');

    Object.keys(content).forEach((key) => {
      console.log(content[key].children[0].data);
    });
  });
};

const getBookDetail = async (response) => {
  const $ = cheerio.load(response.data);
  $.html();

  const category = $('.nav a')[1].children[0].data;
  const book = $('.inner > a > h3')[0].children[0].data;

  const content = $('.default > li');
  const chapters = [];

  for (let i = 0; i < Object.keys(content).length; i++) {
    try {
      const data = {
        ...content[Object.keys(content)[i]].children[0].attribs,
        category,
        book,
        chapter: content[Object.keys(content)[i]].children[0].attribs.title,
      };
      await getChapterDetail({ data, chapters });
    } catch (error) {}
  }
};

axios(url).then(async (response) => {
  const $ = cheerio.load(response.data);
  $.html();

  const books = $('.box > .image > a');

  for (let i = 0; i < Object.keys(books).length; i++) {
    try {
      if (Object.keys(books)[i] === '1') {
        await axios(`${url}/${books[Object.keys(books)[i]].attribs.href}`).then(
          getBookDetail,
        );
      }
    } catch (error) {}
  }
});
