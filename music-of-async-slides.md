autoscale: true
build-lists: true

## The Music of Async with Observables and Rx-Helper

### Dean Radcliffe

## t : `@deaniusol`

![fit](https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408062_1280.png)

---

![fit](https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408062_1280.png)

<!--

![fit](https://s3.amazonaws.com/www.chicagogrooves.com/dean-drums.jpg)

^ Music Pic 1

---

![fit](http://www.deanius.com/dean-uke-wcr.png)

^ Music Pic 2
-->

---

![fit](http://drive.google.com/uc?export=view&id=10QGRSfEs9w6FeFmEux850b4pwCiaybmw)

^ Intermittent failures

---

![fit](http://drive.google.com/uc?export=view&id=0B0QMqE0wOhugTWF5REJyVlo0blE)

^ Out of Order Messages

---

![fit](http://drive.google.com/uc?export=view&id=18iD_qDmte8Sew4tcf-jN_0aVIl2nMbNz)

^ Incremental Loading Issues

---

![fit](http://drive.google.com/uc?export=view&id=1Hiy0j3LNYFFYP9HYUIsKpyTKtlAhgEP9)

---

![fit](http://drive.google.com/uc?export=view&id=1qvagtqqkC9tB2ls3vKICuol0HyMZ-VQJ)

^ So I'm here to help you (\*) Manage Async With Antares

---

![left](https://m-festival.biz/en/wp-content/uploads/2018/10/2439ca6321db1eb1851f7cfd771ccdee-860x517.jpg)
![right](http://www.solpassionmusic.com/wp-content/uploads/2018/02/Dealer-Live10-Suite-ArrangementView-Clips.png)

---

# Event Handlers

## no `trigger` warning!

---

```js
function doAsyncStuff(cb) {
  try {
    doStuff1(function(err, value) {
      if (err) return cb(err)
      try {
        doStuff2(value, function(err, value2) {
          if (err) return cb(err)
          cb(null, value2)
        })
      } catch (e) {
        cb(e)
      }
    })
  } catch (e) {
    cb(e)
  }
}
```

---

# Promises

## So slow, I can hardly `await` 🙄

---

# Promises

```js
let status = "not loaded"
Promise.resolve("loaded").then(newStatus => {
  status = newStatus
})
console.log(status)
```

---

# Promises

```js
let status = "not loaded"
Promise.resolve("loaded").then(newStatus => {
  status = newStatus
})
console.log(status)
```

---

# Promises

```js
async function getUsers(usernames) {
  let users = []

  for (let name of usernames) {
    let user = await fetch(`http://server/users/${user}`)
    users.push(user)
  }

  return users
}
;["bob", "angie"]
```

---

# Incidental Complexity

## Where is `stdin`?

^ FileWriterSpeaker

---

# FileWriter/Speaker

**Given:** A source of names
**When:** A name is encountered
**Then:** It should be written to a yaml file
**And:** Written to other, as of yet TBD places

---

![fit](http://www.deanius.com/frozen-specification.jpg)

---

# FileWriter/Speaker

## Let's _Do It Live!_

---

# FileWriter/Speaker Conclusions

## Observables Are:

- A Data-type for Events/Computation over time
- Combined more readily than Promises because they are:
  - lazy
  - cancelable
- As a return value, encapsulate a process for data
- Can model a `stdin` stream inside an app
- Can model external infrastructure (IOT, etc..)

---

![](http://www.solpassionmusic.com/wp-content/uploads/2018/02/Dealer-Live10-Suite-ArrangementView-Clips.png)

---

# Concurrency Options

![fit](https://camo.githubusercontent.com/bc2ece9c1a1f8c47bdd2457227f8b53ad42a2504/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f70726f642e6875626f6172642e636f6d2f75706c6f61647325324630633862313963662d313334342d343165322d623738642d326365346236343164623636253246636f6e63757272656e63794d6f6465732e676966)

---

# Parallel: _"Polyphony"_ (mergeMap)

![inline](https://www.maxpixel.net/static/photo/2x/Piano-Keyboard-Piano-Keyboard-Music-Keys-2412410.jpg)![inline fit](https://s3.amazonaws.com/www.deanius.com/merge-map-marble.png)

^ - ⭐ Liking many pictures
- ️Independent events

---

# Serial: _"SetList"_ (concatMap)

![inline ](https://cdn-images-1.medium.com/max/1600/1*9opgd2jPRfYK9PtTzkD05w.jpeg)![inline fit](https://s3.amazonaws.com/www.deanius.com/concat-map-marble.png)

^ - "Add to Playlist"
- Queue up
- Limited resources.
- Sierra Alexa song-hopping

---

# Cutoff: _"Clarinet"_ (switchMap)

![inline](https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Tulane_Commencement_2013-6161_Dr_Michael_White_Clarinet.jpg/1024px-Tulane_Commencement_2013-6161_Dr_Michael_White_Clarinet.jpg)![inline](https://s3.amazonaws.com/www.deanius.com/switch-map-marble.png)

^ - Session timeout / autocomplete
- NOT enqueuing songs (1 song replaces/cuts-off the last)
- Changing chatrooms
- "There can be only one!"

---

# Mute: _"Not Now I'm Busy"_ (exhaustMap)

![inline](https://scontent-sea1-1.cdninstagram.com/vp/d0e9ee5aa7e02d1a45fe764ba9d9fa96/5C0EA760/t51.2885-15/e35/13285239_294133950927073_1582998619_n.jpg?se=8&ig_cache_key=MTI2NDE1NTQ2MzYwNzc2MDY5NA%3D%3D.2)![inline fit](https://s3.amazonaws.com/www.deanius.com/exhaust-map-marble.png)

^ - The elevator button.
- Toggle a switch.
- Declan double-stomping the sweeper toggle.

---

![original fit](https://s3.amazonaws.com/www.deanius.com/images/asink-cat.jpg)

---

# Inbox Jukebox!

---

![inline fit](https://s3.amazonaws.com/www.deanius.com/InboxJukeboxScreenshotClosed.png)

---

# Inbox Jukebox

**Given**: You have media files in your inbox (mp3, m4a, etc)
**When**: You OAuth this application to your Gmail
**Then**: You should hear a stream of those files
**And**: You can customize which files are playing

---

```
 user/search: q: Greg
  📨 goog/msg/header: subject: Friday gig
  📨 goog/msg/header: subject: Great jam
    📨 goog/msg/body: subject: Friday gig, att: []
    📨 goog/msg/body: subject: Great jam, att: [jam.mp3, jam2.mp3]
    📨 goog/att/id: att: jam.mp3
    📨 goog/att/id: att: jam2.mp3
  🛰 net/att/start: att: jam.mp3
  🛰 net/att/finish: att: jam.mp3, bytes: 1e9e1ae...
🔊 player/play: att: jam.mp3, bytes: 1e9e1ae...
  🛰 net/att/start: att: jam2.mp3
🔊 player/complete: att: jam.mp3, bytes: 1e9e1ae...
  🛰 net/att/finish: att: jam2.mp3, bytes: 12bd5a8...
🔊 player/play: att: jam2.mp3, bytes: 12bd5a8...
🔊 player/complete: att: jam2.mp3, bytes: 12bd5a8...
```

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-4.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-6.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-9.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-12.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-14.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-16.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-18.png)

---

![fit](https://s3.amazonaws.com/www.deanius.com/EventProtocol-20.png)

---

# Inbox Jukebox

# Demo

---

# Inbox Jukebox | Conclusions

---

# Wrapping Up

---

# Events

A Means to Propogate Change

# REST

**RE**epresentational
**S**tate
**T**transfer

_Also, A Means to Propogate Change_

---

- Antares = Events
- ANTARES ⊇ REST
- Events > REST

---

# Resources

http://github.com/deanius/TimeHopInbox.html

- OAuth with Gmail
- Chains of async
- Concurrency parallel vs serial
- WebAudio API

---

# Resources

https://github.com/deanius/hotel-california

- Live at http://antares-hotel.herokuapp.com
- React/Redux, RxJS
- RxJS
- REST, WebSockets/realtime
- Create React App + NodeJS
- Storybook

---

# Resources

https://deanius.github.io/antares

- Link to Antares Github Repo, Issues, Etc.
- RxJS (Subject), TypeScript
- Canvas
- Promises, ajaxStreamingGet
- Antares API Docs (TypeDoc)
- Good Reading

---

# Credits

- Dependito Library for Dependency Graphs

---

# The End

# Thank You!

Star It! 🤩 ⭐️ github.com/deanius/rx-helper ⭐ 🤩️

- Dean @deaniusol
