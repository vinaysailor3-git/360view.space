# Beta School gallery

Upload school photos and videos to this folder. Use JPG, PNG, WebP, or MP4 files.

Then register each file in `gallery-data.js` in the project root. Example:

```js
window.BETA_GALLERY = [
  { type: 'image', src: 'img/gallery/sports-day.jpg', title: 'Sports Day' },
  { type: 'video', src: 'img/gallery/annual-day.mp4', poster: 'img/gallery/annual-day.jpg', title: 'Annual Day' }
];
```
