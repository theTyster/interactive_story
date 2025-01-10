"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show submission form on click "Submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $submissionForm.show();
}

$navSubmit.on("click", navSubmitClick);

/** When a User clicks Favorites, clears $allStoriesList and renders favorites only. */

async function showFavoriteStories(evt) {
  console.debug("showFavorites", evt)
  const favorites = await currentUser.favorites.map(e=> new Story(e));
  const favoriteMarkupsArr = favorites.map(e=> generateStoryMarkup(e));

  //clear $allStoriesList and append favorites to the page.
  $allStoriesList.empty()
  favoriteMarkupsArr.map(story => {
    $allStoriesList.append(story)
  });

  $("input.favorite-box").prop("checked", true);
}

$navFavorites.on("click", showFavoriteStories);

/** When "owned" is clicked in the navbar, it shows the user all stories that they have created.*/

async function showOwnedStories(evt) {
  console.debug("showOwned", evt)
  const ownedStories = await currentUser.ownStories.map(e=> new Story(e));
  const ownedStoriesMarkup = ownedStories.map(e=> generateStoryMarkup(e));

  //clear $allStoriesList and append favorites to the page.
  $allStoriesList.empty()
  ownedStoriesMarkup.map(story => {
    $allStoriesList.append(story)
  });

  $(".story-author").after("<button class='delete-button'>DELETE</button>");
  $("input.favorite-box").remove();
  $(".delete-button").on("click", removeOwnedStories);
}

$navOwned.on("click", showOwnedStories);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navSubmit.show();
  $navFavorites.show();
  $navOwned.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
