//存檔

$("#startup").on("click", () => {
  chrome.tabs.create({url: '../html/index.html'});
});



$("#clean").on("click", () => {

  chrome.storage.local.set({
  });
});



//讀檔
$(() => {
  chrome.storage.local.get([

  ], (result) => {

  });


});