---
layout: default
title: Beranda
---

<h1>{{ site.title }}</h1>
<p>{{ site.description }}</p>

<h2>📝 Postingan Terbaru</h2>

{% if site.posts.size > 0 %}
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <span class="post-date">{{ post.date | date: "%d %B %Y" }}</span>
        {% if post.excerpt %}
          <p>{{ post.excerpt | strip_html }}</p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
{% else %}
  <p>Belum ada postingan.</p>
{% endif %}
