---
layout: post
type: "post"
title:  "Displaying dynamic opening times in Jekyll"
date:   2017-05-15
categories: jekyll liquid
canonical: "Blog post"
description: "Here is how to display 'Google-like' dynamic opening times using liquid, Jekyll's templating language."
---

A problem I came across when building [Trying to work](//tryingtowork.in) was how do I display "Google-like" dynamic opening times using only liquid&mdash;Jekyll's templating language? Well, as it turns out, quite easily.
![Opening times in Jekyll example]({{site.baseurl}}/images/established.png)

What I wanted to do was filter through a list of days in a markdown file's front matter and display if the space was open or not.

Here's how the front matter would look for a spaces opening times:

```markdown
opening_times:
  - day: Monday
    time: Closed
  - day: Tuesday
    time: Closed
  - day: Wednesday
    time: 10am-11pm
  - day: Thursday
    time: 10am-11pm
  - day: Friday
    time: 10am-11pm
  - day: Saturday
    time: 10am-11pm
  - day: Sunday
    time: 10am-11pm
```

And here is how you would cycle through the list and find out if it is open or not.

```liquid
{%raw%}
{% assign currentDay = site.time | date: '%A' %}

{% for time in space.opening_times %}
  {% if time.day contains currentDay  %}
      {%assign openingTimes = time.time%}
      {%if openingTimes contains "Closed" %}
        <strong class="spaces-times">Closed today&nbsp;</strong>
      {%else%}
        <strong class="spaces-times">Open today&nbsp;</strong>
        {{openingTimes}}
      {%endif%}
  {%endif%}
{%endfor%}
{%endraw%}
```

Here's how this works. First, you create a variable using `assign currentDay = site.time | date: '%A'`. This means assign `currentDay` variable to today's day &mdash; which is {{site.time | date: '%A'}}.

Next, use a `for` loop to cycle through the `opening_times` list and if today matches a day in the list, then create a variable called `openingTimes` and store that day's opening times in it. We then use this variables to determine if the opening time for that day contains "Closed" or not. If it does, then the space is closed, else it isn't. Simples! Liquid ftw.

The next step would be to also determine if it is open using the time of day and measuring this against the stated times in the front matter. Any takers?

Have any suggestions to improve or extend on this? [Hit me up on Twitter]({{site.social.twitter.url}}{{site.social.twitter.username}}).
