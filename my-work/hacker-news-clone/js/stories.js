"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/* A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <input type='checkbox' class='favorite-box'>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Sets or removes favorites depending on the event. */

async function modifyFavoriteStories(evt){
  let response;

  if (evt.target.checked){
    try{
      response = 
        await User.doFavorite(
          'post',
          currentUser, 
          evt.target.parentElement.id
        );
    }
    catch{
      $('nav').after("<p class='error-msg'>Couldn't add Favorite. Please, try again. </p>")
      setTimeout(()=> $("p.error-msg").remove(), 5000);
    }
  }
  else{
    try{
      response = 
        await User.doFavorite(
          'delete',
          currentUser,
          evt.target.parentElement.id
        )
    }
    catch{
      $('nav').after("<p class='error-msg'>Couldn't remove Favorite. Please, try again. </p>")
      setTimeout(()=> $("p.error-msg").remove(), 5000);
    }
  }
  const favoritesArrResponse = response.data.user.favorites
  currentUser.favorites = favoritesArrResponse;
  console.debug("favorites modified", currentUser.favorites);

}

/** Gets list of stories from server, generates their HTML, and puts on page. 
  * - default param is $allStoriesList */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story =  generateStoryMarkup(story);
    $allStoriesList.append($story);

    if (currentUser) {
      markFavoriteStories(story);
    }
  }

  $allStoriesList.show();

  $("input.favorite-box").on("change", modifyFavoriteStories);
}

/** Takes user input and sends it to backend. */

async function submitStoriesToAPI(evt){
  console.debug("submit story", evt);
  evt.preventDefault();

  //grab title, url, and author
  const $title = $("#submit-title");
  const $url = $("#submit-url");
  const $author  = $("#submit-author");

  try{
    await StoryList.addStory(
    currentUser, {
      author: $author.val(), 
      title: $title.val(), 
      url: $url.val(),
    })
  }
  catch({name, message}){
    $submissionForm.after(`<p id='error-msg'>Unssuccesful Connection to database. Try Again. | Error: ${message} |`)
    setTimeout(()=> $("p#error-msg").remove(), 5000);
    return;
  }

  $submissionForm.trigger("reset");
  $submissionForm.hide();

  putStoriesOnPage();
}

$submissionForm.on("submit", submitStoriesToAPI);

/** Checks stories to determine if any of them are favorites.
 *  Marks them if necessary. */

function markFavoriteStories(story){
  const storyId = story.storyId;
  const favoritesIds = currentUser.favorites.map(f=> f.storyId);

  if(favoritesIds.includes(storyId)) $(`#${storyId}`).children("input").prop("checked", true);
}

/** handles event for removing stories */
async function removeOwnedStories(evt){
  console.debug("remove story", evt);
  const storyId = evt.target.parentElement.id;

  const removedStory = await StoryList.delStory(currentUser, storyId);

  $(`#${removedStory.storyId}`).remove();
  
}
