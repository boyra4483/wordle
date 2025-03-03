import axios from "axios";

const wordClient = axios.create({
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
  transformResponse(res) {
    const word = JSON.parse(res).word[0];
    return word;
  },
});
const words = [];

export default async function getWords() {
  if (words.length != 0) return words;

  async function fillingWords() {
    await getWord();
    if (words.length != 5) return await fillingWords();
    return words;
  }

  async function getWord() {
    const word = (
      await wordClient.get("https://api.api-ninjas.com/v1/randomword")
    ).data;

    if (word.length != 5) return getWord();
    words.push(word.toLowerCase());
  }

  return await fillingWords();
}
