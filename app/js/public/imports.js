//index页面中的所有link引入的html页面
const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
	//所有html模版
  let template = link.import.querySelector('.task-template');
  let clone = document.importNode(template.content, true);
  document.querySelector('.main-content').appendChild(clone);
})
