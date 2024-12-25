# fsOpen Part4

Lessons in Part4

- Testing
- Testing Backend
- User management
- Token-based user management

Tests:
```
▶ when there is initially some blogs saved
  ✔ blogs are returned as json (1398.623024ms)
  ✔ there are six blogs (822.543628ms)
  ▶ viewing a specific blog
    ✔ Test if id-field is named id, not _id (1409.731214ms)
  ▶ viewing a specific blog (1410.117305ms)
  ▶ addition of a new blog
    ✔ a valid blog can be added  (1058.989675ms)
    ✔ If likes is missing, then likes value will be zero (494.1251ms)
    ✔ No title, returns 400 Bad request (496.456172ms)
    ✔ No url, returns 400 Bad request (488.68611ms)
  ▶ addition of a new blog (2539.22899ms)
  ▶ deletion of a blog
    ✔ a valid blog can be deleted (529.361713ms)
  ▶ deletion of a blog (529.695048ms)
  ▶ Modifing of a blog
    ✔ a valid blog can be edited (506.19741ms)
  ▶ Modifing of a blog (506.405402ms)
▶ when there is initially some blogs saved (7208.891712ms)
▶ when there is initially one user at db
  ✔ creation succeeds with a fresh username (298.012004ms)
  ▶ Checking user requirements
    ✔ creation fails with proper statuscode and message if username already taken (301.533175ms)
    ✔ creation fails with no username (286.516476ms)
    ✔ creation fails with username too short (283.331571ms)
  ▶ Checking user requirements (871.738033ms)
  ▶ Checking password requirements
    ✔ creation fails with no password (229.166307ms)
    ✔ creation fails with password too short (208.70151ms)
  ▶ Checking password requirements (438.126182ms)
  ▶ Checking users
    ✔ creation ok with user add (216.950247ms)
    ✔ creation fails with password too short (238.787041ms)
  ▶ Checking users (455.98734ms)
  ▶ deletion of a user
    ✔ a valid user can be deleted (243.497343ms)
  ▶ deletion of a user (243.693173ms)
▶ when there is initially one user at db (2308.013176ms)
▶ Modifiying user passwords
  ✔ Set succesfully new password (567.023094ms)
  ✔ Updated password fails with too short password (195.027536ms)
  ✔ Old password fails with given incorrect password (275.207122ms)
  ✔ fails with given new password as current password (337.341353ms)
▶ Modifiying user passwords (1375.072861ms)
✔ dummy returns one (2.480544ms)
▶ total likes
  ✔ when list has only one blog equals the likes of that (0.324696ms)
▶ total likes (0.691144ms)
▶ total likes 12
  ✔ when list has many blogs and it return most likes (0.363504ms)
▶ total likes 12 (1.66614ms)
▶ total likes 0
  ✔ when list has only one blog the likes of zero (0.220668ms)
▶ total likes 0 (0.420162ms)
▶ Favorite blog
  ✔ when list has favorite blog which has most likes (0.38392ms)
▶ Favorite blog (0.764136ms)
▶ Favorite blog all equal-likes
  ✔ when list favorite blog that has all equal likes (1.243755ms)
▶ Favorite blog all equal-likes (1.588688ms)
▶ Most blogs
  ✔ when list has favorite blog which has most likes (1.410164ms)
▶ Most blogs (1.602342ms)
▶ Most favorite blogger and all of it likes
  ✔ when list has favorite blog which has most likes (0.486361ms)
▶ Most favorite blogger and all of it likes (0.614172ms)
ℹ tests 30
ℹ suites 18
ℹ pass 30
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 11526.328498
```

## Links
1. [fsOpenPart4](https://fullstackopen.com/en/part4)
2. [fsOpenOsa4](https://fullstackopen.com/osa4)

