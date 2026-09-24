# Potato: setup (all free)

## 1. Firebase (free Spark plan)
1. console.firebase.google.com > Add project > Add a Web app > copy the config into `web/index.html` (the `PASTE` line).
2. Build > Authentication > enable Email/Password and Google.
3. Build > Firestore Database > create, then paste these rules:

```
rules_version='2';
service cloud.firestore { match /databases/{db}/documents {
  match /users/{uid} {
    allow read: if request.auth!=null;
    allow create: if request.auth.uid==uid && !('premium' in request.resource.data);
    allow update: if request.auth.uid==uid && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['premium']);
  }
  match /payments/{id} { allow create: if request.auth!=null && request.resource.data.uid==request.auth.uid; }
}}
```

## 2. Host the `web` folder free
GitHub Pages (upload `web` files to a repo > Settings > Pages) or Firebase Hosting.
Then Firebase > Authentication > Settings > Authorized domains > add your site domain (needed for github.io).
Open the site in Chrome > menu > Cast, save and share > Install page as app.

## 3. Install the extension (this does the tracking, banner and locking)
Chrome > `chrome://extensions` > Developer mode > Load unpacked > pick the `extension` folder.
In `extension/manifest.json` change the second `matches` list to your exact site URL, then click Reload.
Open the Potato site once; usage now syncs.

## 4. Approve manual payments
Firestore > `payments` shows each transaction ID. After you verify the money, open `users/<uid>` and add field `premium` = true (boolean).
Also replace `YOUR-UPI-OR-BANK-DETAILS` in `web/index.html`.
