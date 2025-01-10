"use strict";
$("form").on("submit", async function (e) {
  e.preventDefault();
  const query = $("input").val();
  let request = await axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=bRjODJuPyvav8xTfZFu5TVc0XHznI9qY&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
    )
    .catch(async (e) => {
      $(
        `<p class='error'> There was an error.(${e}) Please, try again. </p>`,
      ).appendTo("h1");
      await new Promise((r) => setTimeout(() => r(), 4000)); // custom sleep function
      $("p.error").remove();
    });
  request = request.data.data;
  request.map((e) =>
    $("div.container.gifs").append(
      `<img class="gif" alt="${e.title}"src=${e.images.fixed_height.url} type="gif">`,
    ),
  );
});

$(".remove-gif").on("click", () => $(".gif").remove());
