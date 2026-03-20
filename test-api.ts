async function main() {
  const username = "name_yashraj";
  const res = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
  const data = await res.json();
  console.log("Response for", username, ":", data);
}

main().catch(console.error);
