mja
===

#Plan

##Day 1
- Make wireframe responsive base template (logo, menu, sidebar & main panel)
- Add models to represent clients, projects, homepage updates
- Add homepage, no paging for now - populate with homepage updates

##Day 2
- Add client & project templates & populate
- Add model to represent generic text-based page - a title, slug and a wysiwyg html field
- Add individual project page with image carousel

##Day 3
- Add about page
- Add splash page with no-loop fading image carousel

#design issues

- The function of the sidebar changes between the homepage and the projects/clients page - on the homepage it shows a list of content with the full content appearing on the right, but on the projects page it shows the full content with a list on the right. Consistency would make for a better user experience - would suggest always using the sidebar for links/summaries and the right panel for full content

- Needs a link to go up a level when on project sub-pages

- The split design, with the sidebar taking up a quarter of the page, won't work on phones - would suggest using a slideout "shelf" menu e.g. http://jakiestfu.github.io/Snap.js/demo/apps/default.html

- Adding new pages and editing content can be done, suggest Vimeo for hosting videos which can easily be embedded into content
