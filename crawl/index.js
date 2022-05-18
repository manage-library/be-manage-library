/* eslint-disable @typescript-eslint/no-var-requires */
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.sachhayonline.com';
const all = [];

const getChapterDetail = async ({ href }) => {
  const response = await axios(`${url}/tua-sach/${href}`);
  const $ = cheerio.load(response.data);
  $.html();

  const content = $('.reading-white p');
  let chapterContent = '';

  Object.keys(content).forEach((key) => {
    try {
      chapterContent += content[key].children[0].data += '\n';
    } catch (error) {
      // chapterContent += el.children[0].data += '\n';
    }
  });

  return chapterContent;
};

const getBookDetail = async (response) => {
  const $ = cheerio.load(response.data);
  $.html();

  const category = $('.nav a')[1].children[0].data;
  const book = $('.inner > a > h3')[0].children[0].data;
  const description = $('.inner > p')[0]?.children[0]?.data;
  const image = $('.image > a > img')[0].attribs.src;
  const chapters = [];
  const content = $('.default > li');

  for (let i = 0; i < Object.keys(content).length; i++) {
    if (i > 0 && i < 10) {
      try {
        const chapterContent = await getChapterDetail({
          href: content[Object.keys(content)[i]].children[0].attribs.href,
        });

        chapters.push({
          name: content[Object.keys(content)[i]].children[0].attribs.title,
          content: chapterContent,
        });
      } catch (error) {}
    }
  }

  all.push({
    category,
    book,
    description,
    image: `${url}/${image.substring(3)}`,
    chapters,
  });
};

axios(url).then(async (response) => {
  const $ = cheerio.load(response.data);
  $.html();

  const books = $('.box > .image > a');

  for (let i = 0; i < Object.keys(books).length; i++) {
    if (i === 5) {
      try {
        await axios(`${url}/${books[Object.keys(books)[i]].attribs.href}`).then(
          getBookDetail,
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log(JSON.stringify(all));
});
