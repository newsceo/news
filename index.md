---
layout: default
title: Home
---

<section class="hero">
    <h1>Latest Stories</h1>
    <p>Curated celebrity news with cinematic depth.</p>
</section>

<main class="container">
    <div class="post-grid">
        {% for post in site.posts %}
        <article class="card">
            <div class="card-image">
                <img src="{{ post.image }}" alt="{{ post.title }}">
            </div>
            <div class="card-content">
                <span class="tag">{{ post.category }}</span>
                <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
                <p>{{ post.excerpt }}</p>
                <a href="{{ post.url }}" class="read-btn">Read Article →</a>
            </div>
        </article>
        {% endfor %}
    </div>
</main>
