# Otimist UI

## What is

Aiming in a satisfactory user experience, we can use a tecnique to predict and get the successfull result from the method before it really completes (i.g.: a item added to the list after click "save" button).

We are currently making the request to the server and waiting the response which is a redirect to the same page to force the page reload to, then, fetch all items in the list. We can see this as a few steps:

```plain text
1. Click "Save"
  2. Send POST request
  3. Wait response
  4. Response Status: Created ✅
4. Reload page
  5. Fetch all items
  6. Wait response
  7. Response Status: Ok ✅
     body: items[]
8. User see his new item
```

The proposal here is to eliminate waiting times (mainly steps 3 and 6) to speed this data flow in the user perspective. To achieve this goal we gonna **LIE**, but in a otimist way 😇. This way we can offer a nearly instantaneous feedback to the user, guaranting a greate experience.

Before jumping into the solution and how to make this, we need to verify:

## This really worth the effort?

The first thing i though when I came across this solution was: Why? We don't need it. Our backend is a blazingly fast, built with NestJs, cache with Redis, etc., etc. But it is not all about performance and timing






By doing a good validation, we gonna show the item pretty immedatly for the user, and as soon as the server 